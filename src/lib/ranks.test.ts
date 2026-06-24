import { describe, it, expect } from 'vitest';
import { rankFor } from './ranks';

describe('rankFor', () => {
  it('awards superintendent only for a perfect score', () => {
    expect(rankFor(100)).toBe('superintendent');
    expect(rankFor(99)).not.toBe('superintendent');
  });

  it('maps each score band to its rank', () => {
    expect(rankFor(80)).toBe('seniorNaturalist');
    expect(rankFor(99)).toBe('seniorNaturalist');
    expect(rankFor(60)).toBe('backcountryRanger');
    expect(rankFor(79)).toBe('backcountryRanger');
    expect(rankFor(40)).toBe('juniorRanger');
    expect(rankFor(59)).toBe('juniorRanger');
  });

  it('falls back to firstDayTourist below 40%', () => {
    expect(rankFor(39)).toBe('firstDayTourist');
    expect(rankFor(0)).toBe('firstDayTourist');
  });
});
