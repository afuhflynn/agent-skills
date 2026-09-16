Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=state-sync
```

```bash
npx skills update state-sync
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/state-sync)

## What it does

Closes the loop after a change: reconciles AGENTS.md files, scope, and spec statuses to repo evidence with surgical edits, flagging what it must not touch.

## When to reach for it

You invoke this by typing `/state-sync`, or the agent reaches for it around merge. Reach for it as the last step of every change.

## Prerequisites

No prerequisites. Acts on the git change set; stops cleanly on nothing to sync.

## Where it fits

The **universal reconciler**. Maintains what `/codebase-audit` created; flags stale specs to `/solution-architect`.
