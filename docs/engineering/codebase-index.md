Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=codebase-index
```

```bash
npx skills update codebase-index
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/codebase-index)

## What it does

Thoroughly indexes an entire codebase — every file, directory, config, module, test, and data flow — producing a comprehensive codebase index artifact. The defining constraint: it leaves no file unexplored, following a depth-first systematic inventory guided by configurable depth levels (catalog, inspect, scan, skip).

## When to reach for it

You invoke this by typing `/codebase-index`, or the agent reaches for it automatically when dropped into an unfamiliar codebase and needing to understand every part before making changes. Reach for this when you need a complete, verifiable mental model of the entire codebase.

## Prerequisites

No prerequisites — works with any language or framework. Uses only read-only tools (read, glob, grep) for exploration.

## Where it fits

A **reach-for-it-anytime standalone** skill. The index artifact it produces is the foundation that `rules-generator` builds on — run `codebase-index` first, then `rules-generator` to synthesize a `RULES.md` from the index.
