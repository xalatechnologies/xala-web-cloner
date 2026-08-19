import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { STATIC_ROUTES } from '@/lib/blog/feeds';
import { CANONICAL_ALIASES, resolveRoute } from '../routeRules';
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
  'property="twitter:image"',
  'property="og:image"',
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

  it('ships the public-sector home copy, not leftover Innovative Teknologiløsninger', () => {
    const home = getPageSEO('home', 'no');
    expect(INDEX_HTML).toContain(`<title>${home.title}</title>`);
    expect(INDEX_HTML).toContain(`content="${home.description}"`);
    expect(INDEX_HTML).not.toContain('Innovative Teknologiløsninger');
    expect(INDEX_HTML).not.toContain('banebrytende teknologi');
  });

  it('includes a default share image so large Twitter cards are not empty', () => {
    expect(INDEX_HTML).toContain('property="og:image"');
    expect(INDEX_HTML).toContain('https://xala.no/og-image.png');
    expect(INDEX_HTML).toContain('property="twitter:image"');
  });

  it('describes the company as public-sector software, not Microsoft 365', () => {
    const orgBlock = INDEX_HTML.slice(
      INDEX_HTML.indexOf('"@type": "Organization"'),
      INDEX_HTML.indexOf('"@type": "WebSite"')
    );
    expect(orgBlock).toContain('saksbehandlingssystemer');
    expect(orgBlock).toContain('Altinn');
    expect(orgBlock).toContain('Noark 5');
    expect(orgBlock).not.toContain('Microsoft 365');
    expect(orgBlock).not.toContain('SharePoint');
    expect(orgBlock).not.toContain('SPFx');
    expect(orgBlock).not.toContain('Power Platform');
    expect(INDEX_HTML).not.toContain('linkedin.com/in/ibrahimrahmani');
    expect(INDEX_HTML).toContain('linkedin.com/company/');
    expect(INDEX_HTML).toContain('"@id": "https://xala.no/#website"');
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

  it('keeps canonical aliases out of STATIC_ROUTES', () => {
    // Aliases share a pageId with their target. Listing them here would
    // duplicate the sitemap and fail the unique-title check above.
    const paths = STATIC_ROUTES.map((route) => route.path);
    for (const [alias, target] of Object.entries(CANONICAL_ALIASES)) {
      expect(paths, `${alias} belongs in the prerender copy step, not STATIC_ROUTES`).not.toContain(
        alias
      );
      expect(paths, `${target} missing from STATIC_ROUTES`).toContain(target);
    }
  });

  it('copies every CANONICAL_ALIASES key in the prerender write loop', () => {
    // Aliases are not sitemap URLs, so a loc-only verify-dist check cannot
    // see them. Deleting this loop 404s /pris on a cold hit again.
    const prerender = readFileSync(resolve(__dirname, '../../../../scripts/prerender-blog.ts'), 'utf8');
    const verifyDist = readFileSync(resolve(__dirname, '../../../../scripts/verify-dist.mjs'), 'utf8');
    expect(Object.keys(CANONICAL_ALIASES).length).toBeGreaterThan(0);
    expect(prerender, 'prerender must copy each alias onto dist/<alias>/index.html').toContain(
      'Object.entries(CANONICAL_ALIASES)'
    );
    expect(prerender, 'blog posts must take title/og:title from postMeta(), not a second formula').toContain(
      'postMeta('
    );
    expect(prerender, 'do not rebuild post titles from post.title + legal name').not.toContain(
      '`${post.title} | ${ORGANIZATION}`'
    );
    expect(prerender, 'inner pages must rewrite twitter:title, not keep the homepage card').toContain(
      'replaceMeta("property", "twitter:title"'
    );
    expect(prerender, 'marketing routes must prerender og/twitter images').toContain(
      'replaceMeta("property", "twitter:image"'
    );
    expect(prerender).toMatch(/write\(\s*path\.join\(\s*DIST,\s*alias\.replace/);
    expect(verifyDist, 'verify-dist must require a file for every alias').toContain(
      'CANONICAL_ALIASES'
    );
  });

  it('lets verify-dist parse the same alias keys the prerender copies', () => {
    // Same regex as scripts/verify-dist.mjs. If the object is reformatted and
    // the parser goes silent, /pris would stop being required in dist/.
    const routeRules = readFileSync(resolve(__dirname, '../routeRules.ts'), 'utf8');
    const block = routeRules.match(/export const CANONICAL_ALIASES[\s\S]*?=\s*\{([^}]*)\}/);
    expect(block, 'CANONICAL_ALIASES object not found in routeRules.ts').toBeTruthy();
    const parsed = [...block![1].matchAll(/['"](\/[^'"]+)['"]\s*:/g)].map((m) => m[1]);
    expect(parsed.sort()).toEqual(Object.keys(CANONICAL_ALIASES).sort());
    expect(parsed).toContain('/pris');
    expect(parsed).toContain('/transparency');
    expect(parsed).toContain('/personvern');
    expect(parsed).toContain('/use-cases');
  });

  it('puts /faq in STATIC_ROUTES and keeps alias paths out', () => {
    expect(CANONICAL_ALIASES).toMatchObject({
      '/pris': '/priser',
      '/transparency': '/transparens',
      '/personvern': '/privacy',
      '/use-cases': '/caser',
    });
    const paths = STATIC_ROUTES.map((route) => route.path);
    expect(paths).toContain('/faq');
    expect(paths).not.toContain('/personvern');
    expect(paths).not.toContain('/use-cases');
    expect(paths).not.toContain('/pris');
    expect(paths).not.toContain('/transparency');
    expect(resolveRoute('/faq').pageId).toBe('faq');
    expect(resolveRoute('/faq').pageId).not.toBe('notFound');
  });
});
