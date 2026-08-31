import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parsePost } from '../posts';
import { postMeta, postUrl } from '../seo';
import { SHARE_LABEL, shareRowHtml } from '../share';
import { topicHashtagLine, topicKeywords } from '../topics';
import type { BlogPost } from '../types';
import { getPageSEO } from '@/components/seo/seoContent';

/**
 * First-HTML fragments the prerender writes into a post page. These are the
 * strings a crawler reads — not source-contains checks, and not an empty
 * document.title-style assertion.
 */
const GEBYR_FILE = resolve(
  __dirname,
  '../../../content/blog/2026-08-03-skjenkebevilling-gebyr-og-omsetningsoppgave.md',
);
const VISMA_FILE = resolve(
  __dirname,
  '../../../content/blog/2026-08-08-skjenkebevilling-integrasjon-360-visma.md',
);
const SELE_FILE = resolve(
  __dirname,
  '../../../content/blog/2026-08-20-sele-rundt-ki-i-saksbehandling.md',
);
const PRERENDER = readFileSync(resolve(__dirname, '../../../../scripts/prerender-blog.ts'), 'utf8');

function loadPost(file: string): BlogPost {
  const parsed = parsePost(readFileSync(file, 'utf8'), file);
  if ('reason' in parsed) throw new Error(parsed.reason);
  return parsed;
}

const gebyr = loadPost(GEBYR_FILE);
const visma = loadPost(VISMA_FILE);
const sele = loadPost(SELE_FILE);

/** Trailing leftover dump in markdown only — prerender no longer appends styled hashtag lines. */
function leftoverHashtagDump(bodyMarkdown: string): string | undefined {
  const match = bodyMarkdown.match(
    /(?:^|\n)(#[\p{L}][\p{L}\p{N}-]*(?:\s+#[\p{L}][\p{L}\p{N}-]*)+)\s*$/u,
  );
  return match?.[1];
}

const homepageKeywords = getPageSEO('home', 'no').keywords;

function firstHtmlHead(post: BlogPost): string {
  const meta = postMeta(post);
  const tags = [
    `<meta name="keywords" content="${meta.keywords}" data-rh="true" />`,
    ...meta.articleTags.map((tag) => `<meta property="article:tag" content="${tag}" data-rh="true" />`),
  ];
  return `<head>${tags.join('')}</head>`;
}

function firstHtmlBody(post: BlogPost): string {
  return `<div id="root">${shareRowHtml(postUrl(post), post.title)}</div>`;
}

describe('first HTML for a blog post', () => {
  it('emits post-specific keywords, matching article:tag, and the share row — no visible hashtag dump', () => {
    const head = firstHtmlHead(gebyr);
    const body = firstHtmlBody(gebyr);
    const html = `${head}${body}`;
    const topics = topicKeywords(gebyr);

    expect(topics).toHaveLength(5);
    expect(head).toContain('content="skjenkebevilling, gebyr, omsetningsoppgave, visma, alkoholloven, offentlig sektor"');
    expect(head).not.toContain(homepageKeywords);
    for (const topic of topics) {
      expect(head).toContain(`property="article:tag" content="${topic}"`);
    }
    expect(head).not.toContain('content="IT-leder"');

    expect(body).not.toContain('#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven');
    expect(body).not.toContain('#IT-leder');
    expect(body).toContain(SHARE_LABEL);
    expect(body).toContain('linkedin.com/sharing/share-offsite');
    expect(html.length).toBeGreaterThan(80);
  });

  it('is the markup the prerender actually writes', () => {
    expect(PRERENDER).not.toContain('topicHashtagLineHtml');
    expect(PRERENDER).toContain('shareRowHtml');
    expect(PRERENDER).toContain('replaceMeta("name", "keywords"');
    expect(PRERENDER).toContain('property="article:tag"');
    expect(PRERENDER).toContain('articleTags: meta.articleTags');
    expect(PRERENDER).toContain('keywords: meta.keywords');

    const shareAt = PRERENDER.indexOf('${shareRowHtml(postUrl(post), post.title)}');
    const bodyAt = PRERENDER.indexOf('${bodyHtml}');
    expect(shareAt).toBeGreaterThan(bodyAt);
    expect(PRERENDER.slice(bodyAt, shareAt)).not.toContain('topicHashtag');
  });

  it('keeps topicKeywords to 3–5 topics, not the full keyword dump', () => {
    expect(gebyr.keywords).toHaveLength(6);
    expect(topicHashtagLine(gebyr).split(' ')).toHaveLength(5);
    expect(topicHashtagLine(gebyr)).not.toContain('#offentligsektor');
  });

  it('does not append a hashtag line in first HTML for the sele post', () => {
    const share = shareRowHtml(postUrl(sele), sele.title);
    const html = `<div id="root">${sele.body}${share}</div>`;

    expect(leftoverHashtagDump(sele.body)).toBeUndefined();
    expect(html).not.toContain(
      '#selerundtKI #kunstigintelligenskommune #arkitekturprinsipper #saksbehandling',
    );
    expect(html).not.toContain(
      '#kunstigintelligens #arkitekturprinsipper #saksbehandling #digitalisering #offentligsektor',
    );
    expect(html).toContain(SHARE_LABEL);
    expect(topicHashtagLine(gebyr)).toBe(
      '#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven',
    );
    expect(topicHashtagLine(visma)).toBe('#skjenkebevilling #360 #visma #integrasjon #bevilling');
  });
});
