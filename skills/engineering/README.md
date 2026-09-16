# Engineering

Skills for daily code work.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[codebase-index](./codebase-index/SKILL.md)** - Thoroughly index and understand every part of a codebase before working on it. Produces a comprehensive codebase index artifact.
- **[rules-generator](./rules-generator/SKILL.md)** - Generate a comprehensive RULES.md for any codebase, capturing its architecture, data flow, conventions, constraints, and safety rules.
- **[scope-plan](./scope-plan/SKILL.md)** - Turn a product idea into a living, coarse scope in docs/scope/ and keep it current. Seeds WHAT to build; solution-architect designs, feature-build builds.
- **[codebase-audit](./codebase-audit/SKILL.md)** - Bootstrap the project's AI context. Scans the codebase and writes tool agnostic AGENTS.md plus thin CLAUDE.md pointers, adding only what is missing. Invokes codebase-index depth for evidence.
- **[context-forge](./context-forge/SKILL.md)** - Turn codebase evidence into enforceable agent working rules in AGENTS.md. Slim successor to rules-generator with the same signal map and section catalog.
- **[solution-architect](./solution-architect/SKILL.md)** - Deliberate load bearing decisions and write build specs to docs/specs/. Owns all spec files.
- **[feature-build](./feature-build/SKILL.md)** - Build a feature, UI or backend, from its spec plus AGENTS.md. Gates on undecided choices, then builds and advances the scope.
- **[fault-fix](./fault-fix/SKILL.md)** - Reproduce, localize, hypothesize one at a time, fix the root cause minimally, and verify. Hands the regression test to test-engineer.
- **[test-engineer](./test-engineer/SKILL.md)** - Write the test suite for uncommitted changes, tracing to spec acceptance criteria. Owns test files plus test-preferences.json.
- **[verify-release](./verify-release/SKILL.md)** - Drive the real app and prove the change works against its spec. Read only, no durable files.
- **[peer-review](./peer-review/SKILL.md)** - Fresh model senior read of the diff before merge. Writes ranked findings to docs/reviews/.
- **[state-sync](./state-sync/SKILL.md)** - Reconcile AGENTS.md, scope, and spec statuses to repo evidence around merge. Surgical edits only.
