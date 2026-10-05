import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import servicePages from '@/data/service-pages.json';

/**
 * The 16 in-body links into /tjenester/systemintegrasjon, plus the two return
 * links on the service page. Anchors are assigned. At most three of them may
 * be the bare word "systemintegrasjon".
 */
const BLOG = resolve(__dirname, '../content/blog');
const TARGET = '/tjenester/systemintegrasjon';

const PLACEMENTS: ReadonlyArray<{ slug: string; heading: string; anchor: string }> = [
  {
    slug: 'systemintegrasjon-i-kommunen-myter-og-fakta',
    heading: 'Andre myte: «Når det andre systemet er nede, stopper saken»',
    anchor: 'systemintegrasjon',
  },
  {
    slug: 'integrasjoner-mot-nasjonale-felleskomponenter',
    heading: 'Nedetid hos andre er en normaltilstand',
    anchor: 'integrasjon som tåler nedetid hos andre',
  },
  {
    slug: 'redusert-foreldrebetaling-uten-fagsystemintegrasjon',
    heading: 'Ett oppslag inn i saken, ikke et nytt skjema',
    anchor: 'fagsystemintegrasjon',
  },
  {
    slug: 'public-360-og-fagsystem-snakker-ikke',
    heading: 'To systemer, én sak',
    anchor: 'koble fagsystemet til sak og arkiv',
  },
  {
    slug: 'modernisere-fagsystem-uten-driftsstans',
    heading: 'Vær ærlig om integrasjonene',
    anchor: 'systemintegrasjon for fagsystemer',
  },
  {
    slug: 'noark-5-arkivering-i-moderne-fagsystemer',
    heading: 'Problemet med å arkivere i etterkant',
    anchor: 'Noark 5-integrasjonen mot fagsystemet',
  },
  {
    slug: 'visma-fakturagrunnlag-fra-fagsystem',
    heading: 'Hva som kan sendes, og hva som må leses',
    anchor: 'integrasjon mellom fagsystem og økonomi',
  },
  {
    slug: 'eformidling-ikke-koblet',
    heading: 'Hva som kan settes opp, og hva som må limes',
    anchor: 'integrasjonslaget mellom systemene',
  },
  {
    slug: 'ks-fiks-svarinn-mangler',
    heading: 'Hva som kan settes opp, og hva som må ventes',
    anchor: 'koble mottaket til fagsystemet',
  },
  {
    slug: 'altinn-innboks-manuelt-mellomlager',
    heading: 'Hva som kan sendes, og hva som må leses',
    anchor: 'hente innsendingen rett inn i saken',
  },
  {
    slug: 'startskudd-og-sak-arkiv',
    heading: 'Hva som kan kobles, og hva som blir manuelt',
    anchor: 'integrasjon mot sak og arkiv',
  },
  {
    slug: 'skjenkebevilling-integrasjon-360-visma',
    heading: 'Hva som kan kobles, og hva som blir manuelt',
    anchor: 'systemintegrasjon',
  },
  {
    slug: 'ebyggesak-mange-leverandorer',
    heading: 'Hva som kan kobles, og hva som blir manuelt',
    anchor: 'integrasjon på tvers av leverandører',
  },
  {
    slug: 'digisos-og-lokalt-fagsystem',
    heading: 'Hva som kan settes opp, og hva som må ventes',
    anchor: 'koble det lokale fagsystemet',
  },
  {
    slug: 'folkeregister-husholdning-foreldrebetaling',
    heading: 'Hva som kan slås opp, og hva som må spørres',
    anchor: 'registeroppslag inn i fagsystemet',
  },
  {
    slug: 'digdir-arkitekturprinsipper-i-praksis-for-kommunen',
    heading: 'Slik gjør Xala det',
    anchor: 'integrasjoner som deler og gjenbruker data',
  },
];

const LEAVE_ALONE = [
  'id-porten-eller-maskinporten-hva-velger-du',
  'maskinporten-vs-id-porten-system-til-system',
  'altinn-3-hva-endrer-seg-for-fagsystemet',
];

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function fileFor(slug: string): string {
  const name = readdirSync(BLOG).find((entry) => entry.endsWith(`${slug}.md`));
  if (!name) throw new Error(`missing post ${slug}`);
  return readFileSync(join(BLOG, name), 'utf8');
}

function bodyOf(source: string): string {
  return source.replace(/^---[\s\S]*?---\n/, '');
}

function sectionOf(body: string, heading: string): string {
  const marker = `## ${heading}`;
  const start = body.indexOf(marker);
  if (start < 0) throw new Error(`missing heading: ${heading}`);
  const after = body.slice(start + marker.length);
  const next = after.search(/\n## /);
  return next < 0 ? after : after.slice(0, next);
}

function linksToService(text: string): string[] {
  return [...text.matchAll(LINK)]
    .filter((match) => match[2] === TARGET || match[2] === `https://xala.no${TARGET}`)
    .map((match) => match[1]);
}

describe('systemintegrasjon contextual links', () => {
  it('places each assigned anchor once, in the named section', () => {
    const bare: string[] = [];

    for (const placement of PLACEMENTS) {
      const section = sectionOf(bodyOf(fileFor(placement.slug)), placement.heading);
      const anchors = linksToService(section);
      expect(anchors, placement.slug).toEqual([placement.anchor]);
      if (placement.anchor === 'systemintegrasjon') bare.push(placement.slug);
    }

    expect(bare).toEqual([
      'systemintegrasjon-i-kommunen-myter-og-fakta',
      'skjenkebevilling-integrasjon-360-visma',
    ]);
    expect(bare.length).toBeLessThanOrEqual(3);
  });

  it('keeps the existing Neste steg link on the myter post', () => {
    const section = sectionOf(
      bodyOf(fileFor('systemintegrasjon-i-kommunen-myter-og-fakta')),
      'Neste steg',
    );
    expect(linksToService(section)).toEqual(['Se hvordan vi bygger integrasjoner som tåler nedetid']);
  });

  it('does not point the felleskomponent posts at systemintegrasjon', () => {
    for (const slug of LEAVE_ALONE) {
      expect(linksToService(fileFor(slug)), slug).toEqual([]);
    }
  });

  it('lists the myter post and the 360 post under Les mer, and keeps the existing one', () => {
    const slugs = (
      servicePages as Record<string, { postSlugs: string[] }>
    ).systemintegrasjon.postSlugs;
    expect(slugs).toEqual([
      'integrasjoner-mot-nasjonale-felleskomponenter',
      'systemintegrasjon-i-kommunen-myter-og-fakta',
      'public-360-og-fagsystem-snakker-ikke',
    ]);
  });

  it('adds the link only on the sixteen assigned posts', () => {
    const linked = readdirSync(BLOG)
      .filter((name) => name.endsWith('.md') && name !== 'README.md')
      .filter((name) => linksToService(readFileSync(join(BLOG, name), 'utf8')).length > 0)
      .map((name) => name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''));

    expect(linked.sort()).toEqual(PLACEMENTS.map((placement) => placement.slug).sort());
  });
});
