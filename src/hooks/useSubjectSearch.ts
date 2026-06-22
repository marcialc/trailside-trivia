import { useMemo } from 'react';
import type { Subject } from '../data/types';

export interface SearchMatch {
  subject: Subject;
  why: string; // short "why it matched" snippet shown in autocomplete
}

export interface SearchResult {
  filtered: Subject[]; // subjects to show in the card grid
  matches: SearchMatch[]; // autocomplete rows (same order)
}

// Mirrors the prototype's matchInfo: searches name, region, teaser, and every
// fact's text/tag — returning a short snippet describing the match.
function matchInfo(subject: Subject, term: string): { hit: boolean; why?: string } {
  const t = term.toLowerCase();
  if (subject.name.toLowerCase().includes(t)) return { hit: true, why: subject.region };
  if (subject.region.toLowerCase().includes(t)) return { hit: true, why: subject.region };
  if (subject.teaser.toLowerCase().includes(t)) return { hit: true, why: 'in summary' };
  for (const f of subject.facts) {
    if (f.text.toLowerCase().includes(t) || f.tag.toLowerCase().includes(t)) {
      const idx = f.text.toLowerCase().indexOf(t);
      let snip: string;
      if (idx >= 0) {
        const s = Math.max(0, idx - 12);
        snip = (s > 0 ? '…' : '') + f.text.slice(s, idx + t.length + 22).trim() + '…';
      } else {
        snip = f.tag;
      }
      return { hit: true, why: snip };
    }
  }
  return { hit: false };
}

/** Live search over the active deck's subjects for the given query. */
export function useSubjectSearch(subjects: Subject[], query: string): SearchResult {
  return useMemo(() => {
    const term = query.trim();
    if (!term) return { filtered: subjects, matches: [] };
    const matches: SearchMatch[] = [];
    for (const subject of subjects) {
      const m = matchInfo(subject, term);
      if (m.hit) matches.push({ subject, why: m.why ?? subject.region });
    }
    return { filtered: matches.map((m) => m.subject), matches };
  }, [subjects, query]);
}
