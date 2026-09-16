Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=tech-writer
```

```bash
npx skills update tech-writer
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/productivity/tech-writer)

## What it does

Writes the human facing prose about a change from the real record: PR description, changelog entry, release notes, or postmortem.

## When to reach for it

You invoke this by typing `/tech-writer pr | changelog | release-note | postmortem`, or the agent reaches for it after review. Reach for it when prose, not code, is the deliverable.

## Prerequisites

Needs git history (plus incident facts for postmortems). Writes prose only.

## Where it fits

The **writer after review**. Owns PR text, CHANGELOG.md, docs/releases, and docs/postmortems.
