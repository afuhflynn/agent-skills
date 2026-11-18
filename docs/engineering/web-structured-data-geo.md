Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=web-structured-data-geo
```

```bash
npx skills update web-structured-data-geo
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/web-structured-data-geo)

## What it does

Build one JSON-LD `@graph` per page: Organization/Person/WebSite with stable `@id` values, Article/BreadcrumbList/Product schema matched to visible content, and llms.txt + llms-full.txt for AI crawlers (AEO/GEO).

## When to reach for it

Reach for this when adding Organization/Person/WebSite schema, Article/BreadcrumbList/Product JSON-LD, stable entity identity, or llms.txt discovery files.

## Prerequisites

No prerequisites - works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).

## Where it fits

A **model-invoked** skill in the web discoverability stack. Runs second, consuming canonical URLs from `web-seo-core`.

## Five phases

1. **Entity identity** - Organization/Person/WebSite with stable `@id`; reference by `@id`, never duplicate inline
2. **Schema per page** - Article/BlogPosting for essays, Product for products, BreadcrumbList for breadcrumbs, CollectionPage/ItemList for indexes
3. **Server-rendered JSON-LD** - one `<script type="application/ld+json">` per page (`@graph`), escape `<` as `\u003c`
4. **llms.txt + llms-full.txt** - generated from content data, not hand-edited; every link resolves 200
5. **Validate** - Rich Results Test + Schema Markup Validator

## Stop condition

One `@graph` per page; nodes linked by stable `@id`; schema mirrors visible text; llms files exist with all links resolving 200.

## AEO/GEO note

Treat llms.txt as a low-risk experiment, not a ranking signal. Its real value is agent functionality (discovery), not search discovery.
