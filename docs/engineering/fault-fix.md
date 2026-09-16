Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=fault-fix
```

```bash
npx skills update fault-fix
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/fault-fix)

## What it does

Runs a disciplined root cause loop: reproduce, localize, hypothesize one at a time, fix minimally, verify, and hand the regression test to test-engineer.

## When to reach for it

You invoke this by typing `/fault-fix`, or the agent reaches for it when a test fails or behavior is wrong. Reach for it anytime, no scope or spec required.

## Prerequisites

No prerequisites beyond a symptom plus repro. Minimal fix only, no features or refactors.

## Where it fits

The **investigator**, reachable anytime. Points at `/solution-architect` when the cause is a flawed decision.
