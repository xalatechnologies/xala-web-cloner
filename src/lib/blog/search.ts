/**
 * The article filter /blogg already applies in the browser.
 *
 * Kept pure so the prerender can emit the same result set into first HTML.
 * Without that, `GET /blogg?q=gebyr` is the unfiltered listing for anyone
 * (or any crawler) that does not run the bundle.
 */
import type { BlogPost } from "./types";

export const ALL_TAGS = "Alle";

/** Fields the on-page box and the navbar query both search. */
export type SearchablePost = Pick<
  BlogPost,
  "title" | "description" | "author" | "tag" | "keywords"
>;

export function postSearchHaystack(post: SearchablePost): string {
  return [post.title, post.description, post.author, post.tag, ...(post.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterBlogPosts<T extends SearchablePost>(
  posts: readonly T[],
  options: { query?: string; tag?: string } = {},
): T[] {
  const needle = (options.query ?? "").trim().toLowerCase();
  const tag = options.tag ?? ALL_TAGS;
  return posts.filter((post) => {
    if (tag !== ALL_TAGS && post.tag !== tag) return false;
    if (!needle) return true;
    return postSearchHaystack(post).includes(needle);
  });
}

/**
 * Path segment under `dist/blogg/q/` for a query.
 *
 * Single token, lowercased. Phrase queries are not a file of their own —
 * nginx `$arg_q` is decoded (spaces) while Apache's `%1` is still encoded,
 * and the two would never agree on a directory name. Words from the same
 * phrase are emitted separately by `blogListingQueries`.
 */
export function blogQueryFileKey(query: string): string | null {
  const needle = query.trim().toLowerCase();
  if (!needle || /\s/.test(needle)) return null;
  if (needle === "_none" || needle.includes("..") || needle.includes("/") || needle.includes("\\")) {
    return null;
  }
  if (needle.includes("\0")) return null;
  if (!/^[\p{L}\p{N}._-]{1,80}$/u.test(needle)) return null;
  return needle;
}

const WORD = /[\p{L}\p{N}]{2,}/gu;

/**
 * Queries worth a static listing: every searchable word, plus keywords.
 *
 * `gebyr` is always included so the confirmed no-JS URL cannot disappear
 * because a post's wording changed around it.
 */
export function blogListingQueries(posts: readonly SearchablePost[]): string[] {
  const queries = new Set<string>(["gebyr"]);
  for (const post of posts) {
    const hay = postSearchHaystack(post);
    for (const word of hay.match(WORD) ?? []) {
      const key = blogQueryFileKey(word);
      if (key) queries.add(key);
    }
    for (const keyword of post.keywords ?? []) {
      const key = blogQueryFileKey(keyword);
      if (key) queries.add(key);
    }
  }
  return [...queries];
}

export function blogQueryArtifactPath(query: string): string | null {
  const key = blogQueryFileKey(query);
  return key ? `blogg/q/${key}/index.html` : null;
}
