Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=push-it
```

```bash
npx skills update push-it
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/push-it)

## What it does

Stage everything, commit it cleanly on the branch you are already on, push to origin, done. No new branch, no PR text, no ceremony. The small everyday sibling of ship it.

## When to reach for it

You invoke this when you want to save your current working tree changes on GitHub without creating a branch or PR text:

- "push it"
- "commit and push"
- "push these changes"
- "save this on the branch and push"

## Prerequisites

No prerequisites - works with any git repository. Uses git through Bash only; no destructive history rewriting.

## Where it fits

A **model-invoked** skill in the engineering bucket. It commits and pushes on the current branch only — no new branch, no PR text.

## Six phases

1. **Ground truth** - `git status --short`, `git diff --stat`, `git branch --show-current`, `git log --oneline -5`, default branch detection
2. **Risk gates** - default branch, secrets/credentials, bulk/junk, merge/rebase in progress
3. **Stage** - `git add -A`, confirm staged set matches change set
4. **Commit** - subject in repo style from log, body only when needed, commit once
5. **Push** - `git push origin <current-branch>`, `-u` if no upstream
6. **Report** - branch, commit hash + subject, push result, each on its own line

## Stop condition

Done when the push succeeds, or stopped at a risk gate with the exact blocker named. The commit lands on the branch that was checked out when the skill started. No branch is created, switched, renamed, or deleted.

## Risk gates

- **Default branch:** You are on `master` or `main`. Ask once before pushing straight to the default branch.
- **Secrets or credentials:** `.env` or `.env.*` files not already tracked, `*.pem`, `*.key`, tokens visible in the diff.
- **Bulk or junk:** Single files over ~5 MB, build output, dependency folders, generated files.
- **Merge or rebase in progress:** Name the state and stop.

## Forbidden

- Creating or switching branches (that is `ship-it` territory).
- PR titles, PR descriptions, compare links, or `gh pr create`.
- `git push --force` or `--force-with-lease`, `git commit --amend`, rebasing, or resetting.
- `--no-verify` or any hook bypass.
- Editing source code to tidy the change set.
