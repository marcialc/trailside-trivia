import type { Subject } from '../data/types';
import { useT } from '../i18n/t';
import { useUI } from '../i18n/strings';
import styles from './SubjectCard.module.css';

interface Props {
  subject: Subject;
  index: number;
  onOpen: (id: string) => void;
}

export default function SubjectCard({ subject, index, onOpen }: Props) {
  const tt = useT();
  const ui = useUI();
  return (
    <button
      className={styles.card}
      style={{ '--accent': subject.accent, animationDelay: `${index * 45}ms` } as React.CSSProperties}
      onClick={() => onOpen(subject.id)}
      aria-label={ui.openSubjectAria(tt(subject.name))}
    >
      <div className={styles.eyebrow}>
        <span className={styles.pin}>◆</span>
        {tt(subject.region)}
      </div>
      <div className={styles.name}>{tt(subject.name)}</div>
      <div className={styles.teaser}>{tt(subject.teaser)}</div>
      <div className={styles.foot}>
        <span className={styles.chip}>
          <span className={styles.sw} />
          {tt(subject.colorName)}
        </span>
        <span>{ui.factCount(subject.facts.length)}</span>
        <span className={styles.go}>{ui.open}</span>
      </div>
    </button>
  );
}
