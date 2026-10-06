import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * `<em>` was rendering upright site-wide. Global CSS sets `font-synthesis: none`,
 * and the self-hosted Inter faces were upright only, so the browser had no
 * italic to use and was not allowed to synthesize one.
 *
 * The fix is a real Inter italic at weight 400 (the only weight prose emphasis
 * uses), loaded like the upright faces. Weight synthesis stays off, so upright
 * text keeps the same faces.
 */
const ROOT = resolve(__dirname, '../..');

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

describe('Inter italic', () => {
  const fontsCss = readFileSync(resolve(ROOT, 'src/fonts.css'), 'utf8');
  const faces = fontFaces(fontsCss);
  const inter = faces.filter((block) => field(block, 'font-family') === "'Inter'");
  const italics = inter.filter((block) => field(block, 'font-style') === 'italic');

  it('loads a real Inter italic at weight 400, same subsets and font-display', () => {
    expect(italics).toHaveLength(2);

    const byFile = new Map(
      italics.map((block) => {
        const src = /url\((\/fonts\/[^)]+\.woff2)\)/.exec(block);
        expect(src, block).not.toBeNull();
        return [src![1], block] as const;
      }),
    );

    expect([...byFile.keys()].sort()).toEqual([
      '/fonts/inter-400-italic-latin-ext.woff2',
      '/fonts/inter-400-italic-latin.woff2',
    ]);

    for (const block of italics) {
      expect(field(block, 'font-weight')).toBe('400');
      expect(field(block, 'font-display')).toBe('swap');
    }

    for (const [file, block] of byFile) {
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
      expect(italicBytes.subarray(0, 4).toString('ascii')).toBe('wOF2');
      expect(italicBytes.length).toBeGreaterThan(8_000);
      expect(italicBytes.length).toBeLessThan(80_000);
      expect(sha256(italicPath)).not.toBe(sha256(uprightPath));
    }
  });

  it('does not add italic faces for weights the prose does not use', () => {
    const heavy = italics.filter((block) => field(block, 'font-weight') !== '400');
    expect(heavy).toEqual([]);
  });

  it('keeps weight synthesis off on the global CSS', () => {
    for (const file of ['src/index.css', 'src/styles/digilist-root.css']) {
      const css = readFileSync(resolve(ROOT, file), 'utf8');
      const declarations = [...css.matchAll(/font-synthesis(?:-weight|-style)?:\s*[^;]+/g)].map(
        (match) => match[0],
      );
      expect(declarations.length, file).toBeGreaterThan(0);
      for (const declaration of declarations) {
        expect(declaration, file).not.toMatch(/font-synthesis:\s*(auto|weight)\b/);
        expect(declaration, file).not.toMatch(/font-synthesis-weight:\s*auto/);
      }
    }
  });

  it('keeps the stylesheet that the app imports in step with the public copy', () => {
    const published = readFileSync(resolve(ROOT, 'public/fonts/fonts.css'), 'utf8');
    expect(published).toBe(fontsCss);
  });
});
