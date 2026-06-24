# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # local dev server (Workers runtime via the Vite plugin) → http://localhost:5173
npm run build      # tsc -b (strict type-check, all projects) then vite build → dist/
npm run typecheck  # tsc -b --noEmit only
npm run preview    # serve the built dist/ output
npm run deploy     # build + wrangler deploy to *.workers.dev
```

There is no test runner and no linter configured — `npm run build`/`npm run typecheck` (strict mode, `noUnusedLocals`/`noUnusedParameters`) is the only gate. Run it after changes.

## Architecture

This is a React 18 + Vite + TypeScript SPA deployed as Cloudflare Workers static assets. It is a port of a single-file prototype (`yellowstone-field-notes.html`, kept in `~/Downloads`, not in the repo) generalized from one park into a multi-park engine.

**The central invariant: content lives in `src/data/**`, and components are 100% data-driven.** No park name, deck name, or subject ID is hardcoded anywhere in `src/components`, `src/pages`, or `src/hooks`. Components import *types* from `src/data/types.ts`, never specific park data. Breaking this invariant (e.g. an `if (parkSlug === 'yellowstone')` branch, or a hardcoded "Places"/"Animals" label) is a regression even if it works.

### Data model and the "add a park" contract

The data hierarchy (`src/data/types.ts`) is `Park → Deck[] → Subject[] / QuizQuestion[] → Fact[]`. Key relationships:

- A `Subject.id` is unique **within its park** (not globally) — all lookups must be scoped by park + deck, never global.
- `QuizQuestion.subjectId` references a `Subject.id` **in the same deck**.
- `Subject.accent` is a literal hex color so each park file is self-contained and portable.
- The **first deck** in `Park.decks` is the default tab.

Adding a park must require exactly two edits: create `src/data/parks/<slug>.ts` and add it to the `PARKS` array in `src/data/index.ts`. `src/data/parks/_TEMPLATE.ts` is the canonical shape to copy. When adding features, verify they work for *any* park, not just Yellowstone.

### Routing (`src/App.tsx`)

`/` → `ParkListPage` (which `Navigate`-redirects straight to the park if `PARKS.length === 1`); `/:parkSlug` → `ParkPage`; unknown paths fall back to the list. The quiz is an in-page overlay, **not** a route. Deep links work in production because `wrangler.jsonc` sets `assets.not_found_handling: "single-page-application"`.

### ParkPage is the orchestrator

`src/pages/ParkPage.tsx` owns all interaction state — `activeDeckId`, `query`, the selected subject + highlight `term` for the detail sheet, and `quizOpen` — and wires together `SearchBar`, `DeckToggle`, `SubjectCard`, `DetailSheet`, and `QuizOverlay`. Search runs through `useSubjectSearch(subjects, query)`, which mirrors the prototype's match logic (name → region → teaser → facts, with a "why it matched" snippet). Switching decks clears the query and dismisses the sheet.

The quiz is a self-contained `setup → play → results` state machine in `src/components/quiz/QuizOverlay.tsx`; the three phase views are presentational. Options are shuffled per question at round start (`lib/shuffle.ts`), and score → rank mapping lives in `lib/ranks.ts`.

### Styling

Plain hand-rolled CSS, intentionally no framework. Global design tokens (the obsidian/thermal palette, fonts, background) are CSS variables in `src/index.css`; per-component styles are CSS Modules (`*.module.css`). The prototype is the source of truth for look and feel — match it; class names/structure were kept close on purpose. Per-subject color flows through a `--accent` CSS variable set inline from `subject.accent`. `prefers-reduced-motion` is honored globally. Modal components (`DetailSheet`, `QuizOverlay`) stay mounted and toggle an `.open` class so slide animations run, and they manage focus + body-scroll lock manually.

### Worker (`worker/index.ts`)

A stub for a future `/api/*` + KV high-score board, **not wired in v1**. The app currently ships as pure static assets; `main` and `kv_namespaces` in `wrangler.jsonc` are commented out. Don't assume a running Worker backend exists.
