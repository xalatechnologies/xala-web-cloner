# Digilist as a reference for xala.no

Notes from studying https://digilist.no (homepage) and one blog post,
https://digilist.no/blogg/trenings-og-badeanlegg-booking-treningsgrupper-svommeklubber.

Written down because the study was done near the end of a session and would
otherwise be lost. Source for the site itself: `/Volumes/Laravel/Loveable/booking-brilliance`.

**Coverage is partial.** The homepage and one blog post were read in full. The
solution pages, use cases, pilot and transparency pages were not. Treat the
"not yet studied" list at the bottom as real work remaining, not as covered.

---

## What Digilist does that xala.no does not

### 1. Named social proof with numbers, high on the page

Two testimonials, each with a named organisation, a role, and hard metrics:
65% less admin, 82% of bookings on mobile, 340 active organisations, 1,200
bookings a month. Client logos carry role and location. Deployments are tagged
"Live".

xala.no names clients on the case index but the front page carries no
testimonial, no metric and no logo strip above the fold. This is the single
biggest gap — the proof exists in `src/data/case-studies/` and is not used
where it would do the most work.

### 2. Two audiences addressed separately

Digilist splits one section into renters vs operators, because the same product
serves both and they want different things.

xala.no has the same shape and does not use it: a saksbehandler and an IT-leder
are not weighing the same thing. Worth a section that speaks to each.

### 3. A numbered process with large numerals

"01 / 04" set large, used for visual scanning rather than decoration.
`/slik-vi-jobber` has the content for this and presents it as prose.

### 4. FAQ on the homepage *and* per blog post

Seven collapsible items on the homepage; six question-style Q&A at the end of
the blog post, structured for FAQPage schema.

xala.no has an FAQ on `/tjenester` only. Per-post FAQs are the notable gap:
question-style headings are what answer engines extract, and the schema
generator (`generateFAQSchema` in `src/components/seo/sectionSchemas.ts`) is
already written and wired for the services page.

### 5. Blog cards on the homepage carry metadata

Date, reading time and author on each card. Ours carry title and description.

### 6. Copy is second person and pain-first

"Slutt med Excel, e-poster og dobbeltbookinger" — names the reader's current
mess before naming the product. Ours describes capability rather than relief.

### 7. Sections stay short

Rarely more than two or three short paragraphs before a list or a visual
break. Several of ours run longer.

---

## Blog post structure worth copying

Their post, in order:

1. Hero image with metadata
2. Problem statement — the reader's situation, not the product
3. Six sections with descriptive, keyword-bearing headings
4. **FAQ, six question-style Q&A** — the AEO surface
5. CTA ("Book demo")
6. Related articles
7. Table of contents, as sidebar anchor navigation

`BloggPostPage` already has the CTA aside and related articles. Missing: the
table of contents and the per-post FAQ.

**Implementation note for the FAQ.** `src/lib/blog/frontmatter.ts` parses
strings and string arrays, not nested objects, so `faq: [{q, a}]` in
frontmatter needs a parser change. The alternative, and probably the better
one: write the FAQ as a `## Ofte stilte spørsmål` section with `###` question
headings in the post body, and derive the FAQPage schema from those headings at
render time. The schema then cannot drift from the visible content, which is
the condition Google actually enforces — the same principle `FAQSection`
already follows.

---

## Not yet studied

- digilist.no solution pages (rooms, accommodation, events, equipment, services)
- use cases, pilot, transparency pages
- the rest of the blog index
- `/Volumes/Laravel/Loveable/booking-brilliance` source — component structure,
  design tokens, how the marketing sections are composed

The source repo is likely the faster read for UI patterns than fetching pages
one at a time.
