export interface Rank {
  title: string;
  message: string;
}

/** Map a score percentage (0–100) to a ranger rank. */
export function rankFor(pct: number): Rank {
  if (pct === 100) return { title: 'Park Superintendent', message: 'Flawless. You know this park cold.' };
  if (pct >= 80) return { title: 'Senior Naturalist', message: 'Impressive — you could lead the walk.' };
  if (pct >= 60) return { title: 'Backcountry Ranger', message: 'Solid trail knowledge.' };
  if (pct >= 40) return { title: 'Junior Ranger', message: 'A good start — keep exploring.' };
  return { title: 'First-Day Tourist', message: 'Everyone starts somewhere. Tap a card and dive in.' };
}
