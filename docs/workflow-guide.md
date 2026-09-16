# Workflow guide

Custom use cases compose the same spine with different depth. State lives in files, not chat, so work survives `/clear` and handoffs.

## The spine

```
/scope-plan → /codebase-audit (+ /context-forge) → /solution-architect → /feature-build → /verify-release → /test-engineer → /peer-review → /tech-writer → /state-sync
+ /fault-fix anytime
```

| Skill | Owns | Reads |
|---|---|---|
| /scope-plan | `docs/scope/` | idea, git status |
| /codebase-audit | `AGENTS.md` (+ `CLAUDE.md` pointers) | codebase, `/codebase-index` depth |
| /context-forge | rules section of `AGENTS.md` | audit index artifact |
| /solution-architect | `docs/specs/` | scope row, AGENTS.md |
| /feature-build | app code | spec, AGENTS.md |
| /verify-release | nothing durable (chat only) | running app, spec ACs |
| /test-engineer | tests, `test-preferences.json` | git diff, spec |
| /peer-review | `docs/reviews/` | branch diff |
| /tech-writer | PR text, `CHANGELOG.md`, `docs/releases/`, `docs/postmortems/` | git history |
| /state-sync | reconciles AGENTS.md, scope, spec statuses | git change set |
| /fault-fix | minimal fix | symptom, repro |

Legacy `codebase-index` stays as the standalone exhaustive indexer; `codebase-audit` invokes its depth for evidence. Legacy `rules-generator` stays as the standalone `RULES.md` path; `context-forge` is the AGENTS.md successor for multi harness setups.

## Rigor dial (per feature, default on scope header)

- **Prototype**: `/feature-build` only (build plus self check closes `done`).
- **Alpha**: + `/verify-release`.
- **Beta**: + `/test-engineer` (tests close `done`).
- **GA**: + fresh model `/peer-review` + `/tech-writer`.

`done` is always engineer declared. An `Assumed` spec (built before deciding) never blocks `done`; it stays flagged until `/solution-architect` ratifies it.

## Entry points

- **Greenfield**: `/scope-plan` (idea) → `/solution-architect` (stack) → scaffold → `/codebase-audit` (standards) → loop per feature.
- **Brownfield legacy**: `/codebase-audit` (whole repo scan) → `/context-forge` (rules) → `/scope-plan` (enroll existing + next slice) → per feature loop.
- **Monorepo**: scope and specs mirror per workspace (`docs/scope/<ws>/`, `docs/specs/<ws>/`); audit writes root plus light stub per workspace, deepening on `/codebase-audit <ws>`.
- **Docs site repos**: artifact base flips from `docs/` to `.workflow/` when a published docs site is detected; skills follow whichever exists.

## Custom use case recipes

- **Ship one slice fast**: `/scope-plan` (next slice) → per feature `/solution-architect` → `/feature-build` → `/verify-release` → `/state-sync`.
- **Harden for GA**: add `/test-engineer` → `/peer-review` (fresh model) → `/tech-writer release-note` → `/state-sync`.
- **Onboard a teammate**: `/codebase-audit` → `/context-forge` → bare `/scope-plan` (where things stand).
- **Kill a bug in prod**: `/fault-fix` → `/test-engineer` (regression) → `/verify-release` → `/tech-writer postmortem` → `/state-sync`.
