import { describe, expect, it } from 'vitest';
import { caseStudies } from '../index';
import { localizedCardExcerpt, normalizeCaseLang } from '../localized';
import { caserEntries } from '@/data/caser-page-entries';

/**
 * The case index is the most persuasive page on the site, and it showed all
 * seventeen blurbs in English to a Norwegian audience. The translations existed
 * the whole time — every case study already carried a Norwegian `card.excerpt`
 * — but /caser reads from its own list, whose `description` has no language
 * dimension, so none of them were ever used.
 *
 * These assertions cover the two ways that comes back: a case study written
 * without the Norwegian blurb, and an entry on the index whose slug does not
 * resolve to a study, which would silently fall back to English.
 */
describe('localizedCardExcerpt', () => {
  const linked = caserEntries.filter((entry) => entry.slug);

  it('finds the entries it is meant to check', () => {
    expect(linked.length).toBeGreaterThanOrEqual(17);
  });

  it.each(linked.map((entry) => [entry.slug!, entry] as const))(
    '%s resolves to a case study',
    (slug) => {
      expect(caseStudies.some((study) => study.slug === slug), `no case study for ${slug}`).toBe(
        true
      );
    }
  );

  it.each(linked.map((entry) => [entry.slug!, entry] as const))(
    '%s has a Norwegian card blurb that differs from the English one',
    (slug) => {
      const no = localizedCardExcerpt(slug, 'no');
      const en = localizedCardExcerpt(slug, 'en');

      expect(no, `${slug} has no Norwegian excerpt`).toBeTruthy();
      expect(no!.length).toBeGreaterThan(40);
      // Identical strings mean the fallback fired — the translation is absent
      // and the card would quietly render English.
      expect(no, `${slug} falls back to English`).not.toBe(en);
    }
  );

  it('falls back rather than returning nothing when a language is missing', () => {
    const slug = linked[0].slug!;
    // Arabic is not authored for every study; the card must still say something.
    expect(localizedCardExcerpt(slug, 'ar')).toBeTruthy();
  });

  it('returns undefined for an unknown or absent slug, so callers keep their own text', () => {
    expect(localizedCardExcerpt(undefined, 'no')).toBeUndefined();
    expect(localizedCardExcerpt('ikke-en-case', 'no')).toBeUndefined();
  });

  it('collapses locale tags to the three languages that are authored', () => {
    expect(normalizeCaseLang('nb-NO')).toBe('no');
    expect(normalizeCaseLang('nn')).toBe('no');
    expect(normalizeCaseLang('en-GB')).toBe('en');
    expect(normalizeCaseLang('ar-EG')).toBe('ar');
    expect(normalizeCaseLang(undefined)).toBe('no');
  });
});
