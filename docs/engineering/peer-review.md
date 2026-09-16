Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=peer-review
```

```bash
npx skills update peer-review
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/peer-review)

## What it does

Runs a senior read of the diff on a fresh model that did not write the code. Writes severity ranked findings to docs/reviews/.

## When to reach for it

You invoke this by typing `/peer-review`, or the agent reaches for it before a PR. Reach for it at GA tier, optionally Beta.

## Prerequisites

Needs a branch diff or uncommitted changes. Read only, never edits code.

## Where it fits

The **review gate before merge**. Follows `/verify-release`; fixes go to `/fault-fix` or `/feature-build`.
