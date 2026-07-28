import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { registeredIcons, resolveIcon } from '../icons';

/**
 * Guards the icon registry, and the reason it exists.
 *
 * Eleven components used `import * as Icons from 'lucide-react'` so an icon
 * name in a JSON file could be looked up at runtime. That works and it defeats
 * tree-shaking completely: the wildcard makes every icon reachable, so the
 * bundler keeps all of them. lucide-react came to 748 KB in the build — a third
 * of all the JavaScript on the site — to render about two dozen glyphs.
 *
 * Two things have to stay true for the registry to keep paying off: nothing
 * reintroduces the wildcard, and every icon a data file names is registered.
 * The second matters because an unregistered name is not an error at runtime,
 * it is a silent fallback, and a page full of identical fallback glyphs is
 * exactly the bug this codebase already had twice.
 */
const SRC = resolve(__dirname, '../..');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

/** Icon names any data file can supply at runtime. */
function iconNamesInData(): Map<string, string> {
  const found = new Map<string, string>();
  const dir = join(SRC, 'data');

  const walk = (path: string) => {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(json|ts)$/.test(entry.name)) continue;
      const source = readFileSync(full, 'utf8');
      for (const match of source.matchAll(/"icon":\s*"([A-Za-z0-9]+)"/g)) {
        found.set(match[1], entry.name);
      }
      for (const match of source.matchAll(/icon:\s*'([A-Z][A-Za-z0-9]+)'/g)) {
        found.set(match[1], entry.name);
      }
    }
  };

  walk(dir);
  return found;
}

describe('icon registry', () => {
  it('is not bypassed by a wildcard import', () => {
    // Comments are stripped first: icons.ts explains the pattern it exists to
    // prevent, and quoting it should not count as committing it.
    const withoutComments = (source: string) =>
      source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

    const offenders = sourceFiles(SRC)
      .filter((file) =>
        /import \* as \w+ from ['"]lucide-react['"]/.test(withoutComments(readFileSync(file, 'utf8')))
      )
      .map((file) => file.replace(`${SRC}/`, ''));

    expect(
      offenders,
      `these import the whole icon library, which keeps every glyph in the bundle:\n  ${offenders.join('\n  ')}`
    ).toEqual([]);
  });

  it('registers every icon the data files name', () => {
    const missing = [...iconNamesInData().entries()]
      .filter(([name]) => !registeredIcons.includes(name))
      .map(([name, file]) => `${name} (${file})`);

    expect(
      missing,
      `icon names with no import — these render a fallback glyph, silently:\n  ${missing.join('\n  ')}`
    ).toEqual([]);
  });

  it('finds the names it is meant to check', () => {
    // A regex that quietly stops matching would make this suite vacuous.
    expect(iconNamesInData().size).toBeGreaterThanOrEqual(20);
    expect(registeredIcons.length).toBeGreaterThanOrEqual(20);
  });

  it('falls back by name rather than requiring an import at the call site', () => {
    expect(resolveIcon('Workflow')).toBe(resolveIcon('Workflow'));
    expect(resolveIcon('DefinitelyNotAnIcon')).toBe(resolveIcon(undefined));
    expect(resolveIcon(null, 'Package')).toBe(resolveIcon('Package'));
  });
});
