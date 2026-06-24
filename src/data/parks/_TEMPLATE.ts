/*
 * ─────────────────────────────────────────────────────────────────────────
 *  HOW TO ADD A PARK
 * ─────────────────────────────────────────────────────────────────────────
 *  1. Copy this file to src/data/parks/<your-slug>.ts
 *  2. Fill in the Park object below (rename the export).
 *  3. Add it to the PARKS array in src/data/index.ts:
 *
 *         import { yourPark } from './parks/your-slug';
 *         export const PARKS = [yellowstone, glacier, yourPark];
 *
 *  That's it. Routing, the landing page, search/autocomplete, the deck toggle,
 *  cards, the detail sheet, and the quiz all work automatically — no component
 *  edits anywhere.
 *
 *  Rules of thumb:
 *   • Subject `id`s must be unique WITHIN this park (kebab-case).
 *   • Each QuizQuestion.subjectId must match a Subject.id in the SAME deck.
 *   • `accent` is any CSS color — hex is preferred so the park is portable.
 *   • The FIRST deck is the default tab shown on load.
 *   • A deck needs at least one subject; quiz questions are optional but the
 *     "Trivia Challenge" round only has content for decks that supply some.
 *   • Any user-facing text field accepts either a bare string (English-only)
 *     or `{ en, es }` to translate it, e.g. name: { en: 'Bison', es: 'Bisonte' }.
 *     Leaving it a plain string is fine — it just stays English until translated.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { Park } from '../types';

export const templatePark: Park = {
  slug: 'template-park', // URL becomes /template-park
  name: 'Template Park',
  region: 'State · Region', // optional eyebrow detail
  tagline: 'One-line hero lede that sets the scene for this park.',
  safetyNote: 'Optional footer line — a friendly safety / sourcing note.',
  decks: [
    {
      id: 'places', // "places" | "animals" | "plants" | "geology" | ...
      label: 'Places', // shown on the deck toggle
      dotColor: '#3F8FD0', // toggle dot color
      subjects: [
        {
          id: 'example-subject',
          name: 'Example Subject',
          region: 'Sub-area / habitat (card eyebrow)',
          coord: 'Coordinate or quick-stat line',
          accent: '#3F8FD0',
          colorName: 'Chip label',
          teaser: 'One-line card summary in field-guide voice.',
          facts: [
            { tag: 'Wow', text: 'A 1–2 sentence fact.' },
            { tag: 'Tip', text: 'Another fact — add as many as you like.' },
          ],
        },
      ],
      quiz: [
        {
          subjectId: 'example-subject', // must match a Subject.id above
          q: 'A question about the subject?',
          opts: ['Wrong', 'Right', 'Also wrong'], // 2–4 options
          a: 1, // index of the correct option
          why: 'Explanation revealed after answering.',
        },
      ],
    },
    // Add more decks here — "Animals", "Plants", "Geology", anything.
  ],
};
