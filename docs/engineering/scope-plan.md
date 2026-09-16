Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=scope-plan
```

```bash
npx skills update scope-plan
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/scope-plan)

## What it does

Turns a product idea into a living, coarse scope in docs/scope/: plan a new product or slice, enroll one feature, or reconcile after shipping.

## When to reach for it

You invoke this by typing `/scope-plan`, or the agent reaches for it when a build needs a WHAT before design. Reach for it at the start of any product, slice, or feature.

## Prerequisites

No prerequisites. Uses file tools only.

## Where it fits

The **planner** at the head of the workflow. Seeds WHAT to build; `/solution-architect` designs each feature, `/feature-build` builds it. Bare `/scope-plan` doubles as the where things stand readout.
