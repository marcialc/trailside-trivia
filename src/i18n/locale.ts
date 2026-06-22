// The set of supported UI languages. English is the source of truth and the
// fallback for any string a translator hasn't provided yet.
export type Locale = 'en' | 'es';

export const LOCALES: Locale[] = ['en', 'es'];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
};
