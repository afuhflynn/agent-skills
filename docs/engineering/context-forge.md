Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=context-forge
```

```bash
npx skills update context-forge
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/context-forge)

## What it does

Turns codebase evidence into enforceable working rules: architecture, data flow, auth, testing, deploy, plus non negotiable safety rules, written into AGENTS.md.

## When to reach for it

You invoke this by typing `/context-forge`, or the agent reaches for it when a repo needs to be made safe for agents. Reach for it after `/codebase-audit`.

## Prerequisites

Best after a fresh `/codebase-audit` index. Only writes the rules target plus a backup.

## Where it fits

A **chain step after audit**. Slim successor to `rules-generator` with the same signal map and section catalog, but targeting canonical AGENTS.md.
