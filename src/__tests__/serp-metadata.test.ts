import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPostFile, parsePost } from '@/lib/blog/posts';
import { BRAND, postMeta } from '@/lib/blog/seo';
import type { BlogPost } from '@/lib/blog/types';
import servicePages from '@/data/service-pages.json';

/**
 * The two strings a search result is made of, kept inside the space Google
 * gives them.
 *
 * Twenty-six of sixty-one routes shipped a title over sixty characters and
 * eight a description over 155, which does not mean they ranked worse — it
 * means Google chose where to cut, and what got cut was the end of the
 * sentence. The worst was 111 characters, of which twenty-four were
 * " | Xala Technologies AS" repeated on every page.
 *
 * These bounds are conventions rather than hard limits — Google measures pixels
 * and the cutoff moves — so they are deliberately checked against the sources a
 * person edits, not against rendered pixels. The point is that writing a new
 * page cannot quietly reintroduce a truncated one.
 */
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 155;

const BLOG_DIR = resolve(__dirname, '../content/blog');

const posts: BlogPost[] = readdirSync(BLOG_DIR)
  .filter(isPostFile)
  .map((file) => parsePost(readFileSync(join(BLOG_DIR, file), 'utf8'), file))
  .filter((result): result is BlogPost => !('reason' in result))
  .filter((post) => !post.draft);

describe('search result metadata', () => {
  it('finds the content it is meant to check', () => {
    // A glob that quietly stopped matching would make every assertion vacuous.
    expect(posts.length).toBeGreaterThanOrEqual(15);
    expect(Object.keys(servicePages).length).toBeGreaterThanOrEqual(10);
  });

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s has a title that fits a search result',
    (_slug, post) => {
      const { title } = postMeta(post);
      expect(title, `"${title}" is ${title.length} chars`).toHaveLength(title.length);
      expect(title.length).toBeLessThanOrEqual(TITLE_MAX);
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s has a description worth showing',
    (_slug, post) => {
      expect(post.description.length).toBeGreaterThanOrEqual(DESC_MIN);
      expect(post.description.length).toBeLessThanOrEqual(DESC_MAX);
    }
  );

  it('uses the short brand in post titles, not the legal name', () => {
    // The legal name belongs in the Organization schema, where it is free.
    for (const post of posts) {
      expect(postMeta(post).title.endsWith(` | ${BRAND}`)).toBe(true);
      expect(postMeta(post).title).not.toContain('Xala Technologies AS');
    }
  });

  it.each(Object.entries(servicePages).map(([slug, page]) => [slug, page] as const))(
    'service page %s fits a search result',
    (_slug, page) => {
      const copy = (page as { no: { metaTitle: string; metaDescription: string } }).no;
      expect(copy.metaTitle.length).toBeLessThanOrEqual(TITLE_MAX);
      expect(copy.metaDescription.length).toBeGreaterThanOrEqual(DESC_MIN);
      expect(copy.metaDescription.length).toBeLessThanOrEqual(DESC_MAX);
    }
  );

  it('keeps the em-dash out of metadata', () => {
    // A standing instruction on this site: em-dashes read as machine-written
    // Norwegian. They had survived in the blog index description.
    for (const post of posts) {
      expect(post.description, post.slug).not.toMatch(/—/);
      expect(post.seoTitle ?? '', post.slug).not.toMatch(/—/);
    }
    for (const [slug, page] of Object.entries(servicePages)) {
      const copy = (page as { no: { metaTitle: string; metaDescription: string } }).no;
      expect(copy.metaTitle, slug).not.toMatch(/—/);
      expect(copy.metaDescription, slug).not.toMatch(/—/);
    }
  });
});
