import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeatureGrid, PageShell, type FeatureCard } from "@/components/marketing/page-shell";
import { getImage } from "@/lib/images";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const image = getImage("hero", locale);

  return (
    <PageShell
      locale={locale}
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      image={{ src: image.src, alt: image.alt.en }}
    >
      <FeatureGrid locale={locale} items={t.raw("items") as FeatureCard[]} />
    </PageShell>
  );
}
