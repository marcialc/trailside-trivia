import { useLocale } from './LocaleContext';
import { type LocalizedString, t } from './localized';

// LocalizedString and the pure resolver `t` live in ./localized (React-free).
// Re-exported here so existing UI imports from '../i18n/t' keep working.
export { type LocalizedString, t };

/** Hook returning a resolver bound to the active locale: `tt(subject.name)`. */
export function useT(): (value: LocalizedString) => string {
  const { locale } = useLocale();
  return (value) => t(value, locale);
}
