import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  leakedListingCards,
  postRelatedToQuery,
  publishedPostsForQuery,
} from '../../scripts/verify-dist.mjs';

const GEBYR = '/blogg/skjenkebevilling-gebyr-og-omsetningsoppgave';
const VISMA = '/blogg/visma-fakturagrunnlag-fra-fagsystem';
const UNRELATED = '/blogg/iso-27001-i-praksis-for-utviklingsprosjekter';

const posts = publishedPostsForQuery();
const byHref = Object.fromEntries(posts.map((post) => [post.href, post]));

describe('verify-dist q= relatedness', () => {
  it('treats the Visma post as related to gebyr via title and keywords, not the slug', () => {
    const visma = byHref[VISMA];
    expect(visma, 'Visma fakturagrunnlag post missing').toBeDefined();
    expect(visma.slug).not.toContain('gebyr');
    expect(visma.title.toLowerCase()).toContain('gebyr');
    expect(visma.keywords.map((keyword) => keyword.toLowerCase())).toContain('gebyr');
    expect(visma.body.toLowerCase()).toContain('gebyr');
    expect(postRelatedToQuery(visma, 'gebyr')).toBe(true);
  });

  it('still requires the original gebyr post and rejects a slug-only unrelated card', () => {
    const gebyr = byHref[GEBYR];
    const iso = byHref[UNRELATED];
    expect(gebyr, 'gebyr post missing').toBeDefined();
    expect(iso, 'iso post missing').toBeDefined();
    expect(postRelatedToQuery(gebyr, 'gebyr')).toBe(true);
    expect(postRelatedToQuery(iso, 'gebyr')).toBe(false);
    expect(leakedListingCards([GEBYR, VISMA], posts, 'gebyr')).toEqual([]);
    expect(leakedListingCards([GEBYR, VISMA, UNRELATED], posts, 'gebyr')).toEqual([UNRELATED]);
  });

  it('does not treat a slug that happens to contain the query as related on its own', () => {
    expect(
      postRelatedToQuery(
        { href: '/blogg/gebyr-only-in-path', slug: 'gebyr-only-in-path', title: 'Annet', keywords: [], body: 'Ingen treff.' },
        'gebyr',
      ),
    ).toBe(false);
  });

  it('keeps gebyr on the live Visma post instead of dropping the keyword to pass the gate', () => {
    const source = readFileSync(resolve(__dirname, '../../scripts/verify-dist.mjs'), 'utf8');
    expect(source).not.toMatch(/href !== '\/blogg\/skjenkebevilling-gebyr-og-omsetningsoppgave'/);
    expect(source).toContain('postRelatedToQuery');
    expect(byHref[VISMA].keywords).toContain('gebyr');
  });
});
