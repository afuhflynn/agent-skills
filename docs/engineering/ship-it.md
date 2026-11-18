Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=ship-it
```

```bash
npx skills update ship-it
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/ship-it)

## What it does

Stage everything, commit it well documented on a new appropriately named branch, push to GitHub, and hand back a PR title plus a full PR description. The shipper — end to end, only stops on risk.

## When to reach for it

You invoke this when you want to land your current working tree changes on GitHub as one clean, well documented commit on the right branch, then receive ready-to-paste PR text:

- "ship it"
- "ship it as fix/login-redirect" (branch name override)
- "ship it to develop" (base branch override)
- "push this up and write the PR text for me"
- "land this branch and prep the PR"

## Prerequisites

No prerequisites - works with any git repository hosted on GitHub. Uses git through Bash only; no destructive history rewriting, no PR creation via gh.

## Where it fits

A **model-invoked** skill in the engineering bucket. It creates a new branch (or uses an existing work branch), commits, pushes, and writes PR text for the user to paste.

## Seven phases

1. **Ground truth** - `git status --short`, `git diff --stat`, `git branch --show-current`, default branch, `git remote get-url origin`, `git log --oneline -10`, `git branch -a`
2. **Risk gates** - secrets/credentials, bulk/junk, two unrelated change sets, detached HEAD/merge/rebase
3. **Branch** - smart branch rule: default branch → create new; work branch → stay; user override wins
4. **Stage and commit** - `git add -A`, confirm staged set, write commit per naming rules, commit once
5. **Push** - `git push -u origin <branch>`; pause for confirmation if requested
6. **Hand over PR text** - fill template, PR title, compare link
7. **Report** - branch, commit, push result, PR title, PR description, compare link, risk gate overrides

## Stop condition

Done when the push succeeds and the PR text is handed over, or stopped at a risk gate with the exact blocker named. One commit, one push, no history rewriting of any kind.

## Smart branch rule

- On the default branch → create `<prefix>/<slug>` from repo history pattern (fallback: `feature/`).
- On a work branch → stay. Ship the branch you are on.
- A branch name argument (`as <branch-name>`) always wins.
- Never commit while still on the default branch.

## Risk gates

- **Secrets or credentials:** `.env` or `.env.*` files not already tracked, `*.pem`, `*.key`, tokens visible in the diff.
- **Bulk or junk:** Single files over ~5 MB, build output, dependency folders, generated files.
- **Two unrelated change sets:** Propose the split and ask which to ship first.
- **Detached HEAD or merge/rebase in progress:** Name the state and stop.

## Forbidden

- `git push --force` or `--force-with-lease`, `git commit --amend`, rebasing, or resetting.
- `--no-verify` or any hook bypass.
- Committing a file flagged by the secrets gate without the user's explicit word.
- Inventing verification, issue numbers, or links that do not exist.
- Creating the PR (no `gh pr create`), opening a browser, or merging anything.
