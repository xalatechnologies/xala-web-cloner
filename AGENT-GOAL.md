# XWEB-2: Supabase backend is gone — navbar, footer, contact form and chat are dead

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop In this marketing site repo (xala-web), the Supabase project at https://ttvpsjeucewnenjevfhh.supabase.co no longer resolves in DNS (confirmed NXDOMAIN). This breaks Navbar/Footer menus, the contact form, and the RAG chat widget. Footer.tsx (lines 32-42, used at line 62) already has a `fallbackLinks` array it falls back to when the DB query returns no items — Navbar.tsx does NOT have this and currently does `items={menuItems || []}` (line 103), which renders a fully empty nav when the useMenuItems() query in src/hooks/use-menu-items.ts throws (it has no error handling/fallback at all). Do the following: 1) In src/components/Navbar.tsx, add a hardcoded fallback menu (mirror Footer's fallbackLinks content/pattern) and use it whenever menuItems is empty or the query errors, so blocking network requests to *.supabase.co in dev tools still shows a full, usable nav. Also make src/hooks/use-menu-items.ts expose an isError/error state instead of throwing uncaught, so Navbar can react to it. 2) In src/components/contact/ContactForm.tsx, confirm/add a visible user-facing error message when the supabase insert at line 94-98 fails (no silent failures). 3) In src/store/useRagStore.ts and src/components/chat/ChatWidget.tsx, confirm/add a graceful 'unavailable' UI state when supabase.functions.invoke('rag-search') fails, instead of an infinite spinner or crash. 4) Do NOT attempt to restore the Supabase backend itself — that's a separate business/infra decision (restore project vs. drop dependency and go static) outside the scope of this fix; just make the frontend degrade gracefully either way. Add a short code comment noting the dependency is currently non-functional pending that decision. Acceptance criteria: blocking supabase.co requests in dev tools still shows a complete, usable Navbar and Footer; contact form shows a clear error on failed submission; ChatWidget shows a graceful error state on failed rag-search; existing test suite (including src/i18n/__tests__ and src/components/chat/__tests__/ChatWidget.test.tsx) passes. Run tests and ensure all green before opening the PR.`

## Implementation contract — complete this before writing code
- **Problem:** In this marketing site repo (xala-web), the Supabase project at https://ttvpsjeucewnenjevfhh.supabase.co no longer resolves in DNS (confirmed NXDOMAIN). This breaks Navbar/Footer menus, the contact form, and the RAG chat widget. Footer.tsx (lines 32-42, used at line 62) already has a `fallbackLinks` array it falls back to when the DB query returns no items — Navbar.tsx does NOT have this and currently does `items={menuItems || []}` (line 103), which renders a fully empty nav when the useMenuItems() query in src/hooks/use-menu-items.ts throws (it has no error handling/fallback at all). Do the following: 1) In src/components/Navbar.tsx, add a hardcoded fallback menu (mirror Footer's fallbackLinks content/pattern) and use it whenever menuItems is empty or the query errors, so blocking network requests to *.supabase.co in dev tools still shows a full, usable nav. Also make src/hooks/use-menu-items.ts expose an isError/error state instead of throwing uncaught, so Navbar can react to it. 2) In src/components/contact/ContactForm.tsx, confirm/add a visible user-facing error message when the supabase insert at line 94-98 fails (no silent failures). 3) In src/store/useRagStore.ts and src/components/chat/ChatWidget.tsx, confirm/add a graceful 'unavailable' UI state when supabase.functions.invoke('rag-search') fails, instead of an infinite spinner or crash. 4) Do NOT attempt to restore the Supabase backend itself — that's a separate business/infra decision (restore project vs. drop dependency and go static) outside the scope of this fix; just make the frontend degrade gracefully either way. Add a short code comment noting the dependency is currently non-functional pending that decision. Acceptance criteria: blocking supabase.co requests in dev tools still shows a complete, usable Navbar and Footer; contact form shows a clear error on failed submission; ChatWidget shows a graceful error state on failed rag-search; existing test suite (including src/i18n/__tests__ and src/components/chat/__tests__/ChatWidget.test.tsx) passes. Run tests and ensure all green before opening the PR.
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-2-supabase-backend-is-gone-navbar-footer`
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
- One issue → one branch (`agent/xweb-2-supabase-backend-is-gone-navbar-footer`) → one independently reviewable change. Never main.
- Smallest valid change. No opportunistic refactoring, no broad formatting changes, no hidden dependency on another open PR.
- Validation is mandatory and staged — "code written" ≠ "compiled" ≠ "tests passed" ≠ "acceptance demonstrated". Collect evidence (test output / logs) before opening the PR.
- If scope expands beyond "Files likely affected", or the change grows large, STOP and escalate ("BLOCKED:") rather than pressing on.
- Open a PR only when green (otherwise a draft PR with a note). Delete this file before opening the PR.

## Full issue — from Linear (the source of truth for scope & acceptance)
> The Linear MCP in this environment may be bound to the WRONG workspace, so
> do NOT rely on it to read this ticket — everything you need is below. If
> something essential is genuinely missing here (e.g. a screenshot), STOP and
> end with "CLARIFICATION:" rather than guessing.

**Classification:** bug · severity critical · priority P0

Product gap: Supabase backend is gone — navbar, footer, contact form and chat are dead. <!-- xaheen-triage -->
**defect** · severity critical — Core site navigation, contact form, and chat are fully broken in production with no workaround for any visitor.

The site's only Supabase project ([ttvpsjeucewnenjevfhh.supabase.co](<http://ttvpsjeucewnenjevfhh.supabase.co>), hardcoded in src/integrations/supabase/client.ts) no longer resolves in DNS. Every feature backed by it fails: Navbar and Footer (via useMenuItems), contact form submissions, ChatWidget/RAG, and DB-backed translations. Since nav items are fetched with no fallback, the outage silently strips all navigation links from the live site.

**Done when**

- [ ] A decision is recorded: restore/recreate the Supabase project, or remove the dependency
- [ ] If Supabase is kept, Navbar and Footer render a hardcoded fallback menu when the backend call fails or times out, instead of an empty nav
- [ ] Contact form, ChatWidget/RAG, and DB-backed translations are confirmed working again, or explicitly descoped if the dependency is dropped

**How to verify**

* Block or fail the Supabase request in dev tools and confirm Navbar/Footer still show a usable menu
* Submit the contact form against the restored (or replacement) backend and confirm it delivers

**Open questions**

* Which path is chosen: restore the Supabase project, or drop the dependency and go static?
* What is the actual hardcoded fallback menu content, if nav stays data-driven?
* Is DB-backed translation content still needed, or can it be replaced with static i18n files?

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

`https://ttvpsjeucewnenjevfhh.supabase.co` **does not resolve in DNS**. It is the only Supabase project configured (`src/integrations/supabase/client.ts` and `.env`), so every backed feature fails:

