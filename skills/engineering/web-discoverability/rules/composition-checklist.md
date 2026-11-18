# Composition checklist (web-discoverability router)

Read this when running the full stack. One level deep from SKILL.md.

## Order and dependencies

1. `web-seo-core` — produces canonical URL per route, sitemap.xml, robots.txt.
2. `web-structured-data-geo` — consumes canonicals for `og:url`, graph `@id`, sitemap entries; produces llms files.
3. `web-social-cards` — consumes canonicals for OG `og:url`; produces OG/Twitter tags + images.
4. `web-instant-loading` — consumes route list from step 1; ensures no skeletons on indexable pages.

## Cross-cutting invariants

- Single source of truth for the host: `metadataBase` (Next.js), `site.url` (Nuxt), `Astro.site` (Astro), or `site.url` constant (plain HTML/React/SvelteKit). Never hardcode `localhost` in production metadata.
- One canonical per page, absolute, self-referencing; `og:url` matches `rel="canonical"`.
- Sitemap `lastmod` = content's own date, never build time.
- `disallow` in robots.txt blocks crawling, not indexing; use `noindex` meta for crawl-but-don't-index pages.
- JSON-LD rendered in server HTML, never `useEffect`, never `metadata.other`.
- `twitter:card` present on shareable pages (no OG fallback for card type).
- Image URLs absolute HTTPS, 1200×630, with width/height/alt.
- No loading skeletons in raw HTML of public/indexable pages.

## Stop condition (all five)

- `curl` of every indexable route → full HTML, one title, one description, one canonical.
- `curl /sitemap.xml` → valid XML, every indexable URL exactly once, real `lastmod`.
- `curl /robots.txt` → `Sitemap:` reference, private paths blocked.
- Every shareable page → OG + Twitter card, 1200×630 image.
- Every indexable page → valid server-rendered JSON-LD; every `llms.txt` link resolves 200.
