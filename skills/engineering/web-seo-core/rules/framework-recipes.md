# Framework recipes — web-seo-core

One heading per framework. Each tells the agent exactly what files to create/edit and what to export. These are the only places framework-specific code lives; `SKILL.md` stays framework-agnostic.

## Next.js 16 App Router

Use the Metadata API (`metadata` object or `generateMetadata`), `app/sitemap.ts`, `app/robots.ts`. Both exports work only in Server Components; `params` is a Promise (await it). Do not hand-write `<head>` tags or use `next/head`.

**Root layout** — set `metadataBase` once so relative URLs resolve absolutely:
```ts
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: { default: "Site", template: "%s | Site" },
  description: "One-line description.",
  openGraph: { type: "website", siteName: "Site", locale: "en_US" },
  twitter: { card: "summary_large_image", creator: "@handle" },
  robots: { index: true, follow: true },
};
```

**Static page** — export `metadata`:
```ts
// app/about/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "...",
  alternates: { canonical: "/about" },
};
```

**Dynamic page** — export `generateMetadata`, call `notFound()` for missing slugs:
```ts
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}
```

**Sitemap** — `app/sitemap.ts` returns `MetadataRoute.Sitemap`; use real `lastModified` from content dates, never build time; exclude `noIndex`/drafts:
```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
```

**Robots** — `app/robots.ts` returns `MetadataRoute.Robots`; block private paths, reference sitemap:
```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/studio/", "/preview/"] },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/sitemap.xml`,
  };
}
```

**Shallow-merge trap:** a page's `openGraph` object replaces the parent layout's entirely — share common fields via a spread object, not inheritance.

## React (Next.js / Remix / React Router SSR / custom server)

- **Next.js App Router:** use the recipes above.
- **Next.js Pages Router:** use `next/head` with `getServerSideProps`/`getStaticProps`; or migrate to App Router metadata API.
- **Remix:** export `meta` function from each route (`app/routes/blog.$slug.tsx`).
- **Custom Node/Express server:** render `<title>`, `<meta name="description">`, `<link rel="canonical">` into the HTML template before `res.send()`; generate `/sitemap.xml` and `/robots.txt` as route handlers from your data source.
- **react-helmet-async:** only with SSR; collect helmet context after `renderToString`/`renderToPipeableStream` and inject into `<head>`. Client-only Helmet output is invisible to crawlers.
- **React 19:** native `<title>`/`<meta>`/`<link>` hoisting works, but still only in server-rendered HTML — CSR-only public pages are not SEO-safe.

## SvelteKit

Meta tags go in `<svelte:head>`, fed by `+page.server.ts` load data:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>
<svelte:head>
  <title>{data.post.title} | Site</title>
  <meta name="description" content={data.post.description} />
  <link rel="canonical" href="https://example.com/blog/{data.post.slug}" />
</svelte:head>
```

**Sitemap endpoint** — `src/routes/sitemap.xml/+server.ts`, prerender for static:
```ts
export const prerender = true;
export const GET = async ({ url }) => {
  const posts = await getAllPublishedPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="sitemaps.org/schemas/sitemap/0.9">
${posts.map((p) => `  <url><loc>${new URL(`/blog/${p.slug}`, url.origin).href}</loc><lastmod>${new Date(p.updatedAt || p.publishedAt).toISOString()}</lastmod></url>`).join("\n")}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
```

**Robots** — `static/robots.txt` or `src/routes/robots.txt/+server.ts`; disallow `/admin`, `/api`, `/studio`, `/preview/`; reference absolute sitemap.

**Rendering** — `export const prerender = true` for static content; SSR for dynamic; `ssr: false` only for non-indexable admin surfaces. Pick one trailing-slash convention (`trailingSlash: 'never'` recommended) and match canonicals to it.

## Nuxt

Set `site.url` once in `nuxt.config.ts` — every SEO module reads it. Use `useSeoMeta` per page, `useHead` for canonical/link/script:

```ts
// pages/blog/[slug].vue
<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  $fetch(`/api/posts/${route.params.slug}`)
);
useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  twitterCard: "summary_large_image",
});
useHead({
  link: [{ rel: "canonical", href: () => `https://example.com/blog/${post.value?.slug}` }],
});
</script>
```

**Site config** (feeds all modules):
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  site: { url: "https://example.com", name: "Site", description: "…" },
  modules: ["@nuxtjs/seo"],
});
```

**Sitemap/robots** — `@nuxtjs/sitemap` and `@nuxtjs/robots` generate automatically from `site.url`; no hand-written files needed unless you need dynamic sources.

## Astro

Set `site` + `trailingSlash` in `astro.config.mjs`. Build canonicals from `new URL(Astro.url.pathname, Astro.site)`. Use a shared `BaseLayout.astro` SEO component:

```astro
---
// src/layouts/BaseLayout.astro
interface Props { title: string; description: string; noindex?: boolean; }
const { title, description, noindex = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Site</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical.href} />
    {noindex && <meta name="robots" content="noindex" />}
    <link rel="sitemap" href="/sitemap-index.xml" />
  </head>
  <body><slot /></body>
</html>
```

**Sitemap** — `npx astro add sitemap`, set `site` (silently generates nothing otherwise), use `serialize()` with real `lastmod` from content dates (never build time), `filter` to exclude drafts/admin:
```ts
// astro.config.mjs
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://example.com",
  trailingSlash: "always",
  integrations: [sitemap({ filter: (page) => !page.includes("/admin/") })],
});
```

**Robots** — `public/robots.txt` or `src/pages/robots.txt.ts` endpoint reusing `site`.

## Plain HTML / CSS / JS

No framework head API — discipline is the mechanism. Per HTML file:
- Hand-write `<title>`, `<meta name="description">`, `<link rel="canonical" href="https://example.com/page/">` in `<head>`.
- One canonical per file, absolute, self-referencing.
- Static `sitemap.xml` listing all indexable URLs with real `lastmod`.
- Static `robots.txt` blocking `/admin`, `/api`, `/studio`, `/preview/`, referencing the sitemap.
- No `document.title`/`useEffect` metadata — it never reaches crawlers.

## Cross-framework rules

- One canonical per page, absolute, self-referencing; never point homepage canonicals from 404s.
- `metadataBase` / `site.url` / `Astro.site` is the single source of truth for the host — never hardcode `localhost` in production metadata.
- `disallow` in robots.txt blocks crawling, not indexing. Use `noindex` meta on pages you want crawled-but-not-indexed.
- Sitemap `lastmod` must be the content's own date; build-time dates teach search engines to ignore the file.
