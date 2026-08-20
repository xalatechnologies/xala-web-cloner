import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, afterEach } from 'vitest';
import RouteSEO from '../RouteSEO';
import { getPageSEO } from '../seoContent';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language: 'no' } }),
}));

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <RouteSEO />
      </MemoryRouter>
    </HelmetProvider>
  );
}

const head = {
  meta: (name: string) => document.head.querySelector(`meta[name="${name}"]`)?.getAttribute('content'),
  property: (prop: string) =>
    document.head.querySelector(`meta[property="${prop}"]`)?.getAttribute('content'),
  canonical: () => document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  canonicalCount: () => document.head.querySelectorAll('link[rel="canonical"]').length,
};

afterEach(() => {
  document.head.querySelectorAll('meta,link,title').forEach((el) => el.remove());
});

describe('RouteSEO renders head tags', () => {
  it('puts the page title and description in the document head', async () => {
    const expected = getPageSEO('services', 'no');
    renderAt('/tjenester');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.meta('description')).toBe(expected.description);
  });

  it('emits exactly one canonical, pointing at this page', async () => {
    renderAt('/karriere');

    await waitFor(() => expect(head.canonical()).toBe('https://xala.no/karriere'));
    expect(head.canonicalCount()).toBe(1);
  });

  it('gives og:image an absolute URL', async () => {
    renderAt('/');

    // A bare "/og-image.png" is ignored by most crawlers.
    await waitFor(() => expect(head.property('og:image')).toMatch(/^https:\/\//));
    expect(head.property('twitter:image')).toBe(head.property('og:image'));
  });

  it('keeps twitter:title and twitter:url on this page, not the homepage leftovers', async () => {
    const expected = getPageSEO('services', 'no');
    renderAt('/tjenester');

    await waitFor(() => expect(head.property('og:title')).toBe(expected.title));
    expect(head.property('twitter:title')).toBe(expected.title);
    expect(head.property('twitter:url')).toBe(head.property('og:url'));
    expect(head.property('twitter:url')).toBe('https://xala.no/tjenester');
    expect(head.property('twitter:title')).not.toContain('Innovative');
  });

  it('marks the 404 page noindex with the notFound title, not the homepage', async () => {
    const expected = getPageSEO('notFound', 'no');
    const home = getPageSEO('home', 'no');
    renderAt('/this-path-does-not-exist');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.meta('description')).toBe(expected.description);
    expect(document.title).not.toBe(home.title);
    expect(head.meta('robots')).toBe('noindex, follow');
    expect(head.canonical()).toBe('https://xala.no/this-path-does-not-exist');
    expect(head.canonical()).not.toBe('https://xala.no/');
  });

  it('keeps real pages indexable', async () => {
    renderAt('/produkter');

    await waitFor(() => expect(head.meta('robots')).toBe('index, follow'));
  });

  it('gives /priser its own title and canonical', async () => {
    const expected = getPageSEO('pricing', 'no');
    renderAt('/priser');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.meta('description')).toBe(expected.description);
    expect(head.canonical()).toBe('https://xala.no/priser');
  });

  it('points the /pris alias at the /priser canonical', async () => {
    const expected = getPageSEO('pricing', 'no');
    renderAt('/pris');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.canonical()).toBe('https://xala.no/priser');
  });

  it('gives /transparens its own title and canonical', async () => {
    const expected = getPageSEO('transparens', 'no');
    renderAt('/transparens');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.meta('description')).toBe(expected.description);
    expect(head.canonical()).toBe('https://xala.no/transparens');
  });

  it('points the /transparency alias at the /transparens canonical', async () => {
    const expected = getPageSEO('transparens', 'no');
    renderAt('/transparency');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.canonical()).toBe('https://xala.no/transparens');
  });

  it('gives /faq its own title and canonical', async () => {
    const expected = getPageSEO('faq', 'no');
    renderAt('/faq');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.meta('description')).toBe(expected.description);
    expect(head.canonical()).toBe('https://xala.no/faq');
  });

  it('points the /personvern alias at the /privacy canonical', async () => {
    const expected = getPageSEO('privacy', 'no');
    renderAt('/personvern');

    await waitFor(() => expect(document.title).toBe(expected.title));
    expect(head.canonical()).toBe('https://xala.no/privacy');
  });

  it('points the /use-cases alias at the /caser canonical', async () => {
    renderAt('/use-cases');

    await waitFor(() => expect(head.canonical()).toBe('https://xala.no/caser'));
  });

  it('emits no placeholder verification tags', async () => {
    renderAt('/');

    await waitFor(() => expect(document.title).toBeTruthy());
    expect(document.head.innerHTML).not.toContain('YOUR-BING-VERIFICATION-CODE');
    expect(document.head.innerHTML).not.toContain('YOUR-YANDEX-VERIFICATION-CODE');
  });

  it('emits structured data as valid JSON-LD', async () => {
    renderAt('/kontakt');

    await waitFor(() => expect(document.title).toBeTruthy());
    const blocks = [...document.head.querySelectorAll('script[type="application/ld+json"]')];
    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) {
      const parsed = JSON.parse(block.textContent ?? '');
      expect(parsed['@context']).toBe('https://schema.org');
    }
  });

  it('stays silent on routes that own their head', async () => {
    const { container } = renderAt('/blogg/en-post');
    expect(container).toBeEmptyDOMElement();
    expect(head.canonicalCount()).toBe(0);
  });
});
