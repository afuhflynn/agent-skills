---
name: web-social-cards
description: "Open Graph + Twitter Card tags on every shareable page: og:title, og:type, og:image, og:url; twitter:card summary_large_image; 1200x630 absolute images with width/height/alt; dynamic per-route OG images. Use when adding link previews for sharing on X, LinkedIn, Facebook."
compatibility: Works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).
---

@rules/framework-recipes.md
@references/og-image-spec.md

# Web Social Cards

> Open Graph + Twitter Card tags on every shareable page, with 1200×630 absolute images and dynamic per-route OG image generation.

Invoke this skill when adding link previews for sharing on X, LinkedIn, Facebook, WhatsApp, Slack, or Discord.

<output_language>

All user-facing output defaults to English. Preserve source code identifiers, CLI commands, file paths, and config keys in their original form.

</output_language>

<purpose>

- Emit the required Open Graph set (`og:title`, `og:type`, `og:image`, `og:url`) plus `og:description`, `og:site_name`, `og:locale`, image width/height/alt on every shareable page.
- Emit `twitter:card: summary_large_image` (the one tag with no Open Graph fallback) plus `twitter:image:alt`, optional `twitter:site`/`twitter:creator`.
- Use 1200×630 (1.91:1) images, absolute HTTPS URL, under 5 MB, text/logos away from edges.
- Generate dynamic per-route OG images (Next.js `opengraph-image.tsx` + `ImageResponse`, or framework-equivalent endpoint).

</purpose>

<routing_rule>

Use `web-social-cards` when adding Open Graph tags, Twitter Card tags, or social image assets to routes.

Do **not** use when:

- writing sitemap/robots.txt → use `web-seo-core`
- adding JSON-LD structured data → use `web-structured-data-geo`
- optimizing LCP → use `web-instant-loading`

</routing_rule>

<instruction_contract>

| Field | Contract |
|---|---|
| Intent | Open Graph tags, Twitter Card tags, social image assets, dynamic OG image generation. |
| Trigger | "add og:image to this page," "Twitter summary_large_image card," "dynamic OG image per blog post," "1200×630 share image with alt text," "link preview when shared." |
| Scope | `og:` and `twitter:` meta tags, image assets, dynamic OG image endpoints. |
| Authority | ogp.me; platform image docs (Meta, LinkedIn, X); aggregated 2026 platform requirements. |
| Evidence | `curl` shows `og:` and `twitter:` tags with absolute image URL; X Card Validator / LinkedIn Post Inspector render the card; image URL returns 200. |
| Tools | Read, write, edit, grep, glob, shell. |
| Output | Every shareable URL has OG + Twitter card; images 1200×630 absolute with width/height/alt; no blank cards on home or hubs. |
| Verification | `curl <route>` → `og:`/`twitter:` tags present; image absolute; X Card Validator / LinkedIn Post Inspector / Facebook Sharing Debugger render correctly. |
| Stop condition | Every shareable URL has OG + Twitter card; images 1200×630 absolute with width/height/alt; no blank cards on home or hubs. |

</instruction_contract>

<activation_examples>

Positive requests:

- "Add og:image to this page."
- "Twitter summary_large_image card."
- "Dynamic OG image per blog post."
- "1200×630 share image with alt text."
- "Link preview when shared on X/LinkedIn/Facebook."

Negative requests:

- "Write a sitemap." → use `web-seo-core`
- "Add JSON-LD schema." → use `web-structured-data-geo`
- "Fix CLS on image swap." → use `web-instant-loading`

Boundary requests:

- "Test the card in X Card Validator." → verification step within this skill
- "Force re-scrape after image change." → verification step within this skill

</activation_examples>

<trigger_conditions>

| Situation | Mode |
|---|---|
| Adding required Open Graph set to a page | og-tags |
| Adding Twitter Card coverage | twitter-tags |
| Creating 1200×630 image asset | image-asset |
| Dynamic per-route OG image generation | dynamic-og-images |
| Testing cards on platforms | testing |

</trigger_conditions>

<workflow>

| Phase | Task | Output |
|---|---|---|
| 1 | Required Open Graph set: `og:title`, `og:type`, `og:image`, `og:url`, plus `og:description`, `og:site_name`, `og:locale` | All four required tags present; image absolute HTTPS |
| 2 | Twitter coverage: `twitter:card: summary_large_image`, `twitter:image:alt`, optional `twitter:site`/`twitter:creator` | `twitter:card` present; X renders large card |
| 3 | Image asset: 1200×630 (1.91:1), PNG/JPEG/WebP, under 5 MB; declare width/height/alt | Image returns 200; dimensions declared |
| 4 | Dynamic per-route OG images: detail pages unique, index pages static fallback | No blank cards on home/hubs; each detail page unique |
| 5 | Test: Facebook Sharing Debugger, LinkedIn Post Inspector, X Card Validator, opengraph.xyz | Each platform renders title/description/image correctly |

</workflow>

<required>

| Category | Required |
|---|---|
| Triggerability | Model-invoked; description has rich trigger phrasing |
| Contract | Intent, trigger, scope, authority, evidence, tools, output, verification, stop condition |
| Anatomy | `SKILL.md` + `rules/framework-recipes.md` + `references/og-image-spec.md` + `assets/` |
| Actionability | Five phases with checkable completion criteria |
| Maintainability | One heading per framework in `rules/framework-recipes.md` |
| Validation | Platform validator checks; curl-based tag inspection |

</required>

<forbidden>

| Category | Avoid |
|---|---|
| Triggering | Generic descriptions that match many unrelated requests |
| Structure | Relative or localhost `og:image` URLs; empty `images: []` arrays that suppress inheritance |
| Resources | No byte-duplicate `twitter-image.png` files (X falls back to `og:image`) |
| Validation | Declaring done without platform validator or curl inspection |

</forbidden>

<validation>

- [ ] Every shareable page has `og:title`, `og:type`, `og:image`, `og:url`
- [ ] `og:image` is absolute HTTPS, publicly fetchable, not localhost
- [ ] `twitter:card: summary_large_image` present (no OG fallback for card type)
- [ ] `og:image:width`/`og:image:height`/`og:image:alt` declared
- [ ] Image is 1200×630 (1.91:1), under 5 MB
- [ ] Facebook Sharing Debugger / LinkedIn Post Inspector / X Card Validator render correctly

</validation>
