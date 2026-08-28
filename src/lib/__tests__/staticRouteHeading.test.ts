import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getPageSEO } from '@/components/seo/seoContent';
import { STATIC_ROUTES } from '@/lib/blog/feeds';
import { BLOG_LISTING_HEADING } from '@/lib/blog/seo';
import { SERVICES_PAGE_HEADING, staticRouteVisibleHeading } from '@/lib/staticRouteHeading';
import no from '@/i18n/locales/no.json';

describe('static route visible H1 vs document title', () => {
  it('keeps the /tjenester H1 as the designed sentence, not the SEO title', () => {
    // XWEB-195: first HTML used title.split(" | ")[0], so crawlers and the
    // first paint saw "Saksbehandling, integrasjon og modernisering" and
    // hydrate then swapped it for the page heading.
    const seoTitle = getPageSEO('services', 'no').title;

    expect(SERVICES_PAGE_HEADING).toBe('Saksbehandlingssystem og fagsystem som skal stå i mange år');
    expect(no.servicesPage.title).toBe(SERVICES_PAGE_HEADING);
    expect(seoTitle).toBe('Saksbehandlingssystem og fagsystem | Xala');
    expect(staticRouteVisibleHeading('/tjenester', seoTitle)).toBe(SERVICES_PAGE_HEADING);
    expect(staticRouteVisibleHeading('/tjenester', seoTitle)).not.toBe(seoTitle.split(' | ')[0]);
  });

  it('leaves /produkter and /priser on the title prefix, which already matches', () => {
    expect(staticRouteVisibleHeading('/produkter', getPageSEO('products', 'no').title)).toBe(
      'Seks produkter for kommune og næringsliv',
    );
    expect(staticRouteVisibleHeading('/priser', getPageSEO('pricing', 'no').title)).toBe(
      'Hva koster et saksbehandlingssystem?',
    );
  });

  it('does not reopen the /blogg H1 split', () => {
    // XWEB-188 already owns /blogg. STATIC_ROUTES never listed it; listingHtml
    // uses BLOG_LISTING_HEADING. Do not route /blogg through this helper.
    expect(STATIC_ROUTES.map((route) => route.path)).not.toContain('/blogg');
    expect(BLOG_LISTING_HEADING).toBe('Erfaringer fra systemer i drift');
    expect(staticRouteVisibleHeading('/blogg', getPageSEO('blog', 'no').title)).not.toBe(
      BLOG_LISTING_HEADING,
    );
  });

  it('is the heading the prerender actually writes', () => {
    const prerender = readFileSync(resolve(__dirname, '../../../scripts/prerender-blog.ts'), 'utf8');
    expect(prerender).toContain('staticRouteVisibleHeading');
    expect(prerender).not.toMatch(/staticRouteHtml\(copy\.title\.split/);
    expect(prerender).not.toMatch(/faqRouteHtml\(copy\.title\.split/);
  });
});
