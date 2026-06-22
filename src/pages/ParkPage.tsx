import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPark } from '../data';
import { useSubjectSearch } from '../hooks/useSubjectSearch';
import SearchBar from '../components/SearchBar';
import DeckToggle from '../components/DeckToggle';
import SubjectCard from '../components/SubjectCard';
import DetailSheet from '../components/DetailSheet';
import QuizOverlay from '../components/quiz/QuizOverlay';
import styles from './ParkPage.module.css';

export default function ParkPage() {
  const { parkSlug } = useParams();
  const park = parkSlug ? getPark(parkSlug) : undefined;

  const [activeDeckId, setActiveDeckId] = useState(park?.decks[0].id ?? '');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [term, setTerm] = useState<string>('');
  const [quizOpen, setQuizOpen] = useState(false);

  const activeDeck = useMemo(
    () => park?.decks.find((d) => d.id === activeDeckId) ?? park?.decks[0],
    [park, activeDeckId],
  );

  const { filtered, matches } = useSubjectSearch(activeDeck?.subjects ?? [], query);

  if (!park || !activeDeck) {
    return (
      <div className={styles.wrap}>
        <div className={styles.notfound}>
          <h1>Off the map.</h1>
          <p>We don't have a field guide for that park yet.</p>
          <Link to="/">← Back to all parks</Link>
        </div>
      </div>
    );
  }

  const selected = selectedId ? activeDeck.subjects.find((s) => s.id === selectedId) ?? null : null;
  const hasQuiz = park.decks.some((d) => d.quiz.length > 0);

  function switchDeck(id: string) {
    setActiveDeckId(id);
    setQuery('');
    setSelectedId(null);
  }

  function openSheet(id: string, highlight = '') {
    setSelectedId(id);
    setTerm(highlight);
  }

  // build the thermal color band from the active deck's subject accents
  const band = activeDeck.subjects.slice(0, 5).map((s) => s.accent);
  const countWord = activeDeck.label.toLowerCase();

  return (
    <div className={styles.wrap}>
      <Link to="/" className={styles.back}>
        ← National Parks
      </Link>
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.band}>
            {band.map((c, i) => (
              <i key={i} style={{ background: c }} />
            ))}
          </span>
          {park.region ?? 'Field guide'}
        </div>
        <h1 className={styles.title}>{park.name}</h1>
        <p className={styles.lede}>{park.tagline}</p>
      </header>

      <SearchBar
        query={query}
        placeholder={`Search ${countWord} — name, fact, or number…`}
        matches={matches}
        onChange={setQuery}
        onSelect={(id, t) => openSheet(id, t)}
      />

      {hasQuiz && (
        <button className={styles.quizcta} aria-label="Start the trivia challenge" onClick={() => setQuizOpen(true)}>
          <span className={styles.qi}>?</span>
          <span className={styles.qt}>
            <b>Trivia Challenge</b>
            <span>test yourself &amp; learn the park</span>
          </span>
          <span className={styles.qarrow}>→</span>
        </button>
      )}

      {park.decks.length > 1 && (
        <DeckToggle decks={park.decks} activeDeckId={activeDeck.id} onChange={switchDeck} />
      )}

      <div className={styles.rowmeta}>
        <span>
          <span className={styles.count}>{filtered.length}</span> {countWord}
        </span>
        <span>tap for the full file</span>
      </div>

      <div className={styles.grid}>
        {filtered.map((subject, i) => (
          <SubjectCard key={subject.id} subject={subject} index={i} onOpen={(id) => openSheet(id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <b>Nothing matches that out here.</b>
          <br />
          Try a place, an animal, or a number.
          <br />
          <button onClick={() => setQuery('')}>Show all {countWord}</button>
        </div>
      )}

      {park.safetyNote && <footer className={styles.footer}>{park.safetyNote}</footer>}

      <DetailSheet subject={selected} term={term} onClose={() => setSelectedId(null)} />
      <QuizOverlay park={park} open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
