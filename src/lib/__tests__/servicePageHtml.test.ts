import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import servicePages from "@/data/service-pages.json";
import no from "@/i18n/locales/no.json";
import { parsePosts, publishedPosts } from "@/lib/blog/posts";
import {
  escapeHtml,
  servicePageHtml,
  servicePageHtmlFromPage,
  type ServicePage,
} from "@/lib/servicePageHtml";

const CONTENT_DIR = resolve(__dirname, "../../content/blog");

function loadPosts() {
  const files: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        files[`/src/content/blog/${entry.name}`] = readFileSync(full, "utf-8");
      }
    }
  };
  walk(CONTENT_DIR);
  return publishedPosts(parsePosts(files).posts);
}

describe("servicePageHtml", () => {
  const posts = loadPosts();
  const pageMap = servicePages as Record<string, ServicePage>;

  it("reads section labels from no.json so static HTML cannot drift from the SPA", () => {
    const html = servicePageHtml("saksbehandlingssystem", { posts });
    const topLevel = servicePageHtml("forvaltning-og-drift", { posts });

    expect(html).toContain(`<h2 id="faq-heading">${no.servicePage.faqTitle}</h2>`);
    expect(html).toContain(`<h2 id="tjeneste-cta">${no.servicePage.ctaTitle}</h2>`);
    expect(topLevel).toContain(`>${no.servicePage.back}</a>`);
    expect(html).toContain(`<h2 id="features-heading">${no.servicePage.featuresTitle}</h2>`);
    expect(html).toContain(`<h2 id="cases-heading">${no.servicePage.casesTitle}</h2>`);
    expect(html).toContain(no.servicePage.readMore);
    expect(html).toContain(no.caseStudy.readMore);

    const category = servicePageHtml("saksbehandlingsplattform", { posts });
    expect(category).toContain(`<h2 id="children-heading">${no.servicePage.childrenTitle}</h2>`);
  });

  it.each(Object.keys(servicePages))("renders %s with one page-heading H1 and every FAQ question", (slug) => {
    const page = pageMap[slug];
    expect(() => servicePageHtml(slug, { posts })).not.toThrow();

    const html = servicePageHtml(slug, { posts });
    const h1Matches = html.match(/<h1 class="page-heading">/g) ?? [];

    expect(h1Matches).toHaveLength(1);
    expect(html).toContain(`<h1 class="page-heading">${page.no.title}</h1>`);
    for (const item of page.no.faq) {
      expect(html).toContain(item.question);
    }
  });

  it("tolerates missing caseSlugs and postSlugs", () => {
    const fixture: ServicePage = {
      slug: "fixture",
      no: {
        title: 'Fixture <title> & "quotes"',
        metaTitle: "Fixture",
        metaDescription: "Fixture",
        intro: "Intro",
        problemHeading: "Problem",
        problem: "Problem body",
        capabilityHeading: "Capabilities",
        capabilities: [{ title: "One", body: "Body" }],
        faq: [{ question: "Q <&>?", answer: 'A <tag> & "quoted"' }],
      },
    };

    const html = servicePageHtmlFromPage(fixture, { fixture }, { posts: [] });

    expect(html).toContain("<h1 class=\"page-heading\">Fixture &lt;title&gt; &amp; &quot;quotes&quot;</h1>");
    expect(html).toContain("<dt>Q &lt;&amp;&gt;?</dt>");
    expect(html).toContain("<dd>A &lt;tag&gt; &amp; &quot;quoted&quot;</dd>");
    expect(html).not.toContain("<title>");
    expect(html).not.toMatch(/<dd>A <tag>/);
  });

  it("escapes HTML special characters in titles and FAQ answers", () => {
    const raw = 'Foo <bar> & "baz"';
    expect(escapeHtml(raw)).toBe("Foo &lt;bar&gt; &amp; &quot;baz&quot;");
  });

  it("renders child links with span titles on a category page", () => {
    const html = servicePageHtml("saksbehandlingsplattform", { posts });

    expect(html).toContain('href="/tjenester/tilskuddsportal"');
    expect(html).toContain('href="/tjenester/saksbehandlingssystem"');
    expect(html).toMatch(/<a href="\/tjenester\/tilskuddsportal"><span>Tilskuddsportal<\/span><\/a>/);
  });

  it("is the markup the prerender actually writes into #root", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toMatch(/renderBody\(\s*renderHead\(shell,\s*\{[\s\S]*?\}\),\s*servicePageHtml\(/);
  });
});
