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

  it('strips inline code and paired emphasis', () => {
    expect(markdownToPlainText('Bruk `useMemo` for **tunge** beregninger.')).toBe(
      'Bruk useMemo for tunge beregninger.',
    );
    expect(markdownToPlainText('_kursiv_ ord')).toBe('kursiv ord');
  });

  it('leaves lone asterisks and underscores in identifiers and math', () => {
    expect(markdownToPlainText('snake_case_name')).toBe('snake_case_name');
    expect(markdownToPlainText('5 * 3')).toBe('5 * 3');
    expect(markdownToPlainText('2*3*4')).toBe('2*3*4');
    expect(markdownToPlainText('*')).toBe('*');
    expect(markdownToPlainText('_')).toBe('_');
  });

  it('strips star emphasis longest-first, including a suffix on the closer', () => {
    expect(markdownToPlainText('**Xala**s')).toBe('Xalas');
    expect(markdownToPlainText('2*3*4')).toBe('2*3*4');
    expect(markdownToPlainText('***a***')).toBe('a');
    expect(markdownToPlainText('**a**')).toBe('a');
    expect(markdownToPlainText('*a*')).toBe('a');
  });

  it('replaces an image with its alt text', () => {
    expect(markdownToPlainText('![alt](src)')).toBe('alt');
    expect(markdownToPlainText('Se ![alt](/images/x.png) her.')).toBe('Se alt her.');
  });

  it('unwraps inline code without stripping inside the span', () => {
    expect(markdownToPlainText('`a*b*c`')).toBe('a*b*c');
    expect(markdownToPlainText('`**Xala**s`')).toBe('**Xala**s');
    expect(markdownToPlainText('Bruk `a*b*c` og *kursiv*.')).toBe('Bruk a*b*c og kursiv.');
  });

  it('keeps an escaped asterisk as a literal asterisk', () => {
    expect(markdownToPlainText('\\*not emphasis\\*')).toBe('*not emphasis*');
    expect(markdownToPlainText('2\\*3')).toBe('2*3');
  });

  it('keeps id_token in plain heading-style labels', () => {
    expect(markdownToPlainText('Hva id_token ikke er')).toBe('Hva id_token ikke er');
  });

  it('unwraps nested emphasis inside bold', () => {
    expect(markdownToPlainText('**fet _kursiv_ fet**')).toBe('fet kursiv fet');
  });
});
