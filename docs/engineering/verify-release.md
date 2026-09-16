Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=verify-release
```

```bash
npx skills update verify-release
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/verify-release)

## What it does

Drives the real app and proves the change works against its spec: every acceptance criterion met, every surface built. Read only, no durable files.

## When to reach for it

You invoke this by typing `/verify-release`, or the agent reaches for it right after `/feature-build`. Reach for it at Alpha tier and above.

## Prerequisites

No prerequisites. Needs a runnable app; degrades to manual steps without browser tooling.

## Where it fits

The **runtime gate before merge**. Split from the old check router; pairs with `/peer-review`.
