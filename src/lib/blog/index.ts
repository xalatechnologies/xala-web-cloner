/**
 * Browser-side post loading.
 *
 * `import.meta.glob(..., { eager: true })` inlines every markdown file into the
 * bundle at build time, so the SPA needs no fetch and no runtime directory
 * listing. The prerender script loads the same files from disk instead — both
 * hand the raw strings to the same `parsePosts`, so the static HTML and the
 * client render cannot disagree about what a post says.
 */
import { parsePosts } from "./posts";
import type { BlogPost, ParsedPosts } from "./types";

const modules = import.meta.glob("/src/content/blog/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

let cache: ParsedPosts | null = null;

export function loadPosts(): ParsedPosts {
  if (!cache) {
    cache = parsePosts(modules);
    // Loud in dev, silent in production: a malformed post must be obvious to
    // whoever is working on the site, without putting a console error in front
    // of a visitor who cannot act on it.
    if (import.meta.env.DEV && cache.errors.length) {
      for (const err of cache.errors) {
        console.warn(`[blog] skipped ${err.file}: ${err.reason}`);
      }
    }
  }
  return cache;
}

export function allPosts(): BlogPost[] {
  return loadPosts().posts;
}

export * from "./posts";
export * from "./types";
