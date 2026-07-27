import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the site against referencing files that are not in public/.
 *
 * The footer asked for `/xala-logo-white.svg` for as long as the footer has
 * existed. The file has never been in the repo. An `onError` handler hid the
 * broken image, so the only trace was a 404 on every single page load and a
 * missing logo nobody could see was missing.
 *
 * The internal-links test covers routes; this covers everything else the
 * browser fetches — images, video, fonts, icons, feeds.
 */
const ROOT = resolve(__dirname, '../..');
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');

/** Paths produced by the build rather than committed, so absence is expected. */
const BUILT = [
  '/blogg/rss.xml',
  '/sitemap.xml',
  '/llms.txt',
  '/robots.txt',
];

const ASSET = /\.(png|jpe?g|svg|webp|avif|gif|ico|mp4|webm|woff2?|ttf|pdf|xml|txt|json|vtt)$/i;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(full);
    // Markdown is documentation: the blog README shows an example frontmatter
    // block whose `cover:` names a file that is not supposed to exist.
    return /\.(tsx?|json)$/.test(entry.name) ? [full] : [];
  });
}

/** Every absolute asset path referenced from source, with where it came from. */
function referencedAssets(): Map<string, Set<string>> {
  const found = new Map<string, Set<string>>();

  for (const file of sourceFiles(SRC)) {
    const source = readFileSync(file, 'utf8');
    const patterns = [
      /(?:src|href|poster|cover|imageUrl|image|icon|logo|videoSrc)\s*[=:]\s*["'](\/[^"'`\s)]+)["']/g,
      /"(?:src|href|cover|image|imageUrl|logo|icon)"\s*:\s*"(\/[^"]+)"/g,
      /url\((\/[^)]+)\)/g,
    ];

    for (const pattern of patterns) {
      for (const match of source.matchAll(pattern)) {
        const path = match[1].split('?')[0].split('#')[0];
        if (!ASSET.test(path)) continue;
        if (BUILT.includes(path)) continue;
        if (!found.has(path)) found.set(path, new Set());
        found.get(path)!.add(file.replace(`${ROOT}/`, ''));
      }
    }
  }

  return found;
}

describe('static assets', () => {
  const assets = referencedAssets();

  it('finds the references it is meant to check', () => {
    // A regex that quietly stops matching would make this suite vacuous.
    expect(assets.size).toBeGreaterThanOrEqual(5);
  });

  it('has a file in public/ for every referenced asset', () => {
    const missing = [...assets.entries()]
      .filter(([path]) => !existsSync(join(PUBLIC, path)))
      .map(([path, files]) => `${path} (referenced from ${[...files].join(', ')})`);

    expect(missing, `assets referenced but not present in public/:\n  ${missing.join('\n  ')}`).toEqual(
      []
    );
  });

  it('resolves the brand assets that are used on every page', () => {
    for (const logo of ['/logo-xala-dark.svg', '/logo-xala-light.svg', '/favicon.svg']) {
      expect(existsSync(join(PUBLIC, logo)), `${logo} is missing`).toBe(true);
    }
  });
});
