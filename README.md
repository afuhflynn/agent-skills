# agent-skills

A curated monorepo of custom, production-ready AI agent skills and tools, optimized for serverless hosting and built for seamless integration with [skills.sh](https://skills.sh).

[![skills.sh](https://skills.sh/b/afuhflynn/agent-skills)](https://skills.sh/afuhflynn/agent-skills)

## Quickstart

```bash
npx skills@latest add afuhflynn/agent-skills
```

## Skills

Skills are split on one axis — who can invoke them. **User-invoked** skills are reachable only when you type them. **Model-invoked** skills can be invoked by you or reached for automatically by the agent when the task fits.

### Engineering

Skills for daily code work.

**Model-invoked**

- **[codebase-index](./skills/engineering/codebase-index/SKILL.md)** — Thoroughly index and understand every part of a codebase before working on it. Produces a comprehensive codebase index artifact.
- **[rules-generator](./skills/engineering/rules-generator/SKILL.md)** — Generate a comprehensive `RULES.md` for any codebase, capturing its architecture, data flow, conventions, constraints, and safety rules.

## License

MIT — see [LICENSE](./LICENSE).
