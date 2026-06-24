// Client for Cloudflare AI Gateway. Two request paths:
//   - compat (`/compat/chat/completions`, OpenAI `messages`): anthropic / openai /
//     workers-ai/* — third-party ones need keys stored in the gateway (BYOK).
//   - Workers AI `/ai/run` (Gemini-native `contents`): `google/*` partner models,
//     account-billed via your CF token, gateway attached for logging.
//
// Default model is `google/gemini-3.5-flash`, chosen via the model bake-off:
// best-quality output of the field at ~60% of Opus's cost. See
// bakeoff.local/comparison.md for the full evaluation.
//
// Env:
//   CF_ACCOUNT_ID   (required) — Cloudflare account id
//   CF_AI_GATEWAY   (required) — AI Gateway name/id
//   CF_AIG_TOKEN    — gateway token (compat path); also the /ai/run fallback token
//   CF_API_TOKEN    — CF token with Workers AI access for /ai/run; defaults to CF_AIG_TOKEN
//   ANTHROPIC_API_KEY — only if using a compat `anthropic/*` model without gateway stored keys
//   PARK_MODEL      (optional) — override model id; defaults to google/gemini-3.5-flash

const { ANTHROPIC_API_KEY, CF_ACCOUNT_ID, CF_AI_GATEWAY, CF_AIG_TOKEN, CF_API_TOKEN, PARK_MODEL } = process.env;

for (const [name, value] of Object.entries({ CF_ACCOUNT_ID, CF_AI_GATEWAY })) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
}

const baseModel = PARK_MODEL || 'google/gemini-3.5-flash';
export const MODEL = baseModel.includes('/') ? baseModel : `anthropic/${baseModel}`;

const isPartner = MODEL.startsWith('google/');
const runToken = CF_API_TOKEN || CF_AIG_TOKEN;

if (isPartner) {
  if (!runToken) throw new Error('Set CF_API_TOKEN or CF_AIG_TOKEN for the /ai/run partner path.');
} else if (!CF_AIG_TOKEN && !ANTHROPIC_API_KEY) {
  throw new Error('Set CF_AIG_TOKEN (AI Gateway stored keys) or ANTHROPIC_API_KEY.');
}

const TIMEOUT_MS = 15 * 60 * 1000;

let inputTokens = 0;
let outputTokens = 0;

/** Total token usage across all calls so far (for cost reporting). */
export function usage() {
  return { inputTokens, outputTokens };
}

// ---------------------------------------------------------------------------
// compat path: /compat/chat/completions, OpenAI message shape, streamed.
// ---------------------------------------------------------------------------
const COMPAT_ENDPOINT = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_ID}/${CF_AI_GATEWAY}/compat/chat/completions`;
const COMPAT_HEADERS = {
  'content-type': 'application/json',
  ...(CF_AIG_TOKEN ? { 'cf-aig-authorization': `Bearer ${CF_AIG_TOKEN}` } : {}),
  ...(ANTHROPIC_API_KEY ? { authorization: `Bearer ${ANTHROPIC_API_KEY}` } : {}),
};

async function askCompat({ system, user, maxTokens }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const messages = [];
    if (system) messages.push({ role: 'system', content: system });
    messages.push({ role: 'user', content: user });

    const res = await fetch(COMPAT_ENDPOINT, {
      method: 'POST',
      headers: COMPAT_HEADERS,
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        // GPT-5 / o-series require max_completion_tokens instead of max_tokens.
        ...(MODEL.startsWith('openai/') ? { max_completion_tokens: maxTokens } : { max_tokens: maxTokens }),
        stream: true,
        stream_options: { include_usage: true },
        messages,
      }),
    });
    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => '');
      throw new Error(`AI Gateway request failed (${res.status}): ${body.slice(0, 500)}`);
    }

    let text = '';
    let buffer = '';
    const decoder = new TextDecoder();
    for await (const chunk of res.body) {
      buffer += decoder.decode(chunk, { stream: true });
      let nl;
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        let evt;
        try {
          evt = JSON.parse(payload);
        } catch {
          continue;
        }
        if (evt.error) {
          throw new Error(`Gateway stream error: ${JSON.stringify(evt.error).slice(0, 500)}`);
        }
        const delta = evt.choices?.[0]?.delta?.content;
        if (typeof delta === 'string') text += delta;
        if (evt.usage) {
          inputTokens += evt.usage.prompt_tokens ?? 0;
          outputTokens += evt.usage.completion_tokens ?? 0;
        }
      }
    }
    return text;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// partner path: Workers AI /ai/run, Gemini-native contents (system folded in).
// ---------------------------------------------------------------------------
const RUN_ENDPOINT = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run`;
const RUN_HEADERS = {
  'content-type': 'application/json',
  authorization: `Bearer ${runToken}`,
  'cf-aig-gateway-id': CF_AI_GATEWAY,
};

async function askPartner({ system, user, maxTokens }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const text = (system ? `${system}\n\n` : '') + user;
    const res = await fetch(RUN_ENDPOINT, {
      method: 'POST',
      headers: RUN_HEADERS,
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        input: {
          contents: [{ role: 'user', parts: [{ text }] }],
          generationConfig: { maxOutputTokens: maxTokens },
        },
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) {
      throw new Error(`AI /ai/run failed (${res.status}): ${JSON.stringify(json.errors || json).slice(0, 500)}`);
    }
    const r = json.result ?? json;
    const out =
      r?.candidates?.[0]?.content?.parts?.map((p) => p?.text || '').join('') ||
      (typeof r?.response === 'string' ? r.response : '') ||
      '';
    const u = r?.usageMetadata || r?.usage || {};
    inputTokens += u.promptTokenCount ?? u.prompt_tokens ?? 0;
    outputTokens += u.candidatesTokenCount ?? u.completion_tokens ?? 0;
    if (!out) throw new Error(`Empty response from ${MODEL}: ${JSON.stringify(json).slice(0, 300)}`);
    return out;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Send one prompt and return the response text. Routes by model: `google/*`
 * (and other partners) go through /ai/run; everything else streams via compat.
 */
export async function ask({ system, user, maxTokens = 32000 }) {
  return isPartner
    ? askPartner({ system, user, maxTokens })
    : askCompat({ system, user, maxTokens });
}
