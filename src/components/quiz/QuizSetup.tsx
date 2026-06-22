import type { Deck } from '../../data/types';
import styles from './Quiz.module.css';

interface Props {
  decks: Deck[];
  deckId: string;
  scope: string; // 'all' | subjectId
  onSelectDeck: (deckId: string) => void;
  onSelectScope: (scope: string) => void;
  onStart: () => void;
}

// generic display cleanup so chips read "Elk" not "Elk (Wapiti)" — not tied to
// any specific park or id.
function shortName(name: string): string {
  return name.replace(/^The\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '');
}

export default function QuizSetup({ decks, deckId, scope, onSelectDeck, onSelectScope, onStart }: Props) {
  const deck = decks.find((d) => d.id === deckId) ?? decks[0];
  const subjects = deck.subjects;
  const everyCount = Math.min(10, deck.quiz.length);
  const allDot =
    subjects.length > 1
      ? `linear-gradient(90deg, ${subjects[0].accent}, ${subjects[subjects.length - 1].accent})`
      : subjects[0]?.accent ?? deck.dotColor;

  return (
    <>
      <div className={styles.setup}>
        <h2>Test what you know.</h2>
        <p className={styles.lede2}>
          Pick a deck, then a round. Instant answers and a short explanation after every question so it actually
          sticks.
        </p>

        {decks.length > 1 && (
          <div className={styles.gametabs}>
            {decks.map((d) => (
              <button
                key={d.id}
                className={`${styles.gtab} ${d.id === deckId ? styles.on : ''}`}
                onClick={() => onSelectDeck(d.id)}
              >
                <span className={styles.gd} style={{ background: d.dotColor }} />
                {d.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.scopelbl}>Choose your round</div>
        <div className={styles.scopes}>
          <button
            className={`${styles.scope} ${scope === 'all' ? styles.sel : ''}`}
            onClick={() => onSelectScope('all')}
          >
            <span className={styles.d} style={{ background: allDot }} />
            Everything · {everyCount} Q
          </button>
          {subjects
            .filter((s) => deck.quiz.some((q) => q.subjectId === s.id))
            .map((s) => (
              <button
                key={s.id}
                className={`${styles.scope} ${scope === s.id ? styles.sel : ''}`}
                onClick={() => onSelectScope(s.id)}
              >
                <span className={styles.d} style={{ background: s.accent }} />
                {shortName(s.name)}
              </button>
            ))}
        </div>
      </div>
      <div className={styles.qfoot}>
        <button className={styles.qbtn} onClick={onStart}>
          Start round →
        </button>
      </div>
    </>
  );
}
