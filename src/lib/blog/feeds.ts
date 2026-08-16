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

/**
 * Sitemap entries for the case study detail pages at /caser/<slug>.
 *
 * These are real routes with substantial content, but nothing linked them into
 * the sitemap, so seventeen pages were only discoverable by crawling the /caser
 * index — and for a while not even that, because the /caser/:slug route had been
 * dropped and every card 404'd.
 */
/** One entry per service landing page, generated from service-pages.json. */
export function serviceSitemapEntries(slugs: string[], today: string): SitemapEntry[] {
  return slugs.map((slug) => ({
    loc: `${SITE_ORIGIN}/tjenester/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.9",
  }));
}

/** One entry per product page, generated from products.json. */
export function productSitemapEntries(slugs: string[], today: string): SitemapEntry[] {
  return slugs.map((slug) => ({
    loc: `${SITE_ORIGIN}/produkter/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.7",
  }));
}

export function caseStudySitemapEntries(slugs: string[], today: string): SitemapEntry[] {
  return slugs.map((slug) => ({
    loc: `${SITE_ORIGIN}/caser/${slug}`,
    lastmod: today,
    changefreq: "yearly",
    priority: "0.6",
  }));
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
  { path: "/priser", priority: "0.8", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/status", priority: "0.4", changefreq: "monthly" },
  { path: "/transparens", priority: "0.5", changefreq: "monthly" },
  { path: "/teknologi", priority: "0.7", changefreq: "monthly" },
  { path: "/om-oss", priority: "0.7", changefreq: "monthly" },
  { path: "/karriere", priority: "0.6", changefreq: "monthly" },
  { path: "/kontakt", priority: "0.6", changefreq: "yearly" },
  { path: "/book-demo", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies", priority: "0.3", changefreq: "yearly" },
];

/**
 * `llms.txt` — the site, in the form an answer engine can read in one request.
 *
 * A crawler that does not execute JavaScript has to reconstruct what this site
 * is from a React bundle. This states it directly: who the company is, what it
 * does, and every page worth reading, with a one-line description each
 * (llmstxt.org).
 *
 * Generated at build time from the routes and posts that actually exist, so it
 * cannot drift from the site the way a hand-written file does. The SEO agent
 * produces a richer version into the host's `.xaheen/seo/`; committing that as
 * `public/llms.txt` overrides this one, because Vite copies `public/` over the
 * build output.
 */
/** The subset of a case study that llms.txt needs, so this file stays free of
 *  the full CaseStudy type. */
export interface LlmsCaseStudy {
  slug: string;
  title: string;
  client?: string;
  summary?: string;
}

/** A service or product page, as llms.txt needs it. */
export interface LlmsPage {
  slug: string;
  title: string;
  summary: string;
}

/** Collapses whitespace and trims to one readable line. */
function oneLine(text: string, max = 180): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat;
}

export function renderLlmsTxt(
  posts: BlogPost[],
  caseStudies: LlmsCaseStudy[] = [],
  services: LlmsPage[] = [],
  products: LlmsPage[] = []
): string {
  const lines = [
    `# ${ORGANIZATION}`,
    "",
    "> Norsk systemutviklingshus. Vi bygger saksbehandlingssystemer, tilskudds- og",
    "> bevillingsportaler, integrasjoner mot nasjonale felleskomponenter og SaaS-plattformer",
    "> for offentlig sektor og næringsliv, og vi forvalter dem videre etter lansering.",
    "",
    `Organisasjonsnummer: 920972454. Nesbruveien 75, 1394 Nesbru, Asker, Norge.`,
    "ISO 27001-sertifisert. Løsninger bygget mot ID-porten, Maskinporten, Altinn, Folkeregisteret,",
    "Enhetsregisteret og Noark 5, med universell utforming etter WCAG 2.2 AA.",
    "",
    "## Sider",
    "",
    ...STATIC_ROUTES.map((r) => `- [${LLMS_PAGE_TITLES[r.path] ?? r.path}](${SITE_ORIGIN}${r.path === "/" ? "" : r.path})`),
    "",
    // The pages written to answer a specific question come first: they are the
    // ones an engine should cite when asked what this company does, and they
    // were entirely absent from this file while it listed only the top-level
    // navigation.
    ...(services.length
      ? [
          "## Tjenester i detalj",
          "",
          ...services.map((page) => `- [${page.title}](${SITE_ORIGIN}/tjenester/${page.slug}): ${oneLine(page.summary)}`),
          "",
        ]
      : []),
    ...(products.length
      ? [
          "## Produkter",
          "",
          ...products.map((page) => `- [${page.title}](${SITE_ORIGIN}/produkter/${page.slug}): ${oneLine(page.summary)}`),
          "",
        ]
      : []),
    // Named references are the most quotable thing on the site, so they are
    // stated here rather than left for a crawler to find behind the /caser index.
    ...(caseStudies.length
      ? [
          "## Kundecaser",
          "",
          ...caseStudies.map((study) => {
            const client = study.client ? ` — ${study.client}` : "";
            const summary = study.summary ? `: ${oneLine(study.summary)}` : "";
            return `- [${study.title}](${SITE_ORIGIN}/caser/${study.slug})${client}${summary}`;
          }),
          "",
        ]
      : []),
    "## Fagartikler",
    "",
    ...(posts.length
      ? posts.map((p) => `- [${p.title}](${postUrl(p)}): ${p.description}`)
      : ["- (ingen publisert ennå)"]),
    "",
    "## Kontakt",
    "",
    `- E-post: info@xala.no`,
    `- Nettsted: ${SITE_ORIGIN}/kontakt`,
    "",
  ];
  return `${lines.join("\n")}`;
}

/** Human titles for the static routes, for llms.txt and nothing else. */
const LLMS_PAGE_TITLES: Record<string, string> = {
  "/": "Forside",
  "/tjenester": "Tjenester",
  "/produkter": "Produkter",
  "/caser": "Kundecaser",
  "/slik-vi-jobber": "Slik vi jobber",
  "/priser": "Priser",
  "/faq": "Ofte stilte spørsmål",
  "/status": "Driftsstatus",
  "/transparens": "Åpenhet",
  "/teknologi": "Teknologi",
  "/om-oss": "Om oss",
  "/karriere": "Karriere",
  "/kontakt": "Kontakt",
  "/book-demo": "Book en demo",
  "/privacy": "Personvern",
  "/terms": "Vilkår",
  "/cookies": "Informasjonskapsler",
};

export function staticSitemapEntries(today: string): SitemapEntry[] {
  return STATIC_ROUTES.map((route) => ({
    loc: `${SITE_ORIGIN}${route.path === "/" ? "" : route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  }));
}
