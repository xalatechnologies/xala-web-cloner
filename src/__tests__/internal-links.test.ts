import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Guards the site against internal links that 404.
 *
 * This is not hypothetical: a squash merge once dropped the /caser/:slug and
 * /karriere routes while leaving every link to them in place, so all 18 case
 * study cards and the footer careers link silently led to the 404 page. Nothing
 * in the build or the test suite noticed. This test would have.
 */
const SRC = resolve(__dirname, '..');

const ASSET = /\.(png|jpe?g|svg|webp|xml|txt|pdf|mp4|ico|json|css)$/i;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(full);
    return /\.(tsx?|json)$/.test(entry.name) ? [full] : [];
  });
}

function declaredRoutes(): string[] {
  const app = readFileSync(join(SRC, 'App.tsx'), 'utf8');
  return [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
}

/** A route pattern like /caser/:slug matches /caser/anything. */
function routeMatcher(route: string): RegExp {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/:[^/]+/g, '[^/]+');
  return new RegExp(`^${escaped}/?$`);
}

/** Every literal internal path referenced anywhere under src/. */
function internalLinks(): Map<string, Set<string>> {
  const links = new Map<string, Set<string>>();

  const record = (raw: string, file: string) => {
    const link = raw.replace(/\/$/, '') || '/';
    if (ASSET.test(link)) return;
    if (!links.has(link)) links.set(link, new Set());
    links.get(link)!.add(file.replace(`${SRC}/`, ''));
  };

  for (const file of sourceFiles(SRC)) {
    const source = readFileSync(file, 'utf8');
    // to="/x" / href="/x", and the object-literal forms used by nav and footer
    // link arrays and by the JSON data files.
    for (const m of source.matchAll(/(?:to|href)\s*[=:]\s*["'](\/[^"'#?]*)["']/g)) record(m[1], file);
    for (const m of source.matchAll(/"(?:href|to|url|path)"\s*:\s*"(\/[^"#?]*)"/g)) record(m[1], file);
  }

  return links;
}

describe('internal links', () => {
  const routes = declaredRoutes().filter((r) => r !== '*');
  const matchers = routes.map(routeMatcher);
  const links = internalLinks();

  it('finds the links and routes it is meant to check', () => {
    // A regex that quietly stops matching would make this suite vacuous.
    expect(routes.length).toBeGreaterThanOrEqual(14);
    expect(links.size).toBeGreaterThanOrEqual(12);
  });

  it('has a route for every internal link', () => {
    const broken = [...links.entries()]
      .filter(([link]) => !matchers.some((rx) => rx.test(link)))
      .map(([link, files]) => `${link} (linked from ${[...files].join(', ')})`);

    expect(broken, `internal links with no matching route:\n  ${broken.join('\n  ')}`).toEqual([]);
  });

  it('links to the pages that exist for real', () => {
    // Spot-checks for the routes that were previously lost.
    expect([...links.keys()]).toContain('/karriere');
    expect([...links.keys()]).toContain('/caser');
    expect(routes).toContain('/caser/:slug');
    expect(routes).toContain('/karriere');
  });

  it('does not reference /om-oss/team, which has never existed', () => {
    expect([...links.keys()]).not.toContain('/om-oss/team');
    expect(routes).not.toContain('/om-oss/team');
  });
});
