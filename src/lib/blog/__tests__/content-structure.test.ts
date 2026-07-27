import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPostFile, parsePost } from '../posts';
import { extractFaq, extractHeadings, faqJsonLd } from '../toc';
import { postUrl } from '../seo';
import type { BlogPost } from '../types';

/**
 * The structure the published posts are supposed to have, checked against the
 * real files rather than a fixture.
 *
 * The article page derives its table of contents and its FAQPage schema from
 * the markdown body. That means the AEO surface is only as real as the content:
 * a post written without an FAQ section silently publishes no FAQ schema, and
 * nothing else in the build would say so. This test is where that shows up.
 */
const DIR = resolve(__dirname, '../../../content/blog');

const posts: BlogPost[] = readdirSync(DIR)
  .filter(isPostFile)
  .map((file) => parsePost(readFileSync(join(DIR, file), 'utf8'), file))
  .filter((result): result is BlogPost => !('reason' in result))
  .filter((post) => !post.draft);

describe('published post structure', () => {
  it('finds the posts it is meant to check', () => {
    expect(posts.length).toBeGreaterThanOrEqual(5);
  });

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s has enough h2 sections to be worth a table of contents',
    (_slug, post) => {
      expect(extractHeadings(post.body).length).toBeGreaterThanOrEqual(3);
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s answers at least three questions in an FAQ section',
    (_slug, post) => {
      const faq = extractFaq(post.body);
      expect(faq.length).toBeGreaterThanOrEqual(3);
      // An answer of a few words is not an answer an engine will cite.
      for (const item of faq) {
        expect(item.question.length).toBeGreaterThan(10);
        expect(item.answer.length).toBeGreaterThan(60);
      }
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s produces FAQPage schema whose questions all appear in the body',
    (_slug, post) => {
      const faq = extractFaq(post.body);
      const schema = faqJsonLd(postUrl(post), faq) as {
        mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
      } | null;

      expect(schema).not.toBeNull();
      // Schema that claims a question the page does not show is exactly what
      // Google penalises. Derived-from-body means this cannot drift, and this
      // assertion is what keeps it that way if the derivation changes.
      for (const entry of schema!.mainEntity) {
        expect(post.body).toContain(entry.name);
      }
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s has anchor ids that are unique',
    (_slug, post) => {
      const ids = extractHeadings(post.body).map((heading) => heading.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  );
});
