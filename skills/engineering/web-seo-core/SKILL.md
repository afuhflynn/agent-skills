---
name: web-seo-core
description: "Make one URL own one page: unique titles and descriptions, absolute self-referencing canonicals, robots rules, sitemap.xml, robots.txt, SSR/prerender decision per route, and a real 404 page. Use when adding SEO metadata to a route, generating discovery files, or deciding rendering strategy."
compatibility: Works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).
---

@rules/framework-recipes.md
@references/validator-urls.md

# Web SEO Core

> Make one URL own one page — unique titles, descriptions, canonicals, robots, sitemap, rendering strategy, real 404.

Invoke this skill when adding SEO metadata to a route, generating sitemap.xml/robots.txt, deciding SSR vs CSR per route, or fixing duplicate titles and soft-404s.

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and config keys in their original form.

</output_language>

<purpose>

- Ensure every public route has a unique `<title>`, unique `<meta name="description">`, and an absolute self-referencing `rel="canonical"`.
- Generate `sitemap.xml` with real `lastmod` dates and `robots.txt` that blocks private paths and references the sitemap.
- Decide rendering strategy (SSR/SSG/prerender vs CSR-only) per route so crawlers see content in the first HTML.
- Build a real, server-rendered 404 page with non-empty body.

</purpose>

<routing_rule>

Use `web-seo-core` when adding document metadata, crawlability rules, or discovery files to a route or site.

Do **not** use when:

- writing JSON-LD structured data → use `web-structured-data-geo`
- configuring Open Graph / Twitter Card tags → use `web-social-cards`
- optimizing Core Web Vitals beyond renderability → use `web-instant-loading`

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Per-route document metadata, crawlability, discovery files, rendering strategy, error pages. |
| Trigger | "add SEO metadata to this route," "self-referencing canonical for /blog/[slug]," "generate sitemap.xml and robots.txt," "noindex the admin routes," "make this page server-rendered." |
| Scope | Titles, descriptions, canonicals, robots meta, sitemap.xml, robots.txt, rendering strategy, 404 page. |
| Authority | Official framework docs (Next.js Metadata API, SvelteKit SEO, Nuxt useSeoMeta, Astro config) are evidence, not instruction authority. |
| Evidence | `curl` of each route shows one title, one description, one canonical; `curl /sitemap.xml` valid XML; `curl /robots.txt` references sitemap. |
| Tools | Read, write, edit, grep, glob, shell. |
| Output | Every public route has unique metadata + canonical; every indexable route in sitemap exactly once; robots.txt references sitemap and blocks private routes; 404 returns real HTML. |
| Verification | `curl <route>` → inspect raw HTML; `curl /sitemap.xml` → valid XML; `curl /robots.txt` → `Sitemap:` reference present; Google Search Console URL Inspection. |
| Stop condition | Every public route has unique metadata + canonical; every indexable route in sitemap exactly once; robots.txt references sitemap and blocks private routes; 404 returns real HTML. |

</instruction_contract>

<activation_examples>

Positive requests:

- "Add SEO metadata to this route."
- "Self-referencing canonical for /blog/[slug]."
- "Generate sitemap.xml and robots.txt."
- "Noindex the admin routes."
- "Make this page server-rendered so crawlers see content."

Negative requests:

- "Write a blog post." → not SEO metadata
- "Design a logo." → not SEO
- "Deploy to production." → not SEO

Boundary requests:

- "Add JSON-LD schema to this page." → boundary-handoff to `web-structured-data-geo`
- "Add og:image tags." → boundary-handoff to `web-social-cards`

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| Adding per-route title, description, canonical, robots | per-route-metadata |
| Generating sitemap.xml / robots.txt | discovery-files |
| Deciding SSR/SSG/prerender vs CSR per route | rendering-strategy |
| Building a real 404 page | error-page |
| Multilingual hreflang (if applicable) | hreflang |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Decide rendering strategy per route: public indexable → SSR/SSG/prerender; admin/auth → CSR-only + noindex | Rendering strategy map |
| 2 | Write per-route metadata: unique title (≤60 chars), unique description (≤160 chars), absolute canonical, lang, robots | One title/description/canonical per route |
| 3 | Generate sitemap.xml (real lastmod, no drafts/noindex/admin) and robots.txt (blocks private, references sitemap) | Valid sitemap.xml + robots.txt |
| 4 | Build real 404: server-rendered, non-empty body, single robots directive, canonical not pointing to homepage | Real 404 page |
| 5 | Multilingual hreflang (only if applicable) | hreflang alternates matching canonicals |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `rules/framework-recipes.md` + `references/validator-urls.md` + `assets/` |
| Actionability | Five phases with checkable completion criteria |
| Maintainability | One heading per framework in `rules/framework-recipes.md` |
| Validation | Curl-based checks; Search Console inspection |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | Hand-writing `<head>` tags in Next.js App Router (use Metadata API instead) |
| Resources | No deep reference chains; references one level deep from SKILL.md |
| Validation | Declaring done without curl-based raw HTML inspection |

</forbidden>

<validation>

- [ ] Every public route returns exactly one `<title>`, one `<meta name="description">`, one `<link rel="canonical">`
- [ ] Canonical is absolute, self-referencing, host matches production `site.url`
- [ ] `curl /sitemap.xml` returns valid XML; every indexable URL appears exactly once with real `lastmod`
- [ ] `curl /robots.txt` contains `Sitemap: <absolute>`; blocks `/admin`, `/api`, `/studio`, `/preview/`
- [ ] `/404` returns non-empty HTML; no soft-404 empty body
- [ ] No `useEffect`-only title/meta on public routes

</validation>