* `Navbar` → `useMenuItems()` — site navigation
* `Footer` → same table
* contact form submissions
* `ChatWidget` and its RAG
* DB-backed translations

**Decide first:** restore/recreate the project, or drop the dependency.

If the nav stays data-driven, it also needs a **hardcoded fallback** — today a backend outage silently removes every navigation link from the site rather than degrading.

Found while onboarding [xala.no](<http://xala.no>) to the agent fleet.

</details> Current assessment: fixable (bug, critical). Relevant code: src/integrations/supabase/client.ts:5, src/hooks/use-menu-items.ts, src/components/Navbar.tsx:103, src/components/Footer.tsx:32-42,62, src/components/contact/ContactForm.tsx:94-98, src/store/useRagStore.ts:27 + src/components/chat/ChatWidget.tsx.

**Scope**
Give Navbar the same hardcoded-fallback pattern Footer already uses so a Supabase outage never strips all nav links; surface a visible error state in ContactForm and ChatWidget instead of silent/hanging failures; leave the restore-vs-drop-Supabase decision as a separate business call, not a code change. Touch points: src/integrations/supabase/client.ts:5 (hardcoded [https://ttvpsjeucewnenjevfhh.supabase.co](<https://ttvpsjeucewnenjevfhh.supabase.co>); confirmed NXDOMAIN via DNS lookup); src/hooks/use-menu-items.ts (useMenuItems throws on error, no fallback data returned); src/components/Navbar.tsx:103 (items={menuItems || []} — renders empty nav on backend failure, no hardcoded fallback); src/components/Footer.tsx:32-42,62 (Footer already implements a fallbackLinks array used when menuItems is empty/undefined — pattern exists, just missing in Navbar); src/components/contact/ContactForm.tsx:94-98 (contact submission depends on the same dead supabase client); src/store/useRagStore.ts:27 + src/components/chat/ChatWidget.tsx (RAG chat calls supabase.functions.invoke('rag-search') on the dead client).

**Done when**

- [ ] Give Navbar the same hardcoded-fallback pattern Footer already uses so a Supabase outage never strips all nav links; surface a visible error state in ContactForm and ChatWidget instead of silent/hanging failures; leave the restore-vs-drop-Supabase decision as a separate business call, not a code change.

## Code analysis (evidence, marketing @ 9274a8c1)

Status: **fixable** (confidence 95%)

* `src/integrations/supabase/client.ts:5` — hardcoded [https://ttvpsjeucewnenjevfhh.supabase.co](<https://ttvpsjeucewnenjevfhh.supabase.co>); confirmed NXDOMAIN via DNS lookup
* `src/hooks/use-menu-items.ts` — useMenuItems throws on error, no fallback data returned
* `src/components/Navbar.tsx:103` — items={menuItems || []} — renders empty nav on backend failure, no hardcoded fallback
* `src/components/Footer.tsx:32-42,62` — Footer already implements a fallbackLinks array used when menuItems is empty/undefined — pattern exists, just missing in Navbar
* `src/components/contact/ContactForm.tsx:94-98` — contact submission depends on the same dead supabase client
* `src/store/useRagStore.ts:27 + src/components/chat/ChatWidget.tsx` — RAG chat calls supabase.functions.invoke('rag-search') on the dead client

## Source

Product idea (XWEB-2), from search demand

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop In this marketing site repo (xala-web), the Supabase project at https://ttvpsjeucewnenjevfhh.supabase.co no longer resolves in DNS (confirmed NXDOMAIN). This breaks Navbar/Footer menus, the contact form, and the RAG chat widget. Footer.tsx (lines 32-42, used at line 62) already has a `fallbackLinks` array it falls back to when the DB query returns no items — Navbar.tsx does NOT have this and currently does `items={menuItems || []}` (line 103), which renders a fully empty nav when the useMenuItems() query in src/hooks/use-menu-items.ts throws (it has no error handling/fallback at all). Do the following: 1) In src/components/Navbar.tsx, add a hardcoded fallback menu (mirror Footer's fallbackLinks content/pattern) and use it whenever menuItems is empty or the query errors, so blo

Linear: https://linear.app/xala-technologies/issue/XWEB-2/supabase-backend-is-gone-navbar-footer-contact-form-and-chat-are-dead
