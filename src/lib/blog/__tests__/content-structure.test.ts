import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { coverAlt, isPostFile, parsePost } from '../posts';
import {
  extractHeadings,
  faqJsonLd,
  faqToMarkdown,
  postFaq,
  splitLeadSection,
  stripFaqSection,
  stripRelatedArticles,
} from '../toc';
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
      const faq = postFaq(post, post.body);
      expect(faq.length).toBeGreaterThanOrEqual(3);
      // An answer of a few words is not an answer an engine will cite.
      for (const item of faq) {
        expect(item.question.length).toBeGreaterThan(10);
        expect(item.answer.length).toBeGreaterThan(60);
      }
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s produces FAQPage schema whose questions all appear on the page',
    (_slug, post) => {
      const faq = postFaq(post, post.body);
      const schema = faqJsonLd(postUrl(post), faq) as {
        mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
      } | null;

      expect(schema).not.toBeNull();
      // Schema that claims a question the page does not show is exactly what
      // Google penalises. Check the markdown the page actually renders:
      // frontmatter FAQ goes through faqToMarkdown, body FAQ stays in the body.
      const visible = post.faq?.length
        ? `${stripFaqSection(stripRelatedArticles(post.body))}\n\n${faqToMarkdown(post.faq)}`
        : post.body;
      if (post.faq?.length) {
        expect(visible).toContain('## Vanlige spørsmål');
        for (const item of post.faq) expect(visible).toContain(item.answer);
      }
      for (const entry of schema!.mainEntity) {
        expect(visible).toContain(entry.name);
      }
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s names a cover image that exists',
    (_slug, post) => {
      // One post shipped for weeks with the file generated and the frontmatter
      // field never added, so the card rendered with a hole in it and nothing
      // failed.
      expect(post.cover, `${post.slug} has no cover`).toBeTruthy();
      const file = resolve(
        __dirname,
        '../../../../public',
        post.cover!.replace(/^\//, '').split('?')[0],
      );
      expect(existsSync(file), `${post.cover} is not in public/`).toBe(true);
      const alt = coverAlt(post);
      expect(alt, `${post.slug} has an empty hero alt`).toBeTruthy();
      expect(alt).not.toBe(post.cover);
      expect(alt).not.toBe(post.cover!.split('/').pop());
    }
  );

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s has anchor ids that are unique',
    (_slug, post) => {
      const ids = extractHeadings(post.body).map((heading) => heading.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  );

  it('keeps the saksbehandlingssystem CTA heading unique and the FAQ last', () => {
    const post = posts.find((item) => item.slug === 'hva-er-et-saksbehandlingssystem');
    expect(post?.faq?.length).toBeGreaterThanOrEqual(3);
    expect(post!.body).not.toMatch(/^##\s+Snakk med oss om dette\s*$/m);

    const visible = `${stripFaqSection(stripRelatedArticles(post!.body))}\n\n${faqToMarkdown(post!.faq!)}`;
    const h2s = [...visible.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
    expect(h2s.filter((heading) => heading === 'Snakk med oss om dette')).toEqual([]);
    expect(h2s.at(-1)).toBe('Vanlige spørsmål');
    expect(post!.cover).toContain('?v=2');
  });

  it('emits FAQPage JSON-LD without markdown link syntax on affected posts', () => {
    for (const slug of [
      'skalerbarhet-males-pa-fristdagen',
      'saken-bytter-behandler-ved-inhabilitet',
    ]) {
      const post = posts.find((item) => item.slug === slug);
      expect(post).toBeTruthy();
      const faq = postFaq(post!, post!.body);
      const schema = faqJsonLd(postUrl(post!), faq) as {
        mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
      };
      for (const entry of schema.mainEntity) {
        expect(entry.name).not.toMatch(/\]\(/);
        expect(entry.name).not.toMatch(/\[/);
        expect(entry.acceptedAnswer.text).not.toMatch(/\]\(/);
        expect(entry.acceptedAnswer.text).not.toMatch(/\[/);
      }
    }
  });

  it('lifts Kort svar on the automatisering post so the template can put it above the cover', () => {
    const post = posts.find((item) => item.slug === 'automatisering-av-saksbehandling-hva-boer-og-ikke');
    expect(post).toBeTruthy();
    const { lead, rest } = splitLeadSection(post!.body);
    expect(lead).toMatch(/^## Kort svar/);
    expect(lead).toContain('Digdir');
    expect(lead).toContain('Prop. 79 L');
    expect(lead).toContain('Forskriftsarbeidet');
    expect(rest).toMatch(/^## Skillet går ved skjønn/);
    expect(rest).not.toContain('## Kort svar');
  });
});
