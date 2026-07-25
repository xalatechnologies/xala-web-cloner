/**
 * The metadata a post publishes about itself.
 *
 * Pure and shared by both renderers on purpose. The SPA puts these into
 * <Helmet>; the prerender script writes the same values into static <head>
 * markup. If each built its own, the HTML a crawler reads and the HTML a
 * visitor's browser ends up with would describe the page differently — and only
 * one of them is what gets indexed.
 */
import type { BlogPost } from "./types";

export const SITE_ORIGIN = "https://xala.no";
export const BLOG_PATH = "/blogg";
export const ORGANIZATION = "Xala Technologies AS";
export const ORG_ID = `${SITE_ORIGIN}/#organization`;

export function postUrl(post: Pick<BlogPost, "slug">): string {
  return `${SITE_ORIGIN}${BLOG_PATH}/${post.slug}`;
}

export function absolute(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_ORIGIN}${pathOrUrl}`;
}

/** `2026-07-25` → `25. juli 2026`. */
export function formatDate(date: string, lang = "no"): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export interface PostMeta {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  keywords?: string;
}

export function postMeta(post: BlogPost): PostMeta {
  return {
    title: `${post.title} | ${ORGANIZATION}`,
    description: post.description,
    canonical: postUrl(post),
    image: absolute(post.cover),
    keywords: post.keywords?.join(", "),
  };
}

/**
 * schema.org for one post: the Article, plus a BreadcrumbList so the path
 * Forside → Blogg → post is machine-readable rather than only visual.
 *
 * `Article` over `BlogPosting` deliberately — answer engines treat it as the
 * more general citable type, and nothing here depends on blog-specific fields.
 */
export function articleJsonLd(post: BlogPost): Record<string, unknown> {
  const url = postUrl(post);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: post.lang === "en" ? "en" : "nb-NO",
        author: { "@type": "Person", name: post.author, ...(post.role ? { jobTitle: post.role } : {}) },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        ...(post.cover ? { image: absolute(post.cover) } : {}),
        ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
        ...(post.tag ? { articleSection: post.tag } : {}),
        wordCount: post.body.split(/\s+/).filter(Boolean).length,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: SITE_ORIGIN },
          { "@type": "ListItem", position: 2, name: "Blogg", item: `${SITE_ORIGIN}${BLOG_PATH}` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

/** schema.org for the index: a Blog whose posts are listed, not just linked. */
export function blogJsonLd(posts: BlogPost[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_ORIGIN}${BLOG_PATH}#blog`,
    name: `Blogg | ${ORGANIZATION}`,
    url: `${SITE_ORIGIN}${BLOG_PATH}`,
    inLanguage: "nb-NO",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((post) => ({
      "@type": "Article",
      "@id": `${postUrl(post)}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: postUrl(post),
      author: { "@type": "Person", name: post.author },
    })),
  };
}
