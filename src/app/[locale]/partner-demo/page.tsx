import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PartnerDemo } from "@/components/marketing/partner-demo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.partnerDemo.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PartnerDemoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.partnerDemo");
  const sections = t.raw("sections") as Array<{
    label: string;
    title: string;
    description: string;
    tag: string;
  }>;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#E50914]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.95] sm:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/62">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.label}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20"
            >
              <span className="rounded-full border border-[#E50914]/35 bg-[#E50914]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E50914]">
                {section.tag}
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/38">
                {section.label}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/58">
                {section.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <PartnerDemo
        copy={{
          whiteLabel: {
            title: t("whiteLabel.title"),
            description: t("whiteLabel.description"),
            pty: t("whiteLabel.pty"),
            partner: t("whiteLabel.partner"),
            portal: t("whiteLabel.portal"),
            subtitle: t("whiteLabel.subtitle"),
            metrics: t.raw("whiteLabel.metrics"),
            note: t("whiteLabel.note"),
          },
        }}
      />
    </main>
  );
}
