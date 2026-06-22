import type { Park } from '../types';

/**
 * A deliberately tiny park (one deck, two subjects, two questions) that exists
 * to prove the "add a park = one data file + one registry line" pipeline.
 * Everything — routing, landing page, search, cards, detail sheet, deck toggle,
 * and quiz — works for it with zero component edits.
 */
export const saguaro: Park = {
  slug: 'saguaro',
  name: 'Saguaro',
  region: 'Arizona · Sonoran Desert',
  tagline: 'The cactus park outside Tucson — a forest of giants that takes a human lifetime to grow an arm.',
  safetyNote: 'A trailside reference, not a park guide — carry water, mind the heat, and never touch a cactus.',
  decks: [
    {
      id: 'plants',
      label: 'Plants',
      dotColor: '#4FA36B',
      subjects: [
        {
          id: 'saguaro-cactus', name: 'Saguaro Cactus', region: 'The signature giant',
          coord: 'To 40+ ft · lives 150–200 yrs', accent: '#4FA36B', colorName: 'Giant',
          teaser: "The towering cactus that gives the park its name — and grows astonishingly slowly.",
          facts: [
            { tag: 'Scale', text: 'A mature saguaro can top 40 feet and weigh several tons when full of water.' },
            { tag: 'Slow', text: "It may take 50–75 years to grow its first arm, and lives 150–200 years." },
            { tag: 'Wildlife', text: 'Gila woodpeckers carve nest holes in its trunk; the cactus heals them into hard "saguaro boots."' },
          ],
        },
        {
          id: 'ocotillo', name: 'Ocotillo', region: 'The whip-like bloomer',
          coord: 'To 20 ft · red spring blooms', accent: '#C9523F', colorName: 'Bloomer',
          teaser: "Bare grey canes most of the year that erupt in green leaves and crimson flowers after rain.",
          facts: [
            { tag: 'Adaptation', text: 'It grows leaves within days of rain, then drops them when it dries out — sometimes several times a year.' },
            { tag: 'Bloom', text: 'Tipped with bright red flowers in spring that hummingbirds and carpenter bees love.' },
          ],
        },
      ],
      quiz: [
        { subjectId: 'saguaro-cactus', q: 'How long can a saguaro take to grow its first arm?', opts: ['About 5 years', '50–75 years', 'It never grows arms'], a: 1, why: 'Saguaros grow extremely slowly — the first arm often appears only after 50–75 years.' },
        { subjectId: 'ocotillo', q: 'What does an ocotillo do after it rains?', opts: ['Drops all its canes', 'Quickly grows green leaves', 'Turns blue'], a: 1, why: 'Ocotillos leaf out within days of rain and shed the leaves again as the soil dries.' },
      ],
    },
  ],
};
