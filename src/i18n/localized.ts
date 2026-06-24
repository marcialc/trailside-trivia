import type { Locale } from './locale';

// React-free home for the localized-string primitive. Kept separate from t.ts
// (which pulls in the React LocaleContext) so non-UI consumers — the data layer
// and the Worker — can depend on the type without dragging React into their
// build/typecheck graph.

/**
 * A user-facing content string that may be translated.
 *
 * A bare `string` is English-only (the field hasn't been translated yet); an
 * object opts the field into translation. `es` is optional so a translator can
 * fill languages in incrementally — anything missing falls back to English.
 *
 * Example:
 *   name: 'Bison'                              // English-only placeholder
 *   name: { en: 'Bison', es: 'Bisonte' }       // translated
 */
export type LocalizedString = string | { en: string; es?: string };

/** Resolve a localized value for the active locale, falling back to English. */
export function t(value: LocalizedString, locale: Locale): string {
  if (typeof value === 'string') return value;
  if (locale === 'es' && value.es) return value.es;
  return value.en;
}
