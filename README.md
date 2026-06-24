# 🏔️ Trailside Trivia

**A mobile-first, data-driven field guide to the national parks** — the stories, numbers, and oddities behind what you're looking at, with a built-in trivia challenge for every park.

Search a spot or tap a card to pull up its field notes. Test yourself with shuffled multiple-choice rounds and earn a ranger rank. The whole experience is driven by data files: **adding a new park is one file and one line — zero component changes.**

**🔗 Live demo: [trailside-trivia.marcialandres06.workers.dev](https://trailside-trivia.marcialandres06.workers.dev/)**

<p align="center">
  <em>Hand-drawn "field notebook" aesthetic — warm paper, wobbly borders, cut-paper shadows · Kalam · Patrick Hand</em>
</p>

---

## ✨ Features

- 🔎 **Live search + autocomplete** — searches names, regions, teasers, and every fact, with a "why it matched" snippet and the query term bolded. Full keyboard support (↑/↓/Enter/Esc).
- 🗂️ **Deck toggle** — segmented control to switch between collections (Places / Animals / Plants / anything).
- 📇 **Subject cards → detail sheet** — tap a card for a bottom-sheet of numbered, tagged facts, with your search term highlighted. Focus-managed, scroll-locked, keyboard-dismissible.
- 🧠 **Trivia challenge** — a `setup → play → results` quiz: pick a deck, pick a round (everything, or a single subject), get instant feedback and an explanation after every question, then a **ranger rank** based on your score.
- 🌗 **Faithful design** — hand-rolled CSS in a hand-drawn field-notebook style; honors `prefers-reduced-motion`.
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

export const PARKS: Park[] = [yellowstone, glacier, yourPark];
```

That's it. No component edits.

> The repo ships with **Yellowstone** and **Glacier** (8 places + 8 animals each, fully translated EN/ES). With a single park in the registry, the landing page redirects straight to it.

---

## 🤖 Request a park (automated pipeline)

Anyone can request a park by opening the **🏞️ Park request** issue. When a maintainer applies the **`park-request`** label, a GitHub Actions pipeline ([`.github/workflows/add-park.yml`](.github/workflows/add-park.yml)) runs [`scripts/park-pipeline/run.mjs`](scripts/park-pipeline/run.mjs):

```
draft → type-check → review loop (fact-check) → translate (es) → type-check → register in PARKS → build + test + lint → open PR
```

Each AI step calls a model through a **Cloudflare AI Gateway** (for caching, rate-limiting, and cost analytics), defaulting to **`google/gemini-3.5-flash`**. The client routes by model: `google/*` partner models go through Workers AI `/ai/run` (account-billed via a Cloudflare token), while `anthropic/*` and `openai/*` models go through the OpenAI-compatible `/compat/chat/completions` endpoint. Set `PARK_MODEL` to override the model. The deterministic gates — `typecheck`, `build`, `test`, `lint` — are the real safety net: the model never decides whether the result compiles. The pipeline opens a pull request labeled `needs-fact-check` and **never auto-merges** — a human verifies the cited facts and merges.

**Setup** (one-time, in repo settings):

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `CF_AIG_TOKEN` | AI Gateway token (compat path; gateway can hold provider keys via stored keys) |
| Secret | `CF_API_TOKEN` | Cloudflare token with Workers AI access for the `/ai/run` partner path (falls back to `CF_AIG_TOKEN` if unset) |
| Variable | `CF_ACCOUNT_ID` | Cloudflare account id |
| Variable | `CF_AI_GATEWAY` | AI Gateway name |

> Using an `anthropic/*` model without gateway stored keys? Set an `ANTHROPIC_API_KEY` secret and the request will send it directly through the gateway.

Run it manually for testing via **Actions → Add park → Run workflow** (or locally with the same env vars: `npm run park:generate` with `PARK_NAME=...`).

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
├─ worker/index.ts           # optional /api/scores Worker for the global high-score board
└─ src/
   ├─ main.tsx · App.tsx     # entry + router
   ├─ index.css              # global tokens + base styles
   ├─ data/                  # ← all content lives here
   │  ├─ types.ts · index.ts
   │  └─ parks/              # yellowstone.ts · glacier.ts · _TEMPLATE.ts
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

### High scores

Personal best scores work out of the box — they're stored per (park, deck, round) in the browser's `localStorage` (`src/lib/highScores.ts`) and shown on the quiz results screen.

For a **shared, cross-device board**, `worker/index.ts` implements `GET`/`POST` `/api/scores` backed by Cloudflare KV (everything else falls through to the static assets). It's already pointed to by `main` in `wrangler.jsonc`; until a KV namespace is bound it answers as "disabled" and the client stays on local-only scores. To turn it on:

```bash
wrangler kv namespace create SCORES
# paste the printed id into the kv_namespaces line in wrangler.jsonc, uncomment it
npm run deploy
```

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
