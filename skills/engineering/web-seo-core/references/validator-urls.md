# Verification tools (web-seo-core)

Read this when you need to validate a deployed page. One level deep from SKILL.md.

## Crawlability / raw HTML

- `curl <route>` — inspect raw server HTML for one `<title>`, one `<meta name="description">`, one `<link rel="canonical">`, robots directive.
- `curl /sitemap.xml` — valid XML; every indexable URL exactly once; real `lastmod`.
- `curl /robots.txt` — `Sitemap: <absolute>` present; `/admin`, `/api`, `/studio`, `/preview/` disallowed.

## Search engine validation

- Google Search Console URL Inspection — indexed, not blocked, canonical matches.
- Google Rich Results Test — JSON-LD eligible types detected (used by web-structured-data-geo too).
- Schema Markup Validator — JSON-LD syntax errors.

## Social preview validation

- Facebook Sharing Debugger — og: tags rendered; force re-scrape after changes.
- LinkedIn Post Inspector — og:description required by LinkedIn.
- X Card Validator — twitter:card renders large image.
- opengraph.xyz — aggregate preview check across platforms.
