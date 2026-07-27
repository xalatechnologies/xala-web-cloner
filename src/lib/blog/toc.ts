/**
 * Reading the structure of a post out of its own markdown.
 *
 * Two things are derived here, and both matter for reasons beyond layout:
 *
 * - The table of contents, from `##` headings. Answer engines and humans both
 *   scan before they read; an article with no visible structure is an article
 *   nobody scrolls.
 * - The FAQ, from `###` headings under a "Ofte stilte spørsmål" section. This
 *   feeds FAQPage schema, and deliberately reads it out of the *rendered body*
 *   rather than from frontmatter. Schema that is authored separately from the
 *   visible text can drift from it, and Google penalises exactly that. Derived
 *   this way the structured data cannot claim a question the page doesn't show.
 *
 * Everything here is pure so the prerender build and the browser agree.
 */
import { slugify } from '@/lib/slug';

export interface TocHeading {
  id: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Headings whose section is treated as the post's FAQ. */
const FAQ_HEADING = /^(ofte stilte sp(ø|o)rsm(å|a)l|sp(ø|o)rsm(å|a)l og svar|faq|frequently asked questions)\b/i;

/** Inline markdown emphasis/code marks, stripped so heading text reads clean. */
function plainText(markdown: string): string {
  return markdown
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_]{1,3}/g, '')
    .trim();
}

/**
 * Split into lines with fenced code blocks removed.
 *
 * A `# comment` inside a shell snippet is not a heading. Scanning the raw
 * string with a global regex — the obvious implementation — turns every such
 * line into a phantom TOC entry pointing at an anchor that does not exist.
 */
function proseLines(body: string): string[] {
  const out: string[] = [];
  let inFence = false;
  let fence = '';

  for (const line of body.split('\n')) {
    const opener = /^\s{0,3}(```+|~~~+)/.exec(line);
    if (opener) {
      if (!inFence) {
        inFence = true;
        fence = opener[1][0];
      } else if (opener[1][0] === fence) {
        inFence = false;
      }
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out;
}

function headingAt(line: string, level: number): string | null {
  const match = new RegExp(`^\\s{0,3}#{${level}}\\s+(.+?)\\s*#*\\s*$`).exec(line);
  if (!match) return null;
  const text = plainText(match[1]);
  return text || null;
}

/**
 * The `##` headings of a post, in document order, with the ids they will carry.
 *
 * The FAQ section is included: it is a real section of the article and readers
 * jump to it more than any other.
 */
export function extractHeadings(body: string): TocHeading[] {
  const seen = new Map<string, number>();
  const headings: TocHeading[] = [];

  for (const line of proseLines(body)) {
    const text = headingAt(line, 2);
    if (!text) continue;

    // Two sections can legitimately share a title ("Oppsummering" twice). One
    // id would make the second link jump to the first section.
    const base = slugify(text) || 'seksjon';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({ id: count === 0 ? base : `${base}-${count + 1}`, text });
  }

  return headings;
}

/**
 * Question/answer pairs from the post's FAQ section, if it has one.
 *
 * An answer is every line between one `###` and the next heading, joined into a
 * single string — schema.org `acceptedAnswer.text` takes plain text, and a
 * multi-paragraph answer that arrives as one blob still answers the question.
 */
export function extractFaq(body: string): FaqItem[] {
  const lines = proseLines(body);
  const items: FaqItem[] = [];

  let inFaq = false;
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    if (question) {
      const text = plainText(answer.join(' ').replace(/\s+/g, ' '));
      if (text) items.push({ question, answer: text });
    }
    question = null;
    answer = [];
  };

  for (const line of lines) {
    const h2 = headingAt(line, 2);
    if (h2) {
      flush();
      inFaq = FAQ_HEADING.test(h2);
      continue;
    }
    if (!inFaq) continue;

    const h3 = headingAt(line, 3);
    if (h3) {
      flush();
      question = h3;
      continue;
    }
    if (question && line.trim()) answer.push(line.trim());
  }
  flush();

  return items;
}

/**
 * schema.org FAQPage for a post, or null when it has no FAQ.
 *
 * Returning null rather than an empty FAQPage is the point: publishing
 * `mainEntity: []` tells a crawler the page answers nothing, which is worse
 * than staying quiet.
 */
export function faqJsonLd(url: string, items: FaqItem[]): Record<string, unknown> | null {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
