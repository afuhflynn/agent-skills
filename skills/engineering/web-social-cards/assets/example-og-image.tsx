// app/blog/[slug]/opengraph-image.tsx — Next.js 16 example
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post share image";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0c0c0c",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ color: "#fafafa", fontSize: 52, fontWeight: 700 }}>
            Post Not Found
          </div>
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c0c0c",
          display: "flex",
          flexDirection: "column",
          padding: "52px 56px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 16, fontWeight: 700, letterSpacing: 4 }}>
          BLOG POST
        </div>
        <div
          style={{
            color: "#fafafa",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.12,
            marginTop: 18,
            maxWidth: 640,
          }}
        >
          {post.title.length > 60 ? post.title.slice(0, 57) + "…" : post.title}
        </div>
        <div style={{ color: "#71717a", fontSize: 15, fontWeight: 500, letterSpacing: 3, marginTop: 48 }}>
          example.com
        </div>
      </div>
    ),
    size
  );
}
