import { describe, expect, it } from 'vitest';
import { renderLlmsTxt, STATIC_ROUTES } from '../feeds';
import type { BlogPost } from '../types';
import servicePages from '@/data/service-pages.json';
import productsData from '@/data/products.json';

/**
 * llms.txt is the site described in one request, for a reader that will not run
 * the bundle.
 *
 * It had drifted badly: the summary still pitched "Microsoft 365 og SharePoint,
 * Azure og Power Platform" months after the repositioning, and it listed only
 * the twelve top-level routes. The ten service pages written specifically to
 * answer a question each, the four product pages and the seventeen articles —
 * every page with something quotable on it — were absent. An answer engine
 * reading it would have concluded the company does something it no longer says
 * it does, on a site a third of its actual size.
 *
 * Generated from the same data the pages render, so the fix holds. These
 * assertions are what stops it drifting again.
 */
const post = (slug: string, title: string): BlogPost => ({
  slug,
  title,
  description: `Beskrivelse av ${title}.`,
  date: '2026-01-01',
  author: 'Ibrahim Rahmani',
  lang: 'no',
  readingMinutes: 4,
  body: '## En seksjon\n\nTekst.',
  file: `${slug}.md`,
});

const services = Object.entries(servicePages).map(([slug, page]) => {
  const copy = (page as { no: { title: string; intro: string } }).no;
  return { slug, title: copy.title, summary: copy.intro };
});

const products = productsData.no
  .filter((product) => product.slug)
  .map((product) => ({
    slug: product.slug as string,
    title: product.title,
    summary: product.description,
  }));

describe('llms.txt', () => {
  const output = renderLlmsTxt(
    [post('en-artikkel', 'En artikkel'), post('to', 'To')],
    [{ slug: 'altinn', title: 'Altinn 3', client: 'Digdir', summary: 'Sammendrag.' }],
    services,
    products
  );

  it('describes what the company currently does', () => {
    expect(output).toContain('saksbehandlingssystemer');
    expect(output).toContain('integrasjoner mot nasjonale felleskomponenter');
    // The pre-repositioning pitch, which outlived the repositioning by months.
    expect(output).not.toContain('Power Platform');
    expect(output).not.toContain('SharePoint');
  });

  it('states the facts an answer engine needs to treat this as a known entity', () => {
    expect(output).toContain('920972454');
    expect(output).toContain('ISO 27001');
    expect(output).toContain('ID-porten');
    expect(output).toContain('WCAG 2.2 AA');
  });

  it('lists every service landing page', () => {
    expect(services.length).toBeGreaterThanOrEqual(10);
    for (const service of services) {
      expect(output, `${service.slug} missing from llms.txt`).toContain(
        `/tjenester/${service.slug}`
      );
    }
  });

  it('lists every product page', () => {
    expect(products.length).toBeGreaterThanOrEqual(4);
    for (const product of products) {
      expect(output, `${product.slug} missing from llms.txt`).toContain(
        `/produkter/${product.slug}`
      );
    }
  });

  it('lists every static route and the posts it is given', () => {
    for (const route of STATIC_ROUTES) {
      const path = route.path === '/' ? 'https://xala.no)' : route.path;
      expect(output, `${route.path} missing from llms.txt`).toContain(path);
    }
    expect(output).toContain('/blogg/en-artikkel');
    expect(output).toContain('/blogg/to');
  });

  it('keeps a section per kind of page, so the file is scannable', () => {
    for (const heading of ['## Sider', '## Tjenester i detalj', '## Produkter', '## Kundecaser', '## Fagartikler', '## Kontakt']) {
      expect(output, `${heading} missing`).toContain(heading);
    }
  });

  it('says something rather than nothing when there are no posts yet', () => {
    expect(renderLlmsTxt([], [], [], [])).toContain('ingen publisert ennå');
  });
});
