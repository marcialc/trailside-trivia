// Local-first quiz high scores. The browser's localStorage is the source of
// truth and works offline; when the optional /api/scores Worker backend is
// enabled (see worker/index.ts) each finished round is also submitted to the
// global board on a best-effort, fire-and-forget basis.
//
// A "best" is tracked per (park, deck, scope) — scope is 'all' for a full-deck
// round or a Subject.id for a single-subject round — so each round type keeps
// its own record. Nothing here is park-specific; it is keyed entirely by the
// ids the caller passes in.

export interface BestEntry {
  score: number;
  total: number;
  pct: number;
}

const STORAGE_KEY = 'tt.scores';
const SCORES_API = '/api/scores';

function bestKey(parkSlug: string, deckId: string, scope: string): string {
  return `${parkSlug}::${deckId}::${scope}`;
}

function readAll(): Record<string, BestEntry> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, BestEntry>) : {};
  } catch {
    // localStorage unavailable or corrupt — treat as empty.
    return {};
  }
}

function writeAll(all: Record<string, BestEntry>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore persistence failures (private mode, quota, etc.)
  }
}

function isBetter(next: BestEntry, prev: BestEntry): boolean {
  return next.pct > prev.pct || (next.pct === prev.pct && next.score > prev.score);
}

export interface RecordResult {
  best: BestEntry; // the best on record after this round (may be the prior one)
  isNewBest: boolean; // true if this round set a new personal best
}

/**
 * Record a finished round: update the local personal best if this round beat it,
 * fire a best-effort submission to the global board, and report the outcome.
 */
export function recordRound(
  parkSlug: string,
  deckId: string,
  scope: string,
  score: number,
  total: number,
): RecordResult {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const entry: BestEntry = { score, total, pct };

  const all = readAll();
  const key = bestKey(parkSlug, deckId, scope);
  const prev = all[key] ?? null;
  const isNewBest = !prev || isBetter(entry, prev);
  if (isNewBest) {
    all[key] = entry;
    writeAll(all);
  }

  void submitScore(parkSlug, deckId, scope, entry);

  return { best: isNewBest ? entry : (prev as BestEntry), isNewBest };
}

/**
 * Best-effort submission to the global high-score Worker. Silently no-ops when
 * the backend is not enabled (the static-only deploy answers /api/* with the
 * SPA fallback, which we detect and ignore). Never throws.
 */
async function submitScore(
  parkSlug: string,
  deckId: string,
  scope: string,
  entry: BestEntry,
): Promise<void> {
  try {
    const res = await fetch(SCORES_API, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ park: parkSlug, deck: deckId, scope, ...entry }),
    });
    // On the static-only deploy this resolves to index.html (HTML, not JSON);
    // checking the content-type keeps us from treating that as a real response.
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) return;
  } catch {
    // network/offline — local best already saved, nothing more to do.
  }
}
