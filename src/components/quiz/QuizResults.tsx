import type { BestEntry } from '../../lib/highScores';
import { rankFor } from '../../lib/ranks';
import { useUI } from '../../i18n/strings';
import styles from './Quiz.module.css';

interface Props {
  score: number;
  total: number;
  best: BestEntry | null;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onBackToMap: () => void;
}

export default function QuizResults({ score, total, best, isNewBest, onPlayAgain, onBackToMap }: Props) {
  const ui = useUI();
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const rank = ui.ranks[rankFor(pct)];

  return (
    <div className={styles.results}>
      <div className={styles.bigscore}>
        {score}
        <small> / {total}</small>
      </div>
      <div className={styles.rank}>{rank.title}</div>
      <p className={styles.rsub}>{rank.message}</p>
      {isNewBest ? (
        <p className={styles.best}>{ui.newBest}</p>
      ) : (
        best && <p className={styles.best}>{ui.yourBest(best.score, best.total)}</p>
      )}
      <div className={styles.qfoot}>
        <button className={styles.qbtn} onClick={onPlayAgain}>
          {ui.playAgain}
        </button>
        <button className={`${styles.qbtn} ${styles.ghost}`} onClick={onBackToMap}>
          {ui.backToMap}
        </button>
      </div>
    </div>
  );
}
