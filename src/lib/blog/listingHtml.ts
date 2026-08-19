/**
 * The no-JS /blogg listing body.
 *
 * Same markup the prerender has always written for the index. A query is
 * applied by handing this a filtered array — the host then maps
 * `/blogg?q=gebyr` onto the file that contains that array, so the first
 * bytes are not the full unfiltered listing.
 */
import { getPageSEO } from "@/components/seo/seoContent";
import { BLOG_PATH, formatDate } from "./seo";
import type { BlogPost } from "./types";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export interface BlogListingHtmlOptions {
  /** Present on a search result page, even when the result set is empty. */
  query?: string;
  totalCount?: number;
  search?: boolean;
}

export function blogListingHtml(
  posts: readonly BlogPost[],
  options: BlogListingHtmlOptions = {},
): string {
  const listing = getPageSEO("blog", "no");
  const heading = listing.title.split(" | ")[0];
  const search = options.search ?? Boolean(options.query?.trim());
  const totalCount = options.totalCount ?? posts.length;
  const cards = posts
    .map(
      (post) => `<li><article>
<h2><a href="${BLOG_PATH}/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></h2>
<p>${escapeHtml(post.description)}</p>
<p>${post.tag ? `<span>${escapeHtml(post.tag)}</span> · ` : ""}<time datetime="${post.date}">${escapeHtml(formatDate(post.date, post.lang))}</time> · <span>${post.readingMinutes} min</span></p>
</article></li>`,
    )
    .join("\n");

  const summary =
    search &&
    `<p>${
      posts.length === totalCount
        ? `${posts.length} artikler`
        : `${posts.length} av ${totalCount} artikler`
    }</p>`;

  const list = posts.length
    ? `<ul>\n${cards}\n</ul>`
    : search
      ? "<p>Ingen treff.</p>"
      : "<p>Ingen artikler her ennå.</p>";

  return `<div class="min-h-screen flex flex-col"><main>
<nav aria-label="Brødsmuler"><a href="/">Forside</a> / <span aria-current="page">${escapeHtml(heading)}</span></nav>
<h1>${escapeHtml(heading)}</h1>
<p>${escapeHtml(listing.description)}</p>
${summary ? `${summary}\n` : ""}${list}
</main></div>`;
}

/** Article card hrefs in a listing body, in document order. */
export function blogListingCardHrefs(html: string): string[] {
  return [...html.matchAll(/<h2><a href="(\/blogg\/[^"]+)"/g)].map((match) => match[1]);
}
