import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { STATIC_ROUTES } from '@/lib/blog/feeds';
import { resolveRoute } from '../routeRules';
import { getPageSEO } from '../seoContent';

/**
 * The head tags a crawler sees before any JavaScript runs.
 *
 * Two things used to go wrong here and are checked so they cannot again:
 *
 * 1. index.html's static tags were not marked `data-rh`, so react-helmet-async
 *    could not replace them. Every route shipped two canonicals, two og:urls
 *    and two descriptions — one pair correct, one claiming the front page.
 * 2. The prerender wrote the untouched shell for every static route, so the
 *    pre-JS HTML for /tjenester, /om-oss and the rest all carried the home
 *    page's title and canonical. The prerender now builds each route's head
 *    from `resolveRoute` + `getPageSEO`; this asserts that pairing resolves.
 */
const INDEX_HTML = readFileSync(resolve(__dirname, '../../../..', 'index.html'), 'utf8');

/** Tags Helmet also emits, which therefore must be replaceable, not duplicated. */
const HELMET_OWNED = [
  'name="description"',
  'property="og:type"',
  'property="og:url"',
  'property="og:title"',
  'property="og:description"',
  'property="twitter:card"',
  'property="twitter:url"',
  'property="twitter:title"',
  'property="twitter:description"',
  'rel="canonical"',
];

describe('index.html shell', () => {
  it.each(HELMET_OWNED)('marks %s with data-rh so Helmet replaces it', (selector) => {
    const line = INDEX_HTML.split('\n').find((candidate) => candidate.includes(selector));
    expect(line, `no tag matching ${selector} in index.html`).toBeDefined();
    expect(line).toContain('data-rh="true"');
  });

  it('ships exactly one canonical of its own', () => {
    expect(INDEX_HTML.match(/rel="canonical"/g)).toHaveLength(1);
  });
});

describe('prerendered static routes', () => {
  it('finds the routes it is meant to check', () => {
    expect(STATIC_ROUTES.length).toBeGreaterThanOrEqual(12);
  });

  it.each(STATIC_ROUTES.map((route) => route.path))(
    '%s resolves to SEO copy with a distinct title',
    (path) => {
      const copy = getPageSEO(resolveRoute(path).pageId, 'no');
      expect(copy.title.trim()).not.toBe('');
      expect(copy.description.trim()).not.toBe('');
      if (path !== '/') {
        // A route falling through to `home` or `notFound` is the bug this
        // catches: it would look fine and quietly republish the front page.
        expect(resolveRoute(path).pageId).not.toBe('notFound');
        expect(getPageSEO(resolveRoute(path).pageId, 'no').title).not.toBe(
          getPageSEO('home', 'no').title
        );
      }
    }
  );

  it('gives every static route a unique title', () => {
    const titles = STATIC_ROUTES.map((route) => getPageSEO(resolveRoute(route.path).pageId, 'no').title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
