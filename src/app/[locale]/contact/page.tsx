import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/marketing/page-shell";
import { getImage } from "@/lib/images";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const image = getImage("hero", locale);

  return (
    <PageShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} image={{ src: image.src, alt: image.alt.en }}>
      <Card className="mt-14 max-w-2xl border-white/10 bg-white/[0.04] text-white">
        <CardContent className="grid gap-4 p-6">
          <Input className="border-white/10 bg-black/40 text-white" placeholder={t("placeholders.name")} aria-label={t("fields.name")} />
          <Input className="border-white/10 bg-black/40 text-white" placeholder={t("placeholders.email")} aria-label={t("fields.email")} />
          <Textarea className="min-h-32 border-white/10 bg-black/40 text-white" placeholder={t("placeholders.message")} aria-label={t("fields.message")} />
          <Button className="bg-[#E50914] text-white">
            {t("cta")}
            <Send className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
