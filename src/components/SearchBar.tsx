import { useEffect, useRef, useState } from 'react';
import type { SearchMatch } from '../hooks/useSubjectSearch';
import { highlight } from '../lib/highlight';
import { useT } from '../i18n/t';
import { useUI } from '../i18n/strings';
import styles from './SearchBar.module.css';

interface Props {
  query: string;
  placeholder: string;
  matches: SearchMatch[];
  onChange: (value: string) => void;
  onSelect: (subjectId: string, term: string) => void;
}

export default function SearchBar({ query, placeholder, matches, onChange, onSelect }: Props) {
  const tt = useT();
  const ui = useUI();
  const [open, setOpen] = useState(false);
  const [acIndex, setAcIndex] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showAc = open && matches.length > 0;

  // reset highlighted row whenever the result set changes
  useEffect(() => {
    setAcIndex(-1);
  }, [matches]);

  // close the dropdown on any outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function choose(subjectId: string) {
    setOpen(false);
    onSelect(subjectId, query.trim());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!showAc) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAcIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setAcIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const pick = acIndex >= 0 ? matches[acIndex] : matches[0];
      if (pick) choose(pick.subject.id);
    }
  }

  return (
    <div className={styles.searchdock}>
      <div className={styles.searchbox} ref={boxRef}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          id="q"
          className={styles.input}
          type="text"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label={ui.searchAria}
          aria-expanded={showAc}
          aria-controls="ac"
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            className={styles.clearbtn}
            aria-label={ui.clearSearch}
            onClick={() => {
              onChange('');
              setOpen(false);
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
        <div className={`${styles.ac} ${showAc ? styles.acOpen : ''}`} id="ac" role="listbox">
          {matches.map((m, i) => (
            <div
              key={m.subject.id}
              className={`${styles.acItem} ${i === acIndex ? styles.acActive : ''}`}
              role="option"
              aria-selected={i === acIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(m.subject.id);
              }}
            >
              <span className={styles.acDot} style={{ background: m.subject.accent }} />
              <div className={styles.acText}>
                <div className={styles.acName}>{tt(m.subject.name)}</div>
                <div className={styles.acWhy}>
                  {highlight(m.why, query, (chunk, key) => (
                    <b key={key}>{chunk}</b>
                  ))}
                </div>
              </div>
              <span className={styles.acArrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
