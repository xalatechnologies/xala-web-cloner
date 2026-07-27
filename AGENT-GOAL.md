# XWEB-4: E2E failure: book-demo form accepts input without submitting to production

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop Fix the E2E failure "book-demo form accepts input without submitting to production" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.`

## Implementation contract — complete this before writing code
- **Problem:** Fix the E2E failure "book-demo form accepts input without submitting to production" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-4-e2e-failure-book-demo-form-accepts-input`
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
- One issue → one branch (`agent/xweb-4-e2e-failure-book-demo-form-accepts-input`) → one independently reviewable change. Never main.
- Smallest valid change. No opportunistic refactoring, no broad formatting changes, no hidden dependency on another open PR.
- Validation is mandatory and staged — "code written" ≠ "compiled" ≠ "tests passed" ≠ "acceptance demonstrated". Collect evidence (test output / logs) before opening the PR.
- If scope expands beyond "Files likely affected", or the change grows large, STOP and escalate ("BLOCKED:") rather than pressing on.
- Open a PR only when green (otherwise a draft PR with a note). Delete this file before opening the PR.

## Full issue — from Linear (the source of truth for scope & acceptance)
> The Linear MCP in this environment may be bound to the WRONG workspace, so
> do NOT rely on it to read this ticket — everything you need is below. If
> something essential is genuinely missing here (e.g. a screenshot), STOP and
> end with "CLARIFICATION:" rather than guessing.

<!-- xaheen-triage -->
**defect** · severity critical — Verified directly (curl 404, matching Playwright artifact) that the primary lead-capture page is fully down in production for every visitor with no workaround — meets the core-flow-fully-broken bar.

The /book-demo page on the marketing site returns HTTP 404 in production. Confirmed directly with curl against [https://xala.no/book-demo](<https://xala.no/book-demo>), matching the saved Playwright failure for the conversion-journeys E2E test.

**Done when**

- [ ] GET [https://xala.no/book-demo](<https://xala.no/book-demo>) returns a status < 400
- [ ] The book-demo form (email + name inputs, submit button) is visible and accepts input without submitting
- [ ] tests/conversion-journeys.spec.ts > "book-demo form accepts input without submitting to production" passes

**How to verify**

* curl -I [https://xala.no/book-demo](<https://xala.no/book-demo>) returns 200 (or a valid redirect), not 404
* pnpm e2e:test:regression passes the book-demo journey

**Open questions**

* Is the route missing from the deployed build, or was the page removed/renamed on purpose? Repo has no direct code hits per the scan.
* Are other marketing routes affected, or is this isolated to /book-demo? Only this route was checked.
* Mulig duplikat av XWEB-12 — all three fail the identical HTTP-status assertion (< 400, got 404) on /book-demo — same route defect. Lenket som «related»; et menneske avgjør om de skal slås sammen.

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

**Classification:** bug · severity critical · priority P0

E2E failure: book-demo form accepts input without submitting to production. Playwright journey failed against [https://xala.no](<https://xala.no>).
Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received: 404 Classification: bug/critical — fixable.

**Scope**
Fix the failing E2E journey "book-demo form accepts input without submitting to production" on the marketing surface.

**Done when**

- [ ] Fix the failing E2E journey "book-demo form accepts input without submitting to production" on the marketing surface.

## Code analysis (evidence, marketing @ live)

Status: **fixable** (confidence 90%)

* (no direct code hits; see details)

## Source

Scan finding: e2e/error

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop Fix the E2E failure "book-demo form accepts input without submitting to production" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
```

---

*Auto-generated by Digilist Improvements Agent (Linear specialist) from e2e/book-demo form accepts input without submitting to production + code analysis (graph @ live). Move to the approval state to prepare an implementation branch.*

</details>

Linear: https://linear.app/xala-technologies/issue/XWEB-4/e2e-failure-book-demo-form-accepts-input-without-submitting-to
