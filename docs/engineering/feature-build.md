Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=feature-build
```

```bash
npx skills update feature-build
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/feature-build)

## What it does

Builds a feature from its spec plus AGENTS.md across UI and logical tracks. Gates on undecided choices, then builds and advances the scope.

## When to reach for it

You invoke this by typing `/feature-build <feature>`, or the agent reaches for it when a spec is accepted. Reach for it for pages, components, APIs, services, and data slices.

## Prerequisites

Needs an existing project (or the scaffold task) plus the governing spec, or it routes to `/solution-architect`.

## Where it fits

The **builder**. Advances scope planned to in progress to done at Prototype tier; higher tiers hand to `/verify-release` and `/test-engineer`.
