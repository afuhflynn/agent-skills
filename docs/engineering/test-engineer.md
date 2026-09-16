Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=test-engineer
```

```bash
npx skills update test-engineer
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/test-engineer)

## What it does

Writes the test suite for uncommitted changes, classifying each file and tracing tests to spec acceptance criteria. Owns test files plus test-preferences.json.

## When to reach for it

You invoke this by typing `/test-engineer`, or the agent reaches for it after `/feature-build` or `/fault-fix`. Reach for it at Beta and GA tiers.

## Prerequisites

Reads test-preferences.json for the framework (asks and saves it if absent). Git defines the scope.

## Where it fits

The **closer at Beta and GA**. Follows `/verify-release`, hands review to `/peer-review`.
