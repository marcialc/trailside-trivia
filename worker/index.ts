/**
 * Optional API Worker stub — NOT wired in for v1.
 *
 * v1 ships as a pure static SPA (see wrangler.jsonc: assets.not_found_handling
 * = "single-page-application"). When you're ready for the global high-score
 * board stretch goal, set `main` and a KV binding in wrangler.jsonc, then
 * flesh out the `/api/*` routes below. Everything else falls through to the
 * static assets so the React app keeps serving normally.
 */

export interface Env {
  ASSETS: Fetcher;
  // SCORES: KVNamespace; // uncomment once the KV namespace is bound
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      // e.g. GET/POST /api/scores backed by env.SCORES (KV)
      return new Response(JSON.stringify({ error: 'Not implemented' }), {
        status: 501,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Everything else: serve the built SPA assets.
    return env.ASSETS.fetch(request);
  },
};
