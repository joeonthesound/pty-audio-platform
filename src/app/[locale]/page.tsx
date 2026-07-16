import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/marketing/hero-section";
import { HomeSections } from "@/components/marketing/home-sections";
import { JsonLd } from "@/components/marketing/json-ld";
import { getImage } from "@/lib/images";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({
  params,
}: Readonly<PageProps>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const seo = await getTranslations("seo");
  const heroImage = getImage("hero", locale);
  const logoImage = getImage("logo", locale);
  const baseUrl = "https://ptyaudio.com";
  const localizedUrl = `${baseUrl}/${locale}`;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: common("brand"),
    url: baseUrl,
    logo: `${baseUrl}${logoImage.src}`,
    description: seo("organizationDescription"),
    sameAs: [],
  };

  const heroServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("titleLine2"),
    serviceType: "Music rights management and catalogue intelligence",
    provider: {
      "@type": "Organization",
      name: common("brand"),
      url: baseUrl,
    },
    areaServed: "Worldwide",
    url: localizedUrl,
    description: seo("heroServiceDescription"),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${localizedUrl}/catalogue-health-check`,
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={heroServiceJsonLd} />
      <HeroSection
        locale={locale}
        image={{ src: heroImage.src, alt: heroImage.alt.en }}
        copy={{
          eyebrow: t("eyebrow"),
          titleLine1: t("titleLine1"),
          titleLine2: t("titleLine2"),
          description: t("description"),
          primaryCta: t("primaryCta"),
          secondaryCta: t("secondaryCta"),
          trustLabel: t("trustLabel"),
          scroll: t("scroll"),
          metrics: {
            catalogueValue: t("metrics.catalogueValue"),
            totalEstimate: t("metrics.totalEstimate"),
            royalties: t("metrics.royalties"),
            health: t("metrics.health"),
            score: t("metrics.score"),
            status: t("metrics.status"),
            review: t("metrics.review"),
          },
          partners: t.raw("partners"),
        }}
      />
      <HomeSections
        locale={locale}
        copy={{
          partners: t.raw("partners"),
          socialProof: {
            title: t("socialProof.title"),
          },
          whatWeDo: {
            eyebrow: t("whatWeDo.eyebrow"),
            title: t("whatWeDo.title"),
            learnMore: t("whatWeDo.learnMore"),
            services: t.raw("whatWeDo.services"),
            stats: t.raw("whatWeDo.stats"),
          },
          tools: {
            healthTitle: t("tools.healthTitle"),
            releaseTitle: t("tools.releaseTitle"),
            conflictTitle: t("tools.conflictTitle"),
            dashboardTitle: t("tools.dashboardTitle"),
            stepOne: t("tools.stepOne"),
            stepTwo: t("tools.stepTwo"),
            stepThree: t("tools.stepThree"),
            userQuestion: t("tools.userQuestion"),
            releaseInformation: t("tools.releaseInformation"),
            conflictType: t("tools.conflictType"),
            description: t("tools.description"),
            continue: t("tools.continue"),
            back: t("tools.back"),
            releaseFields: t.raw("tools.releaseFields"),
            userTypes: t.raw("tools.userTypes"),
            conflicts: t.raw("tools.conflicts"),
            dashboardStats: t.raw("tools.dashboardStats"),
            recentReleases: t.raw("tools.recentReleases"),
          },
          footer: {
            description: t("footer.description"),
            services: t("footer.services"),
            company: t("footer.company"),
            resources: t("footer.resources"),
            social: t("footer.social"),
            copyright: t("footer.copyright"),
            createdBy: t("footer.createdBy"),
          },
        }}
      />
    </main>
  );
}
