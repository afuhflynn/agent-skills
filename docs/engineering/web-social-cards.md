Quickstart:

```bash
npx skills add afuhflynn/agent-skills --skill=web-social-cards
```

```bash
npx skills update web-social-cards
```

[Source](https://github.com/afuhflynn/agent-skills/tree/main/skills/engineering/web-social-cards)

## What it does

Open Graph + Twitter Card tags on every shareable page: `og:title`, `og:type`, `og:image`, `og:url`; `twitter:card: summary_large_image`; 1200×630 absolute images with width/height/alt; dynamic per-route OG images.

## When to reach for it

Reach for this when adding link previews for sharing on X, LinkedIn, Facebook, WhatsApp, Slack, or Discord.

## Prerequisites

No prerequisites - works with any web framework (Next.js, React, SvelteKit, Nuxt, Astro, plain HTML/CSS/JS).

## Where it fits

A **model-invoked** skill in the web discoverability stack. Runs third, consuming canonical URLs from `web-seo-core`.

## Five phases

1. **Required Open Graph** - `og:title`, `og:type`, `og:image`, `og:url`, plus `og:description`, `og:site_name`, `og:locale`
2. **Twitter coverage** - `twitter:card: summary_large_image` (no OG fallback), `twitter:image:alt`, optional `twitter:site`/`twitter:creator`
3. **Image asset** - 1200×630 (1.91:1), PNG/JPEG/WebP, under 5 MB; declare width/height/alt
4. **Dynamic per-route OG images** - Next.js `opengraph-image.tsx` + `ImageResponse`, or framework-equivalent endpoint
5. **Test** - Facebook Sharing Debugger, LinkedIn Post Inspector, X Card Validator, opengraph.xyz

## Stop condition

Every shareable URL has OG + Twitter card; images 1200×630 absolute with width/height/alt; no blank cards on home or hubs.

## Image standard

Universal safe default: 1200×630 (1.91:1). Keep text/logos away from edges (platforms crop differently). `twitter:card` is mandatory — X has no Open Graph fallback for card type.
