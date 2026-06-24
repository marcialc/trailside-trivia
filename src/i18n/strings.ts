import type { Locale } from './locale';
import { useLocale } from './LocaleContext';
import type { RankId } from '../lib/ranks';

// UI chrome strings — everything a user sees that does NOT come from park data.
// English is the source of truth; `ES` below is a Partial, so any key a
// translator hasn't filled in yet falls back to English automatically.
//
// Plain strings are constants; strings that interpolate counts/words are
// functions so each language controls its own word order, punctuation, and
// (regular) pluralization independently.

// The product name is a brand — intentionally not translated.
const BRAND = 'Trailside Trivia';

const EN = {
  brand: BRAND,

  // ParkListPage
  listEyebrow: `${BRAND} · field guide`,
  listTitle: 'National Parks',
  listLede:
    "Pocket field guides to the parks — the stories, numbers, and oddities behind what you're looking at, plus a trivia challenge for each.",
  deckCount: (n: number) => `${n} ${n === 1 ? 'deck' : 'decks'}`,
  subjectCount: (n: number) => `${n} subjects`,
  open: 'Open →',

  // ParkPage
  notFoundTitle: 'Off the map.',
  notFoundBody: "We don't have a field guide for that park yet.",
  backAllParks: '← Back to all parks',
  backToParks: '← National Parks',
  fieldGuide: 'Field guide',
  searchPlaceholder: (word: string) => `Search ${word} — name, fact, or number…`,
  startTriviaAria: 'Start the trivia challenge',
  triviaChallenge: 'Trivia Challenge',
  triviaSub: 'test yourself & learn the park',
  tapForFile: 'tap for the full file',
  nothingMatches: 'Nothing matches that out here.',
  tryHint: 'Try a place, an animal, or a number.',
  showAll: (word: string) => `Show all ${word}`,
  docTitle: (parkName: string) => `${parkName} — ${BRAND}`,
  listDocTitle: `${BRAND} — National Parks Field Guide`,

  // SearchBar
  searchAria: "Search this park's subjects and facts",
  clearSearch: 'Clear search',

  // SubjectCard
  openSubjectAria: (name: string) => `Open ${name}`,
  factCount: (n: number) => `${n} facts`,

  // DetailSheet
  close: 'Close',

  // useSubjectSearch
  inSummary: 'in summary',

  // QuizOverlay
  roundComplete: 'Round complete',
  quizAria: 'Trivia challenge',
  closeQuiz: 'Close quiz',

  // QuizSetup
  setupTitle: 'Test what you know.',
  setupLede:
    'Pick a deck, then a round. Instant answers and a short explanation after every question so it actually sticks.',
  chooseRound: 'Choose your round',
  everything: (n: number) => `Everything · ${n} Q`,
  startRound: 'Start round →',

  // QuizPlay
  questionOf: (n: number, total: number) => `Question ${n} / ${total}`,
  score: 'Score',
  correct: 'Correct',
  notQuite: 'Not quite',
  seeResults: 'See results',
  nextQuestion: 'Next question',

  // QuizResults
  playAgain: 'Play again',
  backToMap: 'Back to the map',
  newBest: '★ New personal best!',
  yourBest: (score: number, total: number) => `Your best: ${score} / ${total}`,
  ranks: {
    superintendent: { title: 'Park Superintendent', message: 'Flawless. You know this park cold.' },
    seniorNaturalist: { title: 'Senior Naturalist', message: 'Impressive — you could lead the walk.' },
    backcountryRanger: { title: 'Backcountry Ranger', message: 'Solid trail knowledge.' },
    juniorRanger: { title: 'Junior Ranger', message: 'A good start — keep exploring.' },
    firstDayTourist: {
      title: 'First-Day Tourist',
      message: 'Everyone starts somewhere. Tap a card and dive in.',
    },
  } satisfies Record<RankId, { title: string; message: string }>,
};

export type UIStrings = typeof EN;

