import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The include must land in the server block that has `root` / `current`.
 * Inserting after the first `server_name` (the :80 redirect) leaves
 * GET /blogg?q=gebyr on the unfiltered listing.
 */
const ROOT = resolve(__dirname, '../..');
const HELPER = join(ROOT, 'deploy/nginx-serving-block.py');
const INCLUDE = 'include /etc/nginx/snippets/xala-blogg-query.conf;';

const FIXTURE = `
server {
    listen 80;
    server_name xala.no www.xala.no;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name xala.no www.xala.no;
    root /home/root/domains/xala.no/current;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
`;

function run(
  args: string[],
  input?: string,
  env?: NodeJS.ProcessEnv,
): { status: number; stdout: string; stderr: string } {
  try {
    const stdout = execFileSync('python3', [HELPER, ...args], {
      encoding: 'utf8',
      input,
      env: env ? { ...process.env, ...env } : process.env,
    });
    return { status: 0, stdout, stderr: '' };
  } catch (error) {
    const err = error as { status?: number; stdout?: string; stderr?: string };
    return { status: err.status ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' };
  }
}

function withConfig(text: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'xala-nginx-'));
  const file = join(dir, 'xala.no.conf');
  writeFileSync(file, text);
  return file;
}

describe('nginx serving-block include', () => {
  it('puts the include in the root/current block, not after the first server_name', () => {
    const file = withConfig(FIXTURE);
    const applied = run(['--include', INCLUDE, 'apply', file]);
    expect(applied.status, applied.stderr).toBe(0);

    const blocks = applied.stdout.split(/(?=^\s*server\s*\{)/m);
    const redirect = blocks.find((block) => block.includes('listen 80'));
    const serving = blocks.find((block) => block.includes('root /home/root/domains/xala.no/current'));
    expect(redirect, 'expected a :80 redirect block').toBeTruthy();
    expect(serving, 'expected a root/current serving block').toBeTruthy();
    expect(redirect).not.toContain(INCLUDE);
    expect(serving).toContain(INCLUDE);

    const out = withConfig(applied.stdout);
    expect(run(['--include', INCLUDE, 'verify', out]).status).toBe(0);
  });

  it('fails when the only xala.no block is the :80 redirect', () => {
    const file = withConfig(`
server {
    listen 80;
    server_name xala.no;
    return 301 https://xala.no$request_uri;
}
`);
    const applied = run(['--include', INCLUDE, 'apply', file]);
    expect(applied.status).not.toBe(0);
    expect(run(['--include', INCLUDE, 'verify', file]).status).not.toBe(0);
  });

  it('is a no-op success when the serving block already has the include', () => {
    const file = withConfig(FIXTURE);
    const once = run(['--include', INCLUDE, 'apply', file]);
    const twice = run(['--include', INCLUDE, 'apply', withConfig(once.stdout)]);
    expect(twice.status).toBe(0);
    expect(twice.stdout.match(new RegExp(INCLUDE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))).toHaveLength(
      1,
    );
  });

  it('does not fail check when a sibling .bak-blogg-query lacks the include', () => {
    const dir = mkdtempSync(join(tmpdir(), 'xala-nginx-'));
    const live = join(dir, 'xala.no.conf');
    const bak = join(dir, 'xala.no.conf.bak-blogg-query');
    const applied = run(['--include', INCLUDE, 'apply', withConfig(FIXTURE)]);
    expect(applied.status, applied.stderr).toBe(0);
    writeFileSync(live, applied.stdout);
    writeFileSync(bak, FIXTURE);

    const checked = run(['--include', INCLUDE, 'check', live, bak]);
    expect(checked.status, checked.stderr).toBe(0);
    expect(checked.stdout).toContain('include present in 1 serving block file');
  });

  it('writes install backups outside the nginx-loaded directory', () => {
    const dir = mkdtempSync(join(tmpdir(), 'xala-nginx-'));
    const live = join(dir, 'xala.no.conf');
    const backups = join(dir, 'backups');
    mkdirSync(backups);
    writeFileSync(live, FIXTURE);

    const installed = run(
      ['--include', INCLUDE, 'install', '--backup-suffix', '.bak-blogg-query', live],
      undefined,
      { XALA_NGINX_BACKUP_DIR: backups },
    );
    expect(installed.status, installed.stderr).toBe(0);
    expect(existsSync(join(dir, 'xala.no.conf.bak-blogg-query'))).toBe(false);
    expect(readdirSync(backups).some((name) => name.includes('.bak-blogg-query'))).toBe(true);
    expect(readFileSync(live, 'utf8')).toContain(INCLUDE);

    writeFileSync(join(dir, 'xala.no.conf.bak-blogg-query'), FIXTURE);
    const checked = run(['--include', INCLUDE, 'check', live, join(dir, 'xala.no.conf.bak-blogg-query')]);
    expect(checked.status, checked.stderr).toBe(0);
  });
});
