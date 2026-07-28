/**
 * Reads API credentials from .env.local for the Node-side SEO scripts.
 *
 * Vite injects import.meta.env into the app bundle, but these scripts run in
 * plain Node and never touch the bundle — which is the point. A SERP or Search
 * Console key in the client bundle is a key anyone can read with view-source
 * and spend on your account, so none of these names carry the VITE_ prefix and
 * none of them can reach the browser.
 *
 * .env.local is gitignored (.gitignore:17). Nothing here logs a value.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ENV_FILE = resolve(process.cwd(), '.env.local');

/** Minimal dotenv: KEY=value, # comments, optional quotes. */
function loadEnvFile() {
  if (!existsSync(ENV_FILE)) return {};
  const out = {};
  for (const raw of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const fileEnv = loadEnvFile();

/** process.env wins, so CI can inject secrets without writing a file. */
export function env(name) {
  return process.env[name] ?? fileEnv[name] ?? undefined;
}

/**
 * Exit with an explanation rather than a stack trace.
 *
 * A missing key is the normal state for anyone who has not set that provider
 * up, so it should read as instructions, not as a crash.
 */
export function requireEnv(names, provider, setupHint) {
  const missing = names.filter((name) => !env(name));
  if (!missing.length) return;

  console.error(`\n${provider}: missing ${missing.join(', ')} in .env.local\n`);
  if (setupHint) console.error(`${setupHint}\n`);
  console.error(`Add to .env.local (it is gitignored):\n`);
  for (const name of missing) console.error(`  ${name}=...`);
  console.error('');
  process.exit(2);
}

export function hasEnv(names) {
  return names.every((name) => Boolean(env(name)));
}
