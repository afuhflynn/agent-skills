Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=solution-architect
```

```bash
npx skills update solution-architect
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/solution-architect)

## What it does

Deliberates load bearing decisions and writes build specs to docs/specs/, owning all spec files with Proposed, In Progress, Accepted, Superseded, and Assumed lifecycles.

## When to reach for it

You invoke this by typing `/solution-architect`, or the agent reaches for it when `/feature-build` reports a decision is owed. Reach for it for stacks, features, enhancements, and cross cutting standards.

## Prerequisites

Reads root plus area AGENTS.md and the linked scope row. Writes no code.

## Where it fits

The **decider** between scope and build. `/scope-plan` seeds the feature, this designs it, `/feature-build` implements it.
