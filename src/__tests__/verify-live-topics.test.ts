import { describe, expect, it } from 'vitest';
import { getPageSEO } from '@/components/seo/seoContent';
import { keywordToHashtag as libHashtag, topicHashtags, topicKeywords } from '@/lib/blog/topics';
import { parsePost } from '@/lib/blog/posts';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  BLOGPOST_CANNED_KEYWORDS,
  HOMEPAGE_KEYWORDS,
  expectedPosts,
  firstHtmlArticleTags,
  firstHtmlHashtags,
  firstHtmlKeywords,
  hasShareRow,
  isPostTopicHead,
  keywordToHashtag,
  parseKeywords,
  topicKeywordsFromList,
} from '../../scripts/verify-live.mjs';

const GEBYR_PATH = resolve(
  __dirname,
  '../content/blog/2026-08-03-skjenkebevilling-gebyr-og-omsetningsoppgave.md',
);
const gebyrPost = parsePost(readFileSync(GEBYR_PATH, 'utf8'), GEBYR_PATH);
if ('reason' in gebyrPost) throw new Error(gebyrPost.reason);

const GEBYR_TOPICS = [
  'skjenkebevilling',
  'gebyr',
  'omsetningsoppgave',
  'visma',
  'alkoholloven',
];

const LIVE_GEBYR = `<html><head>
<title>Skjenkebevilling: gebyr og omsetning for hånd | Xala</title>
<meta name="keywords" content="skjenkebevilling, gebyr, omsetningsoppgave, visma, alkoholloven, offentlig sektor" />
${GEBYR_TOPICS.map((tag) => `<meta property="article:tag" content="${tag}" />`).join('\n')}
</head><body><div id="root">
<p>#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven</p>
<aside><p>Del artikkelen</p><a href="https://www.linkedin.com/sharing/share-offsite/?url=x">LinkedIn</a></aside>
</div></body></html>`;

describe('verify-live first-HTML topics', () => {
  it('parses both keyword shapes the content agent writes', () => {
    expect(parseKeywords('keywords: ["skjenkebevilling", "gebyr"]\n')).toEqual([
      'skjenkebevilling',
      'gebyr',
    ]);
    expect(parseKeywords('keywords:\n  - sele rundt KI\n  - saksbehandling\ntag: "IT-leder"\n')).toEqual([
      'sele rundt KI',
      'saksbehandling',
    ]);
    const sele = expectedPosts().find((post) => post.slug === 'sele-rundt-ki-i-saksbehandling');
    expect(sele?.keywords).toEqual([
      'sele rundt KI',
      'kunstig intelligens kommune',
      'arkitekturprinsipper',
      'saksbehandling',
    ]);
  });

  it('agrees with topicKeywords() on the gebyr post — not an empty title-style match', () => {
    const row = expectedPosts().find((post) => post.slug === gebyrPost.slug);
    expect(row, 'gebyr missing from expectedPosts()').toBeDefined();
    expect(row!.keywords).toEqual(gebyrPost.keywords);
    expect(row!.tag).toBe('IT-leder');

    const fromVerify = topicKeywordsFromList(row!.keywords, row!.tag);
    expect(fromVerify).toEqual(GEBYR_TOPICS);
    expect(fromVerify).toEqual(topicKeywords(gebyrPost));
    expect(fromVerify.map(keywordToHashtag)).toEqual(topicHashtags(gebyrPost));
    expect(keywordToHashtag('offentlig sektor')).toBe(libHashtag('offentlig sektor'));
    expect(fromVerify).not.toContain('IT-leder');
  });

  it('accepts first HTML that has hashtags, article:tag, post keywords, and Del artikkelen', () => {
    expect(firstHtmlKeywords(LIVE_GEBYR)).toContain('skjenkebevilling');
    expect(firstHtmlArticleTags(LIVE_GEBYR)).toEqual(GEBYR_TOPICS);
    expect(firstHtmlHashtags(LIVE_GEBYR)).toEqual(GEBYR_TOPICS.map((topic) => `#${topic}`));
    expect(hasShareRow(LIVE_GEBYR)).toBe(true);
    expect(isPostTopicHead(LIVE_GEBYR, gebyrPost)).toBe(true);
  });

  it('fails on the homepage keyword string, audience-only tags, or a missing share row', () => {
    expect(HOMEPAGE_KEYWORDS).toBe(getPageSEO('home', 'no').keywords);
    expect(BLOGPOST_CANNED_KEYWORDS).toBe(getPageSEO('blogPost', 'no').keywords);

    const homepageHead = `<html><head><meta name="keywords" content="${HOMEPAGE_KEYWORDS}" /></head><div id="root"></div></html>`;
    expect(isPostTopicHead(homepageHead, gebyrPost)).toBe(false);
    expect(isPostTopicHead('', gebyrPost)).toBe(false);
    expect(isPostTopicHead('<html><head><title></title></head><div id="root"></div></html>', gebyrPost)).toBe(
      false,
    );

    const audienceOnly = `<html><head>
<meta name="keywords" content="IT-leder" />
<meta property="article:tag" content="IT-leder" />
</head><div id="root"><p>#IT-leder</p><p>Del artikkelen</p></div></html>`;
    expect(isPostTopicHead(audienceOnly, gebyrPost)).toBe(false);

    const noShare = LIVE_GEBYR.replace('Del artikkelen', 'Kopier');
    expect(isPostTopicHead(noShare, gebyrPost)).toBe(false);
  });
});
