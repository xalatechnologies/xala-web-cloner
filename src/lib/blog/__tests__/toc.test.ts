import { describe, expect, it } from 'vitest';
import { extractFaq, extractHeadings, faqJsonLd, splitLeadSection } from '../toc';

describe('extractHeadings', () => {
  it('returns h2 headings in document order with anchor ids', () => {
    const body = [
      'Intro paragraph.',
      '',
      '## Første steg',
      'text',
      '',
      '## Andre steg',
      'text',
    ].join('\n');

    expect(extractHeadings(body)).toEqual([
      { id: 'forste-steg', text: 'Første steg' },
      { id: 'andre-steg', text: 'Andre steg' },
    ]);
  });

  it('ignores h1, h3 and deeper — the TOC is one level', () => {
    const body = '# Tittel\n\n## Seksjon\n\n### Underseksjon\n\n#### Dypere';
    expect(extractHeadings(body)).toEqual([{ id: 'seksjon', text: 'Seksjon' }]);
  });

  it('ignores # lines inside fenced code blocks', () => {
    const body = [
      '## Ekte overskrift',
      '',
      '```bash',
      '## ikke en overskrift',
      '# heller ikke',
      '```',
      '',
      '## Etter kodeblokken',
    ].join('\n');

    expect(extractHeadings(body).map((h) => h.text)).toEqual([
      'Ekte overskrift',
      'Etter kodeblokken',
    ]);
  });

  it('handles tilde fences and does not let a ``` inside them close the block', () => {
    const body = '~~~\n## skjult\n```\n~~~\n\n## synlig';
    expect(extractHeadings(body).map((h) => h.text)).toEqual(['synlig']);
  });

  it('strips inline emphasis, code and links from heading text', () => {
    const body = '## Bruk `useMemo` for **tunge** [beregninger](https://example.com)';
    expect(extractHeadings(body)).toEqual([
      { id: 'bruk-usememo-for-tunge-beregninger', text: 'Bruk useMemo for tunge beregninger' },
    ]);
  });

  it('gives repeated headings distinct ids so links do not collide', () => {
    const body = '## Oppsummering\n\ntext\n\n## Oppsummering\n\ntext';
    expect(extractHeadings(body).map((h) => h.id)).toEqual([
      'oppsummering',
      'oppsummering-2',
    ]);
  });

  it('transliterates Norwegian characters rather than dropping them', () => {
    expect(extractHeadings('## Bærekraftig løsning på Åsen')[0].id).toBe(
      'baerekraftig-losning-pa-asen'
    );
  });

  it('returns an empty list for a body with no headings', () => {
    expect(extractHeadings('Bare tekst, ingen struktur.')).toEqual([]);
  });
});

describe('splitLeadSection', () => {
  it('lifts an opening Kort svar so the template can put it above the cover', () => {
    const body = [
      '## Kort svar',
      '',
      'Regelstyrte steg kan automatiseres. [Digdir](https://www.digdir.no) og Prop. 79 L.',
      '',
      '## Neste seksjon',
      '',
      'Resten av artikkelen.',
    ].join('\n');

    expect(splitLeadSection(body)).toEqual({
      lead: '## Kort svar\n\nRegelstyrte steg kan automatiseres. [Digdir](https://www.digdir.no) og Prop. 79 L.',
      rest: '## Neste seksjon\n\nResten av artikkelen.',
    });
  });

  it('recognises the English heading too', () => {
    const body = '## Short answer\n\nYes.\n\n## Next\n\nNo.';
    expect(splitLeadSection(body).lead).toBe('## Short answer\n\nYes.');
    expect(splitLeadSection(body).rest).toBe('## Next\n\nNo.');
  });

  it('leaves a body without a lead heading untouched', () => {
    const body = '## Innledning\n\nTekst.';
    expect(splitLeadSection(body)).toEqual({ lead: '', rest: body });
  });

  it('does not lift a Kort svar that is not the first h2', () => {
    const body = '## Bakgrunn\n\nTekst.\n\n## Kort svar\n\nSvaret.';
    expect(splitLeadSection(body)).toEqual({ lead: '', rest: body });
  });

  it('ignores a ## Kort svar inside a fenced code block', () => {
    const body = '```md\n## Kort svar\n```\n\n## Innledning\n\nTekst.';
    expect(splitLeadSection(body)).toEqual({ lead: '', rest: body });
  });

  it('keeps the lead when it is the only section', () => {
    const body = '## Kort svar\n\nBare dette.';
    expect(splitLeadSection(body)).toEqual({ lead: body, rest: '' });
  });
});

describe('extractFaq', () => {
  const body = [
    '## Innledning',
    'Ikke en FAQ.',
    '',
    '### Dette er ikke et spørsmål',
    'Fordi det står utenfor FAQ-seksjonen.',
    '',
    '## Ofte stilte spørsmål',
    '',
    '### Hvor lang tid tar det?',
    'Tre til seks måneder.',
    'Avhengig av omfang.',
    '',
    '### Hva koster det?',
    'Det avhenger av scope.',
    '',
    '## Neste steg',
    'Ta kontakt.',
  ].join('\n');

  it('pairs h3 questions with their following prose', () => {
    expect(extractFaq(body)).toEqual([
      { question: 'Hvor lang tid tar det?', answer: 'Tre til seks måneder. Avhengig av omfang.' },
      { question: 'Hva koster det?', answer: 'Det avhenger av scope.' },
    ]);
  });

  it('ignores h3 headings outside the FAQ section', () => {
    expect(extractFaq(body).map((f) => f.question)).not.toContain(
      'Dette er ikke et spørsmål'
    );
  });

  it('stops collecting at the next h2', () => {
    expect(extractFaq(body).at(-1)?.answer).toBe('Det avhenger av scope.');
  });

  it('recognises the English heading too', () => {
    const en = '## Frequently asked questions\n\n### How long?\nThree months.';
    expect(extractFaq(en)).toEqual([{ question: 'How long?', answer: 'Three months.' }]);
  });

  it('returns nothing when the post has no FAQ section', () => {
    expect(extractFaq('## Innledning\n\nTekst.')).toEqual([]);
  });

  it('drops a question with no answer rather than publishing an empty one', () => {
    expect(extractFaq('## FAQ\n\n### Ubesvart?\n\n### Besvart?\nJa.')).toEqual([
      { question: 'Besvart?', answer: 'Ja.' },
    ]);
  });
});

describe('faqJsonLd', () => {
  it('returns null for an empty FAQ instead of an empty FAQPage', () => {
    expect(faqJsonLd('https://xala.no/blogg/x', [])).toBeNull();
  });

  it('emits one Question per item with the answer text', () => {
    const schema = faqJsonLd('https://xala.no/blogg/x', [
      { question: 'Hva?', answer: 'Svar.' },
    ]) as Record<string, unknown>;

    expect(schema['@type']).toBe('FAQPage');
    expect(schema['@id']).toBe('https://xala.no/blogg/x#faq');
    expect(schema.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Hva?',
        acceptedAnswer: { '@type': 'Answer', text: 'Svar.' },
      },
    ]);
  });
});
