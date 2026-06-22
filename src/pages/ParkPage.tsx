import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPark } from '../data';
import { useSubjectSearch } from '../hooks/useSubjectSearch';
import { useT } from '../i18n/t';
import { useUI } from '../i18n/strings';
import SearchBar from '../components/SearchBar';
import DeckToggle from '../components/DeckToggle';
import SubjectCard from '../components/SubjectCard';
import DetailSheet from '../components/DetailSheet';
import QuizOverlay from '../components/quiz/QuizOverlay';
import LanguageSwitcher from '../components/LanguageSwitcher';
import styles from './ParkPage.module.css';

export default function ParkPage() {
  const { parkSlug } = useParams();
  const park = parkSlug ? getPark(parkSlug) : undefined;
  const tt = useT();
  const ui = useUI();

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

  const docTitle = park ? ui.docTitle(tt(park.name)) : ui.listDocTitle;
  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  if (!park || !activeDeck) {
    return (
      <div className={styles.wrap}>
        <div className={styles.notfound}>
          <h1>{ui.notFoundTitle}</h1>
          <p>{ui.notFoundBody}</p>
          <Link to="/">{ui.backAllParks}</Link>
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
  const countWord = tt(activeDeck.label).toLowerCase();

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <Link to="/" className={styles.back}>
          {ui.backToParks}
        </Link>
        <LanguageSwitcher />
      </div>
      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.band}>
            {band.map((c, i) => (
              <i key={i} style={{ background: c }} />
            ))}
          </span>
          {park.region ? tt(park.region) : ui.fieldGuide}
        </div>
        <h1 className={styles.title}>{tt(park.name)}</h1>
        <p className={styles.lede}>{tt(park.tagline)}</p>
      </header>

      <SearchBar
        query={query}
        placeholder={ui.searchPlaceholder(countWord)}
        matches={matches}
        onChange={setQuery}
        onSelect={(id, t) => openSheet(id, t)}
      />

      {hasQuiz && (
        <button className={styles.quizcta} aria-label={ui.startTriviaAria} onClick={() => setQuizOpen(true)}>
          <span className={styles.qi}>?</span>
          <span className={styles.qt}>
            <b>{ui.triviaChallenge}</b>
            <span>{ui.triviaSub}</span>
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
        <span>{ui.tapForFile}</span>
      </div>

      <div className={styles.grid}>
        {filtered.map((subject, i) => (
          <SubjectCard key={subject.id} subject={subject} index={i} onOpen={(id) => openSheet(id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <b>{ui.nothingMatches}</b>
          <br />
          {ui.tryHint}
          <br />
          <button onClick={() => setQuery('')}>{ui.showAll(countWord)}</button>
        </div>
      )}

      {park.safetyNote && <footer className={styles.footer}>{tt(park.safetyNote)}</footer>}

      <DetailSheet subject={selected} term={term} onClose={() => setSelectedId(null)} />
      <QuizOverlay park={park} open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
