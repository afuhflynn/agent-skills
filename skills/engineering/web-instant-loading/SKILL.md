---
name: web-instant-loading
description: "Content and meta in the first HTML with no loading skeletons on indexable pages: SSR/SSG/prerender, LCP image with fetchpriority=high, explicit image dimensions, font-display swap, preload critical resources, CLS under 0.1. Use when making pages load instantly for users and crawlers."
compatibility: Works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).
---

@rules/framework-recipes.md
@references/cwv-targets.md

# Web Instant Loading

> Content + meta in the first HTML with no loading skeletons on indexable pages — LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.

Invoke this skill when making pages load instantly for users and crawlers: SSR/SSG/prerender decisions, LCP image optimization, font loading, layout stability, JavaScript budget.

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and config keys in their original form.

</output_language>

<purpose>

- SSR/SSG/prerender all indexable pages so content + meta are in the first HTML; no content behind `onMount`/`useEffect` fetch; no skeleton loaders on crawlable URLs.
- Achieve LCP ≤2.5s: LCP image in initial HTML with `fetchpriority="high"`, no `loading="lazy"` above fold, explicit width/height, WebP/AVIF.
- Achieve CLS ≤0.1: every `img`/`video` has width+height or CSS aspect-ratio; fonts use `font-display: swap` with `size-adjust` fallback; no content inserted above existing elements.
- Achieve INP ≤200ms: defer non-critical JavaScript, split long tasks, yield to browser paint, audit third-party scripts.

</purpose>

<routing_rule>

Use `web-instant-loading` when optimizing rendering performance, image/font loading, layout stability, or JavaScript budget on indexable pages.

Do **not** use when:

- writing document metadata → use `web-seo-core`
- adding Open Graph / Twitter Card tags → use `web-social-cards`
- adding JSON-LD structured data → use `web-structured-data-geo`

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Rendering strategy for performance, image/font loading, layout stability, JavaScript budget on indexable pages. |
| Trigger | "make this page SSR so it loads instantly," "preload the hero image," "remove the loading skeleton," "fix CLS on image swap," "Core Web Vitals targets." |
| Scope | SSR/SSG/prerender, LCP image, image dimensions, fonts, preload, CLS, INP, third-party scripts. |
| Authority | web.dev Core Web Vitals guidance; CrUX field data; Lighthouse lab data. |
| Evidence | `curl` shows content in raw HTML (no skeleton); Lighthouse/CrUX → LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile. |
| Tools | Read, write, edit, grep, glob, shell. |
| Output | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (field data); initial HTML contains content + meta; no loading skeletons on indexable pages. |
| Verification | `curl <route>` → content present, no skeleton; Lighthouse/CrUX metrics; DevTools waterfall → hero image request starts right after TTFB. |
| Stop condition | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (field data); initial HTML contains content + meta; no loading skeletons on indexable pages. |

</instruction_contract>

<activation_examples>

Positive requests:

- "Make this page SSR so it loads instantly."
- "Preload the hero image."
- "Remove the loading skeleton from the blog page."
- "Fix CLS on image swap."
- "Core Web Vitals targets."

Negative requests:

- "Write page titles." → use `web-seo-core`
- "Add og:image tags." → use `web-social-cards`
- "Add JSON-LD schema." → use `web-structured-data-geo`

Boundary requests:

- "Measure Core Web Vitals in the field." → verification step within this skill
- "Audit third-party scripts." → verification step within this skill

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| SSR/SSG/prerender decision for indexable pages | rendering-strategy |
| LCP image optimization | lcp |
| CLS layout stability fixes | cls |
| INP JavaScript budget | inp |
| Network efficiency (fonts, preload, critical CSS) | network |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Content in first HTML: SSR/SSG/prerender all indexable pages; no `onMount`/`useEffect` content fetch; no skeletons on crawlable URLs | `curl` shows body copy, headings, links; no skeleton |
| 2 | LCP ≤2.5s: hero image as `src`/`srcset` in initial HTML, `fetchpriority="high"`, no `loading="lazy"` above fold, explicit width/height, WebP/AVIF | Hero request starts after TTFB; LCP field ≤2.5s |
| 3 | CLS ≤0.1: width+height or aspect-ratio on all media; `font-display: swap` + `size-adjust`; no content inserted above existing elements | CLS field ≤0.1; no font-swap shift |
| 4 | INP ≤200ms: defer non-critical JS, split long tasks, yield to paint, audit third-party scripts | INP field ≤200ms |
| 5 | Network efficiency: self-host critical fonts, preload LCP image + one font, inline critical CSS, 103 Early Hints, cacheable HTML | TTFB budget respected; render-blocking minimized |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `rules/framework-recipes.md` + `references/cwv-targets.md` + `assets/` |
| Actionability | Five phases with checkable completion criteria |
| Maintainability | One heading per framework in `rules/framework-recipes.md` |
| Validation | CrUX/Lighthouse field data; curl-based HTML inspection |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | Loading skeletons on indexable/public routes; `loading="lazy"` on above-fold LCP images |
| Resources | No deep reference chains; references one level deep from SKILL.md |
| Validation | Declaring done without field data (CrUX) or curl-based HTML inspection |

</forbidden>

<validation>

- [ ] `curl` of every indexable route shows body copy, headings, links in raw HTML; no "Loading…" skeleton
- [ ] LCP image present in initial HTML with `fetchpriority="high"`, no `loading="lazy"` above fold
- [ ] Every `img`/`video` has width+height or CSS aspect-ratio
- [ ] Fonts use `font-display: swap` with `size-adjust` fallback
- [ ] LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (CrUX field data at 75th percentile)
- [ ] Hero image request starts immediately after TTFB (DevTools waterfall)

</validation>
