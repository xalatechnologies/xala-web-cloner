# XWEB-6: E2E failure: status and transparency pages cross-link operational metrics

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop Fix the E2E failure "status and transparency pages cross-link operational metrics" (against https://xala.no). Error: Error: /status HTTP status

expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.`

## Implementation contract — complete this before writing code
- **Problem:** Fix the E2E failure "status and transparency pages cross-link operational metrics" (against https://xala.no). Error: Error: /status HTTP status

expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-6-e2e-failure-status-and-transparency-pages`
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
- One issue → one branch (`agent/xweb-6-e2e-failure-status-and-transparency-pages`) → one independently reviewable change. Never main.
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
**defect** · severity minor — marketing-only pages, no booking/rental core flow is touched and no data loss; downgraded from the issue's stated major because the evidence shows a page that was never built rather than something that broke

The E2E journey "status and transparency pages cross-link operational metrics" fails against [https://xala.no](<https://xala.no>) because GET /status returns 404 instead of a page. A repo check confirms no /status or /transparency route or page component exists anywhere in the marketing site's route table, so this isn't a regression — the pages the test expects were never built.

**Done when**

- [ ] GET [https://xala.no/status](<https://xala.no/status>) returns < 400
- [ ] GET [https://xala.no/transparency](<https://xala.no/transparency>) returns < 400
- [ ] The status page and the transparency page link to each other
- [ ] pnpm e2e:test passes the "status and transparency pages cross-link operational metrics" journey

**How to verify**

* Run pnpm e2e:test against the journey and confirm it's green
* Visit /status and /transparency in a browser and confirm each links to the other

**Open questions**

* Were /status and /transparency ever built, or is this E2E journey testing a page that was planned but never shipped — in which case the fix is building two new pages, not a bug fix
* A branch agent/xweb-14-e2e-failure-transparens-page-exposes already exists in the repo — does XWEB-14 already cover the transparency page half of this, making this a duplicate or a split of the same work
* Mulig duplikat av XWEB-15 — all three fail on the identical assertion: /status HTTP status 404 (route doesn't exist), before their respective journeys check anything else — fixing the missing /status route clears all three. Lenket som «related»; et menneske avgjør om de skal slås sammen.

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

**Classification:** bug · severity major · priority P1

E2E failure: status and transparency pages cross-link operational metrics. Playwright journey failed against [https://xala.no](<https://xala.no>).
Error: Error: /status HTTP status

expect(received).toBeLessThan(expected)

Expected: < 400
Received: 404 Classification: bug/major — fixable.

**Scope**
Fix the failing E2E journey "status and transparency pages cross-link operational metrics" on the marketing surface.

**Done when**

- [ ] Fix the failing E2E journey "status and transparency pages cross-link operational metrics" on the marketing surface.

## Code analysis (evidence, marketing @ live)

Status: **fixable** (confidence 90%)

* (no direct code hits; see details)

## Source

Scan finding: e2e/error

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop Fix the E2E failure "status and transparency pages cross-link operational metrics" (against https://xala.no). Error: Error: /status HTTP status

expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
```

---

*Auto-generated by Digilist Improvements Agent (Linear specialist) from e2e/status and transparency pages cross-link operational metrics + code analysis (graph @ live). Move to the approval state to prepare an implementation branch.*

</details>

Linear: https://linear.app/xala-technologies/issue/XWEB-6/e2e-failure-status-and-transparency-pages-cross-link-operational
