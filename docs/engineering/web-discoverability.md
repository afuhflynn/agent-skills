Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=web-discoverability
```

```bash
npx skills update web-discoverability
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/web-discoverability)

## What it does

Router for the full machine-discoverability stack: SEO, structured data/AEO-GEO, social preview cards, and instant loading. Sequences `web-seo-core`, `web-structured-data-geo`, `web-social-cards`, and `web-instant-loading` in order so search engines and AI agents can find your site.

## When to reach for it

You invoke this by typing `web-discoverability` when you want to audit or build everything that makes a site findable:

- unique titles, descriptions, canonicals, robots rules, sitemap.xml
- JSON-LD structured data and llms.txt / llms-full.txt (AEO/GEO)
- Open Graph and Twitter Card link previews
- SSR/prerendering with no loading skeletons on indexable pages

## Prerequisites

No prerequisites - works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).

## Where it fits

A **user-invoked router** skill. It does not fire autonomously and cannot be reached by other skills. It delegates to the four model-invoked domain skills in order: `web-seo-core` → `web-structured-data-geo` → `web-social-cards` → `web-instant-loading`.

## Composition order

| Step | Skill | Produces |
|---|---|---|
| 1 | `web-seo-core` | Canonical URL per route + sitemap.xml + robots.txt |
| 2 | `web-structured-data-geo` | JSON-LD `@graph` per page + llms files |
| 3 | `web-social-cards` | Open Graph + Twitter Cards + 1200×630 images |
| 4 | `web-instant-loading` | LCP/INP/CLS targets, no skeletons on indexable pages |

## Stop condition

All five composition checks pass:

- `curl` of every indexable route returns full HTML (title, description, body, canonical)
- `curl /sitemap.xml` returns valid XML listing every indexable URL exactly once with real `lastmod`
- `curl /robots.txt` references the absolute sitemap URL and blocks `/admin`, `/api`, `/studio`, `/preview/`
- Every shareable page has `og:title`, `og:type`, `og:image`, `og:url` plus `twitter:card: summary_large_image`
- Every indexable page renders valid JSON-LD in server HTML; every `llms.txt` link resolves 200

## When NOT to use

- You only need one piece (e.g., just OG cards) → invoke that skill directly
- The site is authentication-only → mark `noindex, nofollow`; skip public SEO steps
