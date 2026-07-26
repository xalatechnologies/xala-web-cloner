# XWEB-1: Rotate leaked credentials committed to the repo

> Auto-prepared by Digilist Improvements Agent. Run Claude in this worktree:
> `/loop In the xala-web repo (this is the Digilist marketing site, currently on branch agent/docs-pr-3 off main), three tracked files contain live secrets readable by anyone with repo access: .env and scripts/.env each contain SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_API_KEY; supabase/functions/chat-ai/.env contains OPENAI_API_KEY. The service-role key bypasses all Supabase RLS. .gitignore has no .env entry at all. A prior commit (651d11f) once deleted .env's contents but it was later re-populated and re-committed, so the leak is live in current HEAD, not just history.

Do, in order, and stop to report back before any step that requires human action outside git:
1. STOP and tell the human operator to rotate both secrets NOW, before any file changes: the Supabase service-role key (Supabase dashboard > Project Settings > API) and the OpenAI API key (platform.openai.com > API keys). Do not proceed to step 2 until they confirm rotation is done, since removing files without rotating leaves the old keys valid and burned.
2. Once rotated, run `git rm --cached .env scripts/.env supabase/functions/chat-ai/.env` and add `.env`, `.env.*` (keeping `!.env.example` and `!supabase/functions/chat-ai/.env.example` un-ignored, since those are safe templates already tracked) to .gitignore.
3. Check .github/workflows/deploy.yml for any place that currently expects these values from a committed .env at build/deploy time, and wire the new rotated values in as GitHub Actions repository secrets instead (e.g. `secrets.SUPABASE_SERVICE_ROLE_KEY`, `secrets.OPENAI_API_KEY`), updating the workflow to inject them as env vars at the appropriate step.
4. Ask the human whether to run `git filter-repo` to purge the old (now-rotated, burned) keys from history, or to accept them as burned-and-rotated without a history rewrite (history rewrite forces all contributors to re-clone or hard-reset). Do not run filter-repo without explicit confirmation, since it rewrites shared history.
5. Verify: `git ls-files | grep '\.env$'` returns nothing; `git status` shows the three files as untracked-but-present locally (not deleted from disk, just untracked) so local dev still works from the same values until each dev rotates their own local copy; the new secrets are present in the repo's GitHub Actions secrets and referenced by deploy.yml.
6. Run the existing test suite and confirm it is green, then open a PR with a clear description of what changed and confirmation that rotation happened, since removing the files without rotation does not close this issue.

Acceptance criteria: no .env files tracked in git, .gitignore covers .env variants, deploy.yml pulls secrets from GitHub Actions secrets rather than a committed file, both leaked keys are confirmed rotated (old OpenAI key returns 401, old Supabase service-role key no longer authenticates), and tests are green before the PR is opened.`

## Implementation contract — complete this before writing code
- **Problem:** In the xala-web repo (this is the Digilist marketing site, currently on branch agent/docs-pr-3 off main), three tracked files contain live secrets readable by anyone with repo access: .env and scripts/.env each contain SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_API_KEY; supabase/functions/chat-ai/.env contains OPENAI_API_KEY. The service-role key bypasses all Supabase RLS. .gitignore has no .env entry at all. A prior commit (651d11f) once deleted .env's contents but it was later re-populated and re-committed, so the leak is live in current HEAD, not just history.

Do, in order, and stop to report back before any step that requires human action outside git:
1. STOP and tell the human operator to rotate both secrets NOW, before any file changes: the Supabase service-role key (Supabase dashboard > Project Settings > API) and the OpenAI API key (platform.openai.com > API keys). Do not proceed to step 2 until they confirm rotation is done, since removing files without rotating leaves the old keys valid and burned.
2. Once rotated, run `git rm --cached .env scripts/.env supabase/functions/chat-ai/.env` and add `.env`, `.env.*` (keeping `!.env.example` and `!supabase/functions/chat-ai/.env.example` un-ignored, since those are safe templates already tracked) to .gitignore.
3. Check .github/workflows/deploy.yml for any place that currently expects these values from a committed .env at build/deploy time, and wire the new rotated values in as GitHub Actions repository secrets instead (e.g. `secrets.SUPABASE_SERVICE_ROLE_KEY`, `secrets.OPENAI_API_KEY`), updating the workflow to inject them as env vars at the appropriate step.
4. Ask the human whether to run `git filter-repo` to purge the old (now-rotated, burned) keys from history, or to accept them as burned-and-rotated without a history rewrite (history rewrite forces all contributors to re-clone or hard-reset). Do not run filter-repo without explicit confirmation, since it rewrites shared history.
5. Verify: `git ls-files | grep '\.env$'` returns nothing; `git status` shows the three files as untracked-but-present locally (not deleted from disk, just untracked) so local dev still works from the same values until each dev rotates their own local copy; the new secrets are present in the repo's GitHub Actions secrets and referenced by deploy.yml.
6. Run the existing test suite and confirm it is green, then open a PR with a clear description of what changed and confirmation that rotation happened, since removing the files without rotation does not close this issue.

Acceptance criteria: no .env files tracked in git, .gitignore covers .env variants, deploy.yml pulls secrets from GitHub Actions secrets rather than a committed file, both leaked keys are confirmed rotated (old OpenAI key returns 401, old Supabase service-role key no longer authenticates), and tests are green before the PR is opened.
- **Business objective:** _why this matters (from the Linear issue)_
- **Repository / branch:** `/root/xala-web` @ `agent/xweb-1-rotate-leaked-credentials-committed-to-the`
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
- One issue → one branch (`agent/xweb-1-rotate-leaked-credentials-committed-to-the`) → one independently reviewable change. Never main.
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

