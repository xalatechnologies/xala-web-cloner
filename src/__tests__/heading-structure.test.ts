import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Guards that every routed page renders exactly one <h1>.
 *
 * Six routes — /tjenester, /produkter, /slik-vi-jobber, /teknologi, /om-oss and
 * /kontakt — shipped with no <h1> at all. Their page titles were marked up as
 * <h2> because the components had started life as homepage sections. The h1 is
 * what a search engine and a screen reader both use to identify what a page is
 * about, so six pages were anonymous to each.
 *
 * This is a static approximation of that check: it verifies the page-level
 * component for each route contains an <h1>. The rendered guarantee is covered
 * by scripts/audit-responsive.mjs and the h1 sweep run against a live server;
 * this catches the regression in CI without needing a browser.
 */
const SRC = resolve(__dirname, '..');

/**
 * Route -> the component file that actually emits that page's <h1>.
 *
 * Not always the page component: the three legal routes delegate to
 * LegalLayout, and the front page's heading lives in VideoHero as a
 * <motion.h1>. Both were flagged by an earlier, naiver version of this test
 * that looked for a literal "<h1" in the page file — a reminder that this is a
 * static approximation of a rendered fact.
 */
const PAGE_HEADING_OWNER: Record<string, string> = {
  '/': 'components/hero/VideoHero.tsx',
  // Like /slik-vi-jobber: the h1 moved to the page, and Services renders an h2
  // under it. Services keeps an h1 default for any page it leads.
  '/tjenester': 'pages/TjenesterPage.tsx',
  '/tjenester/:slug': 'pages/TjenesteDetaljPage.tsx',
  '/produkter': 'pages/ProdukterPage.tsx',
  '/produkter/:slug': 'pages/ProduktDetaljPage.tsx',
  '/caser': 'pages/CaserPage.tsx',
  '/caser/:slug': 'pages/CaseStudyDetailPage.tsx',
  // Moved out of WorkProcess: that component is a section of this page, not
  // the page, and it now renders an h2 under the page's own h1.
  '/slik-vi-jobber': 'pages/SlikViJobberPage.tsx',
  '/priser': 'pages/PriserPage.tsx',
  '/status': 'pages/StatusPage.tsx',
  '/transparens': 'pages/TransparensPage.tsx',
  '/teknologi': 'pages/TeknologiPage.tsx',
  '/om-oss': 'pages/OmOssPage.tsx',
  '/kontakt': 'components/Contact.tsx',
  '/book-demo': 'pages/BookDemoPage.tsx',
  '/karriere': 'pages/KarrierePage.tsx',
  '/blogg': 'pages/BloggPage.tsx',
  '/blogg/:slug': 'pages/BloggPostPage.tsx',
  '/privacy': 'components/layouts/LegalLayout.tsx',
  '/terms': 'components/layouts/LegalLayout.tsx',
  '/cookies': 'components/layouts/LegalLayout.tsx',
};

/** framer-motion headings are still headings. */
const H1_PATTERN = /<(motion\.)?h1[\s>]/;

/**
 * `<PageHeader>` is the shared page frame, and rendering one is how most pages
 * now emit their h1. Counting it here keeps the map pointing at the page a
 * reader would look for rather than redirecting six routes at one layout file;
 * the frame's own h1 is asserted separately below, so the indirection cannot
 * hide its absence.
 */
const PAGE_HEADER_PATTERN = /<PageHeader[\s/>]/;
const ownsAnH1 = (source: string) => H1_PATTERN.test(source) || PAGE_HEADER_PATTERN.test(source);

function declaredRoutes(): string[] {
  const app = readFileSync(join(SRC, 'App.tsx'), 'utf8');
  return [...app.matchAll(/path="([^"]+)"/g)]
    .map((m) => m[1])
    // /pris and /transparency are Navigate aliases and never render their own heading.
    .filter((r) => r !== '*' && r !== '/pris' && r !== '/transparency');
}

function componentFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : componentFiles(full);
    return /\.tsx$/.test(entry.name) ? [full] : [];
  });
}

describe('heading structure', () => {
  it('names an h1 owner for every declared route', () => {
    const routes = declaredRoutes();
    const missing = routes.filter((r) => !(r in PAGE_HEADING_OWNER));

    expect(
      missing,
      `routes with no h1 owner recorded — add one and make sure it renders an <h1>:\n  ${missing.join('\n  ')}`
    ).toEqual([]);
  });

  it('renders an h1 in each of those owners', () => {
    const without = Object.entries(PAGE_HEADING_OWNER)
      .filter(([, file]) => !ownsAnH1(readFileSync(join(SRC, file), 'utf8')))
      .map(([route, file]) => `${route} (${file})`);

    expect(without, `page components with no <h1>:\n  ${without.join('\n  ')}`).toEqual([]);
  });

  it('renders exactly one h1 in the shared page frame', () => {
    // Every page that delegates its heading here depends on this being true,
    // and being true exactly once.
    const frame = readFileSync(join(SRC, 'components/layouts/PageFrame.tsx'), 'utf8');
    expect(frame.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it('does not put an h1 in a component used as a homepage section', () => {
    // Two h1s on one page is as bad as none. The teaser components share the
    // homepage with the hero, which owns its h1.
    const teasers = componentFiles(join(SRC, 'components/teasers'));
    for (const file of teasers) {
      const source = readFileSync(file, 'utf8');
      expect(H1_PATTERN.test(source), `${file.replace(`${SRC}/`, '')} would add a second h1 to the homepage`).toBe(
        false
      );
    }
  });
});
