# agent-skills

A curated monorepo of custom, production-ready AI agent skills and tools, optimized for serverless hosting and built for seamless integration with [skills.sh](https://skills.sh).

[![skills.sh](https://skills.sh/b/afuhflynn/agent-skills)](https://skills.sh/afuhflynn/agent-skills)

## Quickstart

```bash
npx skills@latest add afuhflynn/agent-skills
```

Per skill:

```bash
npx skills@latest add afuhflynn/agent-skills --skill=scope-plan
```

Per harness (`claude-code`, `opencode`, `codex`, others via `.agents/skills`):

```bash
npx skills@latest add afuhflynn/agent-skills -a claude-code
npx skills@latest add afuhflynn/agent-skills -a opencode
```

Or link locally into every harness at once:

```bash
./scripts/link-skills.sh
```

## Workflow

Custom use cases compose the same spine: `scope-plan` → `codebase-audit` (+ `context-forge`) → `solution-architect` → `feature-build` → `verify-release` → `test-engineer` → `peer-review` → `tech-writer` → `state-sync`, with `fault-fix` anytime. See [docs/workflow-guide.md](./docs/workflow-guide.md). Rigor scales per feature: Prototype (build only) · Alpha (+ verify) · Beta (+ test) · GA (+ fresh model review + docs).

## Skills

Skills are split on one axis - who can invoke them. **User-invoked** skills are reachable only when you type them. **Model-invoked** skills can be invoked by you or reached for automatically by the agent when the task fits.

### Engineering

Skills for daily code work.

**Model-invoked**

- **[codebase-index](./skills/engineering/codebase-index/SKILL.md)** - Thoroughly index and understand every part of a codebase before working on it. Produces a comprehensive codebase index artifact.
- **[rules-generator](./skills/engineering/rules-generator/SKILL.md)** - Generate a comprehensive `RULES.md` for any codebase, capturing its architecture, data flow, conventions, constraints, and safety rules.
- **[scope-plan](./skills/engineering/scope-plan/SKILL.md)** - Turn a product idea into a living, coarse scope in docs/scope/ and keep it current.
- **[codebase-audit](./skills/engineering/codebase-audit/SKILL.md)** - Bootstrap the project's AI context (AGENTS.md) from a codebase scan.
- **[context-forge](./skills/engineering/context-forge/SKILL.md)** - Turn codebase evidence into enforceable agent working rules in AGENTS.md.
- **[solution-architect](./skills/engineering/solution-architect/SKILL.md)** - Deliberate decisions and write build specs to docs/specs/.
- **[feature-build](./skills/engineering/feature-build/SKILL.md)** - Build a feature from its spec plus AGENTS.md.
- **[fault-fix](./skills/engineering/fault-fix/SKILL.md)** - Reproduce and fix a bug at its root cause, minimally.
- **[test-engineer](./skills/engineering/test-engineer/SKILL.md)** - Write the test suite for uncommitted changes.
- **[verify-release](./skills/engineering/verify-release/SKILL.md)** - Drive the real app and prove the change against its spec.
- **[peer-review](./skills/engineering/peer-review/SKILL.md)** - Fresh model code review before merge, findings in docs/reviews/.
- **[state-sync](./skills/engineering/state-sync/SKILL.md)** - Reconcile AGENTS.md, scope, and specs to repo evidence.

### Productivity

General workflow tools, not code-specific.

**Model-invoked**

- **[tech-writer](./skills/productivity/tech-writer/SKILL.md)** - Write PR, changelog, release notes, or postmortem prose from the change record.

## License

MIT - see [LICENSE](./LICENSE).
