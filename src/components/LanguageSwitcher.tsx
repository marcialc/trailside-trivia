import { LOCALES, LOCALE_LABELS } from '../i18n/locale';
import { useLocale } from '../i18n/LocaleContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          className={`${styles.opt} ${l === locale ? styles.on : ''}`}
          aria-pressed={l === locale}
          onClick={() => setLocale(l)}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