Product gap: Rotate leaked credentials committed to the repo. <!-- xaheen-triage -->
**defect** · severity critical — a live service-role key bypassing RLS plus a billable API key are both exposed in the current HEAD of a repo readable by anyone with access — this is an active credential leak, not just bad history

Three tracked .env files in the marketing repo contain live secrets in the current HEAD: a Supabase service-role key (bypasses RLS) and an OpenAI API key, verified by `git show HEAD:<file>` on .env, scripts/.env, and supabase/functions/chat-ai/.env. .gitignore has no .env entry, so anyone with repo access can read and use both keys today, and they also live on in git history.

**Done when**

- [ ] Both the OpenAI key and the Supabase service-role key are rotated in their respective dashboards
- [ ] All three .env files are removed from tracked files (git rm --cached) and .env is added to .gitignore
- [ ] Build-time secret values are moved to GitHub Actions secrets
- [ ] History is purged (git filter-repo) or the team explicitly accepts the old keys as burned post-rotation

**How to verify**

* git ls-files | grep '.env$' returns nothing after cleanup
* After rotation, the old OpenAI key returns 401 on a test request and the old Supabase service-role key no longer authenticates

**Open questions**

* Who has access to the repo today (public vs private, contributor list) — affects how urgent rotation is versus already-assumed-compromised
* Is there a preference between git filter-repo (full history purge) vs. accept-as-burned, given other contributors may need to re-clone after a history rewrite

Target repo: `marketing`

<details><summary>Reporter's original text</summary>

Three tracked `.env` files contain live secrets:

* `.env` — `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`
* `scripts/.env`
* `supabase/functions/chat-ai/.env`

The service-role key bypasses all RLS. The OpenAI key bills a real account. Both are readable by anyone with repo access and are in git history.

**Do, in order**

1. Rotate the OpenAI key and the Supabase service-role key.
2. `git rm --cached` all three; add `.env` to `.gitignore`.
3. Purge history (`git filter-repo`) or accept the keys as burned once rotated.
4. Move build-time values to GitHub Actions secrets.

Rotation is what closes this. Removing the files alone does not.

</details> Current assessment: gap (bug, critical). Relevant code: .env, scripts/.env, supabase/functions/chat-ai/.env, .gitignore, .github/workflows/deploy.yml, git log 651d11f.

**Scope**
Rotate the Supabase service-role key and the OpenAI API key in their dashboards now. Remove all three tracked .env files with git rm --cached, add .env (and .env.*) to .gitignore, wire the runtime/build-time secret values into GitHub Actions secrets consumed by .github/workflows/deploy.yml, and either purge git history with git filter-repo or have the team explicitly accept the old keys as burned once rotated. Touch points: .env (tracked at HEAD, contains live SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY); scripts/.env (tracked at HEAD, duplicate SUPABASE_SERVICE_ROLE_KEY and OPENAI_API_KEY); supabase/functions/chat-ai/.env (tracked at HEAD, contains live OPENAI_API_KEY); .gitignore (no .env entry anywhere in the file, confirmed by direct read); .github/workflows/deploy.yml (no reference to SUPABASE_SERVICE_ROLE_KEY or OPENAI_API_KEY, confirming these are not yet wired as GitHub Actions secrets); git log 651d11f (a prior commit once deleted .env content, but the file was re-added/re-populated afterward and is live again at current HEAD).

**Done when**

- [ ] Rotate the Supabase service-role key and the OpenAI API key in their dashboards now. Remove all three tracked .env files with git rm --cached, add .env (and .env.*) to .gitignore, wire the runtime/build-time secret values into GitHub Actions secrets consumed by .github/workflows/deploy.yml, and either purge git history with git filter-repo or have the team explicitly accept the old keys as burned once rotated.

## Code analysis (evidence, marketing @ ebad0ab1)

Status: **gap** (confidence 98%)

* `.env` — tracked at HEAD, contains live SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY
* `scripts/.env` — tracked at HEAD, duplicate SUPABASE_SERVICE_ROLE_KEY and OPENAI_API_KEY
* `supabase/functions/chat-ai/.env` — tracked at HEAD, contains live OPENAI_API_KEY
* `.gitignore` — no .env entry anywhere in the file, confirmed by direct read
* `.github/workflows/deploy.yml` — no reference to SUPABASE_SERVICE_ROLE_KEY or OPENAI_API_KEY, confirming these are not yet wired as GitHub Actions secrets
* `git log 651d11f` — a prior commit once deleted .env content, but the file was re-added/re-populated afterward and is live again at current HEAD

## Source

Product idea (XWEB-1), from search demand

## Run as Claude loop (in `/root/xala-web`, on a new branch)

```
/loop In the xala-web repo (this is the Digilist marketing site, currently on branch agent/docs-pr-3 off main), three tracked files contain live secrets readable by anyone with repo access: .env and scripts/.env each contain SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_API_KEY; supabase/functions/chat-ai/.env contains OPENAI_API_KEY. The service-role key bypasses all Supabase RLS. .gitignore has no .env entry at all. A prior commit (651d11f) once deleted .env's contents but it was later re-populated and re-committed, so the leak is live in current HEAD, not just history.

Do, in order, and stop to report back before any step that requires human action outside git:
1. STOP and tell the human operator to rotate both secrets NOW, before any file changes: the Supabase service-role key (Supabase dashboard > Project Settings > API) and the OpenAI API key (platform.openai.com > API keys). Do not proceed to step 2 until they confirm rotation is done, since removing files without rotating leaves the old keys valid an

Linear: https://linear.app/xala-technologies/issue/XWEB-1/rotate-leaked-credentials-committed-to-the-repo
