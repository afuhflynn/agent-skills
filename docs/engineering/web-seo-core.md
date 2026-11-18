Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=web-seo-core
```

```bash
npx skills update web-seo-core
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/web-seo-core)

## What it does

Make one URL own one page: unique titles and descriptions, absolute self-referencing canonicals, robots rules, sitemap.xml, robots.txt, SSR/prerender decision per route, and a real 404 page.

## When to reach for it

Reach for this when adding SEO metadata to a route, generating sitemap.xml/robots.txt, deciding SSR vs CSR per route, or fixing duplicate titles and soft-404s.

## Prerequisites

No prerequisites - works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).

## Where it fits

A **model-invoked** skill in the web discoverability stack. Runs first in the composition: its canonical URL output feeds `web-structured-data-geo` and `web-social-cards`.

## Five phases

1. **Rendering strategy** - public indexable → SSR/SSG/prerender; admin/auth → CSR-only + noindex
2. **Per-route metadata** - unique title (≤60 chars), unique description (≤160 chars), absolute canonical, lang, robots
3. **Discovery files** - sitemap.xml with real lastmod; robots.txt blocking private paths and referencing sitemap
4. **Real 404** - server-rendered, non-empty body, single robots directive
5. **Multilingual hreflang** (only if applicable)

## Framework recipes

See `rules/framework-recipes.md` for Next.js, React, SvelteKit, Nuxt, Astro, and plain HTML implementations.

## Stop condition

Every public route has unique metadata + canonical; every indexable route in sitemap exactly once; robots.txt references sitemap and blocks private routes; 404 returns real HTML.
