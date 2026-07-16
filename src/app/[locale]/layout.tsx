import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/marketing/site-chrome";
import { routing } from "@/i18n/routing";
import { getImage } from "@/lib/images";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const common = await getTranslations("common");
  const nav = await getTranslations("navigation");
  const pages = await getTranslations("pages");
  const footer = await getTranslations("home.footer");
  const logoImage = getImage("logo", locale);
  const navItems = [
    { label: nav("home"), href: `/${locale}` },
    {
      label: nav("services"),
      href: `/${locale}/services`,
      children: [
        {
          label: nav("distribution"),
          href: `/${locale}/services/distribution`,
          description: pages("distribution.meta.description"),
        },
        {
          label: nav("publishing"),
          href: `/${locale}/services/publishing`,
          description: pages("publishing.meta.description"),
        },
        {
          label: nav("catalogueManagement"),
          href: `/${locale}/services/catalogue-management`,
          description: pages("catalogueManagement.meta.description"),
        },
      ],
    },
    {
      label: nav("resources"),
      href: `/${locale}/resources`,
      children: (pages.raw("resources.items") as Array<{
        title: string;
        description: string;
      }>).map((resource) => ({
        label: resource.title,
        href: `/${locale}/resources`,
        description: resource.description,
      })),
    },
    { label: nav("about"), href: `/${locale}/about` },
    { label: nav("contact"), href: `/${locale}/contact` },
  ];

  return (
    <NextIntlClientProvider>
      <div className="dark min-h-screen bg-[#050505] text-white">
        <SiteChrome
          header={{
            locale,
            brand: common("brand"),
            logo: { src: logoImage.src, alt: logoImage.alt.en },
            navItems,
            cta: nav("cta"),
          }}
          footer={{
            locale,
            copy: {
              description: footer("description"),
              services: footer("services"),
              company: footer("company"),
              resources: footer("resources"),
              social: footer("social"),
              copyright: footer("copyright"),
              createdBy: footer("createdBy"),
              sitemap: footer("sitemap"),
            },
          }}
        >
          {children}
        </SiteChrome>
      </div>
    </NextIntlClientProvider>
  );
}
