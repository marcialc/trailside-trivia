import type { Park } from '../types';

/**
 * A deliberately tiny park (one deck, two subjects, two questions) that exists
 * to prove the "add a park = one data file + one registry line" pipeline.
 * Everything — routing, landing page, search, cards, detail sheet, deck toggle,
 * and quiz — works for it with zero component edits.
 */
export const saguaro: Park = {
  slug: 'saguaro',
  name: { en: 'Saguaro', es: 'Saguaro' },
  region: { en: 'Arizona · Sonoran Desert', es: 'Arizona · Desierto de Sonora' },
  tagline: { en: 'The cactus park outside Tucson — a forest of giants that takes a human lifetime to grow an arm.', es: 'El parque de cactos a las afueras de Tucson: un bosque de gigantes que tarda toda una vida humana en formar un brazo.' },
  safetyNote: { en: 'A trailside reference, not a park guide — carry water, mind the heat, and never touch a cactus.', es: 'Una referencia de sendero, no una guía del parque: lleva agua, cuídate del calor y nunca toques un cacto.' },
  decks: [
    {
      id: 'plants',
      label: { en: 'Plants', es: 'Plantas' },
      dotColor: '#4FA36B',
      subjects: [
        {
          id: 'saguaro-cactus', name: { en: 'Saguaro Cactus', es: 'Cacto saguaro' }, region: { en: 'The signature giant', es: 'El gigante emblemático' },
          coord: { en: 'To 40+ ft · lives 150–200 yrs', es: 'Hasta 12+ m (40+ ft) · vive 150–200 años' }, accent: '#4FA36B', colorName: { en: 'Giant', es: 'Gigante' },
          teaser: { en: "The towering cactus that gives the park its name — and grows astonishingly slowly.", es: "El cacto imponente que da nombre al parque, y que crece asombrosamente despacio." },
          facts: [
            { tag: { en: 'Scale', es: 'Tamaño' }, text: { en: 'A mature saguaro can top 40 feet and weigh several tons when full of water.', es: 'Un saguaro maduro puede superar los 12 m (40 ft) y pesar varias toneladas cuando está lleno de agua.' } },
            { tag: { en: 'Slow', es: 'Lento' }, text: { en: "It may take 50–75 years to grow its first arm, and lives 150–200 years.", es: "Puede tardar 50–75 años en formar su primer brazo, y vive 150–200 años." } },
            { tag: { en: 'Wildlife', es: 'Fauna' }, text: { en: 'Gila woodpeckers carve nest holes in its trunk; the cactus heals them into hard "saguaro boots."', es: 'Los carpinteros de Gila labran nidos en su tronco; el cacto los cicatriza en duras "botas de saguaro".' } },
          ],
        },
        {
          id: 'ocotillo', name: { en: 'Ocotillo', es: 'Ocotillo' }, region: { en: 'The whip-like bloomer', es: 'El que florece como látigos' },
          coord: { en: 'To 20 ft · red spring blooms', es: 'Hasta 6 m (20 ft) · floración roja en primavera' }, accent: '#C9523F', colorName: { en: 'Bloomer', es: 'Florecedor' },
          teaser: { en: "Bare grey canes most of the year that erupt in green leaves and crimson flowers after rain.", es: "Tallos grises y desnudos casi todo el año que estallan en hojas verdes y flores carmesí tras la lluvia." },
          facts: [
            { tag: { en: 'Adaptation', es: 'Adaptación' }, text: { en: 'It grows leaves within days of rain, then drops them when it dries out — sometimes several times a year.', es: 'Echa hojas a los pocos días de la lluvia y las suelta cuando se seca, a veces varias veces al año.' } },
            { tag: { en: 'Bloom', es: 'Floración' }, text: { en: 'Tipped with bright red flowers in spring that hummingbirds and carpenter bees love.', es: 'Sus puntas lucen flores rojo intenso en primavera que encantan a los colibríes y a las abejas carpinteras.' } },
          ],
        },
      ],
      quiz: [
        { subjectId: 'saguaro-cactus', q: { en: 'How long can a saguaro take to grow its first arm?', es: '¿Cuánto puede tardar un saguaro en formar su primer brazo?' }, opts: [{ en: 'About 5 years', es: 'Unos 5 años' }, { en: '50–75 years', es: '50–75 años' }, { en: 'It never grows arms', es: 'Nunca le salen brazos' }], a: 1, why: { en: 'Saguaros grow extremely slowly — the first arm often appears only after 50–75 years.', es: 'Los saguaros crecen muy despacio: el primer brazo suele aparecer recién después de 50–75 años.' } },
        { subjectId: 'ocotillo', q: { en: 'What does an ocotillo do after it rains?', es: '¿Qué hace un ocotillo después de que llueve?' }, opts: [{ en: 'Drops all its canes', es: 'Suelta todos sus tallos' }, { en: 'Quickly grows green leaves', es: 'Echa rápidamente hojas verdes' }, { en: 'Turns blue', es: 'Se vuelve azul' }], a: 1, why: { en: 'Ocotillos leaf out within days of rain and shed the leaves again as the soil dries.', es: 'Los ocotillos echan hojas a los pocos días de la lluvia y las vuelven a soltar cuando el suelo se seca.' } },
      ],
    },
  ],
};
