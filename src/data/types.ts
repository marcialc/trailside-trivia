import type { LocalizedString } from '../i18n/localized';

// Translatable string fields use LocalizedString: a bare string is English-only
// (and serves as the placeholder until translated), or `{ en, es }` to localize.
// Stable keys/ids, slugs, colors, and the answer index are NOT localized.

export interface Fact {
  tag: LocalizedString;   // short category label: "Geology" | "Wildlife" | "Safety" | "Wow" | "Tip" | ...
  text: LocalizedString;  // 1–2 sentences in field-guide voice
}

export interface Subject {
  id: string;                 // unique WITHIN its park, kebab-case: "grand-prismatic", "bison"
  name: LocalizedString;      // "Grand Prismatic Spring"
  region: LocalizedString;    // eyebrow line: basin / habitat / sub-area
  coord: LocalizedString;     // quick-stat or coordinate line shown in the detail header
  accent: string;             // CSS color (hex preferred for portability, e.g. "#3F8FD0")
  colorName: LocalizedString; // small chip label: "Cobalt" / "Apex predator" / "Fastest"
  teaser: LocalizedString;    // one-line card summary
  facts: Fact[];
}

export interface QuizQuestion {
  subjectId: string;        // references a Subject.id in the SAME deck
  q: LocalizedString;
  opts: LocalizedString[];  // 2–4 options
  a: number;                // index of the correct option in opts
  why: LocalizedString;     // explanation revealed after answering
}

export interface Deck {
  id: string;             // "places" | "animals" | "plants" | ...
  label: LocalizedString; // "Places" | "Animals"
  dotColor: string;       // CSS color for the toggle dot
  subjects: Subject[];
  quiz: QuizQuestion[];
}

export interface Park {
  slug: string;                 // URL: "yellowstone"
  name: LocalizedString;        // "Yellowstone"
  region?: LocalizedString;     // "Wyoming · Montana · Idaho"
  tagline: LocalizedString;     // hero lede line
  decks: Deck[];                // first deck is the default tab
  safetyNote?: LocalizedString; // footer safety line
}
