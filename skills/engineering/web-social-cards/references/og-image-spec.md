# Open Graph + Twitter image specification (web-social-cards)

Read this when choosing image sizes and tags. One level deep from SKILL.md.

Sources: ogp.me, platform docs (Meta, LinkedIn, X), aggregated 2026.

## Universal image

- 1200×630 px (1.91:1 ratio), PNG/JPEG/WebP, under 5 MB.
- Absolute HTTPS URL, publicly fetchable (no auth, not robots.txt-blocked).
- Declare `og:image:width`="1200", `og:image:height`="630", `og:image:alt`="description of image content".
- Keep text/logos away from edges — platforms crop differently.

## Per-platform minimums

| Platform | Recommended | Minimum | Max file | Notes |
|---|---|---|---|---|
| Facebook / Meta | 1200×630 | 600×315 (large card) | 8 MB | Warns below 600×315 |
| LinkedIn | 1200×627 | 1200×627 | 5 MB | Under 401px wide = thumbnail |
| X summary_large_image | ~1200×628 (2:1) | 300×157 | 5 MB | Crops top/bottom if given 1200×630 |
| X summary | 600×600 (1:1) | 144×144 | 5 MB | Square thumbnail |
| Slack / Discord / iMessage / WhatsApp | 1200×630 | 200×200 | 5 MB | 1200×630 covers all |

## Required tags

Open Graph (required): `og:title`, `og:type`, `og:image`, `og:url`.
Recommended: `og:description` (LinkedIn treats as required), `og:site_name`, `og:locale`, image width/height/alt.

Twitter: `twitter:card`="summary_large_image" (no OG fallback — without it you may get only a plain link). Optional: `twitter:image:alt`, `twitter:site`, `twitter:creator`.

## Testing

Facebook Sharing Debugger, LinkedIn Post Inspector, X Card Validator, opengraph.xyz. Force re-scrape after every image change — platforms cache cards for days.
