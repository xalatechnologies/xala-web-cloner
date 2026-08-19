/**
 * Topic hashtags for a post — not the audience chip, not the homepage string.
 *
 * Frontmatter `tag` is one audience label (IT-leder, Arkitekt, …). The topic
 * list is `keywords`, the same words Article JSON-LD already publishes.
 * Visible hashtags are 3–5 of those, last line of the post, never a dump.
 */
import type { BlogPost } from "./types";

/** Audience chips are not a topic list. Compared case-insensitively. */
const AUDIENCE = new Set(["it-leder", "arkitekt", "kommune", "utvikler"]);

const MAX_TOPICS = 5;

export function topicKeywords(post: Pick<BlogPost, "keywords" | "tag">): string[] {
  const audience = post.tag?.trim().toLowerCase();
  const seen = new Set<string>();
  const topics: string[] = [];

  for (const raw of post.keywords ?? []) {
    const keyword = raw.trim();
    if (!keyword) continue;
    const key = keyword.toLowerCase();
    if (AUDIENCE.has(key) || (audience && key === audience)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    topics.push(keyword);
    if (topics.length === MAX_TOPICS) break;
  }

  return topics;
}

/** `offentlig sektor` → `#offentligsektor`; hyphens stay (`SSA-S` → `#SSA-S`). */
export function keywordToHashtag(keyword: string): string {
  const body = keyword.trim().replace(/\s+/g, "").replace(/[^\p{L}\p{N}-]/gu, "");
  return body ? `#${body}` : "";
}

export function topicHashtags(post: Pick<BlogPost, "keywords" | "tag">): string[] {
  return topicKeywords(post).map(keywordToHashtag).filter(Boolean);
}

/** Last line of the post: three to five hashtags, space-separated. */
export function topicHashtagLine(post: Pick<BlogPost, "keywords" | "tag">): string {
  return topicHashtags(post).join(" ");
}

export function topicHashtagLineHtml(post: Pick<BlogPost, "keywords" | "tag">): string {
  const line = topicHashtagLine(post);
  if (!line) return "";
  return `<p>${escapeHtml(line)}</p>`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
