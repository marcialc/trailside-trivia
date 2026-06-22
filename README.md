# 🏔️ Trailside Trivia

**A mobile-first, data-driven field guide to the national parks** — the stories, numbers, and oddities behind what you're looking at, with a built-in trivia challenge for every park.

Search a spot or tap a card to pull up its field notes. Test yourself with shuffled multiple-choice rounds and earn a ranger rank. The whole experience is driven by data files: **adding a new park is one file and one line — zero component changes.**

<p align="center">
  <em>Dark "obsidian / thermal" aesthetic · Bricolage Grotesque · Newsreader · JetBrains Mono</em>
</p>

---

## ✨ Features

- 🔎 **Live search + autocomplete** — searches names, regions, teasers, and every fact, with a "why it matched" snippet and the query term bolded. Full keyboard support (↑/↓/Enter/Esc).
- 🗂️ **Deck toggle** — segmented control to switch between collections (Places / Animals / Plants / anything).
- 📇 **Subject cards → detail sheet** — tap a card for a bottom-sheet of numbered, tagged facts, with your search term highlighted. Focus-managed, scroll-locked, keyboard-dismissible.
- 🧠 **Trivia challenge** — a `setup → play → results` quiz: pick a deck, pick a round (everything, or a single subject), get instant feedback and an explanation after every question, then a **ranger rank** based on your score.
- 🌗 **Faithful design** — hand-rolled CSS lifted from the original prototype; honors `prefers-reduced-motion`.
- ⚡ **Edge-deployed** — ships as a static SPA on Cloudflare Workers with deep-link fallback.
- 🧩 **100% data-driven** — no park names, deck names, or subject IDs are hardcoded anywhere in the components.

---

## 🧱 Tech stack

| Concern    | Choice                                            |
| ---------- | ------------------------------------------------- |
| UI         | React 18 + TypeScript (strict)                    |
| Build/dev  | Vite 6                                             |
| Routing    | React Router                                      |
| Styling    | Plain CSS — global tokens + CSS Modules per component (no framework) |
| Deploy     | Cloudflare Workers static assets via `@cloudflare/vite-plugin` (SPA mode) |

---

## 🚀 Quick start

```bash
npm install
npm run dev        # local dev (Workers runtime via the Vite plugin) → http://localhost:5173
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the local dev server                    |
| `npm run build`     | Type-check + build the production SPA          |
| `npm run preview`   | Preview the built output                       |
| `npm run deploy`    | Build and ship to a `*.workers.dev` URL        |
| `npm run typecheck` | Run `tsc` in no-emit mode                      |

---

## 🗺️ Adding a park (the whole point)

This is the design goal: **drop in one data file, add one registry line, done.** Routing, the landing page, search, cards, the detail sheet, the deck toggle, and the quiz all light up automatically.

**1. Create `src/data/parks/<your-slug>.ts`** (copy `_TEMPLATE.ts`):

```ts
import type { Park } from '../types';

export const yourPark: Park = {
  slug: 'your-slug',          // → /your-slug
  name: 'Your Park',
  region: 'State · Region',
  tagline: 'One-line hero lede.',
  safetyNote: 'Optional footer note.',
  decks: [
    {
      id: 'places',
      label: 'Places',
      dotColor: '#3F8FD0',
      subjects: [
        {
          id: 'example-subject',          // unique within this park, kebab-case
          name: 'Example Subject',
          region: 'Sub-area / habitat',
          coord: 'Coordinate or quick-stat',
          accent: '#3F8FD0',              // any CSS color; hex keeps the park portable
          colorName: 'Chip label',
          teaser: 'One-line card summary.',
          facts: [
            { tag: 'Wow', text: 'A 1–2 sentence fact.' },
            { tag: 'Tip', text: 'Add as many as you like.' },
          ],
        },
      ],
      quiz: [
        {
          subjectId: 'example-subject',   // must match a Subject.id in this deck
          q: 'A question?',
          opts: ['Wrong', 'Right', 'Also wrong'],
          a: 1,                           // index of the correct option
          why: 'Explanation shown after answering.',
        },
      ],
    },
    // add more decks — "Animals", "Plants", "Geology"…
  ],
};
```

**2. Register it** in `src/data/index.ts`:

```ts
import { yourPark } from './parks/your-slug';

export const PARKS: Park[] = [yellowstone, saguaro, yourPark];
```

That's it. No component edits.

> The repo ships with **Yellowstone** (8 places + 8 animals, fully fact-checked) and a deliberately tiny **Saguaro** park (one deck, two subjects) that exists purely to prove the pipeline. With a single park in the registry, the landing page redirects straight to it.

---

## 🧬 Data model

```ts
Park   → { slug, name, region?, tagline, decks[], safetyNote? }
Deck   → { id, label, dotColor, subjects[], quiz[] }
Subject→ { id, name, region, coord, accent, colorName, teaser, facts[] }
Fact   → { tag, text }
Quiz Q → { subjectId, q, opts[], a, why }
```

See [`src/data/types.ts`](src/data/types.ts) for the source of truth.

---

## 📁 Project structure

```
├─ index.html
├─ vite.config.ts
├─ wrangler.jsonc            # Workers config (SPA fallback)
├─ worker/index.ts           # optional API stub for a future scores endpoint (not wired in v1)
└─ src/
   ├─ main.tsx · App.tsx     # entry + router
   ├─ index.css              # global tokens + base styles
   ├─ data/                  # ← all content lives here
   │  ├─ types.ts · index.ts
   │  └─ parks/              # yellowstone.ts · saguaro.ts · _TEMPLATE.ts
   ├─ pages/                 # ParkListPage · ParkPage
   ├─ components/            # SearchBar · DeckToggle · SubjectCard · DetailSheet · quiz/
   ├─ hooks/                 # useSubjectSearch
   └─ lib/                   # ranks · highlight · shuffle
```

---

## ☁️ Deployment

The app deploys as static assets on Cloudflare Workers. `wrangler.jsonc` sets `assets.not_found_handling: "single-page-application"` so deep links like `/yellowstone` serve `index.html` instead of 404ing.

```bash
npm run deploy
```

### Future API (stubbed)

`worker/index.ts` leaves a clean seam: serve `env.ASSETS.fetch(request)` for everything except `/api/*`, backed by a KV namespace for a global high-score board. Uncomment the `main` and `kv_namespaces` lines in `wrangler.jsonc` when you're ready. Local-only high scores can use `localStorage` first.

---

## 🏅 Ranger ranks

| Score   | Rank                  |
| ------- | --------------------- |
| 100%    | Park Superintendent   |
| ≥ 80%   | Senior Naturalist     |
| ≥ 60%   | Backcountry Ranger    |
| ≥ 40%   | Junior Ranger         |
| < 40%   | First-Day Tourist     |

---

## 📚 Sources

Park facts compiled from the National Park Service, the USGS Yellowstone Volcano Observatory, and park references. This is a trailside reference, **not** a substitute for official park guidance — always follow posted signs.
