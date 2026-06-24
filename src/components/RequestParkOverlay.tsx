import { useEffect, useMemo, useRef, useState } from 'react';
import { PARKS } from '../data';
import { NATIONAL_PARKS, type NationalPark } from '../data/nationalParks';
import { highlight } from '../lib/highlight';
import { useUI } from '../i18n/strings';
import styles from './RequestParkOverlay.module.css';

// The GitHub repo whose prefilled issue form we deep-link into. The add-park
// pipeline (.github/workflows/add-park.yml) runs once a maintainer applies the
// `park-request` label to the resulting issue.
const REPO = 'marcialc/trailside-trivia';

interface Props {
  open: boolean;
  onClose: () => void;
}

function buildIssueUrl(park: NationalPark, notes: string): string {
  const fullName = `${park.name} National Park`;
  const params = new URLSearchParams({
    template: 'park-request.yml',
    title: `Park request: ${fullName}`,
    park_name: fullName,
    region: park.state,
  });
  const trimmed = notes.trim();
  if (trimmed) params.set('notes', trimmed);
  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}

export default function RequestParkOverlay({ open, onClose }: Props) {
  const ui = useUI();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<NationalPark | null>(null);
  const [notes, setNotes] = useState('');
  const [acOpen, setAcOpen] = useState(false);
  const [acIndex, setAcIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Parks not yet covered by the app, by slug. Recomputed only if PARKS changes.
  const available = useMemo(() => {
    const have = new Set(PARKS.map((p) => p.slug));
    return NATIONAL_PARKS.filter((p) => !have.has(p.slug));
  }, []);

  // Case-insensitive substring match on name + state, mirroring useSubjectSearch.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter(
      (p) => p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q),
    );
  }, [available, query]);

  const showAc = acOpen && matches.length > 0;

  // Fresh form each time it opens; keep last content during the slide-out.
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(null);
      setNotes('');
      setAcOpen(false);
      setAcIndex(-1);
    }
  }, [open]);

  // Focus management + body scroll lock.
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    }
  }, [open]);

  // Escape closes the overlay (or just the dropdown if it's open).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (acOpen) setAcOpen(false);
      else onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, acOpen, onClose]);

  // Close the dropdown on any outside click.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setAcOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Reset the highlighted row whenever the result set changes.
  useEffect(() => {
    setAcIndex(-1);
  }, [matches]);

  function choose(park: NationalPark) {
    setSelected(park);
    setQuery(park.name);
    setAcOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
      if (pick) choose(pick);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    window.open(buildIssueUrl(selected, notes), '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.open : ''}`} onClick={onClose} />
      <aside
        className={`${styles.sheet} ${open ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="requestParkTitle"
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <div className={styles.grab} />
          <button className={styles.closebtn} aria-label={ui.requestParkClose} onClick={onClose}>
            ×
          </button>
          <h2 className={styles.title} id="requestParkTitle">
            {ui.requestParkTitle}
          </h2>
          <p className={styles.sub}>{ui.requestParkLede}</p>
        </div>

        <form className={styles.body} onSubmit={onSubmit}>
          <label className={styles.label} htmlFor="requestParkSearch">
            {ui.requestParkSelectLabel}
          </label>

          {available.length === 0 ? (
            <p className={styles.allAdded}>{ui.requestParkAllAdded}</p>
          ) : (
            <div className={styles.searchbox} ref={boxRef}>
              <input
                ref={inputRef}
                id="requestParkSearch"
                className={styles.input}
                type="text"
                value={query}
                placeholder={ui.requestParkSelectPlaceholder}
                autoComplete="off"
                spellCheck={false}
                aria-label={ui.requestParkSelectAria}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showAc}
                aria-controls="requestParkAc"
                aria-activedescendant={showAc && acIndex >= 0 ? `rp-opt-${acIndex}` : undefined}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(null);
                  setAcOpen(true);
                }}
                onFocus={() => setAcOpen(true)}
                onKeyDown={onKeyDown}
              />
              <div
                className={`${styles.ac} ${showAc ? styles.acOpen : ''}`}
                id="requestParkAc"
                role="listbox"
              >
                {matches.map((p, i) => (
                  <div
                    key={p.slug}
                    id={`rp-opt-${i}`}
                    className={`${styles.acItem} ${i === acIndex ? styles.acActive : ''}`}
                    role="option"
                    aria-selected={i === acIndex}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(p);
                    }}
                  >
                    <div className={styles.acText}>
                      <div className={styles.acName}>
                        {highlight(p.name, query, (chunk, key) => (
                          <b key={key}>{chunk}</b>
                        ))}
                      </div>
                      <div className={styles.acState}>{p.state}</div>
                    </div>
                    <span className={styles.acArrow}>→</span>
                  </div>
                ))}
              </div>
              {acOpen && query.trim() && matches.length === 0 && (
                <p className={styles.noMatches}>{ui.requestParkNoMatches}</p>
              )}
            </div>
          )}

          {available.length > 0 && (
            <>
              <label className={styles.label} htmlFor="requestParkNotes">
                {ui.requestParkNotesLabel}
              </label>
              <textarea
                id="requestParkNotes"
                className={styles.notes}
                value={notes}
                placeholder={ui.requestParkNotesPlaceholder}
                rows={3}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button className={styles.submit} type="submit" disabled={!selected}>
                {ui.requestParkSubmit}
              </button>
            </>
          )}
        </form>
      </aside>
    </>
  );
}
