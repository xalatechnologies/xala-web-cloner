/**
 * Turning markdown files into posts — the pure half of the blog.
 *
 * Everything here is a function of its arguments, so both loaders (the browser
 * one using import.meta.glob, and the Node one the prerender script uses) share
 * exactly the same parsing, validation and ordering. A post that renders in the
 * SPA and a post that renders into static HTML cannot disagree.
 */
import { parseFrontmatter } from "./frontmatter";
import type { BlogPost, BlogPostError, ParsedPosts } from "./types";

export const DEFAULT_LANG = "no";
const WORDS_PER_MINUTE = 200;

/** Words in the markdown body, ignoring code fences and markup noise. */
export function readingMinutes(body: string): number {
  const prose = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Is this markdown file a post?
 *
 * Both loaders ask this, so the SPA and the prerender build agree on what the
 * directory contains. Without it the directory's own README is parsed as a
 * post, fails validation, and fails the build — the format documentation
 * breaking the thing it documents.
 *
 * `_`-prefixed files are the usual convention for drafts and partials.
 */
export function isPostFile(file: string): boolean {
  const base = (file.split("/").pop() ?? file).toLowerCase();
  if (!/\.mdx?$/.test(base)) return false;
  if (base.startsWith("_")) return false;
  return base !== "readme.md" && base !== "index.md";
}

/** `2026-07-25-min-post.md` → `min-post`; `min-post.md` → `min-post`. */
export function slugFromFilename(file: string): string {
  const base = file.split("/").pop() ?? file;
  return base.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  const single = asString(value);
  return single ? [single] : undefined;
}

/**
 * Parse one markdown file.
 *
 * Returns an error rather than a partial post when a required field is missing.
 * A post with no title renders as a blank card linking to a blank page — worse
 * than not appearing, because nothing signals that anything is wrong.
 */
export function parsePost(raw: string, file: string): BlogPost | BlogPostError {
  const parsed = parseFrontmatter(raw);
  if (!parsed) return { file, reason: "no frontmatter block (--- … ---)" };

  const { data, body } = parsed;
  const title = asString(data.title);
  const description = asString(data.description);
  const date = asString(data.date) ?? (typeof data.date === "number" ? String(data.date) : undefined);

  const missing = [
    !title && "title",
    !description && "description",
    !date && "date",
  ].filter(Boolean) as string[];
  if (missing.length) return { file, reason: `missing frontmatter: ${missing.join(", ")}` };

  if (!/^\d{4}-\d{2}-\d{2}/.test(date as string)) {
    return { file, reason: `date must be YYYY-MM-DD, got "${date as string}"` };
  }
  if (!body.trim()) return { file, reason: "empty body" };

  const readingValue = data.readingMinutes;
  return {
    slug: asString(data.slug) ?? slugFromFilename(file),
    title: title as string,
    seoTitle: asString(data.seoTitle),
    description: description as string,
    date: (date as string).slice(0, 10),
    author: asString(data.author) ?? "Xala Technologies",
    role: asString(data.role),
    readingMinutes:
      typeof readingValue === "number" && readingValue > 0 ? readingValue : readingMinutes(body),
    tag: asString(data.tag),
    cover: asString(data.cover),
    alt: asString(data.alt),
    keywords: asStringArray(data.keywords),
    lang: asString(data.lang) ?? DEFAULT_LANG,
    draft: data.draft === true,
    body,
    file,
  };
}

function isError(value: BlogPost | BlogPostError): value is BlogPostError {
  return "reason" in value;
}

/**
 * Parse a whole directory's worth of files.
 *
 * Rejected files come back in `errors` instead of being dropped. The content
 * agent writes these files unattended; if a malformed one just vanished, the
 * only symptom would be a post that never appeared, and nobody would know to
 * look for it.
 */
export function parsePosts(files: Record<string, string>): ParsedPosts {
  const posts: BlogPost[] = [];
  const errors: BlogPostError[] = [];
  const seen = new Map<string, string>();

  for (const [file, raw] of Object.entries(files)) {
    if (!isPostFile(file)) continue;
    const result = parsePost(raw, file);
    if (isError(result)) {
      errors.push(result);
      continue;
    }
    // Two posts at one slug means one silently shadows the other, and which one
    // wins depends on directory order. Name it instead.
    const previous = seen.get(`${result.lang}/${result.slug}`);
    if (previous) {
      errors.push({ file, reason: `duplicate slug "${result.slug}" (already used by ${previous})` });
      continue;
    }
    seen.set(`${result.lang}/${result.slug}`, file);
    posts.push(result);
  }

  return { posts: sortPosts(posts), errors };
}

/** Newest first; filename breaks ties so ordering is stable across machines. */
export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => (b.date === a.date ? a.file.localeCompare(b.file) : b.date.localeCompare(a.date)));
}

