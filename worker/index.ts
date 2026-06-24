/**
 * API Worker.
 *
 * The app works as a pure static SPA without most of this — local high scores
 * live in the browser (src/lib/highScores.ts). This Worker adds two optional
 * server features on top:
 *
 *  - /api/scores        a shared, cross-device high-score board (KV-backed).
 *  - /api/park-request  accepts an in-app "request a park" submission, verifies
 *                       a Cloudflare Turnstile token, validates the park
 *                       server-side, and opens a labelled GitHub issue that
 *                       triggers the add-park pipeline (.github/workflows).
 *
 * Each feature degrades gracefully when its backing secret/binding is absent,
 * so the Worker is safe to ship in any state.
 */

import { NATIONAL_PARKS } from '../src/data/nationalParks';
import { getPark } from '../src/data';

export interface Env {
  ASSETS: Fetcher;
  SCORES?: KVNamespace; // bound once the kv_namespaces entry is uncommented

  // Park-request endpoint (all three needed for it to be enabled):
  GITHUB_TOKEN?: string; // fine-grained PAT with Issues: read+write on the repo
  TURNSTILE_SECRET?: string; // Cloudflare Turnstile secret key
  GITHUB_REPO?: string; // "owner/name"; defaults to DEFAULT_REPO below
}

interface ScoreEntry {
  score: number;
  total: number;
  pct: number;
  at: number; // epoch ms, server-stamped
}

const MAX_PER_BOARD = 10;
const ID = /^[a-z0-9-]{1,64}$/; // park slug / deck id / subject-id scope shape

const DEFAULT_REPO = 'marcialc/trailside-trivia';
const PARK_REQUEST_LABEL = 'park-request';
const MAX_NOTES = 2000;
const GH_HEADERS_BASE = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'trailside-trivia-worker',
  'X-GitHub-Api-Version': '2022-11-28',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function boardKey(park: string, deck: string, scope: string): string {
  return `scores:${park}:${deck}:${scope}`;
}

async function readBoard(kv: KVNamespace, key: string): Promise<ScoreEntry[]> {
  const board = await kv.get<ScoreEntry[]>(key, 'json');
  return Array.isArray(board) ? board : [];
}

async function handleScores(request: Request, env: Env): Promise<Response> {
  if (!env.SCORES) {
    // No KV bound yet — report disabled so the client stays on local scores.
    return json({ scores: [], disabled: true });
  }

  const url = new URL(request.url);

  if (request.method === 'GET') {
    const park = url.searchParams.get('park') ?? '';
    const deck = url.searchParams.get('deck') ?? '';
    const scope = url.searchParams.get('scope') ?? '';
    if (!ID.test(park) || !ID.test(deck) || !ID.test(scope)) {
      return json({ error: 'invalid park/deck/scope' }, 400);
    }
    return json({ scores: await readBoard(env.SCORES, boardKey(park, deck, scope)) });
  }

  if (request.method === 'POST') {
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: 'invalid json' }, 400);
    }
    const park = String(body.park ?? '');
    const deck = String(body.deck ?? '');
    const scope = String(body.scope ?? '');
    const score = Number(body.score);
    const total = Number(body.total);
    if (!ID.test(park) || !ID.test(deck) || !ID.test(scope)) {
      return json({ error: 'invalid park/deck/scope' }, 400);
    }
    if (!Number.isInteger(score) || !Number.isInteger(total) || total <= 0 || score < 0 || score > total) {
      return json({ error: 'invalid score/total' }, 400);
    }

    const key = boardKey(park, deck, scope);
    const board = await readBoard(env.SCORES, key);
    board.push({ score, total, pct: Math.round((score / total) * 100), at: Date.now() });
    board.sort((a, b) => b.pct - a.pct || b.score - a.score || a.at - b.at);
    const top = board.slice(0, MAX_PER_BOARD);
    await env.SCORES.put(key, JSON.stringify(top));
    return json({ scores: top });
  }

  return json({ error: 'method not allowed' }, 405);
}

