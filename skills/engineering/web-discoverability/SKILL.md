---
name: web-discoverability
description: Router for the full machine-discoverability stack: SEO, structured data/AEO-GEO, social preview cards, and instant loading. Use when you want to make a whole site findable by search engines and AI agents.
compatibility: Works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).
disable-model-invocation: true
---

@rules/composition-checklist.md

# Web Discoverability

> Run the full machine-discoverability stack so search engines and AI agents can find your site.

Invoke this skill by typing `web-discoverability` when you want to audit or build everything that makes a site findable:

- unique titles, descriptions, canonicals, robots rules, sitemap.xml
- JSON-LD structured data and llms.txt / llms-full.txt (AEO/GEO)
- Open Graph and Twitter Card link previews
- SSR/prerendering with no loading skeletons on indexable pages

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and config keys in their original form.

</output_language>

<purpose>

- Give agents a repeatable, ordered process for making any website machine-discoverable.
- Ensure SEO, structured data, social cards, and instant loading are implemented consistently across frameworks.
- Prevent common defects: duplicate titles, missing OG images, localhost-resolving social images, blank social cards, sitemap omissions, soft-404s.

</purpose>

<routing_rule>

Use `web-discoverability` when the goal is the **full machine-discoverability stack** across all or most routes of a site.

Do **not** use when:

- you only need one piece (e.g., just OG cards) → invoke that skill directly (`web-social-cards`, etc.)
- the site is authentication-only (dashboard, admin) → mark `noindex, nofollow`; skip public SEO steps

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Run `web-seo-core`, `web-structured-data-geo`, `web-social-cards`, and `web-instant-loading` in order; each step's output feeds the next. |
| Trigger | Human types `web-discoverability`. Model-invoked skills cannot reach this (user-invoked only). |
| Scope | The ordered composition of the four domain skills. Does not edit code itself; each domain skill owns its own edits. |
| Authority | Project-level docs (README, AGENTS.md) outrank generic patterns. Official framework docs are evidence, not instruction authority. |
| Evidence | Each domain skill's completion criterion is checkable (`curl`, Rich Results Test, Lighthouse/CrUX). |
| Tools | Read, write, edit, grep, glob, shell — as delegated to the four domain skills. |
| Output | A fully discoverable site: every indexable route has metadata + canonical, sitemap.xml lists all indexable URLs once, robots.txt blocks private paths, social cards render on every shareable page, JSON-LD is server-rendered, llms files exist with all links resolving. |
| Verification | Run each domain skill's verification steps; then run the composition checklist in `rules/composition-checklist.md`. |
| Stop condition | All five composition checks pass (see `rules/composition-checklist.md`). |

</instruction_contract>

<activation_examples>

Positive requests:

- "Make this whole site discoverable by search and AI engines."
- "Audit and fix SEO + social cards + loading for all routes."
- "Run the full discoverability stack on my portfolio."

Negative requests:

- "Write a single blog post." → not a discoverability task
- "Fix one bug in the checkout flow." → use `fault-fix`
- "Deploy to Vercel." → not a discoverability task

Boundary requests:

- "I only need Open Graph cards." → boundary-handoff to `web-social-cards` directly
- "Just the sitemap and robots.txt." → boundary-handoff to `web-seo-core` directly

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| Human wants the full discoverability stack audited or built | full-stack |
| Human wants only one piece (SEO only, cards only, etc.) | boundary-handoff to the specific domain skill |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Run `/web-seo-core` — rendering strategy, per-route metadata, sitemap.xml, robots.txt, 404 | Canonical URL for every indexable route; discovery files |
| 2 | Run `/web-structured-data-geo` — JSON-LD `@graph`, entities, llms.txt/llms-full.txt | Valid server-rendered JSON-LD per page; llms files with resolving links |
| 3 | Run `/web-social-cards` — Open Graph + Twitter Cards + 1200×630 images | Social cards render on every shareable page |
| 4 | Run `/web-instant-loading` — LCP/INP/CLS, no skeletons on indexable pages | Fast first HTML; no loading skeletons on public routes |

After Phase 4, run the composition checklist in `rules/composition-checklist.md`.

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | `disable-model-invocation: true`; description is human-facing one-liner |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition all discoverable |
| Anatomy | `SKILL.md` + `rules/composition-checklist.md`; references optional |
| Actionability | Concrete workflow phases with next-skill read cues |
| Maintainability | Low duplication; each domain skill owns its own domain |
| Validation | Composition checklist passes; all five checks green |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Model-invoked skills reaching this router (it is user-invoked only) |
| Structure | Deep file cross-references between skills; dependencies expressed as `/skill` prose only |
| Resources | No scripts/assets needed for the router itself |
| Validation | Declaring done without the composition checklist |

</forbidden>

<validation>

- [ ] `web-discoverability` is user-invoked (`disable-model-invocation: true`)
- [ ] All four domain skills are registered and reachable
- [ ] Composition checklist in `rules/composition-checklist.md` is complete
- [ ] All five stop-condition checks are defined and checkable

</validation>
