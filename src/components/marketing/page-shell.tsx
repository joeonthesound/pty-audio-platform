import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type HeroImage = {
  src: string;
  alt: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  href?: string;
};

type PageShellProps = {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  image: HeroImage;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  image,
  children,
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative isolate overflow-hidden px-5 py-28 sm:px-8 lg:py-36">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]" />
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#E50914]">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            {description}
          </p>
          {children}
        </div>
      </section>
    </main>
  );
}

export function FeatureGrid({
  locale,
  items,
}: {
  locale: string;
  items: FeatureCard[];
}) {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.title}
          className="border-white/10 bg-white/[0.04] text-white shadow-2xl backdrop-blur"
        >
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-4 min-h-20 text-sm leading-6 text-white/58">
              {item.description}
            </p>
            {item.href ? (
              <Button asChild className="mt-6 bg-[#E50914] text-white">
                <Link href={`/${locale}/${item.href}`}>
                  {item.title}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PointList({ points }: { points: string[] }) {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2">
      {points.map((point) => (
        <div
          key={point}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
        >
          <CheckCircle2 className="size-5 text-[#E50914]" />
          <span className="font-medium">{point}</span>
        </div>
      ))}
    </div>
  );
}
