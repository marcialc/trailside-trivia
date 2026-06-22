export interface Fact {
  tag: string;        // short category label: "Geology" | "Wildlife" | "Safety" | "Wow" | "Tip" | ...
  text: string;       // 1–2 sentences in field-guide voice
}

export interface Subject {
  id: string;         // unique WITHIN its park, kebab-case: "grand-prismatic", "bison"
  name: string;       // "Grand Prismatic Spring"
  region: string;     // eyebrow line: basin / habitat / sub-area
  coord: string;      // quick-stat or coordinate line shown in the detail header
  accent: string;     // CSS color (hex preferred for portability, e.g. "#3F8FD0")
  colorName: string;  // small chip label: "Cobalt" / "Apex predator" / "Fastest"
  teaser: string;     // one-line card summary
  facts: Fact[];
}

export interface QuizQuestion {
  subjectId: string;  // references a Subject.id in the SAME deck
  q: string;
  opts: string[];     // 2–4 options
  a: number;          // index of the correct option in opts
  why: string;        // explanation revealed after answering
}

export interface Deck {
  id: string;         // "places" | "animals" | "plants" | ...
  label: string;      // "Places" | "Animals"
  dotColor: string;   // CSS color for the toggle dot
  subjects: Subject[];
  quiz: QuizQuestion[];
}

export interface Park {
  slug: string;       // URL: "yellowstone"
  name: string;       // "Yellowstone"
  region?: string;    // "Wyoming · Montana · Idaho"
  tagline: string;    // hero lede line
  decks: Deck[];      // first deck is the default tab
  safetyNote?: string;// footer safety line
}
