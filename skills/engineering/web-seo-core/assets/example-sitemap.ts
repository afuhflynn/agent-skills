// app/sitemap.ts — Next.js 16 App Router example
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticPages = [
    { url: base, lastModified: new Date("2026-01-01"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date("2026-01-01"), changeFrequency: "daily", priority: 0.9 },
  ];

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    ...staticPages,
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
