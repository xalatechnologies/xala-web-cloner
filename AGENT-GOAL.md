# XWEB-14: E2E failure: transparens page exposes uptime or SLA metrics

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop Fix the E2E failure "transparens page exposes uptime or SLA metrics" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.`

## Implementation contract — complete this before writing code
- **Problem:** Fix the E2E failure "transparens page exposes uptime or SLA metrics" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-14-e2e-failure-transparens-page-exposes`
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
- One issue → one branch (`agent/xweb-14-e2e-failure-transparens-page-exposes`) → one independently reviewable change. Never main.
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
**defect** · severity major — a marketing page is fully unreachable (404) in production, matching the issue's own major/P1 classification; no data loss or broken core booking flow though.

The E2E journey "transparens page exposes uptime or SLA metrics" fails against [https://xala.no](<https://xala.no>) because the transparens page returns HTTP 404 instead of a successful status. Confirmed live: curl to /transparens and /no/transparens both return 404, while the homepage returns 200.

**Done when**

- [ ] The transparens page URL returns a successful status (<400) on [https://xala.no](<https://xala.no>)
- [ ] The Playwright journey "transparens page exposes uptime or SLA metrics" passes against production

**How to verify**

* Run `pnpm e2e:test` for the transparens journey and confirm it goes green
* curl the transparens page URL and confirm status <400

**Open questions**

* What is the correct/intended URL path for the transparens page — was it renamed, moved, or never deployed?
* Is this page linked from navigation anywhere, or was it orphaned/removed intentionally?

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

**Classification:** bug · severity major · priority P1

E2E failure: transparens page exposes uptime or SLA metrics. Playwright journey failed against [https://xala.no](<https://xala.no>).
Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received: 404 Classification: bug/major — fixable.

**Scope**
Fix the failing E2E journey "transparens page exposes uptime or SLA metrics" on the marketing surface.

**Done when**

- [ ] Fix the failing E2E journey "transparens page exposes uptime or SLA metrics" on the marketing surface.

## Code analysis (evidence, marketing @ live)

Status: **fixable** (confidence 90%)

* (no direct code hits; see details)

## Source

Scan finding: e2e/error

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop Fix the E2E failure "transparens page exposes uptime or SLA metrics" (against https://xala.no). Error: Error: expect(received).toBeLessThan(expected)

Expected: < 400
Received:   404. Reproduce with `pnpm e2e:test`, find and fix the root cause, verify the journey is green, run full test/build and open a PR. Do not work on main.
```

---

*Auto-generated by Digilist Improvements Agent (Linear specialist) from e2e/transparens page exposes uptime or SLA metrics + code analysis (graph @ live). Move to the approval state to prepare an implementation branch.*

</details>

Linear: https://linear.app/xala-technologies/issue/XWEB-14/e2e-failure-transparens-page-exposes-uptime-or-sla-metrics
