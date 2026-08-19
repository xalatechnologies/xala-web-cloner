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
const VISMA = posts.find((post) => post.slug === 'skjenkebevilling-integrasjon-360-visma');
const SELE = posts.find((post) => post.slug === 'sele-rundt-ki-i-saksbehandling');

/** A leftover body dump is a trailing paragraph of only hashtags. */
function leftoverHashtagDump(body: string): string | undefined {
  const match = body.match(/(?:^|\n)(#[\p{L}][\p{L}\p{N}-]*(?:\s+#[\p{L}][\p{L}\p{N}-]*)+)\s*$/u);
  return match?.[1];
}

describe('topic keywords and hashtags', () => {
  it('finds the published set it is meant to tag', () => {
    expect(posts.length).toBeGreaterThanOrEqual(15);
    expect(GEBYR, 'gebyr post missing').toBeDefined();
    expect(VISMA, '360/Visma post missing').toBeDefined();
    expect(SELE, 'sele post missing').toBeDefined();
  });

  it('keeps one styled Sele topic line and does not leave a body hashtag dump', () => {
    expect(leftoverHashtagDump(SELE!.body)).toBeUndefined();
    expect(topicHashtagLine(SELE!)).toBe(
      '#selerundtKI #kunstigintelligenskommune #arkitekturprinsipper #saksbehandling',
    );
    expect(topicHashtagLine(SELE!).split(' ')).toHaveLength(4);
  });

  it('leaves the Gebyr and 360/Visma topic lines unchanged', () => {
    expect(topicHashtagLine(GEBYR!)).toBe(
      '#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven',
    );
    expect(topicHashtagLine(VISMA!)).toBe(
      '#skjenkebevilling #360 #visma #integrasjon #bevilling',
    );
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
    expect(topicHashtags({ tag: 'IT-leder', keywords: ['IT-leder'] })).toEqual([]);
    expect(topicHashtags({ tag: 'Kommune', keywords: ['IT-leder', 'Kommune'] })).toEqual([]);
  });

  it('keeps kommune as a topic when the audience chip is IT-leder', () => {
    const PRIKKER = posts.find((post) => post.slug === 'skjenkebevilling-prikker-to-aar');
    expect(PRIKKER, 'prikker post missing').toBeDefined();
    expect(leftoverHashtagDump(PRIKKER!.body)).toBeUndefined();
    expect(topicHashtagLine(PRIKKER!)).toBe(
      '#skjenkebevilling #prikker #kommune #saksbehandling #alkoholloven',
    );
    expect(topicHashtags({ tag: 'IT-leder', keywords: ['IT-leder', 'Kommune'] })).toEqual(['#Kommune']);
  });

  it('gives the kontrollrapport post one styled last line of four tags, no leftover dump', () => {
    const RAPPORT = posts.find((post) => post.slug === 'skjenkebevilling-kontrollrapport-og-kontrollapp');
    expect(RAPPORT, 'kontrollrapport post missing').toBeDefined();
    expect(leftoverHashtagDump(RAPPORT!.body)).toBeUndefined();
    expect(topicHashtagLine(RAPPORT!)).toBe(
      '#skjenkebevilling #kontrollrapport #kommune #saksbehandling',
    );
    expect(topicHashtagLine(RAPPORT!).split(' ')).toHaveLength(4);
  });

  it('gives the tilskudd purring post one styled last line of four tags, no leftover dump', () => {
    const PURRING = posts.find((post) => post.slug === 'tilskudd-purring-og-uklare-rapporteringskrav');
    expect(PURRING, 'tilskudd purring post missing').toBeDefined();
    expect(leftoverHashtagDump(PURRING!.body)).toBeUndefined();
    expect(topicHashtagLine(PURRING!)).toBe('#tilskudd #purring #kommune #saksbehandling');
    expect(topicHashtagLine(PURRING!).split(' ')).toHaveLength(4);
  });

  it('gives the tilskudd kontroll post one styled last line of four tags, no leftover dump', () => {
    const KONTROLL = posts.find((post) => post.slug === 'tilskudd-kontroll-maa-dokumenteres');
    expect(KONTROLL, 'tilskudd kontroll post missing').toBeDefined();
    expect(leftoverHashtagDump(KONTROLL!.body)).toBeUndefined();
    expect(topicHashtagLine(KONTROLL!)).toBe('#tilskudd #kontroll #kommune #saksbehandling');
    expect(topicHashtagLine(KONTROLL!).split(' ')).toHaveLength(4);
  });

  it('gives the sosialhjelp vedlegg post one styled last line of four tags, no leftover dump', () => {
    const VEDLEGG = posts.find((post) => post.slug === 'okonomisk-sosialhjelp-vedlegg-og-kode-6');
    expect(VEDLEGG, 'sosialhjelp vedlegg post missing').toBeDefined();
    expect(leftoverHashtagDump(VEDLEGG!.body)).toBeUndefined();
    expect(topicHashtagLine(VEDLEGG!)).toBe('#sosialhjelp #vedlegg #kommune #saksbehandling');
    expect(topicHashtagLine(VEDLEGG!).split(' ')).toHaveLength(4);
  });

  it('gives the sosialhjelp individuell vurdering post one styled last line of four tags, no leftover dump', () => {
    const SATS = posts.find((post) => post.slug === 'okonomisk-sosialhjelp-individuell-vurdering');
    expect(SATS, 'sosialhjelp individuell vurdering post missing').toBeDefined();
    expect(leftoverHashtagDump(SATS!.body)).toBeUndefined();
    expect(topicHashtagLine(SATS!)).toBe('#sosialhjelp #satser #kommune #saksbehandling');
    expect(topicHashtagLine(SATS!).split(' ')).toHaveLength(4);
  });

  it('gives the eByggesak Altinn post one styled last line of four tags, no leftover dump', () => {
    const EBYGG = posts.find((post) => post.slug === 'ebyggesak-manuell-henting-fra-altinn');
    expect(EBYGG, 'eByggesak Altinn post missing').toBeDefined();
    expect(leftoverHashtagDump(EBYGG!.body)).toBeUndefined();
    expect(topicHashtagLine(EBYGG!)).toBe('#ebyggesak #altinn #kommune #saksbehandling');
    expect(topicHashtagLine(EBYGG!).split(' ')).toHaveLength(4);
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
