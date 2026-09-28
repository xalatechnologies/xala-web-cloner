import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import no from "@/i18n/locales/no.json";
import { SERVICES_PAGE_HEADING } from "@/lib/staticRouteHeading";
import { tjenesterHubHtml, tjenesterHubLede } from "@/lib/tjenesterHubHtml";
import { escapeHtml } from "@/lib/richInlineHtml";

describe("tjenesterHubHtml", () => {
  it("reads labels from no.json so static HTML cannot drift from the SPA", () => {
    const html = tjenesterHubHtml();

    expect(html).toContain(`<h2 id="tjenester-neste">`);
    expect(html).toContain(no.servicesPage.next.process.title);
    expect(html).toContain(no.servicesPage.next.cases.blurb);
    expect(html).toContain(no.servicesPage.eyebrow);
  });

  it("renders one page-heading H1 and the no.json lede under it", () => {
    const html = tjenesterHubHtml();
    const h1Matches = html.match(/<h1 class="page-heading">/g) ?? [];

    expect(() => tjenesterHubHtml()).not.toThrow();
    expect(h1Matches).toHaveLength(1);
    expect(html).toContain(`<h1 class="page-heading">${escapeHtml(SERVICES_PAGE_HEADING)}</h1>`);
    expect(html).toContain(`<p>${escapeHtml(no.servicesPage.description)}</p>`);
    expect(tjenesterHubLede()).toBe(no.servicesPage.description);
  });

  it("includes the shared hub sections and FAQ copy", () => {
    const html = tjenesterHubHtml();

    expect(html).toContain("Haugen er ikke mottak");
    expect(html).toContain("Vanlige spørsmål");
    expect(html).toContain(escapeHtml("Hva er et saksbehandlingssystem?"));
    expect(html).toContain('href="/produkter/bevillingsportal"');
  });

  it("is the markup the prerender writes into #root for /tjenester", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toMatch(/route\.path === "\/tjenester"[\s\S]*tjenesterHubHtml\(\)/);
  });
});
