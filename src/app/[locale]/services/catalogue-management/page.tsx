import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PointList } from "@/components/marketing/page-shell";
import { getImage } from "@/lib/images";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.catalogueManagement.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function CatalogueManagementPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.catalogueManagement");
  const image = getImage("hero", locale);

  return (
    <PageShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image={{ src: image.src, alt: image.alt.en }}>
      <PointList points={t.raw("points") as string[]} />
      <Button asChild className="mt-10 bg-[#E50914] text-white">
        <Link href={`/${locale}/catalogue-health-check`}>
          {t("cta")}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </PageShell>
  );
}
