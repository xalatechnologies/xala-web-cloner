import { describe, expect, it } from 'vitest';
import { getPageSEO } from '@/components/seo/seoContent';
import { BRAND, postMeta } from '@/lib/blog/seo';
import {
  BRAND as VERIFY_BRAND,
  documentTitleFromPost,
  expectedPosts,
  isOwnDocumentTitle,
} from '../../scripts/verify-live.mjs';

/**
 * Deploy #103 failed 24 posts because verify-live required the long
 * frontmatter `title` inside `<title>`. After XWEB-184 the first HTML title
 * is postMeta() = (seoTitle ?? title) | Xala.
 */
const GEBYR = {
  slug: 'skjenkebevilling-gebyr-og-omsetningsoppgave',
  title: 'Skjenkebevilling: når gebyr og omsetning regnes for hånd',
  seoTitle: 'Skjenkebevilling: gebyr og omsetning for hånd',
};

const LIVE_GEBYR = `<html><head><title>${GEBYR.seoTitle} | Xala</title></head></html>`;
const SHELL_LISTING = getPageSEO('blog', 'no').title;

describe('verify-live document title', () => {
  it('uses the same brand suffix as postMeta()', () => {
    expect(VERIFY_BRAND).toBe(BRAND);
    expect(VERIFY_BRAND).toBe('Xala');
  });

  it('reads seoTitle from frontmatter the same way it reads title', () => {
    const post = expectedPosts().find((row) => row.slug === GEBYR.slug);
    expect(post, 'gebyr post missing from expectedPosts()').toBeDefined();
    expect(post!.title).toBe(GEBYR.title);
    expect(post!.seoTitle).toBe(GEBYR.seoTitle);
    expect(documentTitleFromPost(post!)).toBe(`${GEBYR.seoTitle} | Xala`);
  });

  it('accepts seoTitle | Xala when that is shorter than title', () => {
    expect(GEBYR.seoTitle).not.toBe(GEBYR.title);
    expect(LIVE_GEBYR).not.toContain(GEBYR.title);
    expect(documentTitleFromPost(GEBYR)).toBe(`${GEBYR.seoTitle} | Xala`);
    expect(documentTitleFromPost(GEBYR)).toBe(postMeta(GEBYR as never).title);
    expect(isOwnDocumentTitle(LIVE_GEBYR, GEBYR)).toBe(true);
  });

  it('still fails when the first title is the listing shell', () => {
    expect(SHELL_LISTING).toBe('Fagartikler om offentlig digitalisering | Xala');
    const html = `<html><head><title>${SHELL_LISTING}</title></head></html>`;
    expect(isOwnDocumentTitle(html, GEBYR)).toBe(false);
    expect(isOwnDocumentTitle(`<title>${getPageSEO('home', 'no').title}</title>`, GEBYR)).toBe(
      false,
    );
  });
});
