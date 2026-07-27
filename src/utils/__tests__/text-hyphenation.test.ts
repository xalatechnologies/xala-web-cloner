import { describe, expect, it } from 'vitest';
import { processServiceTitle } from '../text-hyphenation';
import servicesData from '@/data/services.json';

const SHY = '­';

/**
 * The regression this file exists for.
 *
 * The old implementation built break points from regexes, and one pattern had
 * two capture groups where the callback expected three — so the fourth
 * argument was the match offset, `p3 !== undefined` was always true, and the
 * offset was interpolated into the output. Combined with
 * dangerouslySetInnerHTML that put digits into every Norwegian service title
 * on the live site.
 */
describe('processServiceTitle', () => {
  it('never emits a digit that was not in the input', () => {
    for (const title of servicesData.no.map((service) => service.title)) {
      const processed = processServiceTitle(title, 'no');
      const added = processed.replace(/­/g, '');
      expect(added, `"${title}" came back as "${processed}"`).toBe(title);
    }
  });

  it('leaves non-Norwegian titles untouched', () => {
    for (const title of servicesData.en.map((service) => service.title)) {
      expect(processServiceTitle(title, 'en')).toBe(title);
      expect(processServiceTitle(title, 'en')).not.toContain(SHY);
    }
  });

  it('inserts soft hyphens only in words it has been told about', () => {
    expect(processServiceTitle('Saksbehandlingssystemer', 'no')).toBe(
      `Saks${SHY}behandlings${SHY}systemer`
    );
    // No entry: returned as-is rather than guessed at.
    expect(processServiceTitle('Et helt ukjent ord', 'no')).toBe('Et helt ukjent ord');
  });

  it('emits real soft-hyphen characters, not HTML entities', () => {
    const processed = processServiceTitle('Integrasjoner', 'no');
    expect(processed).not.toContain('&shy;');
    expect(processed).toContain(SHY);
  });

  it('treats nb and nn as Norwegian, and everything else as not', () => {
    for (const lang of ['no', 'nb', 'nn', 'nb-NO']) {
      expect(processServiceTitle('Integrasjoner', lang)).toContain(SHY);
    }
    for (const lang of ['en', 'ar', 'en-GB', '']) {
      expect(processServiceTitle('Integrasjoner', lang)).toBe('Integrasjoner');
    }
  });

  it('strips to the original word, so a title stays searchable', () => {
    // Soft hyphens are invisible to find-in-page and to a crawler's text
    // extraction only if they are the sole addition. Anything else would
    // change the indexed text.
    expect(processServiceTitle('Saksbehandlingssystemer', 'no').replace(/­/g, '')).toBe(
      'Saksbehandlingssystemer'
    );
  });
});
