import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPostFile, parsePost, publishedPosts, sortPosts } from '../posts';
import {
  blogListingQueries,
  blogQueryArtifactPath,
  blogQueryFileKey,
  filterBlogPosts,
} from '../search';
import { getPageSEO } from '@/components/seo/seoContent';
import { BLOG_LISTING_HEADING } from '../seo';
import { blogListingCardHrefs, blogListingHtml } from '../listingHtml';
import type { BlogPost } from '../types';

/**
 * First HTML for /blogg?q= — the body the prerender writes, before any
 * bundle runs. Filtering used to live only in BloggPage after hydrate, so
 * this URL was byte-identical to /blogg for a crawler.
 */
const DIR = resolve(__dirname, '../../../content/blog');

const posts: BlogPost[] = publishedPosts(
  sortPosts(
    readdirSync(DIR)
      .filter(isPostFile)
      .map((file) => parsePost(readFileSync(join(DIR, file), 'utf8'), file))
      .filter((result): result is BlogPost => !('reason' in result)),
  ),
);

const GEBYR = '/blogg/skjenkebevilling-gebyr-og-omsetningsoppgave';
const VISMA_FAKTURA = '/blogg/visma-fakturagrunnlag-fra-fagsystem';
const UNRELATED = [
  '/blogg/iso-27001-i-praksis-for-utviklingsprosjekter',
  '/blogg/wcag-2-2-aa-i-praksis-for-fagsystemer',
  '/blogg/id-porten-eller-maskinporten-hva-velger-du',
  '/blogg/redusert-foreldrebetaling-sfo-varig-nedgang',
];

describe('no-JS /blogg?q= listing', () => {
  it('finds the published set it is meant to filter', () => {
    expect(posts.length).toBeGreaterThanOrEqual(10);
    expect(posts.some((post) => post.slug === 'skjenkebevilling-gebyr-og-omsetningsoppgave')).toBe(
      true,
    );
  });

  it('prerenders only the gebyr match, not the full listing', () => {
    const filtered = filterBlogPosts(posts, { query: 'gebyr' });
    const html = blogListingHtml(filtered, { query: 'gebyr', totalCount: posts.length });

    expect(filtered.map((post) => post.slug)).toEqual([
      'skjenkebevilling-gebyr-og-omsetningsoppgave',
      'visma-fakturagrunnlag-fra-fagsystem',
    ]);
    expect(blogQueryArtifactPath('gebyr')).toBe('blogg/q/gebyr/index.html');
    expect(blogListingQueries(posts)).toContain('gebyr');

    const hrefs = blogListingCardHrefs(html);
    expect(hrefs).toEqual([GEBYR, VISMA_FAKTURA]);
    expect(html).toMatch(/gebyr/i);
    expect(html).toContain('2 av ');
    for (const href of UNRELATED) {
      expect(html, `${href} must not be a listing card for q=gebyr`).not.toContain(href);
    }
  });

  it('prerenders the full listing when q is absent', () => {
    const html = blogListingHtml(posts);
    const hrefs = blogListingCardHrefs(html);

    expect(hrefs).toHaveLength(posts.length);
    expect(hrefs).toContain(GEBYR);
    for (const href of UNRELATED) {
      expect(hrefs).toContain(href);
    }
    expect(html).not.toMatch(/\d+ av \d+ artikler/);
  });

  it('uses the designed listing H1, not the SEO document title', () => {
    // XWEB-188: first HTML used title.split(" | ")[0], so crawlers and the
    // first paint saw "Fagartikler om offentlig digitalisering" and hydrate
    // then swapped it for the page heading.
    const seoTitle = getPageSEO('blog', 'no').title;
    const html = blogListingHtml(posts);
    const h1 = html.match(/<h1>([^<]*)<\/h1>/)?.[1];

    expect(seoTitle).toBe('Fagartikler om offentlig digitalisering | Xala');
    expect(BLOG_LISTING_HEADING).toBe('Erfaringer fra systemer i drift');
    expect(h1).toBe(BLOG_LISTING_HEADING);
    expect(h1).not.toBe(seoTitle.split(' | ')[0]);
    expect(html).not.toContain(`<h1>${seoTitle.split(' | ')[0]}</h1>`);
  });

  it('does not clamp first-HTML listing H1s to 18ch or 20ch', () => {
    // XWEB-194: the prerender shell H1 used max-width:20ch while the
    // hydrated /blogg heading used max-w-[18ch]. Both must follow the
    // container so first paint and hydrate agree.
    const prerender = readFileSync(resolve(__dirname, '../../../../scripts/prerender-blog.ts'), 'utf8');
    const bloggPage = readFileSync(resolve(__dirname, '../../../pages/BloggPage.tsx'), 'utf8');
    const pageFrame = readFileSync(resolve(__dirname, '../../../components/layouts/PageFrame.tsx'), 'utf8');

    expect(prerender).not.toMatch(/max-width:\s*20ch/);
    expect(prerender).not.toMatch(/max-width:\s*18ch/);
    expect(bloggPage).not.toContain('max-w-[18ch]');
    expect(bloggPage).not.toContain('max-w-[20ch]');
    expect(pageFrame).not.toContain('max-w-[20ch]');
    expect(pageFrame).not.toContain('max-w-[18ch]');
  });

  it('does not turn a phrase into a file the hosts would disagree on', () => {
    expect(blogQueryFileKey('skjenkebevilling gebyr')).toBeNull();
    expect(blogQueryFileKey('gebyr')).toBe('gebyr');
    expect(blogQueryFileKey('../etc')).toBeNull();
  });
});
