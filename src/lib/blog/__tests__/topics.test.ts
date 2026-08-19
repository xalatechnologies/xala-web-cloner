import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPostFile, parsePost } from '../posts';
import { postMeta } from '../seo';
import { keywordToHashtag, topicHashtagLine, topicHashtags, topicKeywords } from '../topics';
import type { BlogPost } from '../types';
import { getPageSEO } from '@/components/seo/seoContent';

const DIR = resolve(__dirname, '../../../content/blog');

const posts: BlogPost[] = readdirSync(DIR)
  .filter(isPostFile)
  .map((file) => parsePost(readFileSync(join(DIR, file), 'utf8'), file))
  .filter((result): result is BlogPost => !('reason' in result))
  .filter((post) => !post.draft);

const GEBYR = posts.find((post) => post.slug === 'skjenkebevilling-gebyr-og-omsetningsoppgave');

describe('topic keywords and hashtags', () => {
  it('finds the published set it is meant to tag', () => {
    expect(posts.length).toBeGreaterThanOrEqual(15);
    expect(GEBYR, 'gebyr post missing').toBeDefined();
  });

  it('turns frontmatter keywords into 3–5 hashtags, not the audience chip', () => {
    expect(GEBYR!.tag).toBe('IT-leder');
    expect(GEBYR!.keywords).toEqual([
      'skjenkebevilling',
      'gebyr',
      'omsetningsoppgave',
      'visma',
      'alkoholloven',
      'offentlig sektor',
    ]);

    const topics = topicKeywords(GEBYR!);
    expect(topics).toEqual([
      'skjenkebevilling',
      'gebyr',
      'omsetningsoppgave',
      'visma',
      'alkoholloven',
    ]);
    expect(topics).toHaveLength(5);
    expect(topics).not.toContain('IT-leder');
    expect(topics).not.toContain('offentlig sektor');

    expect(topicHashtagLine(GEBYR!)).toBe(
      '#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven',
    );
  });

  it('does not treat an audience-only tag as the hashtag list', () => {
    const topics = topicKeywords({ tag: 'IT-leder', keywords: [] });
    expect(topics).toEqual([]);
    expect(topicHashtags({ tag: 'IT-leder', keywords: ['IT-leder', 'Kommune'] })).toEqual([]);
  });

  it('joins spaced Norwegian keywords into one hashtag', () => {
    expect(keywordToHashtag('offentlig sektor')).toBe('#offentligsektor');
    expect(keywordToHashtag('sele rundt KI')).toBe('#selerundtKI');
    expect(keywordToHashtag('SSA-S')).toBe('#SSA-S');
    expect(keywordToHashtag('WCAG 2.2 AA')).toBe('#WCAG22AA');
  });

  it.each(posts.map((post) => [post.slug, post] as const))(
    '%s publishes 3–5 topic hashtags from keywords, not homepage copy',
    (_slug, post) => {
      const topics = topicKeywords(post);
      const hashtags = topicHashtags(post);
      const homepage = getPageSEO('home', 'no').keywords;
      const canned = getPageSEO('blogPost', 'no').keywords;

      expect(post.keywords?.length, `${post.slug} has no frontmatter keywords`).toBeGreaterThanOrEqual(3);
      expect(topics.length).toBeGreaterThanOrEqual(3);
      expect(topics.length).toBeLessThanOrEqual(5);
      expect(hashtags).toHaveLength(topics.length);
      expect(topics.map((topic) => topic.toLowerCase())).not.toContain((post.tag ?? '').toLowerCase());
      expect(postMeta(post).articleTags).toEqual(topics);
      expect(postMeta(post).keywords).not.toBe(homepage);
      expect(postMeta(post).keywords).not.toBe(canned);
      expect(topicHashtagLine(post)).not.toMatch(/IT-leder/);
    },
  );
});
