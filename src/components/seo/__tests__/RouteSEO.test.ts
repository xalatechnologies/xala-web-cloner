import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { ROUTE_RULES, resolveRoute, normalizeLanguage, canonicalFor } from '../routeRules';
import { getAllPageIds, getPageSEO, type Language } from '../seoContent';

const LANGUAGES: Language[] = ['no', 'en', 'ar'];

/** The routes App.tsx actually registers, read from source so the two cannot drift. */
function routesDeclaredInApp(): string[] {
  const app = readFileSync(resolve(__dirname, '../../../App.tsx'), 'utf8');
  return [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
}

/** Turns a route pattern into a concrete path a user could visit. */
function concretePath(route: string): string {
  return route.replace(/:[^/]+/g, 'noe');
}

describe('RouteSEO route coverage', () => {
  it('gives every route declared in App.tsx a page id that is not the fallback', () => {
    const routes = routesDeclaredInApp().filter((r) => r !== '*');
    expect(routes.length).toBeGreaterThan(10);

    for (const route of routes) {
      const rule = resolveRoute(concretePath(route));
      expect(rule.pageId, `route ${route} has no SEO rule`).not.toBe('notFound');
    }
  });

  it('treats an unknown path as the non-indexable 404', () => {
    const rule = resolveRoute('/dette-finnes-ikke');
    expect(rule.pageId).toBe('notFound');
    expect(rule.noIndex).toBe(true);
  });

  it('leaves the pages that own their <Helmet> alone', () => {
    // These four build titles from post/case content, so RouteSEO must not
    // emit a competing title or canonical for them.
    for (const path of ['/blogg', '/blogg/en-post', '/caser', '/caser/altinn']) {
      expect(resolveRoute(path).selfManaged, `${path} should be self-managed`).toBe(true);
    }
  });

  it('does not mark the static pages as self-managed', () => {
    for (const path of ['/', '/tjenester', '/kontakt', '/karriere', '/teknologi', '/priser', '/faq', '/status', '/transparens']) {
      expect(resolveRoute(path).selfManaged ?? false, `${path} needs RouteSEO`).toBe(false);
    }
  });

  it('marks long-form content as article, not website', () => {
    expect(resolveRoute('/blogg/en-post').ogType).toBe('article');
    expect(resolveRoute('/caser/altinn').ogType).toBe('article');
    expect(resolveRoute('/tjenester').ogType).toBeUndefined();
  });

  it('does not let a rule shadow a more specific one', () => {
    // /caser must not swallow /caser/:slug.
    expect(resolveRoute('/caser').pageId).toBe('cases');
    expect(resolveRoute('/caser/altinn').pageId).toBe('caseStudy');
    expect(resolveRoute('/blogg').pageId).toBe('blog');
    expect(resolveRoute('/blogg/whatever').pageId).toBe('blogPost');
  });
});

describe('canonicalFor', () => {
  it('builds absolute URLs without a trailing slash', () => {
    expect(canonicalFor('/')).toBe('https://xala.no');
    expect(canonicalFor('/tjenester')).toBe('https://xala.no/tjenester');
    expect(canonicalFor('/tjenester/')).toBe('https://xala.no/tjenester');
  });

  it('gives distinct pages distinct canonicals', () => {
    // Every page previously claimed https://xala.no as its canonical, which
    // tells a crawler the whole site is one page.
    const urls = ['/', '/tjenester', '/produkter', '/kontakt', '/priser'].map(canonicalFor);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('rewrites the /pris alias onto /priser so the two URLs share one canonical', () => {
    expect(canonicalFor('/pris')).toBe('https://xala.no/priser');
    expect(canonicalFor('/pris/')).toBe('https://xala.no/priser');
    expect(resolveRoute('/pris').pageId).toBe('pricing');
    expect(resolveRoute('/priser').pageId).toBe('pricing');
  });

  it('rewrites the /transparency alias onto /transparens so the two URLs share one canonical', () => {
    expect(canonicalFor('/transparency')).toBe('https://xala.no/transparens');
    expect(canonicalFor('/transparency/')).toBe('https://xala.no/transparens');
    expect(resolveRoute('/transparency').pageId).toBe('transparens');
    expect(resolveRoute('/transparens').pageId).toBe('transparens');
  });

  it('rewrites the /personvern alias onto /privacy so the two URLs share one canonical', () => {
    expect(canonicalFor('/personvern')).toBe('https://xala.no/privacy');
    expect(canonicalFor('/personvern/')).toBe('https://xala.no/privacy');
    expect(resolveRoute('/personvern').pageId).toBe('privacy');
    expect(resolveRoute('/privacy').pageId).toBe('privacy');
  });

  it('rewrites the /use-cases alias onto /caser so the two URLs share one canonical', () => {
    expect(canonicalFor('/use-cases')).toBe('https://xala.no/caser');
    expect(canonicalFor('/use-cases/')).toBe('https://xala.no/caser');
    expect(resolveRoute('/use-cases').pageId).toBe('cases');
    expect(resolveRoute('/caser').pageId).toBe('cases');
  });
});

describe('normalizeLanguage', () => {
  it('collapses regional tags onto the three supported languages', () => {
    expect(normalizeLanguage('nb-NO')).toBe('no');
    expect(normalizeLanguage('no')).toBe('no');
    expect(normalizeLanguage('en-GB')).toBe('en');
    expect(normalizeLanguage('ar')).toBe('ar');
  });

  it('falls back to Norwegian for missing or unknown input', () => {
    expect(normalizeLanguage(undefined)).toBe('no');
    expect(normalizeLanguage('de')).toBe('no');
  });
});

describe('seoContent completeness', () => {
  it('has copy for every page id in all three languages', () => {
    for (const pageId of getAllPageIds()) {
      for (const language of LANGUAGES) {
        const content = getPageSEO(pageId, language);
        expect(content.title, `${language}/${pageId} title`).toBeTruthy();
        expect(content.description, `${language}/${pageId} description`).toBeTruthy();
        expect(content.keywords, `${language}/${pageId} keywords`).toBeTruthy();
      }
    }
  });

  it('covers every page id that a route rule can produce', () => {
    const ids = new Set(getAllPageIds() as string[]);
    for (const rule of [...ROUTE_RULES, { pageId: 'notFound' as const }]) {
      expect(ids.has(rule.pageId), `no copy for page id ${rule.pageId}`).toBe(true);
    }
  });

  it('keeps titles and descriptions inside what search results show', () => {
    for (const pageId of getAllPageIds()) {
      for (const language of LANGUAGES) {
        const { title, description } = getPageSEO(pageId, language);
        expect(title.length, `${language}/${pageId} title too long: ${title}`).toBeLessThanOrEqual(70);
        expect(
          description.length,
          `${language}/${pageId} description too long: ${description}`
        ).toBeLessThanOrEqual(175);
        expect(description.length, `${language}/${pageId} description too short`).toBeGreaterThanOrEqual(70);
      }
    }
  });

  it('gives each page a distinct title and description per language', () => {
    for (const language of LANGUAGES) {
      const titles = getAllPageIds().map((id) => getPageSEO(id, language).title);
      const descriptions = getAllPageIds().map((id) => getPageSEO(id, language).description);
      expect(new Set(titles).size, `duplicate titles in ${language}`).toBe(titles.length);
      expect(new Set(descriptions).size, `duplicate descriptions in ${language}`).toBe(descriptions.length);
    }
  });
});
