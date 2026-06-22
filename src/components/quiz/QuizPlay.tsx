import type { PreparedQuestion } from './types';
import styles from './Quiz.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

interface Props {
  item: PreparedQuestion;
  total: number;
  idx: number;
  score: number;
  locked: boolean;
  selected: number | null;
  onAnswer: (i: number) => void;
  onNext: () => void;
}

export default function QuizPlay({ item, total, idx, score, locked, selected, onAnswer, onNext }: Props) {
  const isLast = idx + 1 === total;
  const correct = selected !== null && selected === item.a;

  return (
    <>
      <div className={styles.prog}>
        {Array.from({ length: total }, (_, i) => (
          <i key={i} className={i < idx ? styles.done : i === idx ? styles.cur : ''} />
        ))}
      </div>
      <div className={styles.qmeta}>
        <span>
          Question {idx + 1} / {total}
        </span>
        <span className={styles.scorepill}>
          Score <b>{score}</b>
        </span>
      </div>
      <div className={styles.qtext}>{item.q}</div>
      <div className={styles.opts}>
        {item.opts.map((o, i) => {
          let cls = styles.opt;
          if (locked) {
            if (i === item.a) cls += ` ${styles.correct}`;
            else if (i === selected) cls += ` ${styles.wrong}`;
            else cls += ` ${styles.dim}`;
          }
          return (
            <button key={i} className={cls} disabled={locked} onClick={() => onAnswer(i)}>
              <span className={styles.k}>{LETTERS[i]}</span>
              <span>{o.t}</span>
            </button>
          );
        })}
      </div>
      {locked && (
        <div className={`${styles.explain} ${correct ? styles.ok : styles.no}`}>
          <b>{correct ? 'Correct' : 'Not quite'}</b>
          {item.why}
        </div>
      )}
      <div className={styles.qfoot}>
        <button className={styles.qbtn} disabled={!locked} onClick={onNext}>
          {isLast ? 'See results' : 'Next question'} →
        </button>
      </div>
    </>
  );
}
