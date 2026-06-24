import type { ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { LocaleProvider } from '../i18n/LocaleContext';
import type { Subject } from '../data/types';
import { useSubjectSearch } from './useSubjectSearch';

const subjects: Subject[] = [
  {
    id: 'bison',
    name: 'Bison',
    region: 'Lamar Valley',
    coord: '',
    accent: '#000',
    colorName: 'Brown',
    teaser: 'Largest land mammal in North America',
    facts: [{ tag: 'Weight', text: 'A bull can top 2,000 pounds.' }],
  },
  {
    id: 'wolf',
    name: 'Gray Wolf',
    region: 'Northern Range',
    coord: '',
    accent: '#111',
    colorName: 'Slate',
    teaser: 'Apex predator',
    facts: [{ tag: 'Behavior', text: 'They travel in coordinated packs.' }],
  },
];

const wrapper = ({ children }: { children: ReactNode }) => <LocaleProvider>{children}</LocaleProvider>;

describe('useSubjectSearch', () => {
  it('returns every subject and no matches for an empty query', () => {
    const { result } = renderHook(() => useSubjectSearch(subjects, ''), { wrapper });
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.matches).toHaveLength(0);
  });

  it('matches by name and is case-insensitive', () => {
    const { result } = renderHook(() => useSubjectSearch(subjects, 'GRAY'), { wrapper });
    expect(result.current.filtered.map((s) => s.id)).toEqual(['wolf']);
  });

  it('matches inside fact text and reports a "why" snippet', () => {
    const { result } = renderHook(() => useSubjectSearch(subjects, 'packs'), { wrapper });
    expect(result.current.matches).toHaveLength(1);
    expect(result.current.matches[0].subject.id).toBe('wolf');
    expect(result.current.matches[0].why.length).toBeGreaterThan(0);
  });

  it('returns no matches when nothing contains the term', () => {
    const { result } = renderHook(() => useSubjectSearch(subjects, 'zzzz'), { wrapper });
    expect(result.current.filtered).toHaveLength(0);
    expect(result.current.matches).toHaveLength(0);
  });
});
