/**
 * RSS and sitemap output — pure, so it can be tested without a build.
 *
 * The prerender script does the file I/O; everything that decides what the XML
 * *says* lives here.
 */
import { BLOG_PATH, ORGANIZATION, SITE_ORIGIN, absolute, postUrl } from "./seo";
import type { BlogPost } from "./types";

/** Escape the five characters that are not legal as XML text. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  const parsed = new Date(`${date}T09:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? new Date(0).toUTCString() : parsed.toUTCString();
}

export function renderRss(posts: BlogPost[], now = new Date()): string {
  const items = posts
    .map((post) => {
      const image = absolute(post.cover);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl(post))}</link>
      <guid isPermaLink="true">${escapeXml(postUrl(post))}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <dc:creator>${escapeXml(post.author)}</dc:creator>${
        post.tag ? `\n      <category>${escapeXml(post.tag)}</category>` : ""
      }${image ? `\n      <enclosure url="${escapeXml(image)}" type="image/webp" />` : ""}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blogg | ${escapeXml(ORGANIZATION)}</title>
    <link>${SITE_ORIGIN}${BLOG_PATH}</link>
    <atom:link href="${SITE_ORIGIN}${BLOG_PATH}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Fagartikler om systemutvikling, Microsoft 365, Azure, integrasjon og AI.</description>
    <language>nb-NO</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Sitemap entries for the blog.
 *
 * Separate from `src/utils/sitemap.ts` on purpose: that file emits `/no/*` and
 * `/en/*` URLs for a routing scheme this app does not have (its routes are
 * Norwegian at the root — `/tjenester`, `/om-oss`), which is why the live
 * sitemap lists URLs that 301 or 404. Fixing it is its own change; this must
 * not inherit the bug in the meantime.
 */
export function blogSitemapEntries(posts: BlogPost[]): SitemapEntry[] {
  const newest = posts[0]?.date ?? new Date().toISOString().slice(0, 10);
  return [
    { loc: `${SITE_ORIGIN}${BLOG_PATH}`, lastmod: newest, changefreq: "weekly", priority: "0.8" },
    ...posts.map((post) => ({
      loc: postUrl(post),
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];
}

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/** The site's own routes, so the generated sitemap is complete, not blog-only. */
export const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tjenester", priority: "0.9", changefreq: "monthly" },
  { path: "/produkter", priority: "0.8", changefreq: "monthly" },
  { path: "/caser", priority: "0.8", changefreq: "monthly" },
  { path: "/slik-vi-jobber", priority: "0.7", changefreq: "monthly" },
  { path: "/teknologi", priority: "0.7", changefreq: "monthly" },
  { path: "/om-oss", priority: "0.7", changefreq: "monthly" },
  { path: "/om-oss/team", priority: "0.6", changefreq: "monthly" },
  { path: "/kontakt", priority: "0.6", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies", priority: "0.3", changefreq: "yearly" },
];

export function staticSitemapEntries(today: string): SitemapEntry[] {
  return STATIC_ROUTES.map((route) => ({
    loc: `${SITE_ORIGIN}${route.path === "/" ? "" : route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  }));
}
