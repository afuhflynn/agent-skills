Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=web-instant-loading
```

```bash
npx skills update web-instant-loading
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/web-instant-loading)

## What it does

Content and meta in the first HTML with no loading skeletons on indexable pages: SSR/SSG/prerender, LCP image with fetchpriority=high, explicit image dimensions, font-display swap, preload critical resources, CLS under 0.1.

## When to reach for it

Reach for this when making pages load instantly for users and crawlers: SSR/SSG/prerender decisions, LCP image optimization, font loading, layout stability, JavaScript budget.

## Prerequisites

No prerequisites - works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).

## Where it fits

A **model-invoked** skill in the web discoverability stack. Runs last, consuming the route list from `web-seo-core`.

## Five phases

1. **Content in first HTML** - SSR/SSG/prerender all indexable pages; no content behind `onMount`/`useEffect`; no skeletons on crawlable URLs
2. **LCP ≤2.5s** - LCP image in initial HTML with `fetchpriority="high"`, no `loading="lazy"` above fold, explicit width/height, WebP/AVIF
3. **CLS ≤0.1** - width+height or aspect-ratio on all media; `font-display: swap` + `size-adjust` font fallback
4. **INP ≤200ms** - defer non-critical JS, split long tasks, yield to paint, audit third-party scripts
5. **Network efficiency** - self-host critical fonts, preload LCP image + one font, inline critical CSS

## Stop condition

LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (CrUX field data at 75th percentile); initial HTML contains content + meta; no loading skeletons on indexable pages.

## Core Web Vitals targets

| Metric | Good target | Poor threshold |
|---|---|---|
| LCP | ≤ 2.5s | > 4.0s |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |
