import type { Subject } from '../data/types';
import styles from './SubjectCard.module.css';

interface Props {
  subject: Subject;
  index: number;
  onOpen: (id: string) => void;
}

export default function SubjectCard({ subject, index, onOpen }: Props) {
  return (
    <button
      className={styles.card}
      style={{ '--accent': subject.accent, animationDelay: `${index * 45}ms` } as React.CSSProperties}
      onClick={() => onOpen(subject.id)}
      aria-label={`Open ${subject.name}`}
    >
      <div className={styles.eyebrow}>
        <span className={styles.pin}>◆</span>
        {subject.region}
      </div>
      <div className={styles.name}>{subject.name}</div>
      <div className={styles.teaser}>{subject.teaser}</div>
      <div className={styles.foot}>
        <span className={styles.chip}>
          <span className={styles.sw} />
          {subject.colorName}
        </span>
        <span>{subject.facts.length} facts</span>
        <span className={styles.go}>Open →</span>
      </div>
    </button>
  );
}
