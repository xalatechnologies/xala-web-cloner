import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { relatedServices } from '../relatedServices';

const post = (over: Partial<Parameters<typeof relatedServices>[0]> = {}) => ({
  slug: 'x',
  title: 'x',
  tag: undefined,
  keywords: [] as string[],
  ...over,
});

describe('relatedServices', () => {
  it('links a saksbehandling post to the services page', () => {
    const targets = relatedServices(
      post({
        slug: 'tilskuddsportal-som-faktisk-brukes',
        title: 'Tilskuddsportalen som faktisk blir brukt',
        keywords: ['tilskuddsportal', 'saksbehandling'],
      })
    );
    expect(targets.map((t) => t.href)).toContain('/tjenester');
  });

  it('links a modernisation post to the technology page', () => {
    const targets = relatedServices(
      post({
        slug: 'modernisere-fagsystem-uten-driftsstans',
        title: 'Modernisere fagsystem uten driftsstans',
        keywords: ['modernisering', 'azure', 'arkitektur'],
      })
    );
    expect(targets.map((t) => t.href)).toContain('/teknologi');
  });

  it('ranks by how often the post hits a rule, not by rule order', () => {
    // "kommune" three times and one weak services hit: cases must come first,
    // even though the services rule is written earlier in the array.
    const targets = relatedServices(
      post({
        slug: 'kommune-kommune',
        title: 'Kommune',
        tag: 'Kommune',
        keywords: ['digitalisering kommune', 'portal'],
      })
    );
    expect(targets[0].href).toBe('/caser');
  });

  it('respects the limit', () => {
    const targets = relatedServices(
      post({ title: 'saksbehandling azure kommune produkt prosess', keywords: [] }),
      2
    );
    expect(targets).toHaveLength(2);
  });

  it('never returns an empty list', () => {
    const targets = relatedServices(post({ title: 'helt urelatert emne' }));
    expect(targets.length).toBeGreaterThan(0);
  });

  it('returns no duplicate hrefs', () => {
    const targets = relatedServices(
      post({ title: 'saksbehandling portal integrasjon vedtak', keywords: ['skjema'] }),
      5
    );
    expect(new Set(targets.map((t) => t.href)).size).toBe(targets.length);
  });

  it('only points at paths that App.tsx actually routes', () => {
    // The internal-links guard reads `href: "/x"` literals, but only from the
    // shapes it knows. Asserting it here too means a typo in this file cannot
    // reach production behind a regex that happened not to match.
    const app = readFileSync(resolve(__dirname, '../../..', 'App.tsx'), 'utf8');
    const routes = [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);

    const source = readFileSync(join(__dirname, '..', 'relatedServices.ts'), 'utf8');
    const hrefs = [...source.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);

    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    for (const href of hrefs) expect(routes).toContain(href);
  });
});
