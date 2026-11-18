# Naming and Messages — ship-it

Read at Steps 3, 4, and 6. Holds branch naming, commit message structure, and PR text rules.

## 1. Branch naming

- **Smart branch rule:** On the default branch, create a new branch from it. Already on a work branch, stay on it and push it. Never commit while still on the default branch.
- **Branch name pattern:** Learn from `git branch -a` and repo history. Fallback prefix is `feature/`.
- **Format:** `<prefix>/<slug>` where `<slug>` is derived from the change set (short, lowercase, hyphen-separated).
- **User override:** A branch name argument (`as <branch-name>`) always wins.
- **Base branch:** Defaults to the repo default branch (`git symbolic-ref refs/remotes/origin/HEAD`, else `master`, else `main`). `ship it to <base>` overrides.

## 2. Commit message structure

- **Subject:** Imperative mood, no trailing period, about 72 characters at most. Match the repo own style sampled from `git log --oneline -10` (Conventional Commits when the log uses them, e.g. `fix(mentors): correct profile link`).
- **Body:** Only when the change needs explaining. Document what changed grouped by area, why, how it was verified (only verification actually run in this session, failures stated plainly), and any known open point. Reference a spec or scope feature when the diff touches one.
- **One commit:** The whole change set lands as a single commit, unless the diff clearly holds two unrelated change sets — then flag under risk gates and ask which to ship first.
- **Never:** `--no-verify`, `--amend`, rebase, or reset.

## 3. PR text rules

- **PR title:** The commit subject, refined only if the repo PR history shows a different house style.
- **PR description:** Filled from `assets/pr-description-template.md`, grouped by area, with the spec or scope pointer when one exists, verification as actually run, and known open points.
- **Compare link:** `https://github.com/<owner>/<repo>/compare/<base>...<branch>` plus the `/pull/new/<branch>` link git prints on push.
- **Never create the PR:** The user creates it from the handed-over text. No `gh pr create`.
