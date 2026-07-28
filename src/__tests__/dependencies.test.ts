import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Every dependency should be one something imports.
 *
 * package.json had accumulated fifteen that nothing did: pg, openai,
 * node-fetch and dotenv — server packages in a static site — alongside katex,
 * remark-math, react-syntax-highlighter, zustand, uuid and others left from
 * directions the project did not take.
 *
 * They never reached the bundle, because a bundler only ships what is imported.
 * They did reach the lockfile, every CI install, and any question about what
 * this codebase depends on. "What is in your supply chain" is a real question
 * in an ISO 27001 or SOC 2 review, and "fifteen packages we do not use" is a
 * bad answer to give about a site whose selling point is that it takes security
 * seriously.
 *
 * Removing them is easy. Noticing is the part that needs a test.
 */
const ROOT = resolve(__dirname, '../..');

/**
 * Packages with no import by design: build tooling resolved by name from a
 * config, type-only packages, and plugins a framework loads itself.
 */
const ALLOWED_WITHOUT_IMPORT = new Set([
  'react',            // JSX transform, no explicit import needed
  'react-dom',        // entry point only, via react-dom/client
  'tailwindcss-animate',
]);

function sourceText(): string {
  const roots = ['src', 'scripts'];
  const configs = ['vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'eslint.config.js', 'index.html'];
  let blob = '';

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx?|jsx?|mjs|css)$/.test(entry.name)) {
        blob += readFileSync(full, 'utf8');
      }
    }
  };

  for (const dir of roots) {
    const full = join(ROOT, dir);
    if (existsSync(full)) walk(full);
  }
  for (const file of configs) {
    const full = join(ROOT, file);
    if (existsSync(full)) blob += readFileSync(full, 'utf8');
  }
  return blob;
}

describe('dependencies', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
    dependencies: Record<string, string>;
  };
  const blob = sourceText();

  it('finds the sources it is meant to scan', () => {
    // A walk that quietly returned nothing would make this suite vacuous and
    // report every dependency as unused.
    expect(blob.length).toBeGreaterThan(100_000);
    expect(Object.keys(pkg.dependencies).length).toBeGreaterThan(20);
  });

  it('has no dependency that nothing imports', () => {
    const unused = Object.keys(pkg.dependencies).filter((dep) => {
      if (ALLOWED_WITHOUT_IMPORT.has(dep)) return false;
      const escaped = dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Bare import, subpath import, dynamic import, require, or referenced by
      // name in a config.
      const patterns = [
        new RegExp(`from ['"]${escaped}(/[^'"]*)?['"]`),
        new RegExp(`require\\(['"]${escaped}(/[^'"]*)?['"]\\)`),
        new RegExp(`import\\(['"]${escaped}(/[^'"]*)?['"]\\)`),
        new RegExp(`['"]${escaped}['"]`),
      ];
      return !patterns.some((rx) => rx.test(blob));
    });

    expect(
      unused,
      `dependencies nothing imports — remove them or add a reason to ALLOWED_WITHOUT_IMPORT:\n  ${unused.join('\n  ')}`
    ).toEqual([]);
  });

  it('ships no server-side database or API-key packages', () => {
    // These have no business in a statically hosted site, and their presence
    // suggests either dead weight or a secret that should not be in the client.
    const serverOnly = ['pg', 'mysql', 'mysql2', 'mongodb', 'openai', 'anthropic', '@anthropic-ai/sdk'];
    const present = serverOnly.filter((name) => name in pkg.dependencies);

    expect(
      present,
      `server-side packages in a static site's dependencies:\n  ${present.join('\n  ')}`
    ).toEqual([]);
  });
});
