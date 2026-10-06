import { brotliDecompressSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * `<em>` was rendering upright site-wide. Global CSS sets `font-synthesis: none`,
 * and the self-hosted Inter faces were upright only, so the browser had no
 * italic to use and was not allowed to synthesize one.
 *
 * A static italic at weight 400 would be chosen for every italic, including
 * bold and headings, and those would lose their weight. The italic face is
 * therefore a variable font on the wght axis, 100–900. Weight synthesis stays
 * off, so upright text keeps the same faces.
 */
const ROOT = resolve(__dirname, '../..');

/** WOFF2 known-table index. Order is the one the WOFF2 directory uses. */
const KNOWN_TAGS = [
  'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm',
  'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern',
  'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC',
  'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar',
  'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty',
  'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat',
  'Gloc', 'Feat', 'Sill',
];

function fontFaces(css: string): string[] {
  return css.match(/@font-face\s*\{[^}]*\}/g) ?? [];
}

function field(block: string, name: string): string {
  const match = new RegExp(`${name}:\\s*([^;]+)`).exec(block);
  return match ? match[1].trim() : '';
}

function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function readBase128(data: Buffer, offset: number): { value: number; offset: number } {
  let result = 0;
  for (let i = 0; i < 5; i += 1) {
    const code = data[offset];
    offset += 1;
    result = result * 128 + (code & 0x7f);
    if ((code & 0x80) === 0) return { value: result, offset };
  }
  throw new Error('UIntBase128 longer than 5 bytes');
}

/**
 * Pull untransformed tables out of a woff2. The whole font is one brotli
 * stream; glyf/loca/hmtx may be transformed and are skipped.
 */
function readWoff2Tables(file: Buffer): Map<string, Buffer> {
  expect(file.subarray(0, 4).toString('ascii')).toBe('wOF2');
  const numTables = file.readUInt16BE(12);
  const totalCompressedSize = file.readUInt32BE(20);
  let offset = 48;
  const entries: Array<{ tag: string; length: number; transformed: boolean }> = [];

  for (let i = 0; i < numTables; i += 1) {
    const flags = file[offset];
    offset += 1;
    const index = flags & 0x3f;
    let tag: string;
    if (index === 0x3f) {
      tag = file.subarray(offset, offset + 4).toString('ascii');
      offset += 4;
    } else {
      tag = KNOWN_TAGS[index];
    }
    const orig = readBase128(file, offset);
    offset = orig.offset;
    const version = flags >> 6;
    const transformed = tag === 'glyf' || tag === 'loca' ? version !== 3 : version !== 0;
    let length = orig.value;
    if (transformed) {
      const transformedLength = readBase128(file, offset);
      offset = transformedLength.offset;
      length = transformedLength.value;
    }
    entries.push({ tag, length, transformed });
  }

  const decompressed = brotliDecompressSync(file.subarray(offset, offset + totalCompressedSize));
  const tables = new Map<string, Buffer>();
  let cursor = 0;
  for (const entry of entries) {
    const slice = decompressed.subarray(cursor, cursor + entry.length);
    cursor += entry.length;
    if (!entry.transformed) tables.set(entry.tag, Buffer.from(slice));
  }
  return tables;
}

function fixed16(raw: number): number {
  return raw / 65536;
}

/**
 * Drop line comments, block comments, and JSX comments before matching.
 * A `//` inside a string, including a protocol-relative URL, stays put.
 */
