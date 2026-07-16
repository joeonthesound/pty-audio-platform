import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/marketing/page-shell";
import { getImage } from "@/lib/images";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const image = getImage("hero", locale);
  const stats = t.raw("stats") as string[];

  return (
    <PageShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image={{ src: image.src, alt: image.alt.en }}>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat} className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-6 text-2xl font-semibold text-[#E50914]">
              {stat}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
