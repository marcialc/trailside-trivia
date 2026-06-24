# Park-generation prompt

Copy everything in the code block below into Claude (use a deep-research / web-search–enabled
chat for accuracy), replace `{{PARK NAME}}` with the park you want, and paste the result into
`src/data/parks/<slug>.ts`. Then add it to the `PARKS` array in `src/data/index.ts`:

```ts
import { yourPark } from './parks/your-slug';
export const PARKS: Park[] = [yellowstone, glacier, yourPark];
```

Run `npm run build` afterward — strict TypeScript will flag any shape mistakes.

---

````text
You are a meticulous national-parks researcher and a careful TypeScript data author.

TASK
Research **{{PARK NAME}}** (a US national park) and produce ONE TypeScript module that
matches the exact data contract below. Prioritize factual accuracy: verify names, numbers,
dates, and superlatives ("largest", "highest", "only") against reliable sources (NPS,
USGS, peer-reviewed or reputable references). If a fact is uncertain or contested, leave it
out rather than guess. Do not invent statistics.

OUTPUT
Return ONLY the file contents — a single ```ts code block, nothing before or after it.
The export name must be the camelCase form of the slug (e.g. slug "north-cascades" →
`export const northCascades`).

THE DATA CONTRACT (these interfaces already exist in the app — do NOT redefine them, just
`import type { Park } from '../types';` and export one Park object):

  interface Fact     { tag: string; text: string }
  interface Subject  { id: string; name: string; region: string; coord: string;
                       accent: string; colorName: string; teaser: string; facts: Fact[] }
  interface QuizQuestion { subjectId: string; q: string; opts: string[]; a: number; why: string }
  interface Deck     { id: string; label: string; dotColor: string;
                       subjects: Subject[]; quiz: QuizQuestion[] }
  interface Park     { slug: string; name: string; region?: string; tagline: string;
                       decks: Deck[]; safetyNote?: string }

FIELD MEANINGS
- Park.slug      → URL segment, kebab-case (e.g. "olympic").
- Park.region    → short eyebrow line, e.g. "Washington" or "Wyoming · Montana · Idaho".
- Park.tagline   → one evocative hero line.
- Park.safetyNote→ optional friendly footer (safety or sourcing note).
- Deck.id        → kebab-case: "places" | "animals" | "plants" | "geology" | ...
- Deck.label     → display name shown on the toggle ("Places", "Animals").
- Deck.dotColor  → a CSS hex color for the toggle dot.
- Subject.id     → kebab-case, UNIQUE WITHIN THIS PARK ("grand-prismatic", "bison").
- Subject.region → card eyebrow: basin / habitat / sub-area.
- Subject.coord  → a quick-stat or coordinate line for the detail header
                   (e.g. "44.52°N · 160°F" or "Wingspan 2.3 m").
- Subject.accent → a CSS HEX color, visually DISTINCT per subject (used for that subject's
                   tack, swatch, and highlight). Pick colors evocative of the subject.
- Subject.colorName → tiny chip label ("Cobalt", "Apex predator", "Fastest").
- Subject.teaser → one-line card summary in field-guide voice.
- Fact.tag       → short category: "Geology" | "Wildlife" | "Safety" | "Wow" | "Tip" | "History" | ...
- Fact.text      → 1–2 sentences, vivid but accurate, field-guide voice.
- QuizQuestion.subjectId → MUST equal a Subject.id IN THE SAME DECK.
- QuizQuestion.opts → 3–4 plausible options (only one correct).
- QuizQuestion.a    → the INDEX (0-based) of the correct option in `opts`.
- QuizQuestion.why  → one-sentence explanation shown after answering.

CONTENT TARGETS
- 2 decks when the park supports it (e.g. "Places" + "Animals"); 1 is fine for a small park.
- 4–6 subjects per deck.
- 3–5 facts per subject.
- 6–10 quiz questions per deck, spread across its subjects; each `subjectId` must match a
  subject in that same deck, and each correct `a` index must point to a true answer.

HARD RULES (the build fails otherwise)
- The FIRST deck is the default tab — put the most iconic collection first.
- Subject ids unique within the park; quiz subjectIds reference same-deck subjects.
- `accent` and `dotColor` are hex strings so the file is self-contained and portable.
- No trailing prose, no comments required, no extra exports — just the Park object.

Begin by researching the park, then output the file.
````
