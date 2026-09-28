import { describe, expect, it } from 'vitest';
import { getPageSEO } from '@/components/seo/seoContent';
import {
  expectedVisibleHashtags,
  keywordToHashtag as libHashtag,
  topicHashtags,
  topicKeywords,
} from '@/lib/blog/topics';
import type { BlogPost } from '@/lib/blog/types';
import type { ExpectedPost } from '../../scripts/verify-live';
import { postMeta } from '@/lib/blog/seo';
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
} from '../../scripts/verify-live';

const GEBYR_PATH = resolve(
  __dirname,
  '../content/blog/2026-08-03-skjenkebevilling-gebyr-og-omsetningsoppgave.md',
);
const gebyrPost = parsePost(readFileSync(GEBYR_PATH, 'utf8'), GEBYR_PATH);
if ('reason' in gebyrPost) throw new Error(gebyrPost.reason);

const VISMA_PATH = resolve(
  __dirname,
  '../content/blog/2026-08-08-skjenkebevilling-integrasjon-360-visma.md',
);
const vismaPost = parsePost(readFileSync(VISMA_PATH, 'utf8'), VISMA_PATH);
if ('reason' in vismaPost) throw new Error(vismaPost.reason);

const SAKSL_PATH = resolve(
  __dirname,
  '../content/blog/2026-09-28-saksbehandlingslosning-sporsmal-til-leverandoren.md',
);
const sakslPost = parsePost(readFileSync(SAKSL_PATH, 'utf8'), SAKSL_PATH);
if ('reason' in sakslPost) throw new Error(sakslPost.reason);

function asExpectedPost(post: BlogPost): ExpectedPost {
  return {
    slug: post.slug,
    title: post.title,
    seoTitle: post.seoTitle,
    tag: post.tag,
    keywords: post.keywords,
    hashtags: post.hashtags,
    topicHashtags: post.topicHashtags,
  };
}

