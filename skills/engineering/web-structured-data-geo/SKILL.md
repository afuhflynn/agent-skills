---
name: web-structured-data-geo
description: "Build one JSON-LD @graph per page: Organization/Person/WebSite with stable @id values, Article/BreadcrumbList/Product schema matched to visible content, and llms.txt + llms-full.txt for AI crawlers (AEO/GEO). Use when adding structured data, entity identity, or AI-optimized discovery files."
compatibility: Works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).
---

@rules/framework-recipes.md
@references/llms-txt-spec.md

# Web Structured Data / GEO

> Build one JSON-LD `@graph` per page with stable entity `@id`s, schema matched to visible content, and llms.txt / llms-full.txt for AI crawlers.

Invoke this skill when adding Organization/Person/WebSite schema, Article/BreadcrumbList/Product JSON-LD, stable entity identity, or llms.txt discovery files.

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and config keys in their original form.

</output_language>

<purpose>

- Define shared entities once (Organization/Person/WebSite) with stable `@id`s; reference by `@id` everywhere, never duplicate inline.
- Match schema type to visible content per page: Article/BlogPosting for essays, Product for products, BreadcrumbList for breadcrumbs, CollectionPage/ItemList for indexes.
- Render one `<script type="application/ld+json">` per page (`@graph` array) in server HTML; escape `<` as `\u003c`; never `useEffect`, never `metadata.other`.
- Generate `/llms.txt` (H1 → blockquote → `##` link lists) and `/llms-full.txt` from the same content data as the pages.

</purpose>

<routing_rule>

Use `web-structured-data-geo` when adding JSON-LD structured data, entity identity graphs, or AI-optimized discovery files.

Do **not** use when:

- writing document `<title>`/`<meta>` tags → use `web-seo-core`
- configuring Open Graph / Twitter Card tags → use `web-social-cards`
- optimizing loading performance → use `web-instant-loading`

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | JSON-LD structured data, entity identity graph, llms files, AEO/GEO readiness. |
| Trigger | "add Organization schema," "Article JSON-LD for this essay," "generate llms.txt," "stable @id for the author entity," "make this page citable by AI answer engines." |
| Scope | JSON-LD `@graph` per page, entity `@id`s, schema matched to visible content, llms.txt/llms-full.txt. |
| Authority | schema.org vocabulary; Google Rich Results Test eligibility; llmstxt.org (v2) spec. |
| Evidence | `curl` shows valid JSON-LD in raw HTML; Rich Results Test parses detected types; every `llms.txt` link returns 200. |
| Tools | Read, write, edit, grep, glob, shell. |
| Output | One `@graph` per page, nodes linked by stable `@id`; schema mirrors visible text; llms files exist with all links resolving 200. |
| Verification | `curl <route>` → JSON-LD `<script>` present; Rich Results Test → eligible types detected; `curl /llms.txt` → valid markdown with resolving links; Schema Markup Validator → no syntax errors. |
| Stop condition | One `@graph` per page; nodes linked by stable `@id`; schema mirrors visible text; llms files exist with all links resolving 200. |

</instruction_contract>

<activation_examples>

Positive requests:

- "Add Organization schema to the homepage."
- "Article JSON-LD for this essay."
- "Generate llms.txt from my content."
- "Stable @id for the author entity."
- "Make this page citable by AI answer engines."

Negative requests:

- "Write page titles and descriptions." → use `web-seo-core`
- "Add og:image tags." → use `web-social-cards`
- "Optimize LCP." → use `web-instant-loading`

Boundary requests:

- "Validate JSON-LD with Rich Results Test." → verification step within this skill
- "Test llms.txt links resolve." → verification step within this skill

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| Adding Organization/Person/WebSite entity identity | entity-identity |
| Adding per-page Article/BlogPosting/Product schema | per-page-schema |
| Adding BreadcrumbList / CollectionPage / ItemList | navigation-schema |
| Generating llms.txt + llms-full.txt | llms-files |
| Validating JSON-LD | validation |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Define shared entities once: Organization/Person, WebSite with stable `@id`, sameAs profiles | Identity block referenced by `@id` everywhere |
| 2 | Match schema type to visible content per page | Correct `@type` per page; no invisible FAQ/Review claims |
| 3 | Render JSON-LD server-side: one `<script>` per page (`@graph`), escape `<` as `\u003c` | Valid JSON-LD in server HTML |
| 4 | Generate llms.txt + llms-full.txt from content data (not hand-edited) | llms files; every link resolves 200 |
| 5 | Validate with Rich Results Test + Schema Markup Validator | Zero validation errors; detected types match intended |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `rules/framework-recipes.md` + `references/llms-txt-spec.md` + `assets/` |
| Actionability | Five phases with checkable completion criteria |
| Maintainability | One heading per framework in `rules/framework-recipes.md` |
| Validation | Rich Results Test per page type; llms link resolution |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | JSON-LD injected by `useEffect` (invisible to AI crawlers); JSON-LD inside `metadata.other` (renders as `<meta>`, not `<script>`) |
| Resources | No deep reference chains; references one level deep from SKILL.md |
| Validation | Declaring done without Rich Results Test or curl-based HTML inspection |

</forbidden>

<validation>

- [ ] One `<script type="application/ld+json">` per page in server HTML (not client-injected)
- [ ] Entities referenced by stable `@id`, never duplicated inline
- [ ] Schema `@type` matches visible content on that page
- [ ] `<` escaped as `\u003c` in all JSON-LD payloads (no `</script>` breakout)
- [ ] Rich Results Test parses each distinct page type; detected types match intended
- [ ] `curl /llms.txt` valid markdown (H1, blockquote, `##` sections); every link returns 200
- [ ] Schema Markup Validator: no syntax errors

</validation>
