import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Keeps server-side credentials out of the browser bundle.
 *
 * Vite inlines every `VITE_`-prefixed variable into the built JavaScript as a
 * literal string. That is the documented behaviour and it is exactly right for
 * a reCAPTCHA site key, which is public by design. It is catastrophic for a
 * DataForSEO password or a Search Console private key: the "secret" ends up in
 * a file served to every visitor, readable with view-source, and spendable by
 * anyone who looks.
 *
 * The distinction is one four-character prefix, decided at the moment someone
 * adds a variable — which is precisely the kind of decision that needs a test
 * rather than a convention. These names are also checked against the built
 * output, because the prefix rule is a proxy and the bundle is the fact.
 */
const ROOT = resolve(__dirname, '../..');

/** Credentials the Node-side SEO scripts read. None may reach the browser. */
const SERVER_ONLY = [
  'DATAFORSEO_LOGIN',
  'DATAFORSEO_PASSWORD',
  'SERPAPI_KEY',
  'GSC_CLIENT_EMAIL',
  'GSC_PRIVATE_KEY',
  'GSC_SITE_URL',
  'PAGESPEED_API_KEY',
];

function sourceFiles(dir: string, match: RegExp): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : sourceFiles(full, match);
    return match.test(entry.name) ? [full] : [];
  });
}

describe('secrets', () => {
  it('gives no server-side credential a VITE_ prefix', () => {
    // A VITE_DATAFORSEO_PASSWORD would be inlined into the bundle by design,
    // and would look like a normal env var until someone read the built JS.
    const example = existsSync(join(ROOT, '.env.example'))
      ? readFileSync(join(ROOT, '.env.example'), 'utf8')
      : '';

    const leaked = SERVER_ONLY.filter((name) => example.includes(`VITE_${name}`));
    expect(
      leaked,
      `these would be inlined into the client bundle:\n  ${leaked.map((n) => `VITE_${n}`).join('\n  ')}`
    ).toEqual([]);
  });

  it('never reads a server-side credential from application code', () => {
    // import.meta.env in src/ is bundled; process.env in src/ is undefined at
    // runtime and usually means someone moved a script into the app by mistake.
    const offenders: string[] = [];
    for (const file of sourceFiles(join(ROOT, 'src'), /\.tsx?$/)) {
      if (file.includes('__tests__')) continue;
      const source = readFileSync(file, 'utf8');
      for (const name of SERVER_ONLY) {
        if (source.includes(name)) offenders.push(`${file.replace(`${ROOT}/`, '')} references ${name}`);
      }
    }

    expect(offenders, `server-side credentials referenced from bundled code:\n  ${offenders.join('\n  ')}`).toEqual([]);
  });

  it('has no credential in the built output', () => {
    // The prefix rule is a proxy; this is the fact it stands for. Skipped
    // rather than failed when dist/ is absent, so a fresh checkout can run the
    // suite without building first.
    const assets = join(ROOT, 'dist', 'assets');
    if (!existsSync(assets)) return;

    const bundle = sourceFiles(assets, /\.js$/)
      .map((file) => readFileSync(file, 'utf8'))
      .join('');
    expect(bundle.length).toBeGreaterThan(1000);

    const found = SERVER_ONLY.filter((name) => bundle.includes(name));
    expect(found, `credential names present in the shipped JavaScript:\n  ${found.join('\n  ')}`).toEqual([]);
  });

  it('keeps .env.local out of git', () => {
    const gitignore = readFileSync(join(ROOT, '.gitignore'), 'utf8');
    expect(gitignore).toMatch(/^\.env\.\*/m);
  });

  it('ships no real value in .env.example', () => {
    // The file documents names. A filled-in value here is a committed secret.
    if (!existsSync(join(ROOT, '.env.example'))) return;
    const lines = readFileSync(join(ROOT, '.env.example'), 'utf8')
      .split('\n')
      .filter((line) => /^[A-Z][A-Z0-9_]*=/.test(line));

    expect(lines.length).toBeGreaterThan(5);
    const filled = lines.filter((line) => {
      const value = line.slice(line.indexOf('=') + 1).trim();
      // GSC_SITE_URL is a property identifier, not a credential.
      return value !== '' && !line.startsWith('GSC_SITE_URL=');
    });

    expect(filled, `values committed to .env.example:\n  ${filled.join('\n  ')}`).toEqual([]);
  });
});
