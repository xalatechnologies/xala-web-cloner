import { describe, expect, it } from "vitest";
import {
  allTags,
  coverAlt,
  findPost,
  isPostFile,
  parsePost,
  parsePosts,
  publishedPosts,
  readingMinutes,
  relatedPosts,
  slugFromFilename,
  sortPosts,
} from "../posts";
import type { BlogPost, BlogPostError } from "../types";

/** The exact frontmatter shape the content agent emits. */
function md(over: Record<string, string> = {}, body = "Ingress.\n\n## H2\n\nTekst.\n"): string {
  const fields: Record<string, string> = {
    slug: "min-post",
    title: '"En konkret påstand"',
    description: '"Hva leseren får ut av den."',
    date: "2026-07-25",
    author: '"Ibrahim Rahmani"',
    role: '"Grunnlegger, Xala Technologies"',
    readingMinutes: "4",
    tag: '"IT-leder"',
    cover: '"/images/blog/a.webp"',
    keywords: '["systemutvikling", "azure"]',
    ...over,
  };
  const yaml = Object.entries(fields)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `---\n${yaml}\n---\n${body}`;
}

const isError = (v: BlogPost | BlogPostError): v is BlogPostError => "reason" in v;
const ok = (v: BlogPost | BlogPostError): BlogPost => {
  if (isError(v)) throw new Error(`expected a post, got: ${v.reason}`);
  return v;
};

describe("readingMinutes", () => {
  it("is at least one minute", () => {
    expect(readingMinutes("kort")).toBe(1);
  });

  it("counts roughly 200 words per minute", () => {
    expect(readingMinutes(new Array(600).fill("ord").join(" "))).toBe(3);
  });

  it("does not count fenced code as prose", () => {
    const code = "```\n" + new Array(1000).fill("x").join(" ") + "\n```";
    expect(readingMinutes(`ord ord ord${code}`)).toBe(1);
  });
});

describe("isPostFile", () => {
  it("accepts markdown posts", () => {
    expect(isPostFile("/src/content/blog/2026-07-25-a.md")).toBe(true);
    expect(isPostFile("/src/content/blog/a.mdx")).toBe(true);
  });

  // The directory's own README documents the frontmatter format. Parsed as a
  // post it has none, fails validation, and fails the build — documentation
  // breaking the thing it documents.
  it("rejects README, index and underscore-prefixed files", () => {
    expect(isPostFile("/src/content/blog/README.md")).toBe(false);
    expect(isPostFile("/src/content/blog/readme.md")).toBe(false);
    expect(isPostFile("/src/content/blog/index.md")).toBe(false);
    expect(isPostFile("/src/content/blog/_utkast.md")).toBe(false);
  });

  it("rejects non-markdown files", () => {
    expect(isPostFile("/src/content/blog/cover.png")).toBe(false);
  });
});

describe("slugFromFilename", () => {
  it("strips the directory and extension", () => {
    expect(slugFromFilename("/src/content/blog/min-post.md")).toBe("min-post");
  });

  it("strips a leading date prefix", () => {
    expect(slugFromFilename("/src/content/blog/2026-07-25-min-post.md")).toBe("min-post");
  });
});

