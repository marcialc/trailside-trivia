import type { Deck } from '../../data/types';
import { useT } from '../../i18n/t';
import { useUI } from '../../i18n/strings';
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
  const tt = useT();
  const ui = useUI();
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
        <h2>{ui.setupTitle}</h2>
        <p className={styles.lede2}>{ui.setupLede}</p>

        {decks.length > 1 && (
          <div className={styles.gametabs}>
            {decks.map((d) => (
              <button
                key={d.id}
                className={`${styles.gtab} ${d.id === deckId ? styles.on : ''}`}
                onClick={() => onSelectDeck(d.id)}
              >
                <span className={styles.gd} style={{ background: d.dotColor }} />
                {tt(d.label)}
              </button>
            ))}
          </div>
        )}

        <div className={styles.scopelbl}>{ui.chooseRound}</div>
        <div className={styles.scopes}>
          <button
            className={`${styles.scope} ${scope === 'all' ? styles.sel : ''}`}
            onClick={() => onSelectScope('all')}
          >
            <span className={styles.d} style={{ background: allDot }} />
            {ui.everything(everyCount)}
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
                {shortName(tt(s.name))}
              </button>
            ))}
        </div>
      </div>
      <div className={styles.qfoot}>
        <button className={styles.qbtn} onClick={onStart}>
          {ui.startRound}
        </button>
      </div>
    </>
  );
}