// Confirm the visitor solved the Turnstile challenge. Fails closed.
async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// Build a body in the GitHub issue-form shape the pipeline's parser expects
// (### Label\n\nvalue blocks; see scripts/park-pipeline/run.mjs parseIssueForm).
function issueBody(fullName: string, region: string, slug: string, notes: string): string {
  const notesBlock = notes.trim() || '_No response_';
  return [
    '### Park name',
    '',
    fullName,
    '',
    '### Region',
    '',
    region,
    '',
    '### URL slug',
    '',
    slug,
    '',
    '### Notes & sources',
    '',
    notesBlock,
    '',
    '---',
    '_Submitted via the in-app "Request a park" form._',
  ].join('\n');
}

async function handleParkRequest(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  if (!env.GITHUB_TOKEN || !env.TURNSTILE_SECRET) {
    // Not configured (missing PAT/Turnstile secret) — report disabled.
    return json({ error: 'park requests are not configured', disabled: true }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid json' }, 400);
  }

  const slug = String(body.slug ?? '');
  const notes = String(body.notes ?? '').slice(0, MAX_NOTES);
  const turnstileToken = String(body.turnstileToken ?? '');

  if (!ID.test(slug)) return json({ error: 'invalid slug' }, 400);
  if (!turnstileToken) return json({ error: 'missing captcha token' }, 400);

  // 1. Human check first — cheap to reject before any GitHub calls.
  const human = await verifyTurnstile(env.TURNSTILE_SECRET, turnstileToken, request.headers.get('CF-Connecting-IP'));
  if (!human) return json({ error: 'captcha verification failed' }, 403);

  // 2. Real, recognized national park? (slug is the ONLY thing we trust from
  //    the client; name/region come from our canonical list.)
  const park = NATIONAL_PARKS.find((p) => p.slug === slug);
  if (!park) return json({ error: 'not a recognized national park' }, 400);

  // 3. Not already in the app.
  if (getPark(slug)) return json({ error: 'that park is already in the app', code: 'exists' }, 409);

  const repo = env.GITHUB_REPO || DEFAULT_REPO;
  const fullName = `${park.name} National Park`;
  const title = `Park request: ${fullName}`;
  const ghHeaders = { ...GH_HEADERS_BASE, Authorization: `Bearer ${env.GITHUB_TOKEN}` };

  // 4. Reject if there's already an open request for this park (avoid duplicate
  //    pipeline runs / PRs). Best-effort: if the search fails, we proceed.
  try {
    const q = `repo:${repo} is:issue is:open in:title "${title}"`;
    const search = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}`, {
      headers: ghHeaders,
    });
    if (search.ok) {
      const found = (await search.json()) as { total_count?: number };
      if ((found.total_count ?? 0) > 0) {
        return json({ error: 'that park has already been requested', code: 'requested' }, 409);
      }
    }
  } catch {
    /* non-fatal — continue */
  }

  // 5. Create the issue WITHOUT the label.
  const createRes = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body: issueBody(fullName, park.state, slug, notes) }),
  });
  if (!createRes.ok) {
    return json({ error: 'could not create the request' }, 502);
  }
  const issue = (await createRes.json()) as { number: number; html_url: string };

  // 6. Apply the label in a SEPARATE call. The pipeline triggers on the
  //    `issues: labeled` event, which only fires reliably when the label is
  //    added after creation (and a PAT — unlike the Actions GITHUB_TOKEN —
  //    does trigger workflows).
  await fetch(`https://api.github.com/repos/${repo}/issues/${issue.number}/labels`, {
    method: 'POST',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ labels: [PARK_REQUEST_LABEL] }),
  });

  return json({ ok: true, url: issue.html_url, number: issue.number });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/scores') return handleScores(request, env);
    if (url.pathname === '/api/park-request') return handleParkRequest(request, env);
    // Everything else: serve the built SPA assets.
    return env.ASSETS.fetch(request);
  },
};