describe("parsePost", () => {
  it("reads every field the content agent writes", () => {
    const post = ok(parsePost(md(), "/src/content/blog/2026-07-25-min-post.md"));
    expect(post).toMatchObject({
      slug: "min-post",
      title: "En konkret påstand",
      description: "Hva leseren får ut av den.",
      date: "2026-07-25",
      author: "Ibrahim Rahmani",
      role: "Grunnlegger, Xala Technologies",
      readingMinutes: 4,
      tag: "IT-leder",
      cover: "/images/blog/a.webp",
      keywords: ["systemutvikling", "azure"],
      lang: "no",
      draft: false,
    });
    expect(post.body).toContain("## H2");
    expect(post.body).not.toContain("title:");
  });

  it("falls back to the filename when slug is absent", () => {
    const post = ok(parsePost(md({ slug: "" }), "/blog/2026-07-25-fra-filnavn.md"));
    expect(post.slug).toBe("fra-filnavn");
  });

  it("derives readingMinutes when absent", () => {
    const body = new Array(800).fill("ord").join(" ");
    const post = ok(parsePost(md({ readingMinutes: "" }, body), "/blog/a.md"));
    expect(post.readingMinutes).toBe(4);
  });

  it("defaults lang to no and author to the company", () => {
    const post = ok(parsePost(md({ author: "" }), "/blog/a.md"));
    expect(post.lang).toBe("no");
    expect(post.author).toBe("Xala Technologies");
  });

  it("honours an explicit lang and draft flag", () => {
    const post = ok(parsePost(md({ lang: "en", draft: "true" }), "/blog/a.md"));
    expect(post.lang).toBe("en");
    expect(post.draft).toBe(true);
  });

  it("rejects a file with no frontmatter", () => {
    const result = parsePost("# nope\n", "/blog/a.md");
    expect(isError(result) && result.reason).toMatch(/no frontmatter/);
  });

  it("names every missing required field at once", () => {
    const result = parsePost("---\nauthor: X\n---\nbody", "/blog/a.md");
    expect(isError(result) && result.reason).toBe("missing frontmatter: title, description, date");
  });

  it("rejects a malformed date", () => {
    const result = parsePost(md({ date: '"25.07.2026"' }), "/blog/a.md");
    expect(isError(result) && result.reason).toMatch(/date must be YYYY-MM-DD/);
  });

  // A card that links to a blank page is worse than no card: nothing signals
  // that the generated file was broken.
  it("rejects an empty body", () => {
    const result = parsePost(md({}, "   \n"), "/blog/a.md");
    expect(isError(result) && result.reason).toBe("empty body");
  });

  it("reads an optional cover alt from frontmatter", () => {
    const post = ok(parsePost(md({ alt: '"SSA-S eller SSA-L"' }), "/blog/a.md"));
    expect(post.alt).toBe("SSA-S eller SSA-L");
  });
});

describe("coverAlt", () => {
  it("prefers an authored alt over the title", () => {
    expect(
      coverAlt({ title: "Lang tittel om kontraktsvalg", alt: "SSA-S eller SSA-L" })
    ).toBe("SSA-S eller SSA-L");
  });

  it("derives a short topic from seoTitle, then title, so new posts cannot ship empty alts", () => {
    expect(coverAlt({ title: "SSA-S eller SSA-L: kontraktsvalget som avgjør om leveransen kan gjøres i etapper" })).toBe(
      "SSA-S eller SSA-L: kontraktsvalget som avgjør om leveransen kan gjøres i etapper"
    );
    expect(
      coverAlt({
        title: "SSA-S eller SSA-L: kontraktsvalget som avgjør om leveransen kan gjøres i etapper",
        seoTitle: "SSA-S eller SSA-L: hvilken kontrakt passer",
      })
    ).toBe("SSA-S eller SSA-L: hvilken kontrakt passer");
  });

  it("rejects a filename as alt and falls back to the topic", () => {
    expect(
      coverAlt({
        title: "WCAG 2.2 AA i praksis",
        alt: "wcag-2-2-aa-i-praksis.webp",
        cover: "/images/blog/wcag-2-2-aa-i-praksis.webp",
      })
    ).toBe("WCAG 2.2 AA i praksis");
  });
});