function livePostHtml(post: BlogPost): string {
  const topics = topicKeywords(post);
  const visible = expectedVisibleHashtags(post);
  const meta = postMeta(post);
  return `<html><head>
<title>${meta.title}</title>
<meta name="keywords" content="${meta.keywords}" />
${topics.map((tag) => `<meta property="article:tag" content="${tag}" />`).join('\n')}
</head><body><div id="root">
<p>${visible.join(' ')}</p>
<aside><p>Del artikkelen</p><a href="https://www.linkedin.com/sharing/share-offsite/?url=x">LinkedIn</a></aside>
</div></body></html>`;
}

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
    expect(isPostTopicHead(LIVE_GEBYR, asExpectedPost(gebyrPost))).toBe(true);
  });

  it('keeps default posts include-only when #root has incidental hash tokens', () => {
    expect(gebyrPost.hashtags).toBeUndefined();
    const withToc = LIVE_GEBYR.replace(
      '<div id="root">',
      '<div id="root"><nav><a href="#kort-svar">Kort svar</a></nav>',
    );
    const found = firstHtmlHashtags(withToc);
    expect(found).toContain('#kort-svar');
    expect(found.length).toBeGreaterThan(expectedVisibleHashtags(gebyrPost).length);
    expect(isPostTopicHead(withToc, asExpectedPost(gebyrPost))).toBe(true);

    const missingOne = LIVE_GEBYR.replace('#alkoholloven', '');
    expect(isPostTopicHead(missingOne, asExpectedPost(gebyrPost))).toBe(false);
  });

  it('fails on the homepage keyword string, audience-only tags, or a missing share row', () => {
    expect(HOMEPAGE_KEYWORDS).toBe(getPageSEO('home', 'no').keywords);
    expect(BLOGPOST_CANNED_KEYWORDS).toBe(getPageSEO('blogPost', 'no').keywords);

    const homepageHead = `<html><head><meta name="keywords" content="${HOMEPAGE_KEYWORDS}" /></head><div id="root"></div></html>`;
    expect(isPostTopicHead(homepageHead, asExpectedPost(gebyrPost))).toBe(false);
    expect(isPostTopicHead('', asExpectedPost(gebyrPost))).toBe(false);
    expect(
      isPostTopicHead(
        '<html><head><title></title></head><div id="root"></div></html>',
        asExpectedPost(gebyrPost),
      ),
    ).toBe(false);

    const audienceOnly = `<html><head>
<meta name="keywords" content="IT-leder" />
<meta property="article:tag" content="IT-leder" />
</head><div id="root"><p>#IT-leder</p><p>Del artikkelen</p></div></html>`;
    expect(isPostTopicHead(audienceOnly, asExpectedPost(gebyrPost))).toBe(false);

    const noShare = LIVE_GEBYR.replace('Del artikkelen', 'Kopier');
    expect(isPostTopicHead(noShare, asExpectedPost(gebyrPost))).toBe(false);
  });

  it('accepts a hashtags: override while article:tag stays keyword-derived', () => {
    const row = expectedPosts().find((post) => post.slug === sakslPost.slug);
    expect(row, 'saksbehandlingslosning missing from expectedPosts()').toBeDefined();
    expect(row!.hashtags).toEqual(sakslPost.hashtags);

    const topics = topicKeywords(sakslPost);
    const visible = expectedVisibleHashtags(sakslPost);
    const derived = topicHashtags(sakslPost);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible).not.toEqual(derived);

    const liveSaksl = livePostHtml(sakslPost);

    expect(firstHtmlHashtags(liveSaksl)).toEqual(visible);
    expect(firstHtmlArticleTags(liveSaksl)).toEqual(topics);
    expect(isPostTopicHead(liveSaksl, asExpectedPost(sakslPost))).toBe(true);

    const derivedLongOnly = liveSaksl.replace(visible.join(' '), derived.join(' '));
    expect(isPostTopicHead(derivedLongOnly, asExpectedPost(sakslPost))).toBe(false);
  });

  it('accepts a four-tag hashtags override when keywords also carry long-tails (#192 shape)', () => {
    const fixture: BlogPost = {
      ...sakslPost,
      slug: 'synthetic-hashtags-override-fixture',
      keywords: [
        'saksbehandlingsløsning',
        'leverandør',
        'innføring',
        'system',
        'sammenligne leverandører av saksbehandlingsløsninger',
        'fordeler med moderne saksbehandlingsløsning',
        'innføring av nytt saksbehandlingssystem',
      ],
      hashtags: ['saksbehandlingsløsning', 'leverandør', 'innføring', 'system'],
    };

    const topics = topicKeywords(fixture);
    const visible = expectedVisibleHashtags(fixture);
    const derived = topicHashtags(fixture);
    expect(fixture.hashtags).toHaveLength(4);
    expect(visible).toEqual(fixture.hashtags!.map((tag) => keywordToHashtag(tag)));
    expect(visible).not.toEqual(derived);

    const liveFixture = livePostHtml(fixture);
    expect(firstHtmlHashtags(liveFixture)).toEqual(visible);
    expect(firstHtmlArticleTags(liveFixture)).toEqual(topics);
    expect(isPostTopicHead(liveFixture, asExpectedPost(fixture))).toBe(true);

    const derivedOnly = liveFixture.replace(visible.join(' '), derived.join(' '));
    expect(isPostTopicHead(derivedOnly, asExpectedPost(fixture))).toBe(false);

    const withToc = liveFixture.replace(
      '<div id="root">',
      '<div id="root"><nav><a href="#innhold">Innhold</a></nav>',
    );
    expect(firstHtmlHashtags(withToc)).toContain('#innhold');
    expect(isPostTopicHead(withToc, asExpectedPost(fixture))).toBe(false);
  });

  it('matches numeric topic hashtags like #360 but excludes hex color tokens', () => {
    const VISMA_TOPICS = ['skjenkebevilling', '360', 'visma', 'integrasjon', 'bevilling'];
    const liveVisma = `<html><head>
<title>Skjenkebevilling: 360 og Visma mot portalen | Xala</title>
<meta name="keywords" content="skjenkebevilling, 360, visma, integrasjon, bevilling, offentlig sektor" />
${VISMA_TOPICS.map((tag) => `<meta property="article:tag" content="${tag}" />`).join('\n')}
</head><body><div id="root">
<p>#skjenkebevilling #360 #visma #integrasjon #bevilling</p>
<aside><p>Del artikkelen</p><a href="https://www.linkedin.com/sharing/share-offsite/?url=x">LinkedIn</a></aside>
</div></body></html>`;

    expect(firstHtmlHashtags(liveVisma)).toEqual(VISMA_TOPICS.map((topic) => `#${topic}`));
    expect(isPostTopicHead(liveVisma, asExpectedPost(vismaPost))).toBe(true);

    const withHexColors = `<div id="root">
<style>.primary{color:#4F46E5;background:#0F1117;border:#AABBCCDD}</style>
<p>#skjenkebevilling #360 #visma #integrasjon #bevilling</p>
<p>Del artikkelen</p>
</div>`;
    const hashtags = firstHtmlHashtags(withHexColors);
    expect(hashtags).toContain('#360');
    expect(hashtags).toContain('#skjenkebevilling');
    expect(hashtags).not.toContain('#4F46E5');
    expect(hashtags).not.toContain('#0F1117');
    expect(hashtags).not.toContain('#AABBCCDD');
  });
});
