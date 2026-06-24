// Minimal client for Cloudflare AI Gateway's OpenAI-compatible endpoint.
//
//   https://gateway.ai.cloudflare.com/v1/<account>/<gateway>/compat/chat/completions
//
// This is the unified `/compat/chat/completions` API (OpenAI chat shape), so the
// model is given as `anthropic/<model>`, the system prompt is a message with
// role "system", and streaming deltas arrive as `choices[].delta.content`.
//
// Auth modes (we support both):
//   - Stored keys / BYOK (default): the gateway holds the Anthropic key — send
//     only `cf-aig-authorization: Bearer <CF_AIG_TOKEN>`.
//   - Provider key: additionally send `Authorization: Bearer <ANTHROPIC_API_KEY>`.
//
// Env:
//   CF_ACCOUNT_ID   (required) — Cloudflare account id
//   CF_AI_GATEWAY   (required) — AI Gateway name/id
//   CF_AIG_TOKEN    — gateway token (required for stored keys / authenticated gateways)
//   ANTHROPIC_API_KEY — only if NOT using gateway stored keys
//   PARK_MODEL      (optional) — model id; defaults to claude-opus-4-8

const { ANTHROPIC_API_KEY, CF_ACCOUNT_ID, CF_AI_GATEWAY, CF_AIG_TOKEN, PARK_MODEL } = process.env;

for (const [name, value] of Object.entries({ CF_ACCOUNT_ID, CF_AI_GATEWAY })) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
}
if (!CF_AIG_TOKEN && !ANTHROPIC_API_KEY) {
  throw new Error('Set CF_AIG_TOKEN (AI Gateway stored keys) or ANTHROPIC_API_KEY.');
}

const baseModel = PARK_MODEL || 'claude-opus-4-8';
export const MODEL = baseModel.includes('/') ? baseModel : `anthropic/${baseModel}`;

const ENDPOINT = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_ID}/${CF_AI_GATEWAY}/compat/chat/completions`;
const HEADERS = {
  'content-type': 'application/json',
  ...(CF_AIG_TOKEN ? { 'cf-aig-authorization': `Bearer ${CF_AIG_TOKEN}` } : {}),
  ...(ANTHROPIC_API_KEY ? { authorization: `Bearer ${ANTHROPIC_API_KEY}` } : {}),
};
const TIMEOUT_MS = 15 * 60 * 1000;

let inputTokens = 0;
let outputTokens = 0;

/** Total token usage across all calls so far (for cost reporting). */
export function usage() {
  return { inputTokens, outputTokens };
}

/**
 * Send one prompt and return the concatenated text response. Streams so large
 * outputs aren't truncated by a request timeout.
 */
export async function ask({ system, user, maxTokens = 32000 }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const messages = [];
    if (system) messages.push({ role: 'system', content: system });
    messages.push({ role: 'user', content: user });

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
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