describe("parsePosts", () => {
  it("sorts newest first", () => {
    const { posts } = parsePosts({
      "/blog/a.md": md({ slug: "a", date: "2026-01-01" }),
      "/blog/b.md": md({ slug: "b", date: "2026-07-01" }),
      "/blog/c.md": md({ slug: "c", date: "2026-03-01" }),
    });
    expect(posts.map((p) => p.slug)).toEqual(["b", "c", "a"]);
  });

  it("breaks a date tie on filename, so order is stable", () => {
    const { posts } = parsePosts({
      "/blog/z.md": md({ slug: "z" }),
      "/blog/a.md": md({ slug: "a" }),
    });
    expect(posts.map((p) => p.slug)).toEqual(["a", "z"]);
  });

  it("ignores non-post files entirely, rather than rejecting them", () => {
    const { posts, errors } = parsePosts({
      "/blog/a.md": md({ slug: "a" }),
      "/blog/README.md": "# Format docs\n",
      "/blog/_draft.md": "half written",
    });
    expect(posts).toHaveLength(1);
    expect(errors).toEqual([]);
  });

  it("collects rejects instead of dropping them", () => {
    const { posts, errors } = parsePosts({
      "/blog/good.md": md({ slug: "good" }),
      "/blog/bad.md": "no frontmatter here",
    });
    expect(posts).toHaveLength(1);
    expect(errors).toEqual([{ file: "/blog/bad.md", reason: "no frontmatter block (--- … ---)" }]);
  });

  // Whichever file lost would vanish with no symptom but a missing post.
  it("reports a duplicate slug rather than letting one shadow the other", () => {
    const { posts, errors } = parsePosts({
      "/blog/a.md": md({ slug: "same" }),
      "/blog/b.md": md({ slug: "same" }),
    });
    expect(posts).toHaveLength(1);
    expect(errors[0].reason).toMatch(/duplicate slug "same" \(already used by \/blog\/a\.md\)/);
  });

  it("lets the same slug exist in a different language", () => {
    const { posts, errors } = parsePosts({
      "/blog/a.md": md({ slug: "same" }),
      "/blog/a.en.md": md({ slug: "same", lang: "en" }),
    });
    expect(posts).toHaveLength(2);
    expect(errors).toEqual([]);
  });
});

describe("selection helpers", () => {
  const { posts } = parsePosts({
    "/blog/a.md": md({ slug: "a", date: "2026-07-01", tag: '"IT-leder"', keywords: '["azure", "sky"]' }),
    "/blog/b.md": md({ slug: "b", date: "2026-06-01", tag: '"IT-leder"', keywords: '["sharepoint"]' }),
    "/blog/c.md": md({ slug: "c", date: "2026-05-01", tag: '"Utvikler"', keywords: '["azure"]' }),
    "/blog/d.md": md({ slug: "d", date: "2026-04-01", draft: "true" }),
    "/blog/e.md": md({ slug: "e", lang: "en" }),
  });

  it("publishedPosts drops drafts and other languages", () => {
    expect(publishedPosts(posts).map((p) => p.slug)).toEqual(["a", "b", "c"]);
    expect(publishedPosts(posts, "en").map((p) => p.slug)).toEqual(["e"]);
  });

  it("findPost matches on slug and language", () => {
    expect(findPost(posts, "b")?.title).toBeTruthy();
    expect(findPost(posts, "e")).toBeUndefined();
    expect(findPost(posts, "e", "en")).toBeDefined();
    expect(findPost(posts, "nope")).toBeUndefined();
  });

  it("relatedPosts ranks shared keywords above a shared tag", () => {
    const a = findPost(posts, "a") as BlogPost;
    expect(relatedPosts(posts, a).map((p) => p.slug)).toEqual(["c", "b"]);
  });

  it("relatedPosts never returns the post itself, and honours the limit", () => {
    const a = findPost(posts, "a") as BlogPost;
    const related = relatedPosts(posts, a, 1);
    expect(related).toHaveLength(1);
    expect(related[0].slug).not.toBe("a");
  });

  it("allTags is deduplicated and sorted", () => {
    expect(allTags(posts)).toEqual(["IT-leder", "Utvikler"]);
  });

  it("sortPosts does not mutate its input", () => {
    const input = publishedPosts(posts);
    const before = input.map((p) => p.slug);
    sortPosts(input);
    expect(input.map((p) => p.slug)).toEqual(before);
  });
});
