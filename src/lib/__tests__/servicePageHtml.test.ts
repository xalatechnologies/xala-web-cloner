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
    expect(html).toContain(`<h1 class="page-heading">${escapeHtml(page.no.title)}</h1>`);
    for (const item of page.no.faq) {
      expect(html).toContain(escapeHtml(item.question));
    }
  });

  it("tolerates missing caseSlugs and postSlugs, and renders no explainer section when the fields are absent", () => {
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
    expect(html).not.toContain("explainer-heading");
  });

  it("renders the explainer section — heading, paragraph, signal list and outro — only for a page that sets all four fields", () => {
    const fixture: ServicePage = {
      slug: "fixture-explainer",
      no: {
        title: "Fixture",
        metaTitle: "Fixture",
        metaDescription: "Fixture",
        intro: "Intro",
        explainerHeading: "Hva er dette?",
        explainer: "En kort forklaring.",
        explainerSignals: [
          "Et vanlig tegn.",
          "Et tegn med [en lenke](/blogg/fagsystem-uten-api) i seg.",
        ],
        explainerOutro: "Les mer i [artikkelen](/blogg/modernisere-fagsystem-uten-driftsstans).",
        problemHeading: "Problem",
        problem: "Problem body",
        capabilityHeading: "Capabilities",
        capabilities: [
          { title: "One", body: "Body uten lenke." },
          {
            title: "Two",
            body: "Body med [en lenke](/blogg/testautomatisering-for-fagsystemer) og [en annen](/tjenester/systemintegrasjon) som ikke skal bli en lenke.",
          },
        ],
        faq: [{ question: "Q?", answer: "A." }],
      },
    };

    const html = servicePageHtmlFromPage(fixture, { "fixture-explainer": fixture }, { posts: [] });

    expect(html).toContain('<section aria-labelledby="explainer-heading">');
    expect(html).toContain('<h2 id="explainer-heading">Hva er dette?</h2>');
    expect(html).toContain("<p>En kort forklaring.</p>");
    expect(html).toContain("<li>Et vanlig tegn.</li>");
    expect(html).toContain('<li>Et tegn med <a href="/blogg/fagsystem-uten-api">en lenke</a> i seg.</li>');
    expect(html).toContain(
      '<p>Les mer i <a href="/blogg/modernisere-fagsystem-uten-driftsstans">artikkelen</a>.</p>',
    );

    // Capability bodies go through the same allowlisted renderer.
    expect(html).toContain("<p>Body uten lenke.</p>");
    expect(html).toContain(
      '<p>Body med <a href="/blogg/testautomatisering-for-fagsystemer">en lenke</a> og en annen som ikke skal bli en lenke.</p>',
    );

    // Explainer section sits right after the header, before the problem section.
    const headerIndex = html.indexOf("</header>");
    const explainerIndex = html.indexOf('<section aria-labelledby="explainer-heading">');
    const problemIndex = html.indexOf('<section aria-labelledby="problem-heading">');
    expect(headerIndex).toBeGreaterThan(-1);
    expect(explainerIndex).toBeGreaterThan(headerIndex);
    expect(problemIndex).toBeGreaterThan(explainerIndex);
  });

  it("renders the modernisering-av-fagsystemer explainer section from the real data", () => {
    const html = servicePageHtml("modernisering-av-fagsystemer", { posts });
    const page = pageMap["modernisering-av-fagsystemer"];

    expect(html).toContain(`<h2 id="explainer-heading">${escapeHtml(page.no.explainerHeading!)}</h2>`);
    expect(html).toContain('<a href="/blogg/altinn-3-hva-endrer-seg-for-fagsystemet">');
    expect(html).toContain('<a href="/blogg/teknologivalg-for-fagsystemer-som-skal-vare">');
    expect(html).toContain('<a href="/blogg/fagsystem-uten-api">');
    expect(html).toContain('<a href="/blogg/testautomatisering-for-fagsystemer">');
    expect(html).toContain(
      '<a href="/blogg/modernisere-fagsystem-uten-driftsstans">slik moderniserer du et fagsystem modul for modul</a>',
    );
    // postSlugs is empty for this page, so there is no "Les mer om dette" list.
    expect(html).not.toContain(no.servicePage.readMore);
  });

  it.each(
    Object.keys(servicePages).filter((slug) => slug !== "modernisering-av-fagsystemer"),
  )("renders %s with no explainer section (field is absent)", (slug) => {
    const html = servicePageHtml(slug, { posts });
    expect(html).not.toContain("explainer-heading");
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
