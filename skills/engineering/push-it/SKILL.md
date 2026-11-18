---
name: push-it
description: "Stage everything, commit it cleanly on the branch you are already on, push to origin, done. No new branch, no PR text, no ceremony. Use when the user says push it, commit and push, or push these changes."
compatibility: Works with any git repository. Uses git through Bash only; no destructive history rewriting.
---

@assets/evals/push-it-cases.jsonl

# Push It

> The small everyday sibling of ship it. Stage everything, commit cleanly on the current branch, push, done.

Invoke this skill when the user wants to save their current working tree changes on GitHub without creating a branch or PR text: "push it", "commit and push", "push these changes", "save this on the branch and push".

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and commit message conventions in their original form.

</output_language>

<purpose>

- Commit the current working tree changes on the current branch and push that branch to origin.
- One commit, one push, no new branch, no PR text, no history rewriting.
- Keep the user's branch and any open PR on it up to date with a single clean commit.

</purpose>

<routing_rule>

Use `push-it` when the user wants to commit and push **on the current branch** with no PR wanted. Plain words like "push it", "commit and push", "push these changes" land here.

Do **not** use when:

- the user wants a new branch, PR title, or PR description → that is `ship-it`
- the user wants to commit locally only, no push → commit plainly without this skill
- the user wants to amend, rebase, or force push → history rewriting, never done here
- the user wants to create a branch first → that is `ship-it` territory

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Commit the current working tree changes on the current branch and push that branch to origin. |
| Trigger | The user says "push it", "commit and push", "push these changes", or equivalent. |
| Scope | Git state only: staging, one commit, one push, on the branch already checked out. Never edits source code, never touches branches. |
| Authority | The user's words in this run outrank every default here. Repo history outranks generic convention for commit style. |
| Evidence | The commit message comes from the real diff and the repo log. Verification claims only from checks actually run in this session, never invented. |
| Tools | git through Bash, file reads only if a scope or spec pointer needs checking. |
| Output | Three things: branch, commit (hash and subject), push result. |
| Verification | The checks under `<validation>` run before the final report. |
| Stop condition | Done when the push succeeds, or stopped at a risk gate with the exact blocker named. |

</instruction_contract>

<activation_examples>

Positive requests:

- "push it"
- "commit and push"
- "push these changes up"
- "save this on the branch and push"

Negative requests:

- "ship it" or "land this and prep the PR" → `ship-it` owns new branches and PR text
- "just commit this locally, do not push" → no push, so not this skill
- "amend that commit" or "force push it" → history rewriting, never done here
- "create a branch for this first" → branch work sends the job to `ship-it`

Boundary requests:

- "commit and push this on a new branch with a PR description" → `ship-it`, not this skill
- "push it" while on `master` → this skill, but the default branch gate fires first

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| User wants to commit and push on current branch, no push-it: push it, commit and push, push these changes | commit-and-push |
| User is on default branch and wants to push directly | default-branch-gate |
| Change set contains secrets, bulk files, or merge/rebase in progress | risk-gate-stop |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Read ground truth: `git status --short`, `git diff --stat`, `git branch --show-current`, `git log --oneline -5`, default branch detection | Change set, current branch, repo commit style |
| 2 | Risk gates: default branch, secrets/credentials, bulk/junk, merge/rebase in progress | Proceed or stop with named blocker |
| 3 | Stage everything: `git add -A`, confirm staged set matches change set | Staged change set |
| 4 | Commit cleanly: subject in repo style from log, body only when needed, commit once | One commit on current branch |
| 5 | Push: `git push origin <current-branch>`, `-u` if no upstream | Push result on origin |
| 6 | Report: branch, commit hash + subject, push result, each on its own line | Three-line final report |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing matching activation examples |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `assets/evals/push-it-cases.jsonl` |
| Actionability | Six-phase workflow with ground-truth reads and risk gates |
| Maintainability | Single short core read; eval fixtures kept separate |
| Validation | Branch unchanged, staged set matches, commit style matches log, push result verified |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | Creating or switching branches (that is `ship-it` territory) |
| Resources | No deep reference chains; eval fixtures one level deep |
| Validation | Declaring done without checking push output and branch state |

</forbidden>

<validation>

- [ ] Branch unchanged: `git branch --show-current` after the push equals the branch read in Phase 1.
- [ ] Staged set: `git diff --cached --stat` read after staging matched the Phase 1 change set.
- [ ] Commit: subject follows the style sampled from `git log`; body, when present, states only real verification and open points.
- [ ] Push: `git push` output shows the current branch updated on origin, with no force used.
- [ ] Report holds exactly the three things: branch, commit, push result.
- [ ] Risk gates: each gate checked; the default branch approval, when it fired, was given in this run.
- [ ] Trigger readback: the fixtures in `assets/evals/push-it-cases.jsonl` still match the activation examples.

</validation>
