import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * /blogg?q= is one static file unless the host maps the query onto the
 * prerendered listing. These files are that mapping — without them the
 * first HTML stays the unfiltered card list no matter what the prerender
 * wrote under /blogg/q/.
 */
const ROOT = resolve(__dirname, '../..');

describe('host mapping for /blogg?q=', () => {
  it('rewrites a present query onto /blogg/q/<query>/ in .htaccess', () => {
    const htaccess = readFileSync(resolve(ROOT, 'public/.htaccess'), 'utf8');

    expect(htaccess).toContain('RewriteCond %{QUERY_STRING} (?:^|&)q=([^&]+)');
    expect(htaccess).toContain('RewriteCond %{DOCUMENT_ROOT}/blogg/q/%1/index.html -f');
    expect(htaccess).toContain('RewriteRule ^blogg/?$ /blogg/q/%1/index.html [L]');
    expect(htaccess).toContain('/blogg/q/_none/index.html');
  });

  it('rewrites nginx $arg_q onto /blogg/q/ before try_files', () => {
    const nginx = readFileSync(resolve(ROOT, 'deploy/nginx-blogg-query.conf'), 'utf8');

    expect(nginx).toContain('location = /blogg');
    expect(nginx).toContain('rewrite ^ /blogg/q/$arg_q/index.html last;');
    expect(nginx).toContain('rewrite ^ /blogg/q/_none/index.html last;');
    expect(nginx).toContain('try_files /blogg/index.html =404;');
  });

  it('has the prerender write those query files', () => {
    const prerender = readFileSync(resolve(ROOT, 'scripts/prerender-blog.ts'), 'utf8');

    expect(prerender).toContain('blogListingQueries');
    expect(prerender).toContain('filterBlogPosts');
    expect(prerender).toContain('blogListingHtml');
    expect(prerender).toMatch(/path\.join\(\s*DIST,\s*"blogg",\s*"q"/);
    expect(prerender, 'unfiltered /blogg must still be written').toContain(
      'path.join(DIST, "blogg", "index.html")',
    );
  });
});
