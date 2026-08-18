import { describe, expect, it } from 'vitest';
import { caseStudies } from '../index';
import {
  localizeCaseStudy,
  localizedCardExcerpt,
  localizedCardTitle,
  localizedSeo,
  normalizeCaseLang,
  visibleTechChips,
} from '../localized';
import { caseStudyFaqJsonLd } from '../faq';
import { caserEntries } from '@/data/caser-page-entries';

/**
 * The case index is the most persuasive page on the site, and it showed all
 * seventeen blurbs in English to a Norwegian audience. The translations existed
 * the whole time — every case study already carried a Norwegian `card.excerpt`
 * — but /caser reads from its own list, whose `description` has no language
 * dimension, so none of them were ever used.
 *
 * These assertions cover the two ways that comes back: a case study written
 * without the Norwegian blurb, and an entry on the index whose slug does not
 * resolve to a study, which would silently fall back to English.
 */
describe('localizedCardExcerpt', () => {
  const linked = caserEntries.filter((entry) => entry.slug);

  it('finds the entries it is meant to check', () => {
    expect(linked.length).toBeGreaterThanOrEqual(17);
  });

  it.each(linked.map((entry) => [entry.slug!, entry] as const))(
    '%s resolves to a case study',
    (slug) => {
      expect(caseStudies.some((study) => study.slug === slug), `no case study for ${slug}`).toBe(
        true
      );
    }
  );

  it.each(linked.map((entry) => [entry.slug!, entry] as const))(
    '%s has a Norwegian card blurb that differs from the English one',
    (slug) => {
      const no = localizedCardExcerpt(slug, 'no');
      const en = localizedCardExcerpt(slug, 'en');

      expect(no, `${slug} has no Norwegian excerpt`).toBeTruthy();
      expect(no!.length).toBeGreaterThan(40);
      // Identical strings mean the fallback fired — the translation is absent
      // and the card would quietly render English.
      expect(no, `${slug} falls back to English`).not.toBe(en);
    }
  );

  it('falls back rather than returning nothing when a language is missing', () => {
    const slug = linked[0].slug!;
    // Arabic is not authored for every study; the card must still say something.
    expect(localizedCardExcerpt(slug, 'ar')).toBeTruthy();
  });

  it('returns undefined for an unknown or absent slug, so callers keep their own text', () => {
    expect(localizedCardExcerpt(undefined, 'no')).toBeUndefined();
    expect(localizedCardExcerpt('ikke-en-case', 'no')).toBeUndefined();
  });

  it.each(linked.map((entry) => [entry.slug!, entry] as const))(
    '%s ships Norwegian first-HTML SEO without an English Case Study template',
    (slug) => {
      const study = caseStudies.find((item) => item.slug === slug);
      expect(study, `no case study for ${slug}`).toBeTruthy();

      const no = localizedSeo(study!, 'no');
      const en = localizedSeo(study!, 'en');

      expect(no.title, `${slug} has no Norwegian title`).toBeTruthy();
      expect(no.description, `${slug} has no Norwegian description`).toBeTruthy();
      expect(no.title).not.toMatch(/case study/i);
      expect(no.title).not.toContain('Municipality');
      expect(no.description).not.toMatch(/see how xala/i);
      expect(no.description).not.toMatch(/99[,.]99/);
      expect(no.description, `${slug} falls back to English SEO`).not.toBe(en.description);
    }
  );

  it.each(caseStudies.map((study) => [study.slug, study] as const))(
    '%s has a Norwegian visible title without Municipality',
    (_slug, study) => {
      const title = localizeCaseStudy(study, 'no').title;
      expect(title).toBeTruthy();
      expect(title).not.toContain('Municipality');
    }
  );

  it('shows Nordre Follo as Nordre Follo kommune on the Norwegian listing', () => {
    const title = localizedCardTitle(
      'nordre-follo-tilskuddsportal-bevillingsportal',
      'Nordre Follo Municipality',
      'no'
    );
    expect(title).toBe('Nordre Follo kommune');
    expect(title).not.toContain('Municipality');
  });

  it('gives Nordre Follo a Norwegian h1 and body on nb-NO without inventing kroner or SLA', () => {
    const study = caseStudies.find(
      (item) => item.slug === 'nordre-follo-tilskuddsportal-bevillingsportal'
    );
    expect(study).toBeTruthy();
    const no = localizeCaseStudy(study!, 'no');
    const en = localizeCaseStudy(study!, 'en');

    expect(no.title).toBe('Nordre Follo kommune');
    expect(no.title).not.toContain('Municipality');
    expect(no.industry).toMatch(/offentlig sektor/i);
    expect(no.industry).not.toMatch(/public sector/i);
    expect(no.role.join(' ')).toMatch(/arkitektur/i);
    expect(no.role.join(' ')).not.toMatch(/architecture/i);
    expect(no.solution.modules.join(' ')).toMatch(/tilskuddsportal/i);
    expect(no.solution.modules.join(' ')).not.toMatch(/grant-related/i);
    expect(no.solution.users?.join(' ')).toMatch(/innbyggere/i);
    expect(no.timeline[0].phase).toBe('Behovsanalyse');
    expect(no.architectureDiagram.title).toMatch(/arkitektur/i);
    expect(no.architectureDiagram.title).not.toMatch(/municipal grant/i);
    expect(no.architectureDiagram.layers?.[0].name).toBe('Brukere');
    expect(JSON.stringify(no)).not.toMatch(/kr\s?\d|NOK\s?\d/i);
    expect(no.summary).not.toBe(en.summary);

    const altinn = localizeCaseStudy(caseStudies.find((item) => item.slug === 'altinn')!, 'no');
    expect(JSON.stringify(altinn)).not.toMatch(/99[,.]99/);
    expect(JSON.stringify(altinn)).not.toMatch(/kr\s?\d|NOK\s?\d/i);
  });

  it('shows Nordre Follo tech chips in Norwegian on nb-NO without inventing kroner or SLA', () => {
    const study = caseStudies.find(
      (item) => item.slug === 'nordre-follo-tilskuddsportal-bevillingsportal'
    );
    expect(study).toBeTruthy();
    const no = localizeCaseStudy(study!, 'no');
    const en = localizeCaseStudy(study!, 'en');
    const chips = visibleTechChips(no).join(' | ');

    expect(chips).toMatch(/Autentiseringstjenester/);
    expect(chips).toMatch(/Kommunale integrasjoner/);
    expect(chips).toMatch(/Rollestyrt tilgangskontroll/);
    expect(chips).toMatch(/Kommunale systemintegrasjoner/);
    expect(chips).toMatch(/Testing og validering/);
    expect(chips).toMatch(/Driftsstøtte/);
    expect(chips).toMatch(/Overvåking og driftsklarhet/);
    expect(chips).not.toMatch(/Authentication services/);
    expect(chips).not.toMatch(/Municipal integrations/);
    expect(chips).not.toMatch(/Role-based access control/);
    expect(chips).not.toMatch(/Municipal system integrations/);
    expect(chips).not.toMatch(/Testing and validation/);
    expect(chips).not.toMatch(/Deployment support/);
    expect(chips).not.toMatch(/Monitoring and operational readiness/);
    expect(chips).toMatch(/React/);
    expect(chips).toMatch(/TypeScript/);
    expect(chips).toMatch(/\.NET/);
    expect(JSON.stringify(no)).not.toMatch(/kr\s?\d|NOK\s?\d/i);
    expect(visibleTechChips(en).join(' ')).toMatch(/Authentication services/);

    const altinn = localizeCaseStudy(caseStudies.find((item) => item.slug === 'altinn')!, 'no');
    expect(JSON.stringify(altinn)).not.toMatch(/99[,.]99/);
    expect(JSON.stringify(altinn)).not.toMatch(/kr\s?\d|NOK\s?\d/i);
  });

  it('drops the XWEB-179 English chip phrases from every nb-NO case URL', () => {
    const leftover = [
      'Authentication services',
      'Municipal integrations',
      'Role-based access control',
      'Municipal system integrations',
      'Testing and validation',
      'Deployment support',
      'Monitoring and operational readiness',
    ];
    for (const study of caseStudies) {
      const chips = visibleTechChips(localizeCaseStudy(study, 'no'));
      for (const phrase of leftover) {
        expect(chips, `${study.slug} still shows “${phrase}”`).not.toContain(phrase);
      }
    }
  });

  it('gives Altinn the approved Norwegian SEO, Kort svar and four FAQs without invented figures', () => {
    const study = caseStudies.find((item) => item.slug === 'altinn');
    expect(study).toBeTruthy();
    const no = localizeCaseStudy(study!, 'no');
    const seo = localizedSeo(study!, 'no');

    expect(seo.title).toBe('Altinn 3 og Altinn Studio: hva Xala bidro med hos Digdir');
    expect(seo.description).toBe(
      'Altinn 3 er tredje generasjon plattform for digitale tjenester. Xala bidro hos Digdir til utvikling og modernisering, inkludert Altinn Studio. Xala eier ikke Altinn.'
    );
    expect(seo.description).not.toMatch(/—/);
    expect(no.client).toBe('Digitaliseringsdirektoratet (Digdir)');
    expect(no.kortSvar).toMatch(/Xala eier ikke Altinn/);
    expect(no.kortSvar).toContain('https://docs.altinn.studio/nb/community/about/');
    expect(no.kortSvar).toContain('https://samarbeid.digdir.no/altinn/ta-i-bruk-altinn-3/2333');
    expect(no.faq).toHaveLength(4);
    expect(no.faq?.map((item) => item.question)).toEqual([
      'Hva er Altinn 3?',
      'Hva er Altinn Studio?',
      'Hva gjorde Xala på Altinn 3?',
      'Er Xala leverandør av Altinn?',
    ]);
    expect(no.videre).toContain('/kontakt');
    expect(no.videre).toContain('/caser');
    expect(no.budget).toBeUndefined();
    expect(JSON.stringify(no)).not.toMatch(/99[,.]99/);
    expect(JSON.stringify(no)).not.toMatch(/70\s?%/);
    expect(JSON.stringify(no)).not.toMatch(/kr\s?\d|NOK\s?\d/i);
    expect(JSON.stringify(no)).toMatch(/Azure/);
    expect(JSON.stringify(no)).toMatch(/Kubernetes/);

    const schema = caseStudyFaqJsonLd('https://xala.no/caser/altinn', no);
    expect(schema).toBeTruthy();
    expect(schema!['@type']).toBe('FAQPage');
    expect(schema!['@id']).toBe('https://xala.no/caser/altinn#faq');
    const questions = (schema!.mainEntity as { name: string; acceptedAnswer: { text: string } }[]).map(
      (item) => item.name
    );
    expect(questions).toEqual(no.faq?.map((item) => item.question));
    const answers = (schema!.mainEntity as { acceptedAnswer: { text: string } }[]).map(
      (item) => item.acceptedAnswer.text
    );
    expect(answers.join(' ')).not.toMatch(/\[|\]\(/);
    expect(answers.join(' ')).toMatch(/Om Altinn 3/);

    expect(caseStudyFaqJsonLd('https://xala.no/caser/telia', { faq: undefined })).toBeNull();
  });

  it('collapses locale tags to the three languages that are authored', () => {
    expect(normalizeCaseLang('nb-NO')).toBe('no');
    expect(normalizeCaseLang('nn')).toBe('no');
    expect(normalizeCaseLang('en-GB')).toBe('en');
    expect(normalizeCaseLang('ar-EG')).toBe('ar');
    expect(normalizeCaseLang(undefined)).toBe('no');
  });
});
