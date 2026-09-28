/**
 * The blog's data contract.
 *
 * These fields are not a design choice made here — they are what the content
 * agent writes. Its draft prompt emits exactly this frontmatter, so anything
 * this file requires that the agent does not produce means every generated post
 * fails validation and the blog silently stays empty.
 *
 * See the fleet's tools/content-agent/src/generate.ts (BLOG_SYSTEM).
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  slug: string;
  title: string;
  /**
   * The <title> for search results, when the on-page headline is too long for
   * one.
   *
   * Google truncates around 60 characters, and sixteen of seventeen articles
   * exceeded it — so Google, not us, was choosing where the SERP headline got
   * cut. A headline can afford the full claim ("hvor de hører hjemme, og hvor
   * de ikke gjør det"); a search result has to lead with the words people
   * actually type. Falls back to `title`.
   */
  seoTitle?: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Last substantive update, YYYY-MM-DD. Falls back to `date` in metadata. */
  dateModified?: string;
  author: string;
  /** The author's role line, e.g. "Grunnlegger, Xala Technologies". */
  role?: string;
  /** Estimated reading time in minutes; derived from the body when absent. */
  readingMinutes?: number;
  /** Single audience tag, e.g. "IT-leder". */
  tag?: string;
  /** Cover image path, e.g. "/images/blog/foo.webp". */
  cover?: string;
  /**
   * Short Norwegian alt for the hero. Optional: `coverAlt()` uses this when
   * present, otherwise the topic from `seoTitle` or `title`, so a new post
   * cannot ship an empty hero alt.
   */
  alt?: string;
  /** Alias for `alt` in CTR-enriched drafts. `coverAlt()` accepts either. */
  coverAlt?: string;
  /** FAQ pairs rendered on the page and in FAQPage JSON-LD when present. */
  faq?: FaqEntry[];
  /** Related-post slugs to omit from sidebar and footer cards for this post. */
  excludeRelated?: string[];
  /** Internal service links to omit from «Relevant hos oss» for this post. */
  excludeServices?: string[];
  keywords?: string[];
  /**
   * Optional override for the visible last-line topic hashtags. Each entry must
   * match one of `keywords` exactly (case-insensitive). When absent, hashtags
   * are derived from the first 3–5 keywords as usual.
   */
  hashtags?: string[];
  /** `no` (default) or `en`. */
  lang?: string;
  /** Excluded from listings, sitemap and RSS while true. */
  draft?: boolean;
  /** When false, omit the visible last-line topic hashtags; keywords still feed article:tag. */
  topicHashtags?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  lang: string;
  readingMinutes: number;
  /** Markdown body with the frontmatter block removed. */
  body: string;
  /** Source filename, kept for error messages and stable tie-breaking. */
  file: string;
}

/** Why a markdown file was rejected — surfaced, never swallowed. */
export interface BlogPostError {
  file: string;
  reason: string;
}

export interface ParsedPosts {
  posts: BlogPost[];
  errors: BlogPostError[];
}
