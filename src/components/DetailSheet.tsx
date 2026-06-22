import { useEffect, useRef, useState } from 'react';
import type { Subject } from '../data/types';
import { highlight } from '../lib/highlight';
import styles from './DetailSheet.module.css';

interface Props {
  subject: Subject | null;
  term?: string;
  onClose: () => void;
}

export default function DetailSheet({ subject, term, onClose }: Props) {
  const isOpen = subject !== null;
  // keep the last subject mounted so the slide-out animation still has content
  const [shown, setShown] = useState<Subject | null>(subject);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (subject) setShown(subject);
  }, [subject]);

  // focus management + body scroll lock
  useEffect(() => {
    if (isOpen) {
      lastFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    }
  }, [isOpen]);

  // Escape closes the sheet
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div className={`${styles.scrim} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <aside
        className={`${styles.sheet} ${isOpen ? styles.open : ''}`}
        style={{ '--accent': shown?.accent } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheetTitle"
        aria-hidden={!isOpen}
      >
        <div className={styles.band} />
        <div className={styles.head}>
          <div className={styles.grab} />
          <button ref={closeRef} className={styles.closebtn} aria-label="Close" onClick={onClose}>
            ×
          </button>
          <div className={styles.eyebrow}>
            {shown ? `${shown.region}  ·  ${shown.coord}` : ''}
          </div>
          <h2 className={styles.title} id="sheetTitle">
            {shown?.name}
          </h2>
          <p className={styles.sub}>{shown?.teaser}</p>
        </div>
        <div className={styles.facts}>
          {shown?.facts.map((f, i) => (
            <div className={styles.fact} key={i}>
              <div className={styles.factNum}>{String(i + 1).padStart(2, '0')}</div>
              <div className={styles.factBody}>
                <span className={`${styles.tag} ${styles.soft}`}>{f.tag}</span>
                <div className={styles.factText}>
                  {highlight(f.text, term, (chunk, key) => (
                    <mark key={key}>{chunk}</mark>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
