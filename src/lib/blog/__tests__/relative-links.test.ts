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
 * This scan therefore reads link destinations in the body only. A
 * canonical-type field in the frontmatter block is not a body link and is
 * left alone; today no post has one, and the renderer would ignore it.
 */
const DIR = resolve(__dirname, '../../../content/blog');

const ABSOLUTE_XALA = /^https?:\/\/(?:www\.)?xala\.no(?=$|[/?#])/i;
const URL_CANDIDATE = /https?:\/\/[^\s)>"']+/gi;

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
  for (const match of line.matchAll(/<https?:\/\/[^>\s]+>/gi)) {
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
    .replace(/<https?:\/\/[^>\s]+>/gi, ' ')
    .replace(/^\s{0,3}\[[^\]]+\]:\s+\S+/, ' ');
}

/** Sentence punctuation sits outside the URL GFM would actually link. */
function trimTrailingPunctuation(href: string): string {
  return href.replace(/[.,;:!?]+$/g, '');
}

/**
 * Absolute xala.no / www.xala.no link destinations in the markdown body.
 * Line numbers are positions in the file, including the frontmatter lines
 * that were skipped.
 */
export function absoluteXalaLinks(source: string): AbsoluteLink[] {
  const lines = source.split(/\r?\n/);
  const start = bodyStart(lines);
  const hits: AbsoluteLink[] = [];
  let fence: '`' | '~' | null = null;

  for (let i = start; i < lines.length; i += 1) {
    const fenceMark = /^\s{0,3}(`{3,}|~{3,})/.exec(lines[i]);
    if (fenceMark) {
      const marker = fenceMark[1][0] as '`' | '~';
      fence = fence === marker ? null : fence ?? marker;
      continue;
    }
    if (fence) continue;

    const line = stripInlineCode(lines[i]);
    const seen = new Set<string>();
    const record = (href: string) => {
      if (!ABSOLUTE_XALA.test(href) || seen.has(href)) return;
      seen.add(href);
      hits.push({ line: i + 1, href });
    };

    for (const href of linkDestinations(line)) record(trimTrailingPunctuation(href));
    const bare = withoutStructuredLinks(line);
    for (const match of bare.matchAll(new RegExp(URL_CANDIDATE.source, 'gi'))) {
      record(trimTrailingPunctuation(match[0]));
    }
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

  it('fails with file and line when a body link uses an absolute xala.no URL', () => {
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

  it('flags http, https, and www in body links and hrefs, and skips frontmatter', () => {
    const source = [
      '---',
      'canonical: https://xala.no/blogg/ignored',
      'faq:',
      '  - question: "Hvor?"',
      '    answer: "Se [siden](https://www.xala.no/kontakt)."',
      '---',
      'Se [Noark](https://xala.no/blogg/noark-5-arkivering-i-moderne-fagsystemer).',
      'Og [modernisering](http://www.xala.no/tjenester/modernisering-av-fagsystemer).',
      '<a href="http://xala.no/kontakt">Kontakt</a>',
      '<https://xala.no/book-demo>',
      '[ref]: https://www.xala.no/caser/altinn',
      'Bare https://xala.no/blogg/x og https://xala.no.',
      'Relativt [ok](/blogg/noark-5-arkivering-i-moderne-fagsystemer) og [lov](https://lovdata.no/x).',
      'Post `https://xala.no/blogg/inne-i-kode` er ikke en lenke.',
      '```',
      '[ikke](https://xala.no/blogg/i-kodeblokk)',
      '```',
      'mailto:info@xala.no og https://xala.no.example/blogg/x teller ikke.',
    ].join('\n');

    expect(absoluteXalaLinks(source)).toEqual([
      { line: 7, href: 'https://xala.no/blogg/noark-5-arkivering-i-moderne-fagsystemer' },
      { line: 8, href: 'http://www.xala.no/tjenester/modernisering-av-fagsystemer' },
      { line: 9, href: 'http://xala.no/kontakt' },
      { line: 10, href: 'https://xala.no/book-demo' },
      { line: 11, href: 'https://www.xala.no/caser/altinn' },
      { line: 12, href: 'https://xala.no/blogg/x' },
      { line: 12, href: 'https://xala.no' },
    ]);
  });
});
