import { describe, it, expect } from 'vitest';
import { caseStudySitemapEntries, renderLlmsTxt, renderSitemap, type LlmsCaseStudy } from '../feeds';

const TODAY = '2026-07-26';

const STUDIES: LlmsCaseStudy[] = [
  {
    slug: 'altinn',
    title: 'Altinn 3 & Altinn Studio',
    client: 'Digitaliseringsdirektoratet (Digdir)',
    summary: 'Modernisering  av\n  Norges felles digitale infrastruktur.',
  },
  { slug: 'ssb-legacy-system-modernization', title: 'SSB', client: 'Statistisk sentralbyrå' },
];

describe('caseStudySitemapEntries', () => {
  it('emits one /caser/<slug> URL per case study', () => {
    const entries = caseStudySitemapEntries(['altinn', 'telia-telecommunications-platform'], TODAY);

    expect(entries.map((e) => e.loc)).toEqual([
      'https://xala.no/caser/altinn',
      'https://xala.no/caser/telia-telecommunications-platform',
    ]);
    expect(entries.every((e) => e.lastmod === TODAY)).toBe(true);
  });

  it('produces nothing for an empty list rather than a bare /caser/ URL', () => {
    expect(caseStudySitemapEntries([], TODAY)).toEqual([]);
  });

  it('renders into valid sitemap XML', () => {
    const xml = renderSitemap(caseStudySitemapEntries(['altinn'], TODAY));

    expect(xml).toContain('<loc>https://xala.no/caser/altinn</loc>');
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    // One <url> per entry, and every one closed.
    expect(xml.match(/<url>/g)).toHaveLength(1);
    expect(xml.match(/<\/url>/g)).toHaveLength(1);
  });
});

describe('renderLlmsTxt with case studies', () => {
  it('lists each case study with its client and summary', () => {
    const txt = renderLlmsTxt([], STUDIES);

    expect(txt).toContain('## Kundecaser');
    expect(txt).toContain(
      '- [Altinn 3 & Altinn Studio](https://xala.no/caser/altinn) — Digitaliseringsdirektoratet (Digdir): Modernisering av Norges felles digitale infrastruktur.'
    );
  });

  it('collapses whitespace so every entry stays on one line', () => {
    const txt = renderLlmsTxt([], STUDIES);
    const caseLines = txt.split('\n').filter((l) => l.includes('/caser/'));

    expect(caseLines).toHaveLength(2);
    expect(caseLines.every((l) => !/\s{2,}/.test(l))).toBe(true);
  });

  it('omits the section entirely when there are no case studies', () => {
    const txt = renderLlmsTxt([]);

    expect(txt).not.toContain('## Kundecaser');
    // The rest of the document is unaffected.
    expect(txt).toContain('## Sider');
    expect(txt).toContain('## Kontakt');
  });

  it('handles a case study with no summary without a dangling colon', () => {
    const txt = renderLlmsTxt([], [STUDIES[1]]);

    expect(txt).toContain('- [SSB](https://xala.no/caser/ssb-legacy-system-modernization) — Statistisk sentralbyrå');
    expect(txt).not.toContain('Statistisk sentralbyrå:');
  });
});
