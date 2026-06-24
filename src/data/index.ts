import type { Park } from './types';
import { yellowstone } from './parks/yellowstone';
import { glacier } from './parks/glacier';

// To add a park: create src/data/parks/<slug>.ts exporting a Park object
// (copy _TEMPLATE.ts), then add it to this array. Nothing else needs editing.
export const PARKS: Park[] = [yellowstone, glacier];

export const getPark = (slug: string): Park | undefined =>
  PARKS.find((p) => p.slug === slug);
