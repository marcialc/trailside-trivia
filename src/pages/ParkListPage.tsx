import { Link, Navigate } from 'react-router-dom';
import { PARKS } from '../data';
import styles from './ParkListPage.module.css';

export default function ParkListPage() {
  // With a single park, skip the landing page entirely.
  if (PARKS.length === 1) return <Navigate to={`/${PARKS[0].slug}`} replace />;

  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <div className={styles.eyebrow}>Trailside Trivia · field guide</div>
        <h1 className={styles.title}>National Parks</h1>
        <p className={styles.lede}>
          Pocket field guides to the parks — the stories, numbers, and oddities behind what you're looking at, plus a
          trivia challenge for each.
        </p>
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
              <div className={styles.name}>{park.name}</div>
              {park.region && <div className={styles.region}>{park.region}</div>}
              <div className={styles.teaser}>{park.tagline}</div>
              <div className={styles.foot}>
                <span>
                  {park.decks.length} {park.decks.length === 1 ? 'deck' : 'decks'}
                </span>
                <span>{subjectCount} subjects</span>
                <span className={styles.go}>Open →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
