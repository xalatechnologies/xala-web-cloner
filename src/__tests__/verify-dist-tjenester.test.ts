import { describe, expect, it } from "vitest";
import {
  detailSlugsFromLocs,
  firstH1,
  hasEmptyRoot,
  productSlugs,
  servicePageSlugs,
  tjenesterHubLede,
} from "../../scripts/verify-dist.mjs";
import servicePages from "@/data/service-pages.json";
import no from "@/i18n/locales/no.json";

describe("verify-dist /tjenester first HTML", () => {
  it("flags an empty #root and a page with no H1", () => {
    expect(hasEmptyRoot('<div id="root"></div>')).toBe(true);
    expect(hasEmptyRoot('<div id="root">   </div>')).toBe(true);
    expect(hasEmptyRoot('<div id="root"><h1>Hei</h1></div>')).toBe(false);
    expect(firstH1('<div id="root"><h1 class="page-heading">Saksbehandlingssystem</h1></div>')).toBe(
      "Saksbehandlingssystem",
    );
    expect(firstH1('<div id="root"><p>no heading</p></div>')).toBeNull();
  });

  it("lists every service slug from service-pages.json", () => {
    expect(servicePageSlugs()).toEqual(Object.keys(servicePages));
    expect(servicePageSlugs().length).toBeGreaterThanOrEqual(10);
  });

  it("scopes firstH1 to #root and strips inner tags", () => {
    const html =
      '<div id="root"><main><h1 class="page-heading">Visible <span>title</span></h1></main></div>' +
      '<h1 class="page-heading">Outside root</h1>';
    expect(firstH1(html)).toBe("Visible title");
  });

  it("reads the hub lede from the first paragraph after the H1", () => {
    const html =
      '<div id="root"><header><h1 class="page-heading">Title</h1><p>Hub lede copy</p></header></div>';
    expect(tjenesterHubLede(html)).toBe("Hub lede copy");
    expect(no.servicesPage.description.length).toBeGreaterThan(20);
  });

  it("lists product slugs from products.json and parses case slugs from sitemap locs", () => {
    expect(productSlugs().length).toBeGreaterThanOrEqual(6);
    const locs = ["https://xala.no/caser", "https://xala.no/caser/altinn", "https://xala.no/caser/ssb"];
    expect(detailSlugsFromLocs(locs, "https://xala.no", "/caser")).toEqual(["altinn", "ssb"]);
  });
});
