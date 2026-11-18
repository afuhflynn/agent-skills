# Framework recipes — web-structured-data-geo

One heading per framework. All emit the same thing: one `<script type="application/ld+json">` per page (`@graph` array), escape `<` as `\u003c`, rendered in server HTML — never `useEffect`, never `metadata.other`.

## Entity identity (all frameworks)

Define once, reference by `@id` everywhere:

```json
{
  "@context": "https://schema.org",
  "@id": "https://example.com/#organization",
  "@type": "Organization",
  "name": "Site",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": ["https://github.com/handle", "https://linkedin.com/company/handle"]
}
```

Homepage graph example (one page, one graph):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://example.com/#organization", "@type": "Organization", "name": "Site", "url": "https://example.com" },
    { "@id": "https://example.com/#person", "@type": "Person", "name": "Afuh Flynn", "url": "https://example.com", "sameAs": ["https://github.com/afuhflynn"] },
    { "@id": "https://example.com/#website", "@type": "WebSite", "name": "Site", "url": "https://example.com", "publisher": { "@id": "https://example.com/#organization" } },
    { "@id": "https://example.com/", "@type": "WebPage", "url": "https://example.com/", "isPartOf": { "@id": "https://example.com/#website" } }
  ]
}
```

## Next.js 16 App Router

Render the script tag in the page component (Server Component). Wrap shared loaders with React `cache()` so `generateMetadata` and the page run one query:

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@id": `${siteUrl}/#organization`, "@type": "Organization", "name": "Site", "url": siteUrl },
      {
        "@id": `${siteUrl}/blog/${slug}#webpage`,
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt,
        "author": { "@id": `${siteUrl}/#person` },
        "publisher": { "@id": `${siteUrl}/#organization` },
        "mainEntityOfPage": { "@id": `${siteUrl}/blog/${slug}#webpage` },
        "url": `${siteUrl}/blog/${slug}`,
        "image": post.coverImage ? `${siteUrl}${post.coverImage}` : undefined,
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <h1>{post.title}</h1>
    </article>
  );
}
```

**Never** do this (build-tested defect):
```ts
// WRONG — metadata.other renders <meta>, not <script>; search engines won't read it
other: { "script:ld+json": JSON.stringify(graph) }
```

## React (SSR / custom server)

Render JSON-LD as part of the server-rendered component tree:

```tsx
function ArticleSchema({ post }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, … };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
```

Anti-pattern — invisible to AI crawlers:
```tsx
// NEVER — runs only in the browser
useEffect(() => { const el = document.createElement("script"); el.type = "application/ld+json"; document.head.appendChild(el); }, []);
```

With `react-helmet-async` + SSR, collect head tags server-side; JSON-LD can ride in the same streamed HTML.

## SvelteKit

Build the object in `+page.server.ts` load data, print in `<svelte:head>` with `{@html}` and escape `<`:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  let { data } = $props();
  const json = JSON.stringify(data.schema).replace(/</g, "\\u003c");
</script>
<svelte:head>
  <script type="application/ld+json" {@html} json />
</svelte:head>
```

## Nuxt

Use `useSchemaOrg` (from `@nuxtjs/seo` / `nuxt-schema-org`) — it auto-links page-level nodes to site-level Organization/WebSite by `@id`:

```vue
<script setup lang="ts">
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () => $fetch(`/api/posts/${route.params.slug}`));
useSchemaOrg([
  defineArticle({
    headline: post.value?.title,
    description: post.value?.description,
    datePublished: post.value?.publishedAt,
    dateModified: post.value?.updatedAt,
    author: { name: post.value?.author.name, url: post.value?.author.url },
    image: post.value?.coverImage,
  }),
]);
</script>
```

Site identity in `app.vue`:
```vue
<script setup lang="ts">
useSchemaOrg([
  defineOrganization({ name: "Site", url: "https://example.com", logo: "https://example.com/logo.png", sameAs: ["https://github.com/handle"] }),
  defineWebSite({ name: "Site" }),
]);
</script>
```

Or hand-write with `useHead({ script: [{ type: "application/ld+json", innerHTML: JSON.stringify(graph) }] })`.

## Astro

Build schema in frontmatter, render with `set:html`:

```astro
---
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://example.com/#organization", "@type": "Organization", "name": "Site", "url": "https://example.com" },
    { "@id": canonical.href, "@type": "Article", "headline": post.title, "author": { "@id": "https://example.com/#person" } },
  ],
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema).replace(/</g, "\\u003c")} />
```

`set:html` prevents Astro from escaping the JSON; the `<` escape prevents `</script>` breakout.

## Plain HTML / CSS / JS

Hand-write a static `<script type="application/ld+json">` in `<head>` or `<body>` per page type, escape `<`, validate with Schema Markup Validator. Organization + WebSite on every page; per-page type (Article, Product) on content pages.

## llms.txt + llms-full.txt (all frameworks)

Root `/llms.txt` (H1 → blockquote summary → `##` link lists with notes) and `/llms-full.txt` (full text). Generated from the same content data as the pages — not hand-edited. Add `rel="describedby"` / `rel="alternate" type="text/markdown"` links in HTML `<head>` or `Link:` HTTP headers.

Example `llms.txt`:
```
# Site

> One-paragraph summary.

## Key Pages

- [Home](https://example.com) — Site overview.
- [Blog](https://example.com/blog) — Essays and articles.

## Optional

- [Sitemap](https://example.com/sitemap.xml)
```

## Cross-framework rules

- One `@graph` per page; nodes reference each other by stable `@id`, never duplicate inline.
- Schema type must match visible content — no invisible `FAQPage`/`Review`/`aggregateRating` claims (Google no longer shows FAQ rich results for most domains).
- `author` referenced by `@id` to a single `Person` node, not repeated per page.
- Escape `<` as `\u003c` in all JSON-LD payloads.
- Validate every distinct page type in Google Rich Results Test.
