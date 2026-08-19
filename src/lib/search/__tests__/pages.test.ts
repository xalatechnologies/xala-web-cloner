import { describe, it, expect } from 'vitest';
import { matchSitePages, sitePages, suggestedSitePages } from '../pages';
import { resolveRoute } from '@/components/seo/routeRules';

describe('site page search index', () => {
  it('indexes paths the router actually serves', () => {
    // A typo here would put a link to nothing at the top of the results, which
    // is worse than the "Ingen treff." this index exists to replace.
    for (const page of sitePages()) {
      expect(resolveRoute(page.path).pageId).not.toBe('notFound');
    }
  });

  it('answers for what the site sells, not only for what it has written about', () => {
    // Every one of these returned nothing at all: the search box handed the
    // query to an index of 25 blog posts, so a reader looking for a product,
    // the price page or contact had no result to open.
    expect(matchSitePages('priser').map((page) => page.path)).toContain('/priser');
    expect(matchSitePages('kontakt').map((page) => page.path)).toContain('/kontakt');
    expect(matchSitePages('produkter').map((page) => page.path)).toContain('/produkter');
    // Digilist is named in the products copy but in no article.
    expect(matchSitePages('Digilist').map((page) => page.path)).toContain('/produkter');
  });

  it('puts a page whose title carries the query first', () => {
    const hits = matchSitePages('teknologi');

    expect(hits.length).toBeGreaterThan(1);
    expect(hits[0].path).toBe('/teknologi');
  });

  it('drops the brand suffix, so a result reads as a page and not as a tab title', () => {
    const home = sitePages().find((page) => page.path === '/')!;

    expect(home.title).toBe('Systemutvikling for offentlig sektor');
  });

  it('matches nothing on an empty query, so the listing stays a listing', () => {
    expect(matchSitePages('   ')).toEqual([]);
  });

  it('always has something to suggest when a query matches nothing', () => {
    expect(suggestedSitePages().length).toBe(6);
    expect(suggestedSitePages()[0].path).toBe('/');
  });
});