// Spanish (neutral Latin American). Any key left out falls back to the English
// value above. Park content is translated separately in src/data/parks/*.ts.
const ES: Partial<UIStrings> = {
  // ParkListPage
  listEyebrow: `${BRAND} · guía de campo`,
  listTitle: 'Parques nacionales',
  listLede:
    'Guías de campo de bolsillo para los parques: las historias, los números y las curiosidades detrás de lo que estás viendo, además de un reto de trivia para cada uno.',
  deckCount: (n) => `${n} ${n === 1 ? 'mazo' : 'mazos'}`,
  subjectCount: (n) => `${n} ${n === 1 ? 'ficha' : 'fichas'}`,
  open: 'Abrir →',

  // ParkPage
  notFoundTitle: 'Fuera del mapa.',
  notFoundBody: 'Todavía no tenemos una guía de campo para ese parque.',
  backAllParks: '← Volver a todos los parques',
  backToParks: '← Parques nacionales',
  fieldGuide: 'Guía de campo',
  searchPlaceholder: (word) => `Buscar ${word}: nombre, dato o número…`,
  startTriviaAria: 'Comenzar el reto de trivia',
  triviaChallenge: 'Reto de trivia',
  triviaSub: 'ponte a prueba y conoce el parque',
  tapForFile: 'toca para ver la ficha completa',
  nothingMatches: 'No hay nada que coincida por aquí.',
  tryHint: 'Prueba con un lugar, un animal o un número.',
  showAll: (word) => `Mostrar todo: ${word}`,
  docTitle: (parkName) => `${parkName} — ${BRAND}`,
  listDocTitle: `${BRAND} — Guía de campo de parques nacionales`,

  // SearchBar
  searchAria: 'Buscar entre las fichas y los datos de este parque',
  clearSearch: 'Borrar búsqueda',

  // SubjectCard
  openSubjectAria: (name) => `Abrir ${name}`,
  factCount: (n) => `${n} ${n === 1 ? 'dato' : 'datos'}`,

  // DetailSheet
  close: 'Cerrar',

  // useSubjectSearch
  inSummary: 'en el resumen',

  // QuizOverlay
  roundComplete: 'Ronda completada',
  quizAria: 'Reto de trivia',
  closeQuiz: 'Cerrar la trivia',

  // QuizSetup
  setupTitle: 'Pon a prueba lo que sabes.',
  setupLede:
    'Elige un mazo y luego una ronda. Respuestas al instante y una breve explicación después de cada pregunta para que se te quede.',
  chooseRound: 'Elige tu ronda',
  everything: (n) => `Todo · ${n} P`,
  startRound: 'Comenzar ronda →',

  // QuizPlay
  questionOf: (n, total) => `Pregunta ${n} / ${total}`,
  score: 'Puntos',
  correct: 'Correcto',
  notQuite: 'Casi',
  seeResults: 'Ver resultados',
  nextQuestion: 'Siguiente pregunta',

  // QuizResults
  playAgain: 'Jugar de nuevo',
  backToMap: 'Volver al mapa',
  newBest: '★ ¡Nuevo récord personal!',
  yourBest: (score, total) => `Tu mejor marca: ${score} / ${total}`,
  ranks: {
    superintendent: {
      title: 'Superintendente del parque',
      message: '¡Impecable! Te sabes este parque al derecho y al revés.',
    },
    seniorNaturalist: { title: 'Naturalista experto', message: 'Impresionante: podrías guiar la caminata.' },
    backcountryRanger: { title: 'Guardabosques de montaña', message: 'Buen conocimiento del terreno.' },
    juniorRanger: { title: 'Guardabosques júnior', message: 'Buen comienzo: sigue explorando.' },
    firstDayTourist: {
      title: 'Turista primerizo',
      message: 'Todos empezamos en algún lado. Toca una ficha y sumérgete.',
    },
  },
};

const DICTS: Record<Locale, UIStrings> = {
  en: EN,
  es: { ...EN, ...ES },
};

/** Hook returning the UI string dictionary for the active locale. */
export function useUI(): UIStrings {
  const { locale } = useLocale();
  return DICTS[locale];
}
