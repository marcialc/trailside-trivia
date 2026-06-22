import { useMemo } from 'react';
import type { Subject } from '../data/types';
import { useLocale } from '../i18n/LocaleContext';
import { useUI } from '../i18n/strings';
import { t } from '../i18n/t';
import type { Locale } from '../i18n/locale';

export interface SearchMatch {
  subject: Subject;
  why: string; // short "why it matched" snippet shown in autocomplete
}

export interface SearchResult {
  filtered: Subject[]; // subjects to show in the card grid
  matches: SearchMatch[]; // autocomplete rows (same order)
}

// Mirrors the prototype's matchInfo: searches name, region, teaser, and every
// fact's text/tag — returning a short snippet describing the match. All content
// fields are resolved to the active locale before matching.
function matchInfo(
  subject: Subject,
  term: string,
  locale: Locale,
  inSummary: string,
): { hit: boolean; why?: string } {
  const t_ = term.toLowerCase();
  const region = t(subject.region, locale);
  if (t(subject.name, locale).toLowerCase().includes(t_)) return { hit: true, why: region };
  if (region.toLowerCase().includes(t_)) return { hit: true, why: region };
  if (t(subject.teaser, locale).toLowerCase().includes(t_)) return { hit: true, why: inSummary };
  for (const f of subject.facts) {
    const text = t(f.text, locale);
    const tag = t(f.tag, locale);
    if (text.toLowerCase().includes(t_) || tag.toLowerCase().includes(t_)) {
      const idx = text.toLowerCase().indexOf(t_);
      let snip: string;
      if (idx >= 0) {
        const s = Math.max(0, idx - 12);
        snip = (s > 0 ? '…' : '') + text.slice(s, idx + t_.length + 22).trim() + '…';
      } else {
        snip = tag;
      }
      return { hit: true, why: snip };
    }
  }
  return { hit: false };
}

/** Live search over the active deck's subjects for the given query. */
export function useSubjectSearch(subjects: Subject[], query: string): SearchResult {
  const { locale } = useLocale();
  const ui = useUI();
  return useMemo(() => {
    const term = query.trim();
    if (!term) return { filtered: subjects, matches: [] };
    const matches: SearchMatch[] = [];
    for (const subject of subjects) {
      const m = matchInfo(subject, term, locale, ui.inSummary);
      if (m.hit) matches.push({ subject, why: m.why ?? t(subject.region, locale) });
    }
    return { filtered: matches.map((m) => m.subject), matches };
  }, [subjects, query, locale, ui.inSummary]);
}
