import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CatalogueHealthCheckForm } from "@/features/catalogue-health-check/catalogue-health-check-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "catalogueHealthCheck.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CatalogueHealthCheckPage({
  params,
}: Readonly<PageProps>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalogueHealthCheck");

  return (
    <CatalogueHealthCheckForm
      copy={{
        title: t("title"),
        subtitle: t("subtitle"),
        steps: t.raw("steps"),
        next: t("next"),
        back: t("back"),
        submit: t("submit"),
        success: t("success"),
        failure: t("failure"),
        fields: {
          fullName: t("fields.fullName"),
          email: t("fields.email"),
          phone: t("fields.phone"),
          userType: t("fields.userType"),
          songCount: t("fields.songCount"),
          recordingCount: t("fields.recordingCount"),
          releaseYears: t("fields.releaseYears"),
          platforms: t("fields.platforms"),
          rightsOrganizations: t("fields.rightsOrganizations"),
          problems: t("fields.problems"),
          notes: t("fields.notes"),
        },
        placeholders: {
          fullName: t("placeholders.fullName"),
          email: t("placeholders.email"),
          phone: t("placeholders.phone"),
          songCount: t("placeholders.songCount"),
          recordingCount: t("placeholders.recordingCount"),
          releaseYears: t("placeholders.releaseYears"),
          notes: t("placeholders.notes"),
        },
        options: {
          userTypes: t.raw("options.userTypes"),
          platforms: t.raw("options.platforms"),
          rightsOrganizations: t.raw("options.rightsOrganizations"),
          problems: t.raw("options.problems"),
        },
      }}
    />
  );
}
