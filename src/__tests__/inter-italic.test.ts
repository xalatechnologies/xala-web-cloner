import { brotliDecompressSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