function stripComments(source: string): string {
  const withoutBlocks = source.replace(/\/\*[\s\S]*?\*\//g, '');
  let out = '';
  let quote: "'" | '"' | '`' | null = null;
  for (let i = 0; i < withoutBlocks.length; i += 1) {
    const char = withoutBlocks[i];
    const next = withoutBlocks[i + 1];
    if (quote) {
      out += char;
      if (char === '\\' && next !== undefined) {
        out += next;
        i += 1;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      out += char;
      continue;
    }
    if (char === '/' && next === '/') {
      const lineEnd = withoutBlocks.indexOf('\n', i);
      i = lineEnd === -1 ? withoutBlocks.length : lineEnd - 1;
      continue;
    }
    out += char;
  }
  return out;
}

function parseLinkAttrs(tag: string): Map<string, string> {
  const attrs = new Map<string, string>();
  const body = tag.replace(/^<\s*link\b/i, '').replace(/\/?\s*>$/, '');
  const re = /([^\s=<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g;
  for (const match of body.matchAll(re)) {
    attrs.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

/** Font preloads only, compared by href, type and crossorigin — not attribute order. */
function fontPreloads(html: string): Array<{ href: string; type: string; crossorigin: string }> {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const found: Array<{ href: string; type: string; crossorigin: string }> = [];
  for (const tag of tags) {
    const attrs = parseLinkAttrs(tag);
    if (attrs.get('rel') !== 'preload' || attrs.get('as') !== 'font') continue;
    found.push({
      href: attrs.get('href') ?? '',
      type: attrs.get('type') ?? '',
      crossorigin: attrs.has('crossorigin') ? attrs.get('crossorigin') || 'anonymous' : '',
    });
  }
  return found;
}

const ITALIC_CLASS = /(?:^|[\s"'`])(?:[\w-]+:)*italic(?:[\s"'`]|$)/;
const ARBITRARY_ITALIC = /\[font-style\s*:\s*italic\]/;
const INLINE_ITALIC = /fontStyle\s*:\s*['"]italic['"]/;
const SLANTED_TAG = /<(em|i|cite|address|dfn|var)\b/;
const PROSE_CLASS = /(?:^|[\s])(?:[\w-]+:)*prose(?:-[\w-]+)?(?:[\s]|$)/;

/** Tailwind `prose` inside a string. A variable named prose is not the class. */
function usesProseClass(source: string): boolean {
  const strings: string[] = source.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g) ?? [];
  return strings.some((literal) => PROSE_CLASS.test(` ${literal.slice(1, -1)} `));
}

function resolveSpec(fromFile: string, spec: string): string | null {
  let base: string | null = null;
  if (spec.startsWith('@/')) base = resolve(ROOT, 'src', spec.slice(2));
  else if (spec.startsWith('.')) base = resolve(dirname(fromFile), spec);
  if (!base) return null;
  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.css`,
    resolve(base, 'index.tsx'),
    resolve(base, 'index.ts'),
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

const APP_FILE = resolve(ROOT, 'src/App.tsx');

function specsIn(source: string, file: string): string[] {
  const specs: string[] = [];
  for (const pattern of [/from\s+['"]([^'"]+)['"]/g, /import\s+['"]([^'"]+)['"]/g]) {
    for (const match of source.matchAll(pattern)) specs.push(match[1]);
  }
  for (const match of source.matchAll(/import\s*\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    const spec = match[1];
    // App.tsx lazy-loads every route, including blog posts whose <em> is intentional.
    if (file === APP_FILE && /(?:^|\/)pages\//.test(spec)) continue;
    specs.push(spec);
  }
  return specs;
}

/** Import graph of the upright pages and the app shell, plus CSS they pull in. */
function walkPages(entries: string[]): { code: string[]; css: string[] } {
  const code: string[] = [];
  const css: string[] = [];
  const seen = new Set<string>();
  const queue = [...entries];
  while (queue.length) {
    const file = queue.pop();
    if (!file || seen.has(file) || !existsSync(file) || !statSync(file).isFile()) continue;
    seen.add(file);
    const source = readFileSync(file, 'utf8');
    if (file.endsWith('.css')) {
      css.push(file);
      for (const match of source.matchAll(/@import\s+['"]([^'"]+)['"]/g)) {
        const resolved = resolveSpec(file, match[1]);
        if (resolved) queue.push(resolved);
      }
      continue;
    }
    if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue;
    code.push(file);
    for (const spec of specsIn(source, file)) {
      const resolved = resolveSpec(file, spec);
      if (resolved) queue.push(resolved);
    }
  }
  return { code, css };
}

describe('Inter italic', () => {
  const fontsCss = readFileSync(resolve(ROOT, 'src/fonts.css'), 'utf8');
  const faces = fontFaces(fontsCss);
  const inter = faces.filter((block) => field(block, 'font-family') === "'Inter'");
  const italics = inter.filter((block) => field(block, 'font-style') === 'italic');

  it('loads a variable Inter italic across weights 100–900', () => {
    expect(italics).toHaveLength(2);

    const byFile = new Map(
      italics.map((block) => {
        const src = /url\((\/fonts\/[^)]+\.woff2)\)/.exec(block);
        expect(src, block).not.toBeNull();
        return [src![1], block] as const;
      }),
    );

    expect([...byFile.keys()].sort()).toEqual([
      '/fonts/inter-italic-latin-ext.woff2',
      '/fonts/inter-italic-latin.woff2',
    ]);

    for (const [file, block] of byFile) {
      expect(field(block, 'font-style')).toBe('italic');
      expect(field(block, 'font-weight')).toBe('100 900');
      expect(field(block, 'font-display')).toBe('swap');

      const uprightName = file.includes('latin-ext')
        ? '/fonts/inter-400-latin-ext.woff2'
        : '/fonts/inter-400-latin.woff2';
      const upright = inter.find((candidate) => candidate.includes(uprightName));
      expect(upright, uprightName).toBeDefined();
      expect(field(block, 'unicode-range')).toBe(field(upright!, 'unicode-range'));
      expect(field(upright!, 'font-style')).toBe('normal');

      const italicPath = resolve(ROOT, 'public', file.slice(1));
      const uprightPath = resolve(ROOT, 'public', uprightName.slice(1));
      const italicBytes = readFileSync(italicPath);
      expect(italicBytes.length).toBeGreaterThan(8_000);
      expect(italicBytes.length).toBeLessThanOrEqual(120 * 1024);
      expect(sha256(italicPath)).not.toBe(sha256(uprightPath));

      const tables = readWoff2Tables(italicBytes);
      const os2 = tables.get('OS/2');
      const post = tables.get('post');
      const fvar = tables.get('fvar');
      expect(os2, 'OS/2').toBeDefined();
      expect(post, 'post').toBeDefined();
      expect(fvar, 'fvar').toBeDefined();

      // OS/2.fsSelection bit 0 is ITALIC.
      expect(os2!.readUInt16BE(62) & 0x0001).toBe(0x0001);
      // post.italicAngle is a signed 16.16 fixed; a real italic slants backward.
      expect(fixed16(post!.readInt32BE(4))).toBeLessThan(0);

      const axisCount = fvar!.readUInt16BE(8);
      const axisSize = fvar!.readUInt16BE(10);
      const axesOffset = fvar!.readUInt16BE(4);
      const axes: Array<{ tag: string; min: number; max: number }> = [];
      for (let i = 0; i < axisCount; i += 1) {
        const start = axesOffset + i * axisSize;
        axes.push({
          tag: fvar!.subarray(start, start + 4).toString('ascii'),
          min: fixed16(fvar!.readInt32BE(start + 4)),
          max: fixed16(fvar!.readInt32BE(start + 12)),
        });
      }
      const wght = axes.find((axis) => axis.tag === 'wght');
      expect(wght, axes.map((axis) => axis.tag).join(',')).toBeDefined();
      expect(wght!.min).toBe(100);
      expect(wght!.max).toBe(900);
    }
  });

  it('keeps weight synthesis off on the global CSS', () => {
    for (const file of ['src/index.css', 'src/styles/digilist-root.css']) {
      const css = readFileSync(resolve(ROOT, file), 'utf8');
      const declarations = [...css.matchAll(/font-synthesis(?:-weight|-style)?:\s*[^;]+/g)].map(
        (match) => match[0],
      );
      expect(declarations, file).toEqual(['font-synthesis: none']);
    }
  });

  it('keeps the stylesheet that the app imports in step with the public copy', () => {
    const published = readFileSync(resolve(ROOT, 'public/fonts/fonts.css'), 'utf8');
    expect(published).toBe(fontsCss);
  });

  it('does not preload the italic face, and / and /transparens are not italic', () => {
    const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
    expect(html).not.toContain('inter-italic');
    expect(fontPreloads(html)).toEqual([
      {
        href: '/fonts/inter-400-latin.woff2',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    ]);

    const pages = walkPages([
      resolve(ROOT, 'src/pages/Index.tsx'),
      resolve(ROOT, 'src/pages/TransparensPage.tsx'),
      APP_FILE,
      resolve(ROOT, 'src/components/PageLoader.tsx'),
      resolve(ROOT, 'src/components/gdpr/GDPRNotification.tsx'),
      resolve(ROOT, 'src/components/error/RouteErrorBoundary.tsx'),
      resolve(ROOT, 'src/components/chat/ChatWidget.tsx'),
    ]);
    const css = [
      ...new Set([
        ...pages.css,
        ...walkPages([resolve(ROOT, 'src/index.css')]).css,
      ]),
    ];
    const reached = pages.code.map((file) => relative(ROOT, file));
    expect(reached).toContain('src/components/hero/VideoHero.tsx');
    expect(reached).toContain('src/components/ui/surface-card.tsx');
    expect(reached).toEqual(
      expect.arrayContaining([
        'src/App.tsx',
        'src/components/PageLoader.tsx',
        'src/components/gdpr/GDPRNotification.tsx',
        'src/components/error/RouteErrorBoundary.tsx',
        'src/components/chat/ChatWidget.tsx',
        'src/components/ScrollToTop.tsx',
        'src/components/providers/AppProviders.tsx',
      ]),
    );
    expect(reached).not.toContain('src/pages/BloggPostPage.tsx');
    expect(css.map((file) => relative(ROOT, file))).toEqual(
      expect.arrayContaining(['src/index.css', 'src/fonts.css', 'src/styles/digilist-root.css']),
    );

    // Typography's `.prose blockquote` is italic. These pages do not use the
    // prose class, so that rule cannot apply and is not allowlisted.
    for (const file of pages.code) {
      const source = stripComments(readFileSync(file, 'utf8'));
      const label = relative(ROOT, file);
      expect(source, label).not.toMatch(ITALIC_CLASS);
      expect(source, label).not.toMatch(ARBITRARY_ITALIC);
      expect(source, label).not.toMatch(INLINE_ITALIC);
      expect(source, label).not.toMatch(SLANTED_TAG);
      expect(
        usesProseClass(source),
        `${label} uses prose, so Typography would italicise its blockquotes`,
      ).toBe(false);
    }

    for (const file of css) {
      const source = stripComments(readFileSync(file, 'utf8')).replace(/@font-face\s*\{[^}]*\}/g, '');
      expect(source, relative(ROOT, file)).not.toMatch(/font-style\s*:\s*italic/);
    }
  });

  it('ignores italic words in comments and matches font preloads by attribute', () => {
    const commented = stripComments(
      [
        '// keep this upright, never italic here',
        '/* font-style: italic */',
        '{/* keep this upright, never italic here */}',
        'className="font-medium"',
        'const secure = "https://example.com/upright"; // italic stays in this comment',
      ].join('\n'),
    );
    expect(commented).toContain('https://example.com/upright');
    expect(commented).not.toContain('italic stays in this comment');
    expect(commented).not.toMatch(ITALIC_CLASS);
    const protocolRelative = stripComments("const href = '//cdn.example/a'; className=\"italic\"");
    expect(protocolRelative).toContain('className="italic"');
    expect(protocolRelative).toMatch(ITALIC_CLASS);
    expect(commented).not.toMatch(ARBITRARY_ITALIC);
    expect(commented).not.toMatch(/font-style\s*:\s*italic/);

    const html = [
      '<link rel="preload" as="image" href="/og.png">',
      '<link href="/fonts/inter-400-latin.woff2" crossorigin type="font/woff2" as="font" rel="preload">',
    ].join('\n');
    expect(html).not.toContain('inter-italic');
    expect(fontPreloads(html)).toEqual([
      {
        href: '/fonts/inter-400-latin.woff2',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    ]);
  });

  it('ships the upstream OFL for Inter and Noto Sans Arabic', () => {
    const license = readFileSync(resolve(ROOT, 'public/fonts/OFL.txt'), 'utf8');
    expect(license).toContain(
      'Copyright (c) 2016 The Inter Project Authors (https://github.com/rsms/inter)',
    );
    expect(license).toContain(
      'Copyright 2022 The Noto Project Authors (https://github.com/notofonts/arabic)',
    );
    expect(license).toContain('SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007');
    expect(license).toContain('PERMISSION & CONDITIONS');
    expect(license).toContain('PERMISSION AND CONDITIONS');
  });
});
