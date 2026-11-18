# Core Web Vitals targets (web-instant-loading)

Read this when optimizing loading performance. One level deep from SKILL.md.

Sources: web.dev, pagespeedmatters, digitalapplied, designkey (2026).

## Field data targets (75th percentile, CrUX, 28-day rolling)

| Metric | Good target | Poor threshold |
|---|---|---|
| LCP | ≤ 2.5s | > 4.0s |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |

## LCP sub-parts (budget at 2,500ms)

- Time to First Byte: ~40% (~1,000ms)
- Resource load delay: <10% (~250ms)
- Resource load duration: ~40% (~1,000ms)
- Element render delay: <10% (~250ms)

## Highest-impact fixes (in order)

1. LCP image in initial HTML with `fetchpriority="high"`, no `loading="lazy"` above fold.
2. Explicit width/height on every `img`/`video` (CLS #1 fix).
3. Self-host critical fonts with `font-display: swap` + `size-adjust` fallback.
4. Inline critical CSS; defer non-critical JavaScript.
5. Preload one critical font + LCP image only if not discoverable early.

## AI search note

Pages with FCP under 0.4s average more AI citations; pages above 1.13s drop significantly. Fast, skeleton-free first HTML matters for GEO as much as for SEO.
