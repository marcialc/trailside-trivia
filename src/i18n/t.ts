import type { Locale } from './locale';
import { useLocale } from './LocaleContext';

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

/** Hook returning a resolver bound to the active locale: `tt(subject.name)`. */
export function useT(): (value: LocalizedString) => string {
  const { locale } = useLocale();
  return (value) => t(value, locale);
}
