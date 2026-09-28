import { describe, expect, it } from "vitest";
import { firstH1, hasEmptyRoot, servicePageSlugs } from "../../scripts/verify-dist.mjs";
import servicePages from "@/data/service-pages.json";

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
});
