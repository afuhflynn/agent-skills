Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=rules-generator
```

```bash
npx skills update rules-generator
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/rules-generator)

## What it does

Generates a comprehensive `RULES.md` for any codebase by first delegating to `codebase-index` for thorough discovery, then synthesizing the index into a structured rules file. The defining constraint: every claim in the generated rules must cite its source file from the index — no hallucinated frameworks, no invented conventions.

## When to reach for it

You invoke this by typing `/rules-generator`, or the agent reaches for it automatically when a codebase lacks a `RULES.md` and needs one generated from scratch. Reach for this when you want to make a codebase safe for agents to work on by capturing its architecture, data flow, conventions, constraints, and safety rules.

## Prerequisites

Requires the `codebase-index` skill to be available for the indexing phase. Both skills are included in this repo.

## Where it fits

A **chain step** that depends on `codebase-index`. Run `codebase-index` first, then `rules-generator` — or just invoke `rules-generator` and it will drive the indexing itself before generating the rules file.
