import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import no from "@/i18n/locales/no.json";
import { tjenesterHubBodyHtml, tjenesterHubLede } from "@/lib/tjenesterHubHtml";
import { escapeHtml } from "@/lib/escapeHtml";

describe("tjenesterHubHtml", () => {
  it("reads labels from no.json so static HTML cannot drift from the SPA", () => {
    const html = tjenesterHubBodyHtml();

    expect(html).toContain(`<h2 id="tjenester-neste">`);
    expect(html).toContain(no.servicesPage.next.process.title);
    expect(html).toContain(no.servicesPage.next.cases.blurb);
  });

  it("renders hub body prose and exposes the no.json lede for verify-dist", () => {
    const html = tjenesterHubBodyHtml();

    expect(() => tjenesterHubBodyHtml()).not.toThrow();
    expect(html).not.toMatch(/<h1/);
    expect(html).toContain(`<p class="lead">${escapeHtml(TJENESTER_HUB_LEAD)}</p>`);
    expect(tjenesterHubLede()).toBe(no.servicesPage.description);
  });

  it("includes the shared hub sections and FAQ copy", () => {
    const html = tjenesterHubBodyHtml();

    expect(html).toContain("Haugen er ikke mottak");
    expect(html).toContain("Vanlige spørsmål");
    expect(html).toContain(escapeHtml("Hva er et saksbehandlingssystem?"));
    expect(html).toContain('href="/produkter/bevillingsportal"');
    expect(html).toContain('target="_blank" rel="noopener noreferrer"');
  });

  it("is composed into staticRouteHtml for /tjenester", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toMatch(
      /route\.path === "\/tjenester"[\s\S]*staticRouteHtml\([\s\S]*tjenesterHubBodyHtml\(\)/,
    );
  });
});

const TJENESTER_HUB_LEAD =
  "Innbyggeren sender. Saksbehandleren åpner saken. Loggen er der. Vedtaket er et menneske.";
