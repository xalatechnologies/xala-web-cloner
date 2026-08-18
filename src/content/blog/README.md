# `src/content/blog/`

One markdown file per post. This directory is written by hand **and** by the
Xala agent fleet's content agent (Linear team `XWEB`), so the format below is a
contract, not a convention: the agent emits exactly these frontmatter fields,
and `src/lib/blog/posts.ts` rejects a file that is missing a required one.

```markdown
---
slug: modernisere-fagsystem-uten-driftsstans   # optional; defaults to the filename
title: "60–70 tegn, en konkret påstand"        # required
description: "150–160 tegn"                     # required
date: 2026-07-25                                # required, YYYY-MM-DD
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
readingMinutes: 4                               # optional; derived from the body
tag: "IT-leder"                                 # one audience tag
cover: "/images/blog/noe.webp"                  # optional, under public/
alt: "Kort norsk alt som navngir temaet"       # optional; otherwise derived from seoTitle/title
keywords: ["systemutvikling", "azure"]
lang: no                                        # no (default) | en
draft: false                                    # true keeps it out of everything
---

Ingress på to–tre setninger.

## H2 per delspørsmål

Brødtekst. Ikke bruk H1 — den kommer fra `title`.
```

## Rules that are enforced, not suggested

- **A malformed file fails the build.** `scripts/prerender-blog.ts` exits
  non-zero and names the file and the reason. It does not skip it. These files
  arrive unattended; a skipped post would look exactly like a post that was
  never written.
- **Duplicate slugs are an error**, not a race. Two files claiming one slug
  would mean one silently shadows the other depending on directory order.
- **Filenames may carry a date prefix** (`2026-07-25-slug.md`) for ordering on
  disk. It is stripped from the URL.

## How a post reaches the web

`pnpm build` runs `vite build` and then `scripts/prerender-blog.ts`, which
writes real HTML to `dist/blogg/<slug>/index.html` — title, meta, Article
JSON-LD and the full prose, with no JavaScript required to read it. The SPA
still owns `/blogg` for in-app navigation; the static file is what a crawler or
an answer engine gets. That distinction is the point of this blog: an AI crawler
that does not run JavaScript sees an empty `<div id="root">` otherwise.

The same run regenerates `dist/blogg/rss.xml` and `dist/sitemap.xml`.
