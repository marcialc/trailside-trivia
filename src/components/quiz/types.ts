// A quiz question prepared for play: options shuffled, correct index recomputed.
export interface PreparedQuestion {
  subjectId: string;
  q: string;
  why: string;
  opts: { t: string; correct: boolean }[];
  a: number; // index of the correct option after shuffling
}
