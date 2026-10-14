import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Internal links in blog markdown must be root-relative paths.
 *
 * Canonical URLs are not a frontmatter field. `BlogFrontmatter` has no
 * canonical (or og:url) property, and `postMeta()` in `src/lib/blog/seo.ts`
 * builds `canonical` as `https://xala.no/blogg/<slug>` for the document
 * `<link rel="canonical">`, `og:url`, and Article JSON-LD. The site relies on
 * that generated absolute URL, not on anything written in the markdown file.
 * The scan reads link destinations in the body and in frontmatter
 * `faq[].answer` strings. Those answers are rendered as markdown on the page
 * and in FAQPage JSON-LD. A canonical-type field is not an answer and is left
 * alone; today no post has one, and `parsePost` would ignore it.
 */
const DIR = resolve(__dirname, '../../../content/blog');

/** http(s) or protocol-relative, apex or www. */
const ABSOLUTE_XALA = /^(?:https?:)?\/\/(?:www\.)?xala\.no(?=$|[/?#])/i;
const URL_CANDIDATE = /(?:https?:)?\/\/[^\s)>"']+/gi;
const AUTOLINK = /<(?:https?:)?\/\/[^>\s]+>/gi;

interface AbsoluteLink {
  line: number;
  href: string;
}

/** Body line index where the YAML block ends. `0` when the file has none. */
function bodyStart(lines: string[]): number {
  if (lines[0]?.trim() !== '---') return 0;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') return i + 1;
  }
  return 0;
}

function stripInlineCode(line: string): string {
  return line.replace(/`[^`\n]*`/g, ' ');
}

/** Destinations of markdown links, autolinks, reference defs, and hrefs. */
function linkDestinations(line: string): string[] {
  const dests: string[] = [];
  const inline = /!?\[[^\]]*\]\(\s*(<[^>\s]+>|[^)\s]+)/g;
  for (const match of line.matchAll(inline)) {
    const raw = match[1];
    dests.push(raw.startsWith('<') && raw.endsWith('>') ? raw.slice(1, -1) : raw);
  }
  for (const match of line.matchAll(/href\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    dests.push(match[1] ?? match[2] ?? '');
  }
  for (const match of line.matchAll(new RegExp(AUTOLINK.source, 'gi'))) {
    dests.push(match[0].slice(1, -1));
  }
  const reference = /^\s{0,3}\[[^\]]+\]:\s+(\S+)/.exec(line);
  if (reference) {
    const raw = reference[1];
    dests.push(raw.startsWith('<') && raw.endsWith('>') ? raw.slice(1, -1) : raw);
  }
  return dests.filter(Boolean);
}

function withoutStructuredLinks(line: string): string {
  return line
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/href\s*=\s*(?:"[^"]*"|'[^']*')/gi, ' ')
    .replace(new RegExp(AUTOLINK.source, 'gi'), ' ')
    .replace(/^\s{0,3}\[[^\]]+\]:\s+\S+/, ' ');
}

/** Sentence punctuation sits outside the URL GFM would actually link. */
function trimTrailingPunctuation(href: string): string {
  return href.replace(/[.,;:!?]+$/g, '');
}

function isFaqAnswerLine(line: string): boolean {
  return /^\s+(?:-\s+)?answer\s*:/.test(line);
}

function scanLine(line: string, lineNumber: number, hits: AbsoluteLink[]) {
  const seen = new Set<string>();
  const record = (href: string) => {
    if (!ABSOLUTE_XALA.test(href) || seen.has(href)) return;
    seen.add(href);
    hits.push({ line: lineNumber, href });
  };

  const stripped = stripInlineCode(line);
  for (const href of linkDestinations(stripped)) record(trimTrailingPunctuation(href));
  const bare = withoutStructuredLinks(stripped);
  for (const match of bare.matchAll(new RegExp(URL_CANDIDATE.source, 'gi'))) {
    record(trimTrailingPunctuation(match[0]));
  }
}

/**
 * Absolute or protocol-relative xala.no / www.xala.no link destinations.
 * Line numbers are positions in the file. Frontmatter is skipped except
 * `faq[].answer`.
 */
export function absoluteXalaLinks(source: string): AbsoluteLink[] {
  const lines = source.split(/\r?\n/);
  const start = bodyStart(lines);
  const hits: AbsoluteLink[] = [];
  let fence: '`' | '~' | null = null;
  let inFaq = false;

  for (let i = 0; i < lines.length; i += 1) {
    if (i < start) {
      const line = lines[i];
      if (/^faq\s*:/.test(line)) {
        inFaq = true;
        continue;
      }
      if (inFaq && /^[A-Za-z_][\w-]*\s*:/.test(line)) inFaq = false;
      if (inFaq && isFaqAnswerLine(line)) scanLine(line, i + 1, hits);
      continue;
    }

    const fenceMark = /^\s{0,3}(`{3,}|~{3,})/.exec(lines[i]);
    if (fenceMark) {
      const marker = fenceMark[1][0] as '`' | '~';
      fence = fence === marker ? null : fence ?? marker;
      continue;
    }
    if (fence) continue;
    scanLine(lines[i], i + 1, hits);
  }

  return hits;
}

function formatHit(file: string, hit: AbsoluteLink): string {
  return `${file}:${hit.line} ${hit.href}`;
}

describe('blog body links are relative', () => {
  const files = readdirSync(DIR)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .sort();

  it('reads every markdown file in src/content/blog', () => {
    expect(files.length).toBeGreaterThanOrEqual(70);
    expect(files).toContain('2026-10-14-datamigrering-i-kommunen-sjekk-dette-forst.md');
    expect(files).toContain('README.md');
  });

  it('fails with file and line when a body or FAQ answer link uses an absolute xala.no URL', () => {
    const violations = files.flatMap((name) => {
      const source = readFileSync(join(DIR, name), 'utf8');
      return absoluteXalaLinks(source).map((hit) => formatHit(`src/content/blog/${name}`, hit));
    });

    expect(violations, violations.join('\n')).toEqual([]);
  });

  it('keeps the datamigrering internal links root-relative', () => {
    const source = readFileSync(
      join(DIR, '2026-10-14-datamigrering-i-kommunen-sjekk-dette-forst.md'),
      'utf8',
    );
    expect(source).toContain('](/blogg/noark-5-arkivering-i-moderne-fagsystemer)');
    expect(source).toContain('](/tjenester/modernisering-av-fagsystemer)');
  });

  it('flags http, https, www, and protocol-relative links in the body and in faq answers', () => {
    const source = [
      '---',
      'canonical: https://xala.no/blogg/ignored',
      'faq:',
      '  - question: "Hvor?"',
      '    answer: "Se [siden](https://www.xala.no/kontakt)."',
      '    answer: "Og [proto](//xala.no/blogg/fra-faq)."',
      '---',
      'Se [Noark](https://xala.no/blogg/noark-5-arkivering-i-moderne-fagsystemer).',
      'Og [modernisering](http://www.xala.no/tjenester/modernisering-av-fagsystemer).',
      '<a href="http://xala.no/kontakt">Kontakt</a>',
      '<a href="//www.xala.no/book-demo">Demo</a>',
      '<https://xala.no/book-demo>',
      '<//xala.no/caser/altinn>',
      '[ref]: https://www.xala.no/caser/altinn',
      '[ref]: //www.xala.no/kontakt',
      'Bare https://xala.no/blogg/x og https://xala.no.',
      '[proto](//xala.no/blogg/proto) og [www](//www.xala.no/tjenester/proto).',
      'Bare //xala.no/caser/altinn og //www.xala.no.',
      'Relativt [ok](/blogg/noark-5-arkivering-i-moderne-fagsystemer) og [lov](https://lovdata.no/x).',
      'Post `https://xala.no/blogg/inne-i-kode` og `//xala.no/inne-i-kode` er ikke lenker.',
      '```',
      '[ikke](//xala.no/blogg/i-kodeblokk)',
      '```',
      'mailto:info@xala.no og https://xala.no.example/blogg/x teller ikke.',
      'Heller ikke //xala.no.example/blogg/x.',
    ].join('\n');

    expect(absoluteXalaLinks(source)).toEqual([
      { line: 5, href: 'https://www.xala.no/kontakt' },
      { line: 6, href: '//xala.no/blogg/fra-faq' },
      { line: 8, href: 'https://xala.no/blogg/noark-5-arkivering-i-moderne-fagsystemer' },
      { line: 9, href: 'http://www.xala.no/tjenester/modernisering-av-fagsystemer' },
      { line: 10, href: 'http://xala.no/kontakt' },
      { line: 11, href: '//www.xala.no/book-demo' },
      { line: 12, href: 'https://xala.no/book-demo' },
      { line: 13, href: '//xala.no/caser/altinn' },
      { line: 14, href: 'https://www.xala.no/caser/altinn' },
      { line: 15, href: '//www.xala.no/kontakt' },
      { line: 16, href: 'https://xala.no/blogg/x' },
      { line: 16, href: 'https://xala.no' },
      { line: 17, href: '//xala.no/blogg/proto' },
      { line: 17, href: '//www.xala.no/tjenester/proto' },
      { line: 18, href: '//xala.no/caser/altinn' },
      { line: 18, href: '//www.xala.no' },
    ]);
  });
});
