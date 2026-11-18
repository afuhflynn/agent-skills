---
name: ship-it
description: "Stage everything, commit it well documented on a new appropriately named branch, push to GitHub, and hand back a PR title plus a full PR description. Use when the user says ship it, land this, or prep the PR."
compatibility: Works with any git repository hosted on GitHub. Uses git through Bash only; no destructive history rewriting, no PR creation via gh.
---

@rules/naming-and-messages.md
@assets/pr-description-template.md
@assets/evals/ship-it-cases.jsonl

# Ship It

> One command replaces the long repeated instruction: stage everything, commit it well documented on a new appropriately named branch, push to GitHub, and hand back a PR title plus a full PR description.

Invoke this skill when the user wants to land their current working tree changes on GitHub as one clean, well documented commit on the right branch, then receive ready-to-paste PR text: "ship it", "ship it as fix/login-redirect", "ship it to develop", "push this up and write the PR text for me".

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, branch names, and repo commit style in their original form.

</output_language>

<purpose>

- Land the current working tree changes on GitHub as one documented commit on the right branch.
- Push to origin and hand back a PR title, full PR description, and compare link.
- Never create the PR itself — the user creates it from the handed-over text.

</purpose>

<routing_rule>

Use `ship-it` when the user wants a **new branch**, a **PR title or description**, or to **finish a feature**. Any mention of a branch or a PR sends the job here.

Do **not** use when:

- the user just wants to commit and push on the current branch with no PR → that is `push-it`
- the user wants to commit locally only, no push → commit plainly without this skill
- the user wants to amend, rebase, or force push → history rewriting, never done here
- the user wants to tag and cut a release → release work, not shipping a change set

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Land the current working tree changes on GitHub as one documented commit, plus ready-to-paste PR text. |
| Trigger | The user says "ship it", "ship it as <branch>", "ship it to <base>", "push this up and write the PR text", or equivalent. |
| Scope | Git state only: branch, staging, one commit, one push, plus PR title and description in chat. Never edits source code. |
| Authority | The user's words in this run outrank every default here. Repo history outranks generic convention for branch names and commit style. |
| Evidence | Branch names, commit messages, and PR text come from the real diff, the repo log, and verification actually run in this session. Never invent test results, ticket numbers, or scope links. |
| Tools | git through Bash, file reads for scope or spec pointers. No other side effects. |
| Output | Branch name, commit hash, push result, PR title, full PR description, compare link. |
| Verification | The checks under `<validation>` run before the final report. |
| Stop condition | Done when the push succeeds and the PR text is handed over, or stopped at a risk gate with the exact blocker named. |

</instruction_contract>

<activation_examples>

Positive requests:

- "ship it"
- "commit the changes well documented, on a new appropriately named branch, push to GitHub, and give me a PR title and full PR description"
- "push this up and write the PR text for me"
- "land this branch and prep the PR"

Negative requests:

- "just commit this locally, do not push" → commit only job, not this skill
- "amend that last commit" or "rebase this onto master" → history rewriting, never done here
- "create the PR for me with gh" → this skill writes PR text only; creating the PR is a separate explicit ask
- "tag v1.2 and cut a release" → release work, not shipping a change set

Boundary requests:

- "ship it, but let me see the commit message first" → run this skill, but pause at the confirmation point before pushing
- "commit and push" with no branch or PR mention → that is `push-it`, not this skill
- "ship the skill folder too" → same job; skill files are ordinary files in the tree

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| User wants to land changes on a new branch with PR text | ship-and-prep-pr |
| User provides a branch name override | branch-override |
| User provides a base branch override | base-override |
| Change set contains secrets, bulk files, or two unrelated change sets | risk-gate-stop |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Read ground truth: `git status --short`, `git diff --stat`, `git branch --show-current`, default branch, `git remote get-url origin`, `git log --oneline -10`, `git branch -a` | Change set, current branch, default branch, remote URL, commit style, branch pattern |
| 2 | Risk gates: secrets/credentials, bulk/junk, two unrelated change sets, detached HEAD/merge/rebase | Proceed, split, or stop with named blocker |
| 3 | Branch: smart branch rule — default branch → create new branch; work branch → stay; user override wins | Target branch ready |
| 4 | Stage and commit: `git add -A`, confirm staged set, write commit per naming rules section 2, commit once | One well-documented commit |
| 5 | Push: `git push -u origin <branch>`; pause for confirmation if requested | Push result on origin |
| 6 | Hand over PR text: fill template, PR title, compare link | Copyable PR title and description |
| 7 | Report: branch, commit, push result, PR title, PR description, compare link, any risk gate override | Final handover report |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing matching activation examples |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `rules/naming-and-messages.md` + `assets/pr-description-template.md` + `assets/evals/ship-it-cases.jsonl` |
| Actionability | Seven-phase workflow with smart branch rule and risk gates |
| Maintainability | Rules, template, and evals kept one level deep from SKILL.md |
| Validation | Branch not default, staged set matches, commit style matches log, push result verified, PR text complete |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | `git push --force` or `--force-with-lease`, `git commit --amend`, rebasing, or resetting |
| Resources | No deep reference chains; rules/template/evals one level deep |
| Validation | Declaring done without push output, PR title, PR description, and compare link |

</forbidden>

<validation>

- [ ] Branch: shipped branch is not the default branch, and its name follows the repo pattern or the user's override.
- [ ] Staged set: `git diff --cached --stat` read after staging matched the Phase 1 change set.
- [ ] Commit: subject follows the style sampled from `git log`; body documents what, why, verification, and open points.
- [ ] Push: `git push` output shows the branch created or updated on origin, with no force used.
- [ ] PR text: title present, description filled from `assets/pr-description-template.md`, compare link matches the pushed branch and base.
- [ ] Risk gates: each gate checked; any override named in the report.
- [ ] Trigger readback: the fixtures in `assets/evals/ship-it-cases.jsonl` still match the activation examples.

</validation>
