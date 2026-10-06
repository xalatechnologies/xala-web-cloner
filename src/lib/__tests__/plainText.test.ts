import { describe, expect, it } from 'vitest';
import { markdownToPlainText } from '../plainText';

describe('markdownToPlainText', () => {
  it('turns a markdown link into its label', () => {
    expect(
      markdownToPlainText(
        '[Flerleietaker eller egen installasjon](/blogg/flerleietakerarkitektur-saas-offentlig-sektor)',
      ),
    ).toBe('Flerleietaker eller egen installasjon');
  });

  it('strips multiple links in one answer', () => {
    expect(
      markdownToPlainText(
        'Se [første](/a) og [andre](/b) for mer.',
      ),
    ).toBe('Se første og andre for mer.');
  });

  it('leaves plain text unchanged', () => {
    expect(markdownToPlainText('Nei. Fristen følger saken.')).toBe(
      'Nei. Fristen følger saken.',
    );
  });

  it('strips inline code and emphasis', () => {
    expect(markdownToPlainText('Bruk `useMemo` for **tunge** beregninger.')).toBe(
      'Bruk useMemo for tunge beregninger.',
    );
  });
});
