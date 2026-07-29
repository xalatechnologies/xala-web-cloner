# XWEB-90: The text inside the article image frames is not displaying correctly

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop The text inside the article image frames is not displaying correctly`

## Implementation contract — complete this before writing code
- **Problem:** The text inside the article image frames is not displaying correctly
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-90-the-text-inside-the-article-image-frames`
- **Scope:** _the one change this branch delivers_
- **Out of scope:** _what you will NOT touch — no opportunistic refactor, no formatting sweeps_
- **Acceptance criteria:** _observable, demonstrable outcomes_
- **Architecture constraints:** _boundaries + patterns to follow_
- **Files likely affected:** _list them; if this grows well beyond the list, escalate_
- **Testing requirements:** _what proves it works_
- **Security considerations:** _secrets, RBAC, injection, dependencies_
- **Rollback strategy:** _how to revert safely_
- **Definition of done:** compiled · tests green · acceptance demonstrated with evidence · one reviewable change · no attribution

## Delivery rules
- One issue → one branch (`agent/xweb-90-the-text-inside-the-article-image-frames`) → one independently reviewable change. Never main.
- Smallest valid change. No opportunistic refactoring, no broad formatting changes, no hidden dependency on another open PR.
- Validation is mandatory and staged — "code written" ≠ "compiled" ≠ "tests passed" ≠ "acceptance demonstrated". Collect evidence (test output / logs) before opening the PR.
- If scope expands beyond "Files likely affected", or the change grows large, STOP and escalate ("BLOCKED:") rather than pressing on.
- Open a PR only when green (otherwise a draft PR with a note). Delete this file before opening the PR.

## Full issue — from Linear (the source of truth for scope & acceptance)
> The Linear MCP in this environment may be bound to the WRONG workspace, so
> do NOT rely on it to read this ticket — everything you need is below. If
> something essential is genuinely missing here (e.g. a screenshot), STOP and
> end with "CLARIFICATION:" rather than guessing.

**Classification:** bug · severity minor · priority P3

Product gap: The text inside the article image frames is not displaying correctly. <!-- xaheen-triage -->
**defect** · severity minor — No component overlaying title text on an image frame was found in the marketing repo's blog/article templates, so impact and even the affected page are unconfirmed; treating as minor until the location is verified.

A screenshot shows article title text inside an image frame being cropped on the left and overflowing the visible area. The exact page/component is not named in the issue.

**Done when**

- [ ] The full article title is visible and readable within its image frame on the page shown in the screenshot, with no left-side cropping or overflow

**How to verify**

* Load the page from the screenshot and confirm the title text stays fully inside the image frame at normal viewport width
* Check a long article title to confirm it wraps or truncates instead of overflowing left/right

**Open questions**

* The linked screenshot is inaccessible (401) — please share the page URL or re-attach the image so the exact frame/component can be identified
* Neither the blog list cards, blog hero, nor any OG-image generator in xala-web-cloner overlay text on images — is this bug on a different page/template, or possibly already fixed?

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

The text inside the article image frames is not displaying correctly. It is cropped on the left side and extends outside the visible area. Please fix the text positioning, padding, and overflow so the full title remains readable within each image frame.

![Screenshot 2026-07-28 at 11.26.29.png](https://uploads.linear.app/9fca958e-4b68-45dd-a434-9cb584f2f74f/5ef2230d-c4ba-4cae-ac6b-be1e0b1ac78d/3b8174d8-ead4-4261-aa96-1638dfb441bf)

</details> Current assessment: not-actionable (bug, minor). Relevant code: src/components/BlogPreviewSection.tsx:164-185, src/pages/BlogPost.tsx:197-226, src/pages/BlogPreview.tsx:258-292, src/components/CategoryVisual.tsx:206-210,246-250, src/components/ImagePlaceholder.tsx, public/og-image.png.

**Scope**
No code path in the marketing repo (booking-brilliance) overlays article title text on an image frame, so there is nothing to patch. This is either a stale/already-fixed report, a page not covered by the searched templates, or a misread screenshot. Needs the actual page URL or a re-attached screenshot to identify the real component before any fix can be scoped. Touch points: src/components/BlogPreviewSection.tsx:164-185 (blog list cards: title renders in a separate div below the cover image, not overlaid on it); src/pages/BlogPost.tsx:197-226 (article page: h1 title is in the header, cover image is a separate figure below with no text overlay); src/pages/BlogPreview.tsx:258-292 (draft preview page: same pattern, title in header, cover image separate, no overlay); src/components/CategoryVisual.tsx:206-210,246-250 (only image-overlay text in the repo is a short caption/label badge (e.g. 'Bilde: X'), not an article title, and it isn't clipped); src/components/ImagePlaceholder.tsx (placeholder frame has no overlay text either); public/og-image.png (no dynamic OG-image text generator (satori/canvas) exists in the repo; og-image is a static file).

**Done when**

- [ ] No code path in the marketing repo (booking-brilliance) overlays article title text on an image frame, so there is nothing to patch. This is either a stale/already-fixed report, a page not covered by the searched templates, or a misread screenshot. Needs the actual page URL or a re-attached screenshot to identify the real component before any fix can be scoped.

## Code analysis (evidence, marketing @ ecc6bef0)

Status: **not-actionable** (confidence 80%)

* `src/components/BlogPreviewSection.tsx:164-185` — blog list cards: title renders in a separate div below the cover image, not overlaid on it
* `src/pages/BlogPost.tsx:197-226` — article page: h1 title is in the header, cover image is a separate figure below with no text overlay
* `src/pages/BlogPreview.tsx:258-292` — draft preview page: same pattern, title in header, cover image separate, no overlay
* `src/components/CategoryVisual.tsx:206-210,246-250` — only image-overlay text in the repo is a short caption/label badge (e.g. 'Bilde: X'), not an article title, and it isn't clipped
* `src/components/ImagePlaceholder.tsx` — placeholder frame has no overlay text either
* `public/og-image.png` — no dynamic OG-image text generator (satori/canvas) exists in the repo; og-image is a static file

## Source

Product idea (XWEB-90), from search demand

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop The text inside the article image frames is not displaying correctly
```

---

*Auto-generated by Digilist Improvements Agent (Linear specialist) from XWEB-90 + code analysis (graph @ ecc6bef0). Move to the approval state to prepare an implementation branch.*

Linear: https://linear.app/xala-technologies/issue/XWEB-90/the-text-inside-the-article-image-frames-is-not-displaying-correctly
