import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/escapeHtml";
import { isAllowedHref, isExternalHref } from "@/lib/markdownLinkHref";
import { richInlineHtml } from "@/lib/richInlineHtml";

describe("markdownLinkHref", () => {
  it("allows internal, hash, http(s), mailto and tel schemes", () => {
    expect(isAllowedHref("/caser")).toBe(true);
    expect(isAllowedHref("  /produkter/digilist  ")).toBe(true);
    expect(isAllowedHref("#faq")).toBe(true);
    expect(isAllowedHref("https://digilist.no")).toBe(true);
    expect(isAllowedHref("http://example.com")).toBe(true);
    expect(isAllowedHref("mailto:hi@xala.no")).toBe(true);
    expect(isAllowedHref("tel:+4712345678")).toBe(true);
  });

  it("rejects dangerous schemes case-insensitively", () => {
    expect(isAllowedHref("javascript:alert(1)")).toBe(false);
    expect(isAllowedHref("  JavaScript:alert(1)  ")).toBe(false);
    expect(isAllowedHref("data:text/html,<script>")).toBe(false);
    expect(isAllowedHref("vbscript:msgbox")).toBe(false);
  });

  it("treats only http(s) as external", () => {
    expect(isExternalHref("https://digilist.no")).toBe(true);
    expect(isExternalHref("http://example.com")).toBe(true);
    expect(isExternalHref("mailto:hi@xala.no")).toBe(false);
    expect(isExternalHref("/caser")).toBe(false);
  });
});

describe("richInlineHtml", () => {
  it("escapes HTML special characters outside links", () => {
    expect(escapeHtml('Foo <bar> & "baz"')).toBe("Foo &lt;bar&gt; &amp; &quot;baz&quot;");
    expect(richInlineHtml('A & B <tag>')).toBe("A &amp; B &lt;tag&gt;");
  });

  it("renders allowed links and drops disallowed hrefs to plain text", () => {
    expect(richInlineHtml("[safe](/caser)")).toBe('<a href="/caser">safe</a>');
    expect(richInlineHtml("[ext](https://digilist.no)")).toBe(
      '<a href="https://digilist.no" target="_blank" rel="noopener noreferrer">ext</a>',
    );
    expect(richInlineHtml("[x](javascript:alert(1))")).toBe("x");
    expect(richInlineHtml("[y](data:text/html,evil)")).toBe("y");
  });
});
