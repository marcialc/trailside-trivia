import { useEffect, useMemo, useRef, useState } from 'react';
import { PARKS } from '../data';
import { NATIONAL_PARKS, type NationalPark } from '../data/nationalParks';
import { highlight } from '../lib/highlight';
import { TURNSTILE_SITE_KEY, loadTurnstile, type TurnstileApi } from '../lib/turnstile';
import { useUI } from '../i18n/strings';
import styles from './RequestParkOverlay.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RequestParkOverlay({ open, onClose }: Props) {
  const ui = useUI();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<NationalPark | null>(null);
  const [notes, setNotes] = useState('');
  const [acOpen, setAcOpen] = useState(false);
  const [acIndex, setAcIndex] = useState(-1);

  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const widgetHost = useRef<HTMLDivElement>(null);
  const turnstile = useRef<TurnstileApi | null>(null);
  const widgetId = useRef<string | null>(null);

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
  const canSubmit = !!selected && !!token && status !== 'submitting';

  // Fresh form each time it opens; keep last content during the slide-out.
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(null);
      setNotes('');
      setAcOpen(false);
      setAcIndex(-1);
      setStatus('idle');
      setErrorMsg('');
      setToken('');
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

  // Render the Turnstile widget while open; tear it down on close.
  useEffect(() => {
    const siteKey = TURNSTILE_SITE_KEY;
    if (!open || !siteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !widgetHost.current) return;
        turnstile.current = api;
        widgetId.current = api.render(widgetHost.current, {
          sitekey: siteKey,
          callback: (t) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => {
        if (!cancelled) setErrorMsg(ui.requestParkError);
      });
    return () => {
      cancelled = true;
      if (turnstile.current && widgetId.current) {
        turnstile.current.remove(widgetId.current);
      }
      widgetId.current = null;
    };
  }, [open, ui.requestParkError]);

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !token) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/park-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: selected.slug, notes, turnstileToken: token }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
      if (res.ok) {
        setStatus('success');
        return;
      }
      // Map the few user-actionable cases; everything else is generic.
      if (data.code === 'exists') setErrorMsg(ui.requestParkErrorExists);
      else if (data.code === 'requested') setErrorMsg(ui.requestParkErrorRequested);
      else setErrorMsg(ui.requestParkError);
      setStatus('error');
      // Let them retry: a Turnstile token is single-use.
      if (turnstile.current && widgetId.current) turnstile.current.reset(widgetId.current);
      setToken('');
    } catch {
      setErrorMsg(ui.requestParkError);
      setStatus('error');
      if (turnstile.current && widgetId.current) turnstile.current.reset(widgetId.current);
      setToken('');
    }
  }

  const notConfigured = !TURNSTILE_SITE_KEY;

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

        <div className={styles.body}>
          {status === 'success' ? (
            <div className={styles.success}>
              <div className={styles.successMark} aria-hidden="true">
                ✓
              </div>
              <p className={styles.successText}>{ui.requestParkSuccess}</p>
              <button className={styles.submit} type="button" onClick={onClose}>
                {ui.requestParkDone}
              </button>
            </div>
          ) : available.length === 0 ? (
            <p className={styles.allAdded}>{ui.requestParkAllAdded}</p>
          ) : notConfigured ? (
            <p className={styles.allAdded}>{ui.requestParkUnavailable}</p>
          ) : (
            <form onSubmit={onSubmit}>
              <label className={styles.label} htmlFor="requestParkSearch">
                {ui.requestParkSelectLabel}
              </label>
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

              <label className={styles.label} htmlFor="requestParkNotes">
                {ui.requestParkNotesLabel}
              </label>
              <textarea
                id="requestParkNotes"
                className={styles.notes}
                value={notes}
                placeholder={ui.requestParkNotesPlaceholder}
                rows={3}
                maxLength={2000}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className={styles.turnstile} ref={widgetHost} />

              {status === 'error' && errorMsg && (
                <p className={styles.errorText} role="alert">
                  {errorMsg}
                </p>
              )}

              <button className={styles.submit} type="submit" disabled={!canSubmit}>
                {status === 'submitting' ? ui.requestParkSubmitting : ui.requestParkSubmit}
              </button>
            </form>
          )}
        </div>
      </aside>
    </>
  );
}
