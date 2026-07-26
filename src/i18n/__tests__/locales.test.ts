import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import no from '../locales/no.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

/**
 * Guards the three locales against the two ways this site has shown the wrong
 * language to real visitors.
 *
 * 1. A key present in one locale and missing from another. i18next falls back,
 *    so a Norwegian string appears mid-sentence on the English site.
 * 2. A key that exists in no locale at all. `t('hero.subtitle', 'Norsk …')`
 *    then renders its hardcoded fallback in every language, and a `t()` with no
 *    fallback renders the raw key to the user.
 *
 * Both were live: the English homepage showed an English headline over a
 * Norwegian subtitle and a Norwegian secondary button.
 */
const SRC = resolve(__dirname, '../..');

type Tree = Record<string, unknown>;

function flatten(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) =>
    value !== null && typeof value === 'object'
      ? flatten(value as Tree, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );
}

const LOCALES = { no, en, ar } as Record<string, Tree>;
const KEYS = Object.fromEntries(
  Object.entries(LOCALES).map(([lang, tree]) => [lang, new Set(flatten(tree))])
);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

/** Every t('some.key') referenced anywhere under src/, with its file. */
function referencedKeys(): Map<string, string> {
  const found = new Map<string, string>();
  for (const file of sourceFiles(SRC)) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/\bt\(\s*'([a-zA-Z0-9_.]+)'/g)) {
      if (!found.has(match[1])) found.set(match[1], file.replace(`${SRC}/`, ''));
    }
  }
  return found;
}

describe('locale parity', () => {
  it('has the same key set in every language', () => {
    const base = KEYS.no;
    expect(base.size).toBeGreaterThan(200);

    for (const lang of ['en', 'ar']) {
      const missing = [...base].filter((k) => !KEYS[lang].has(k));
      const extra = [...KEYS[lang]].filter((k) => !base.has(k));
      expect(missing, `${lang} is missing: ${missing.slice(0, 10).join(', ')}`).toEqual([]);
      expect(extra, `${lang} has keys no.json lacks: ${extra.slice(0, 10).join(', ')}`).toEqual([]);
    }
  });

  it('has no empty strings, which render as blank UI', () => {
    for (const [lang, tree] of Object.entries(LOCALES)) {
      const blanks = flatten(tree).filter((key) => {
        const value = key.split('.').reduce<unknown>((acc, seg) => (acc as Tree)?.[seg], tree);
        return typeof value === 'string' && value.trim() === '';
      });
      expect(blanks, `${lang} has blank values: ${blanks.join(', ')}`).toEqual([]);
    }
  });

  it('translates the strings that used to leak Norwegian into other languages', () => {
    // Regression pins: these were absent from every locale, so their hardcoded
    // Norwegian fallbacks showed on the English and Arabic sites.
    for (const key of ['hero.subtitle', 'hero.viewCases', 'faq.title', 'faq.description']) {
      for (const lang of ['no', 'en', 'ar']) {
        expect(KEYS[lang].has(key), `${lang} lacks ${key}`).toBe(true);
      }
    }
    // And they must actually differ per language, not be the same string thrice.
    const subtitle = (lang: Tree) => (lang.hero as Tree).subtitle;
    expect(subtitle(no)).not.toBe(subtitle(en));
    expect(subtitle(en)).not.toBe(subtitle(ar));
  });
});

describe('keys referenced in code', () => {
  it('exists in the locale files', () => {
    const referenced = referencedKeys();
    expect(referenced.size).toBeGreaterThan(50);

    const orphans = [...referenced.entries()]
      .filter(([key]) => !KEYS.no.has(key))
      // Namespaced lookups built at runtime cannot be checked statically.
      .filter(([key]) => !key.endsWith('.'))
      // TeamTeaser asks for roles and descriptions of named individuals
      // (teasers.team.members.<name>.role). Those are facts about real people
      // and cannot be invented to satisfy a test — they need writing by someone
      // who knows the team. The component is also not currently rendered on any
      // page. Excluded deliberately, not overlooked.
      .filter(([key]) => !key.startsWith('teasers.team.members.'))
      .map(([key, file]) => `${key} (${file})`);

    expect(
      orphans,
      `t() keys absent from every locale — these render a hardcoded fallback or the raw key:\n  ${orphans.join('\n  ')}`
    ).toEqual([]);
  });
});
