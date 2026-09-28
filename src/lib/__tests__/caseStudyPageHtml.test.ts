import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "@/data/case-studies";
import { localizeCaseStudy } from "@/data/case-studies/localized";
import no from "@/i18n/locales/no.json";
import { caseStudyPageHtml, caseStudyPageHtmlFromStudy } from "@/lib/caseStudyPageHtml";
import { escapeHtml } from "@/lib/escapeHtml";

describe("caseStudyPageHtml", () => {
  it("reads section labels from no.json so static HTML cannot drift from the SPA", () => {
    const html = caseStudyPageHtml("altinn");

    expect(html).toContain(`<h2>${no.caseStudy.sections.overview.heading}</h2>`);
    expect(html).toContain(`id="faq-heading">${no.caseStudy.sections.faq.heading}</h2>`);
    expect(html).toContain(no.caseStudy.backToAll);
    expect(html).toContain(no.caseStudy.cta.contact);
  });

  it("renders kort svar without a separate accent paragraph", () => {
    const html = caseStudyPageHtml("altinn");
    const heading = no.caseStudy.sections.kortSvar.heading;

    expect(html).toContain(`<h2>${escapeHtml(heading)}</h2>`);
    expect(html).not.toContain(`<p>${escapeHtml(heading)}</p>`);
  });

  it("renders altinn with one H1 and the localized Norwegian title", () => {
    const localized = localizeCaseStudy(caseStudies.find((study) => study.slug === "altinn")!, "no");
    const html = caseStudyPageHtml("altinn");
    const h1Matches = html.match(/<h1>/g) ?? [];

    expect(() => caseStudyPageHtml("altinn")).not.toThrow();
    expect(h1Matches).toHaveLength(1);
    expect(html).toContain(`<h1>${escapeHtml(localized.title)}</h1>`);
    expect(html).toContain(escapeHtml(localized.client));
  });

  it("tolerates missing optional fields", () => {
    const base = caseStudies[0];
    const fixture = {
      ...base,
      kortSvar: undefined,
      faq: undefined,
      videre: undefined,
      integrationHighlights: undefined,
      scope: undefined,
      coreTechnologies: undefined,
      budget: undefined,
      partnerModel: undefined,
    };

    expect(() => caseStudyPageHtmlFromStudy(fixture)).not.toThrow();
    const html = caseStudyPageHtmlFromStudy(fixture);
    expect(html.match(/<h1>/g)?.length).toBe(1);
  });

  it.each(caseStudies.filter((study) => study.slug).map((study) => study.slug!))(
    "renders %s with one H1",
    (slug) => {
      const study = caseStudies.find((item) => item.slug === slug)!;
      const localized = localizeCaseStudy(study, "no");

      expect(() => caseStudyPageHtml(slug)).not.toThrow();
      const html = caseStudyPageHtml(slug);
      expect(html.match(/<h1>/g)?.length).toBe(1);
      expect(html).toContain(`<h1>${escapeHtml(localized.title)}</h1>`);
    },
  );

  it("is wired into the prerender for every case study", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toMatch(/renderBody\([\s\S]*caseStudyPageHtml\(study\.slug\)/);
  });
});
