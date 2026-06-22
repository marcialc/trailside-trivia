// Stable rank identifiers. The localized title + message for each live in the
// UI string dictionary (src/i18n/strings.ts), keyed by these ids.
export type RankId =
  | 'superintendent'
  | 'seniorNaturalist'
  | 'backcountryRanger'
  | 'juniorRanger'
  | 'firstDayTourist';

/** Map a score percentage (0–100) to a ranger rank id. */
export function rankFor(pct: number): RankId {
  if (pct === 100) return 'superintendent';
  if (pct >= 80) return 'seniorNaturalist';
  if (pct >= 60) return 'backcountryRanger';
  if (pct >= 40) return 'juniorRanger';
  return 'firstDayTourist';
}
