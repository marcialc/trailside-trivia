/**
 * Optional API Worker for the global high-score board.
 *
 * The app works as a pure static SPA without this — local high scores live in
 * the browser (src/lib/highScores.ts). This Worker adds a shared, cross-device
 * board on top of that, backed by a KV namespace.
 *
 * To enable it:
 *   1. Create the namespace:  wrangler kv namespace create SCORES
 *   2. In wrangler.jsonc, uncomment the `kv_namespaces` entry and paste the id.
 * `main` is already pointed here. Until a KV namespace is bound, `/api/scores`
 * answers as "disabled" and the client falls back to local-only scores, so it
 * is safe to ship in either state.
 */

export interface Env {
  ASSETS: Fetcher;
  SCORES?: KVNamespace; // bound once the kv_namespaces entry is uncommented
}

interface ScoreEntry {
  score: number;
  total: number;
  pct: number;
  at: number; // epoch ms, server-stamped
}

const MAX_PER_BOARD = 10;
const ID = /^[a-z0-9-]{1,64}$/; // park slug / deck id / subject-id scope shape

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/scores') return handleScores(request, env);
    // Everything else: serve the built SPA assets.
    return env.ASSETS.fetch(request);
  },
};
