/**
 * Reading the structure of a post out of its own markdown.
 *
 * Two things are derived here, and both matter for reasons beyond layout:
 *
 * - The table of contents, from `##` headings. Answer engines and humans both
 *   scan before they read; an article with no visible structure is an article
 *   nobody scrolls.
 * - The FAQ, from `###` headings or a bold `**Question?**` line under a
 *   "Ofte stilte spørsmål" section. This
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
const FAQ_HEADING = /^(ofte stilte sp(ø|o)rsm(å|a)l|vanlige sp(ø|o)rsm(å|a)l|sp(ø|o)rsm(å|a)l og svar|faq|frequently asked questions)\b/i;

/**
 * Opening "Kort svar" / "Short answer" — the house lead. Lifted above the
 * cover so the answer is on the first screen instead of two viewports down.
 */
const LEAD_HEADING = /^(kort svar|short answer)\b/i;

export interface LeadSection {
  /** Markdown of the lead heading plus its body, ready to render. */
  lead: string;
  /** The rest of the article, with the lead section removed. */
  rest: string;
}

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
 * Pull an opening Kort svar / Short answer off the body, if the post has one.
 *
 * Only the first `##` counts, and only when it is the lead heading. A later
 * "Kort svar" stays in the article flow — lifting a mid-piece recap would
 * invert the argument. Posts without a lead are returned unchanged so the
 * template can keep a single render path.
 */
export function splitLeadSection(body: string): LeadSection {
  const lines = body.split('\n');
  let inFence = false;
  let fence = '';
  let leadStart = -1;
  let restStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
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
    if (inFence) continue;

    const text = headingAt(line, 2);
    if (!text) continue;

    if (leadStart === -1) {
      if (!LEAD_HEADING.test(text)) break;
      leadStart = i;
      continue;
    }

    restStart = i;
    break;
  }

  if (leadStart === -1) return { lead: '', rest: body };

  const end = restStart === -1 ? lines.length : restStart;
  const prefix = lines.slice(0, leadStart).join('\n').replace(/\s+$/, '');
  const after = lines.slice(end).join('\n').replace(/^\s+/, '');
  return {
    lead: lines.slice(leadStart, end).join('\n').replace(/\s+$/, ''),
    // Prose before the first Kort svar is the lede, not part of the box.
    // Dropping it would silently delete the opening of posts that set the
    // scene before the boxed answer.
    rest: [prefix, after].filter(Boolean).join('\n\n'),
  };
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
 * An answer is every line between one question and the next heading, joined
 * into a single string — schema.org `acceptedAnswer.text` takes plain text,
 * and a multi-paragraph answer that arrives as one blob still answers the
 * question. Questions are `###` headings, or a lone `**Question?**` line
 * (the form the approved copy uses).
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

    const bold = /^\s*\*\*(.+?\?)\*\*\s*$/.exec(line);
    if (bold) {
      flush();
      question = plainText(bold[1]);
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

/**
 * Strip the manual "## Relaterte artikler" section from markdown body.
 *
 * The template renders programmatic related articles in the sidebar and at the
 * bottom. When a post also carries a hand-written "## Relaterte artikler"
 * section in its markdown, the result is two headings with the same title
 * (XWEB-202). This filter removes the manual section so only the template's
 * version appears.
 */
export function stripRelatedArticles(body: string): string {
  const lines = body.split('\n');
  let inFence = false;
  let fence = '';
  let sectionStart = -1;
  let sectionEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
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
    if (inFence) continue;

    const text = headingAt(line, 2);
    if (!text) continue;

    if (sectionStart === -1) {
      if (/^relaterte artikler$/i.test(text)) {
        sectionStart = i;
      }
      continue;
    }

    sectionEnd = i;
    break;
  }

  if (sectionStart === -1) return body;

  const end = sectionEnd === -1 ? lines.length : sectionEnd;
  const before = lines.slice(0, sectionStart).join('\n').replace(/\s+$/, '');
  const after = lines.slice(end).join('\n').replace(/^\s+/, '');
  return [before, after].filter(Boolean).join('\n\n');
}