export function publishedPosts(posts: BlogPost[], lang = DEFAULT_LANG): BlogPost[] {
  return posts.filter((p) => !p.draft && p.lang === lang);
}

export function findPost(posts: BlogPost[], slug: string, lang = DEFAULT_LANG): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && p.lang === lang);
}

const RELATED_HEADING = /^(relaterte artikler|related articles)\b/i;
const BLOG_HREF = /\]\((?:https?:\/\/xala\.no)?\/blogg\/([a-z0-9-]+)\)/g;

/**
 * Slugs the author listed under Relaterte artikler, in document order.
 *
 * Keyword overlap invents neighbours (SFO next to skjenkebevilling) that the
 * body never claimed. When the author named two or more, that list is the
 * related set — not a starting point to pad with lookalikes.
 */
export function relatedSlugsFromBody(body: string): string[] {
  const slugs: string[] = [];
  let inRelated = false;

  for (const line of body.split('\n')) {
    const heading = /^\s{0,3}##\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      const text = heading[1].replace(/[*_`]/g, '').trim();
      if (inRelated) break;
      inRelated = RELATED_HEADING.test(text);
      continue;
    }
    if (!inRelated) continue;
    for (const match of line.matchAll(BLOG_HREF)) {
      if (match[1] && !slugs.includes(match[1])) slugs.push(match[1]);
    }
  }

  return slugs;
}

/**
 * Up to `limit` posts closest to `post`, ranked by shared keywords then tag.
 *
 * Internal links are the point: a post reachable only from the index is a leaf,
 * and both crawlers and answer engines weigh a page by what links to it.
 * An authored Relaterte artikler list of two or more wins over that ranking.
 */
export function relatedPosts(posts: BlogPost[], post: BlogPost, limit = 3): BlogPost[] {
  const authored = relatedSlugsFromBody(post.body);
  if (authored.length >= 2) {
    return authored
      .map((slug) => findPost(posts, slug, post.lang))
      .filter((item): item is BlogPost => Boolean(item) && item.slug !== post.slug)
      .slice(0, limit);
  }

  const keywords = new Set((post.keywords ?? []).map((k) => k.toLowerCase()));
  const scored = publishedPosts(posts, post.lang)
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const shared = (p.keywords ?? []).filter((k) => keywords.has(k.toLowerCase())).length;
      return { post: p, score: shared * 2 + (p.tag && p.tag === post.tag ? 1 : 0) };
    })
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));

  return scored.slice(0, limit).map((s) => s.post);
}

export function allTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.map((p) => p.tag).filter(Boolean) as string[])].sort();
}

const IMAGE_FILENAME = /\.(webp|png|jpe?g|gif|svg|avif)$/i;

function isFilenameAlt(value: string, cover?: string): boolean {
  if (IMAGE_FILENAME.test(value)) return true;
  if (!cover) return false;
  const base = cover.split("/").pop() ?? "";
  return value === cover || value === base;
}

/**
 * Alt text for a post hero.
 *
 * The image is the article hero, not a decorative spacer. Frontmatter `alt`
 * wins when it is a real phrase; otherwise the topic comes from `seoTitle`
 * or `title`. A filename is never accepted as alt.
 */
export function coverAlt(post: {
  title: string;
  seoTitle?: string;
  alt?: string;
  cover?: string;
}): string {
  const explicit = post.alt?.trim();
  if (explicit && !isFilenameAlt(explicit, post.cover)) return explicit;
  return (post.seoTitle ?? post.title).trim();
}
