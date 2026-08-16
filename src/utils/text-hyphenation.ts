/**
 * Break hints for long Norwegian compound words.
 *
 * Norwegian builds nouns by concatenation — "saksbehandlingssystem",
 * "tilskuddsforvaltning" — and a card heading holding one of those will either
 * overflow its column or break at an arbitrary character. A soft hyphen tells
 * the browser where the word may split.
 *
 * ## Why this file no longer guesses
 *
 * It used to derive break points from three regexes. The third had two capture
 * groups, so the callback's fourth parameter received the match *offset*
 * rather than a group — and `if (p3 !== undefined)` was therefore always true.
 * Every Norwegian service title on the site rendered with that offset spliced
 * into it:
 *
 *     Teknologikonsultering  ->  Teknolo{shy}4giko{shy}8nsulteri{shy}16ng
 *
 * It shipped that way because the result went through dangerouslySetInnerHTML,
 * where `&shy;` became a real soft hyphen and the digits became visible text
 * that nothing was checking.
 *
 * Deciding where a Norwegian compound may split is a dictionary problem, not a
 * regex one. This now hyphenates only words it has been told about and returns
 * everything else untouched; the `hyphens: auto` already set on headings
 * handles the rest using the browser's own dictionary.
 */

/** U+00AD, as a character rather than an entity, so the result is text. */
const SHY = '­';

const shy = (...parts: string[]): string => parts.join(SHY);

/**
 * Hand-checked break points. Add an entry when a title actually overflows —
 * a wrong break point reads worse than no break at all.
 */
const NORWEGIAN_BREAKS: Record<string, string> = {
  Saksbehandlingssystemer: shy('Saks', 'behandlings', 'systemer'),
  'Tilskudds- og bevillingsportaler': `Tilskudds- og ${shy('bevillings', 'portaler')}`,
  'Modernisering av fagsystemer': `${shy('Moderni', 'sering')} av ${shy('fag', 'systemer')}`,
  'Automatisering og AI': `${shy('Automati', 'sering')} og AI`,
  'Forvaltning, drift og sikkerhet': `${shy('Forvalt', 'ning')}, drift og ${shy('sikker', 'het')}`,
  Integrasjoner: shy('Inte', 'grasjoner'),
  Saksbehandlingsplattform: shy('Saks', 'behandlings', 'plattform'),
  'SaaS-applikasjonsutvikling': `SaaS-${shy('appli', 'kasjons', 'ut', 'vikling')}`,
  Systemintegrasjon: shy('System', 'inte', 'grasjon'),
  // Home-hero rotators (lowercase). A 390px viewport cannot hold these at
  // text-4xl as a single glyph run; the breaks are the compound boundaries.
  tilskuddsportaler: shy('tilskudds', 'portaler'),
  bevillingsportaler: shy('bevillings', 'portaler'),
  skjemaløsninger: shy('skjema', 'løsninger'),
  prosessautomatisering: shy('prosess', 'automatisering'),
};

/**
 * Copy soft-hyphen positions from a known spelling onto `title`, keeping
 * whatever casing the caller passed. Used so the hero's lowercase
 * "saksbehandlingssystemer" can reuse the Saksbehandlingssystemer entry.
 */
function applyBreaksFromKnown(title: string, hyphenatedKnown: string): string {
  const insertBefore = new Set<number>();
  let index = 0;
  for (const ch of hyphenatedKnown) {
    if (ch === SHY) insertBefore.add(index);
    else index += 1;
  }
  let out = '';
  for (let i = 0; i < title.length; i += 1) {
    if (insertBefore.has(i)) out += SHY;
    out += title[i];
  }
  return out;
}


function isNorwegian(language: string): boolean {
  const lang = language?.toLowerCase() ?? '';
  return lang.startsWith('no') || lang.startsWith('nb') || lang.startsWith('nn');
}

/**
 * A title with soft hyphens where a compound is known to break.
 *
 * Returns the input unchanged for other languages, and for any Norwegian
 * title with no entry above.
 */
export function processServiceTitle(title: string, language: string = 'en'): string {
  if (!isNorwegian(language)) return title;
  const exact = NORWEGIAN_BREAKS[title];
  if (exact) return exact;

  const lower = title.toLowerCase();
  for (const [known, hyphenated] of Object.entries(NORWEGIAN_BREAKS)) {
    if (known.toLowerCase() !== lower) continue;
    return applyBreaksFromKnown(title, hyphenated);
  }
  return title;
}

/** Class that turns on the browser's own hyphenation. Defined in index.css. */
export const norwegianHyphenationClass = 'hyphenate-no';
