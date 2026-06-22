import type { Deck } from '../data/types';
import styles from './DeckToggle.module.css';

interface Props {
  decks: Deck[];
  activeDeckId: string;
  onChange: (deckId: string) => void;
}

export default function DeckToggle({ decks, activeDeckId, onChange }: Props) {
  return (
    <div className={styles.browsebar}>
      <div className={styles.segmented} role="tablist">
        {decks.map((deck) => (
          <button
            key={deck.id}
            role="tab"
            aria-selected={deck.id === activeDeckId}
            className={`${styles.seg} ${deck.id === activeDeckId ? styles.on : ''}`}
            onClick={() => onChange(deck.id)}
          >
            <span className={styles.sd} style={{ background: deck.dotColor }} />
            {deck.label}
          </button>
        ))}
      </div>
    </div>
  );
}
