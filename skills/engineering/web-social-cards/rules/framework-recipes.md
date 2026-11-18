# Framework recipes — web-social-cards

One heading per framework. All emit Open Graph (`property="og:*"`) and Twitter Card (`name="twitter:*"`) tags, plus a 1200×630 image.

## Required tag set (all frameworks)

Open Graph — required on every shareable page:
```html
<meta property="og:title" content="Page Title" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://example.com/og/page.png" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:description" content="One or two sentences." />
<meta property="og:site_name" content="Site" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Description of the image" />
```

Twitter — the one tag with no OG fallback:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image:alt" content="Description of the image" />
<meta name="twitter:site" content="@handle" />
<meta name="twitter:creator" content="@author" />
```

## Image standard

- 1200×630 (1.91:1), PNG/JPEG/WebP, under 5 MB.
- Absolute HTTPS URL (never relative, never `localhost`).
- Keep text/logos away from edges (each platform crops differently).
- X large card is ~2:1; 1200×630 covers it.

## Next.js 16 App Router

`openGraph` and `twitter` fields in `metadata`/`generateMetadata`. File-based `opengraph-image.tsx` / `twitter-image.tsx` (via `ImageResponse` from `next/og`) has higher priority than `openGraph.images`:

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post share image";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0c0c0c", display: "flex", flexDirection: "column", padding: "52px 56px" }}>
        <div style={{ color: "#fafafa", fontSize: 52, fontWeight: 700 }}>{post.title}</div>
      </div>
    ),
    size,
  );
}
```

In `generateMetadata`, only set `images` when a URL exists — an empty array suppresses inheritance:
```ts
openGraph: {
  images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
},
```

## React (SSR / custom server)

Set OG/Twitter meta tags in the server-rendered `<head>` (React 19 native hoisting or `react-helmet-async` collected server-side). Social scrapers (X, LinkedIn, Slack, WhatsApp) do NOT run JavaScript — tags must be in the raw HTML.

Image can be a static file (`public/og/default.png`) or a server route (`/og/[slug].png`) rendering the title to an image.

## SvelteKit

OG/Twitter tags in `<svelte:head>`, fed by load data:

```svelte
<svelte:head>
  <meta property="og:title" content={data.post.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://example.com/blog/{data.post.slug}" />
  <meta property="og:image" content={data.post.coverImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

Dynamic OG image: `+server.ts` endpoint returning a PNG (satori or image CDN), referenced from `og:image`.

## Nuxt

`useSeoMeta` per page:
```ts
useSeoMeta({
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.coverImage,
  ogType: "article",
  twitterCard: "summary_large_image",
});
```

`@nuxtjs/seo` og-image module (`nuxt-og-image`) generates dynamic OG images from Vue templates; set `site.url` in `nuxt.config.ts` so image URLs resolve absolutely.

## Astro

OG/Twitter tags in `BaseLayout.astro`, image URL built with `new URL(image, Astro.site)`:

```astro
<meta property="og:image" content={new URL(post.coverImage, Astro.site).href} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={post.alt} />
<meta name="twitter:card" content="summary_large_image" />
```

Dynamic OG endpoint: `src/pages/og/[id].png.ts` using satori, linked from `og:image`.

## Plain HTML / CSS / JS

Hand-write OG/Twitter meta tags per HTML file; static 1200×630 image in `public/og/default.png`; per-page override via `og:image`. Do not create byte-duplicate `twitter-image.png` files — X falls back to `og:image`.

## Cross-framework rules

- `twitter:card` is mandatory for X large cards (no OG fallback).
- `og:image` must be absolute HTTPS and publicly fetchable (no auth, not blocked by robots.txt).
- Declare `og:image:width`/`:height` so platforms render the image on first share before downloading.
- Test: Facebook Sharing Debugger, LinkedIn Post Inspector, X Card Validator, opengraph.xyz; force re-scrape after changes.
- One canonical URL per page; `og:url` matches `rel="canonical"`.
