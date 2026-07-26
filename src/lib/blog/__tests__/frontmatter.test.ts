import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "../frontmatter";

describe("parseFrontmatter", () => {
  it("returns null when there is no frontmatter block", () => {
    expect(parseFrontmatter("# Just markdown\n")).toBeNull();
  });

  it("returns null when the block is never closed", () => {
    expect(parseFrontmatter("---\ntitle: x\n\nbody")).toBeNull();
  });

  it("splits data from body", () => {
    const result = parseFrontmatter('---\ntitle: "Hei"\n---\n## Body\n');
    expect(result?.data.title).toBe("Hei");
    expect(result?.body).toBe("## Body\n");
  });

  it("unquotes double- and single-quoted strings", () => {
    const result = parseFrontmatter(`---\na: "dobbel"\nb: 'enkel'\nc: bar\n---\nx`);
    expect(result?.data).toMatchObject({ a: "dobbel", b: "enkel", c: "bar" });
  });

  it("unescapes quotes inside a quoted string", () => {
    const result = parseFrontmatter(`---\ntitle: "sa \\"hei\\" til"\nalt: 'it''s'\n---\nx`);
    expect(result?.data.title).toBe('sa "hei" til');
    expect(result?.data.alt).toBe("it's");
  });

  it("keeps a colon inside a value", () => {
    const result = parseFrontmatter(`---\ntitle: "Slik gjør du det: en guide"\n---\nx`);
    expect(result?.data.title).toBe("Slik gjør du det: en guide");
  });

  it("reads numbers and booleans as themselves", () => {
    const result = parseFrontmatter("---\nreadingMinutes: 4\ndraft: true\nother: false\n---\nx");
    expect(result?.data).toMatchObject({ readingMinutes: 4, draft: true, other: false });
  });

  // A bare 2026-07-25 is not arithmetic and must not become 1994.
  it("keeps an unquoted date a string", () => {
    const result = parseFrontmatter("---\ndate: 2026-07-25\n---\nx");
    expect(result?.data.date).toBe("2026-07-25");
  });

  it("reads an inline array", () => {
    const result = parseFrontmatter(`---\nkeywords: ["a", 'b c', d]\n---\nx`);
    expect(result?.data.keywords).toEqual(["a", "b c", "d"]);
  });

  it("keeps a comma that sits inside a quoted array item", () => {
    const result = parseFrontmatter(`---\nkeywords: ["Oslo, Norge", "b"]\n---\nx`);
    expect(result?.data.keywords).toEqual(["Oslo, Norge", "b"]);
  });

  it("reads a block list", () => {
    const result = parseFrontmatter("---\nkeywords:\n  - en\n  - to\nafter: x\n---\nbody");
    expect(result?.data.keywords).toEqual(["en", "to"]);
    expect(result?.data.after).toBe("x");
  });

  it("ignores comments and blank lines", () => {
    const result = parseFrontmatter("---\n# a comment\n\ntitle: T\n---\nx");
    expect(result?.data).toEqual({ title: "T" });
  });

  it("tolerates CRLF line endings", () => {
    const result = parseFrontmatter('---\r\ntitle: "T"\r\n---\r\nbody\r\n');
    expect(result?.data.title).toBe("T");
    expect(result?.body).toBe("body\r\n");
  });

  it("tolerates a UTF-8 BOM", () => {
    const result = parseFrontmatter('﻿---\ntitle: "T"\n---\nbody');
    expect(result?.data.title).toBe("T");
  });

  it("reads null forms", () => {
    const result = parseFrontmatter("---\na: null\nb: ~\nc:\n---\nx");
    expect(result?.data).toMatchObject({ a: null, b: null, c: "" });
  });

  it("skips a line that is not a key/value pair", () => {
    const result = parseFrontmatter("---\nnot a pair\ntitle: T\n---\nx");
    expect(result?.data).toEqual({ title: "T" });
  });
});
