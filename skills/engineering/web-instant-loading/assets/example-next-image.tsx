// app/page.tsx — Next.js 16 LCP hero image example
import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src="/images/hero.webp"
      alt="Hero description"
      width={1200}
      height={630}
      priority           // adds fetchpriority="high"
      className="object-cover"
    />
  );
}
