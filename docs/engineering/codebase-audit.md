Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=codebase-audit
```

```bash
npx skills update codebase-audit
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/codebase-audit)

## What it does

Scans the codebase and bootstraps the project's AI context: root plus nested AGENTS.md files plus thin CLAUDE.md pointers, adding only what is missing.

## When to reach for it

You invoke this by typing `/codebase-audit` (optionally with an area path), or the agent reaches for it on an undocumented codebase. Reach for it on greenfield scaffolds, brownfield onboarding, or gap fills.

## Prerequisites

No prerequisites. Main thread writes; only a read only scout subagent on large scans.

## Where it fits

The **context bootstrapper** every later skill reads. Uses `/codebase-index` style depth for evidence. `/state-sync` maintains what this creates.
