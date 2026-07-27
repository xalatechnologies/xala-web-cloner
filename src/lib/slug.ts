/**
 * One slug rule for the whole site.
 *
 * Anchor ids in an article body and the hrefs in its table of contents are
 * generated in two different places. If they drift by even one character every
 * TOC link becomes a dead jump — the kind of breakage that renders fine, passes
 * a link checker that only looks at routes, and is only visible when a human
 * clicks. Both call this.
 *
 * Norwegian characters are transliterated (ø→o, æ→ae, å→a) rather than dropped:
 * stripping them turned "Løsning" into "lsning". Other accented latin letters
 * fold via NFD (é→e, ü→u). Remaining punctuation is removed rather than
 * hyphenated, so "Special!@#Characters" stays one word.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/å/g, 'a')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining accents
    .replace(/[^a-z0-9 -]/g, '') // remove remaining special characters
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, ''); // hyphen-aware trim: whitespace is already hyphens by now
}
