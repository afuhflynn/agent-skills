# Framework recipes — web-instant-loading

One heading per framework. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (75th percentile field data). No loading skeletons on indexable pages.

## Next.js 16 App Router

- **Server Components by default** — content in first HTML; no `useEffect` data fetch for indexable content.
- **`next/image`** — `priority` on the LCP/hero image (adds `fetchpriority="high"`), explicit `width`/`height`, `loading="eager"` only below the fold:
  ```tsx
  <Image src={hero} alt="…" width={1200} height={630} priority fill className="object-cover" />
  ```
- **`next/font`** — self-host critical fonts with `display: "swap"` and `adjustFontFallback` metrics:
  ```tsx
  const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
  ```
- **ISR** — `export const revalidate = 3600` (music) / `43200` (content pages) on dynamic routes; `generateStaticParams` for prerendered detail pages.
- **Preload** — `metadata.other` or `<link rel="preload" as="image" fetchPriority="high">` only if the LCP image isn't discoverable in initial HTML; inline critical CSS.
- **No skeletons** on `/`, `/blog`, `/projects`, etc. Skeletons only behind auth.

## React (SSR / custom server)

- SSR/SSG all public routes; CSR-only for authenticated dashboards (add `noindex`).
- Hero image: `src`/`srcset` in initial HTML, `fetchPriority="high"` (React 19), explicit dimensions, no `loading="lazy"` above fold.
- Fonts: self-host, `font-display: swap`, `size-adjust` fallback to match metrics.
- Defer non-critical JS, split long tasks, `yield` to paint, audit third-party scripts (analytics, chat).

## SvelteKit

- `export const prerender = true` for static content; SSR for dynamic; `ssr: false` only for non-indexable surfaces.
- Hero `` with `width`/`height`, no `loading="lazy"` above fold.
- No `client:only` above the fold; `client:idle`/`client:visible`/`client:load` still server-render HTML.

## Nuxt

- SSR by default; `<NuxtClientFallback>` only for non-critical islands.
- `useHead` for preload links: `[{ rel: "preload", as: "image", href: hero, "fetch-priority": "high" }]`.
- `nuxt-og-image` or static images with explicit dimensions.

## Astro

- Zero JS by default; islands hydrate only with `client:*`.
- `server:defer` for below-fold content; no `client:only` on indexable content.
- `priority` on hero `<Image />`; `client:visible` only below fold.
- Fonts via Fonts API with `font-display: swap`.

## Plain HTML / CSS / JS

- Static HTML files (content in first HTML by default).
- Hero `<img src="hero.webp" width="1200" height="630" fetchpriority="high" loading="eager">` — only `loading="eager"` above fold.
- Self-hosted font with `font-display: swap` and `size-adjust` fallback.
- Inline critical CSS; defer non-critical JS; immutable fingerprinted assets with `Cache-Control: max-age=31536000, immutable`.

## Cross-framework rules

- LCP image request starts immediately after TTFB — discoverable in initial HTML, not lazy-loaded, not behind Suspense.
- CLS: every `img`/`video` has width+height or CSS aspect-ratio; fonts use `swap` + `size-adjust`; no content inserted above existing elements.
- INP: defer non-critical JS; long tasks split; third-party scripts audited.
- Measure with CrUX (field data) at 75th percentile, not Lighthouse alone.
