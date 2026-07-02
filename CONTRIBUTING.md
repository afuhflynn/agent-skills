# Contributing to agent-skills

Thanks for considering a contribution. This repo is a curated collection of AI agent skills — structured instruction sets loaded by coding agents. Contributions of all kinds are welcome: new skills, improvements to existing ones, documentation, bug reports.

---

## Quickstart

```bash
git clone https://github.com/afuhflynn/agent-skills.git
cd agent-skills
pnpm install
```

The repo is mostly markdown and shell scripts. No build step required. pnpm is only used for Changesets-based versioning.

---

## Repository Architecture

Skills live under `skills/` in bucket folders:

| Bucket | Status | Description |
|---|---|---|
| `engineering/` | **Promoted** | Daily code work skills |
| `productivity/` | **Promoted** | Daily non-code workflow tools |
| `misc/` | Not promoted | Rarely used, kept around |
| `personal/` | Not promoted | Tied to personal setup |
| `in-progress/` | Not promoted | Drafts not yet ready |
| `deprecated/` | Not promoted | No longer used |

**Promoted buckets** appear in the top-level `README.md`, are registered in `.claude-plugin/plugin.json`, and get published docs pages. Non-promoted buckets do not.

Every skill is a folder containing at minimum a `SKILL.md` file. Skills may also include:

- `rules/` — structured instruction files referenced by `SKILL.md`
- `references/` — reference material (archetype guides, examples)
- `scripts/` — companion scripts (if applicable)

Each skill is either **user-invoked** (`disable-model-invocation: true` in frontmatter, reachable only by typing its name) or **model-invoked** (the default, reachable by agent or human).

---

## Adding a New Skill

### 1. Create the skill folder

```
skills/<bucket>/<skill-name>/
├── SKILL.md
├── rules/       # optional
└── references/  # optional
```

`SKILL.md` must have frontmatter:

```yaml
---
name: <skill-name>
description: "Model-facing trigger description for auto-invocation. Use 'Use when...' language for model-invoked skills. Omit for user-invoked skills."
compatibility: <what harnesses or tools it works with>
---
```

Set `disable-model-invocation: true` in frontmatter if the skill should only be reachable by the human.

### 2. Register the skill

**If the bucket is promoted** (`engineering/` or `productivity/`):

- Add an entry in `.claude-plugin/plugin.json`:

```json
{
  "name": "agent-skills",
  "skills": [
    "./skills/engineering/<skill-name>"
  ]
}
```

- Add the skill to the top-level `README.md` under its bucket heading, linking to its `SKILL.md`
- Add the skill to the bucket's `README.md` with a one-line description
- Create a docs page at `docs/<bucket>/<skill-name>.md`

**If the bucket is not promoted** (`misc/`, `personal/`, `in-progress/`, `deprecated/`):

- List the skill in the bucket's `README.md` only (flat list, no grouping by invocation mode)
- Do not add to `.claude-plugin/plugin.json` or top-level `README.md`

### 3. Run the link script

```bash
bash scripts/link-skills.sh
```

This symlinks every skill into `~/.claude/skills/` and `~/.agents/skills/`. Run it any time you add, rename, or remove a skill.

---

## Editing an Existing Skill

- Edit `SKILL.md`, rules, and references directly in the skill folder
- If you change a skill's behaviour in a promoted bucket, re-sync its docs page at `docs/<bucket>/<skill-name>.md`
- After renaming a skill folder, run `scripts/link-skills.sh` to update symlinks
- Keep the invocation mode (`disable-model-invocation`) consistent with the skill's purpose

### Docs pages

Docs pages at `docs/<bucket>/<skill-name>.md` are published to `https://skills.sh/afuhflynn/agent-skills/skills/<bucket>/<skill-name>`. Each page should contain:

- **Quickstart** — how to install the skill
- **What it does** — one or two paragraphs, lead with the one-sentence job
- **When to reach for it** — invocation mode and trigger boundary
- **Where it fits** — role in the skill ecosystem

Links in docs pages must be absolute (they're published externally).

---

## Versioning

This repo uses [Changesets](https://github.com/changesets/changesets) for version management.

```bash
pnpm changeset
```

Follow the prompts to describe your changes. Commit the generated changeset file alongside your changes. CI (`.github/workflows/release.yml`) opens a version PR and creates tags when merged to `main`.

Every PR that modifies a skill's behaviour should include a changeset.

---

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Add a changeset: `pnpm changeset`
4. If adding or modifying a promoted skill, update the docs page
5. Open a pull request with a clear title and description
6. CI runs on push — ensure it passes

---

## Code of Conduct

This project is governed by the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards. Report unacceptable behaviour by opening a GitHub issue.

---

## Getting Help

- Open a [GitHub issue](https://github.com/afuhflynn/agent-skills/issues) for bugs, questions, or feature requests
- For skill-specific questions, include the skill name in the issue title

---

## License

MIT — see [LICENSE](./LICENSE).
