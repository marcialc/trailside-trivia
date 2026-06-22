import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PARKS } from '../data';
import { useT } from '../i18n/t';
import { useUI } from '../i18n/strings';
import LanguageSwitcher from '../components/LanguageSwitcher';
import styles from './ParkListPage.module.css';

export default function ParkListPage() {
  const tt = useT();
  const ui = useUI();

  useEffect(() => {
    document.title = ui.listDocTitle;
  }, [ui]);

  // With a single park, skip the landing page entirely.
  if (PARKS.length === 1) return <Navigate to={`/${PARKS[0].slug}`} replace />;

  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <LanguageSwitcher />
        <div className={styles.eyebrow}>{ui.listEyebrow}</div>
        <h1 className={styles.title}>{ui.listTitle}</h1>
        <p className={styles.lede}>{ui.listLede}</p>
      </header>

      <div className={styles.grid}>
        {PARKS.map((park) => {
          const band = park.decks.flatMap((d) => d.subjects).slice(0, 5).map((s) => s.accent);
          const subjectCount = park.decks.reduce((n, d) => n + d.subjects.length, 0);
          return (
            <Link key={park.slug} to={`/${park.slug}`} className={styles.card}>
              <span className={styles.band}>
                {band.map((c, i) => (
                  <i key={i} style={{ background: c }} />
                ))}
              </span>
              <div className={styles.name}>{tt(park.name)}</div>
              {park.region && <div className={styles.region}>{tt(park.region)}</div>}
              <div className={styles.teaser}>{tt(park.tagline)}</div>
              <div className={styles.foot}>
                <span>{ui.deckCount(park.decks.length)}</span>
                <span>{ui.subjectCount(subjectCount)}</span>
                <span className={styles.go}>{ui.open}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
