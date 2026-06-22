import React from 'react';

function escapeRx(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Split `text` on `term` (case-insensitive) and wrap matches in `wrapper`.
 * Returns plain text when there's nothing to highlight. Used for both the
 * <mark> highlighting in the detail sheet and the <b> emphasis in autocomplete.
 */
export function highlight(
  text: string,
  term: string | undefined,
  wrapper: (chunk: string, key: number) => React.ReactNode,
): React.ReactNode {
  const t = term?.trim();
  if (!t || t.length < 2) return text;
  const rx = new RegExp(`(${escapeRx(t)})`, 'ig');
  // split on a single capturing group: matches land at odd indices.
  const parts = text.split(rx);
  return parts.map((part, i) =>
    i % 2 === 1 ? wrapper(part, i) : <React.Fragment key={i}>{part}</React.Fragment>,
  );
}
