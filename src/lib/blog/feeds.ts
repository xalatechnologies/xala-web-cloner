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

/**
 * The site's own routes — for the sitemap, for llms.txt, and for the per-route
 * title and description the prerender step writes into each page.
 *
 * `title`/`description` are here because the SPA gives every non-blog route the
 * SAME <head>: /tjenester, /om-oss and /kontakt all served the home page's
 * title, description and canonical, and no <h1> at all. Six pages that a
 * crawler cannot tell apart, competing with each other for the same terms.
 */
export const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly",
    title: "Xala Technologies AS | Systemutvikling, Microsoft 365 og Azure",
    h1: "Vi bygger systemene virksomheten din faktisk trenger",
    description: "Norsk systemutviklingshus i Asker. Skreddersydd programvare, Microsoft 365 og SharePoint, Azure, Power Platform, integrasjon og AI for offentlig sektor og næringsliv." },
  { path: "/tjenester", priority: "0.9", changefreq: "monthly",
    title: "Tjenester | Systemutvikling, integrasjon og sky | Xala Technologies",
    h1: "Tjenester",
    description: "Skreddersydd systemutvikling, Microsoft 365 og SharePoint, Azure og Power Platform, systemintegrasjon, API-utvikling og AI-løsninger." },
  { path: "/produkter", priority: "0.8", changefreq: "monthly",
    title: "Produkter | Xala Technologies",
    h1: "Produkter",
    description: "Løsninger og produkter fra Xala Technologies, bygget på Microsoft-plattformen og moderne webteknologi." },
  { path: "/caser", priority: "0.8", changefreq: "monthly",
    title: "Kundecaser | Prosjekter for offentlig sektor og næringsliv | Xala Technologies",
    h1: "Kundecaser",
    description: "Utvalgte prosjekter for offentlig sektor og næringsliv, og hva vi faktisk leverte i hvert av dem." },
  { path: "/slik-vi-jobber", priority: "0.7", changefreq: "monthly",
    title: "Slik vi jobber | Fra behov til satt i drift | Xala Technologies",
    h1: "Slik vi jobber",
    description: "Hvordan vi går fra behov til løsning i drift: avklaring, arkitektur, leveranser i etapper og overlevering." },
  { path: "/teknologi", priority: "0.7", changefreq: "monthly",
    title: "Teknologi | .NET, React, Azure og Power Platform | Xala Technologies",
    h1: "Teknologi",
    description: "Teknologiene vi bygger på: .NET og C#, React og TypeScript, Azure, SharePoint og SPFx, Power Platform og moderne integrasjonsmønstre." },
  { path: "/om-oss", priority: "0.7", changefreq: "monthly",
    title: "Om oss | Xala Technologies AS, Asker",
    h1: "Om oss",
    description: "Xala Technologies AS er et norsk systemutviklingshus på Nesbru i Asker, med kunder i offentlig sektor og privat næringsliv." },
  { path: "/om-oss/team", priority: "0.6", changefreq: "monthly",
    title: "Team | Xala Technologies",
    h1: "Team",
    description: "Menneskene som utvikler, arkitekterer og leverer løsningene." },
  { path: "/kontakt", priority: "0.6", changefreq: "yearly",
    title: "Kontakt oss | Xala Technologies AS",
    h1: "Kontakt oss",
    description: "Ta en uforpliktende prat om prosjektet deres. Nesbruveien 75, 1394 Nesbru. E-post info@xala.no." },
  { path: "/privacy", priority: "0.3", changefreq: "yearly",
    title: "Personvernerklæring | Xala Technologies",
    h1: "Personvernerklæring",
    description: "Hvordan Xala Technologies AS behandler personopplysninger." },
  { path: "/terms", priority: "0.3", changefreq: "yearly",
    title: "Vilkår | Xala Technologies",
    h1: "Vilkår",
    description: "Vilkår for bruk av xala.no." },
  { path: "/cookies", priority: "0.3", changefreq: "yearly",
    title: "Informasjonskapsler | Xala Technologies",
    h1: "Informasjonskapsler",
    description: "Hvilke informasjonskapsler xala.no bruker, og hvorfor." },
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
export function renderLlmsTxt(posts: BlogPost[]): string {
  const lines = [
    `# ${ORGANIZATION}`,
    "",
    "> Norsk systemutviklingshus i Asker. Skreddersydd programvare, Microsoft 365 og SharePoint,",
    "> Azure og Power Platform, systemintegrasjon og AI-løsninger for offentlig sektor og næringsliv.",
    "",
    `Organisasjonsnummer: 920972454. Nesbruveien 75, 1394 Nesbru, Asker, Norge.`,
    "",
    "## Sider",
    "",
    ...STATIC_ROUTES.map((r) => `- [${LLMS_PAGE_TITLES[r.path] ?? r.path}](${SITE_ORIGIN}${r.path === "/" ? "" : r.path})`),
    "",
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
  "/teknologi": "Teknologi",
  "/om-oss": "Om oss",
  "/om-oss/team": "Team",
  "/kontakt": "Kontakt",
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
