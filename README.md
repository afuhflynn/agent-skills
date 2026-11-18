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

**User-invoked**

- **[web-discoverability](./skills/engineering/web-discoverability/SKILL.md)** - Router for the full machine-discoverability stack: SEO, structured data/AEO-GEO, social preview cards, and instant loading. Use when you want to make a whole site findable by search engines and AI agents.

**Model-invoked**

- **[web-seo-core](./skills/engineering/web-seo-core/SKILL.md)** - Make one URL own one page: unique titles, descriptions, canonicals, robots rules, sitemap.xml, robots.txt, SSR/prerender decision per route, and a real 404 page.
- **[web-structured-data-geo](./skills/engineering/web-structured-data-geo/SKILL.md)** - Build one JSON-LD `@graph` per page: Organization/Person/WebSite with stable `@id` values, Article/BreadcrumbList/Product schema matched to visible content, and llms.txt + llms-full.txt for AI crawlers (AEO/GEO).
- **[web-social-cards](./skills/engineering/web-social-cards/SKILL.md)** - Open Graph + Twitter Card tags on every shareable page: og:title, og:type, og:image, og:url; twitter:card summary_large_image; 1200x630 absolute images with width/height/alt; dynamic per-route OG images.
- **[web-instant-loading](./skills/engineering/web-instant-loading/SKILL.md)** - Content and meta in the first HTML with no loading skeletons on indexable pages: SSR/SSG/prerender, LCP image with fetchpriority=high, explicit image dimensions, font-display swap, preload critical resources, CLS under 0.1.

- **[push-it](./skills/engineering/push-it/SKILL.md)** - Stage everything, commit it cleanly on the branch you are already on, push to origin, done. No new branch, no PR text, no ceremony.
- **[ship-it](./skills/engineering/ship-it/SKILL.md)** - Stage everything, commit it well documented on a new appropriately named branch, push to GitHub, and hand back a PR title plus a full PR description.

### Productivity

General workflow tools, not code-specific.

**Model-invoked**

- **[tech-writer](./skills/productivity/tech-writer/SKILL.md)** - Write PR, changelog, release notes, or postmortem prose from the change record.

## License

MIT - see [LICENSE](./LICENSE).
