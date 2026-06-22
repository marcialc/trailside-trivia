import { useEffect, useRef, useState } from 'react';
import type { Park } from '../../data/types';
import { shuffle } from '../../lib/shuffle';
import type { PreparedQuestion } from './types';
import QuizSetup from './QuizSetup';
import QuizPlay from './QuizPlay';
import QuizResults from './QuizResults';
import styles from './Quiz.module.css';

type Phase = 'setup' | 'play' | 'results';

interface Props {
  park: Park;
  open: boolean;
  onClose: () => void;
}

const FALLBACK_ACCENT = 'var(--c-oldfaithful)';

export default function QuizOverlay({ park, open, onClose }: Props) {
  const decks = park.decks;
  const [phase, setPhase] = useState<Phase>('setup');
  const [deckId, setDeckId] = useState(decks[0].id);
  const [scope, setScope] = useState('all');
  const [pool, setPool] = useState<PreparedQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const deck = decks.find((d) => d.id === deckId) ?? decks[0];
  const subjectName = (id: string) => deck.subjects.find((s) => s.id === id)?.name ?? park.name;
  const subjectAccent = (id: string) => deck.subjects.find((s) => s.id === id)?.accent ?? FALLBACK_ACCENT;

  // open/close: reset to setup, lock scroll, manage focus
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setPhase('setup');
      setDeckId(decks[0].id);
      setScope('all');
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    }
  }, [open, decks]);

  // Escape closes the overlay
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function startRound() {
    const bank = deck.quiz;
    const chosen =
      scope === 'all' ? shuffle(bank).slice(0, 10) : shuffle(bank.filter((q) => q.subjectId === scope));
    const prepared: PreparedQuestion[] = chosen.map((q) => {
      const order = shuffle(q.opts.map((t, i) => ({ t, correct: i === q.a })));
      return { subjectId: q.subjectId, q: q.q, why: q.why, opts: order, a: order.findIndex((o) => o.correct) };
    });
    setPool(prepared);
    setIdx(0);
    setScore(0);
    setLocked(false);
    setSelected(null);
    setPhase('play');
  }

  function answer(i: number) {
    if (locked) return;
    setLocked(true);
    setSelected(i);
    if (i === pool[idx].a) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= pool.length) {
      setPhase('results');
      return;
    }
    setIdx((i) => i + 1);
    setLocked(false);
    setSelected(null);
  }

  function playAgain() {
    if (scope === 'all') setPhase('setup');
    else startRound();
  }

  const item = pool[idx];
  let kicker = 'Trivia Challenge';
  let accent = FALLBACK_ACCENT;
  if (phase === 'play' && item) {
    kicker = subjectName(item.subjectId);
    accent = subjectAccent(item.subjectId);
  } else if (phase === 'results') {
    kicker = 'Round complete';
  }

  return (
    <section
      className={`${styles.quiz} ${open ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Trivia challenge"
      aria-hidden={!open}
    >
      <div className={styles.inner} style={{ '--accent': accent } as React.CSSProperties}>
        <div className={styles.top}>
          <span className={styles.kicker}>{kicker}</span>
          <button className={styles.qx} aria-label="Close quiz" onClick={onClose}>
            ×
          </button>
        </div>

        {phase === 'setup' && (
          <QuizSetup
            decks={decks}
            deckId={deckId}
            scope={scope}
            onSelectDeck={(id) => {
              setDeckId(id);
              setScope('all');
            }}
            onSelectScope={setScope}
            onStart={startRound}
          />
        )}

        {phase === 'play' && item && (
          <QuizPlay
            item={item}
            total={pool.length}
            idx={idx}
            score={score}
            locked={locked}
            selected={selected}
            onAnswer={answer}
            onNext={next}
          />
        )}

        {phase === 'results' && (
          <QuizResults score={score} total={pool.length} onPlayAgain={playAgain} onBackToMap={onClose} />
        )}
      </div>
    </section>
  );
}
