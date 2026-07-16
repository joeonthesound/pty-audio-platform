import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josuethacevedo.online";
const locales = ["en", "es", "zh", "hi"] as const;
const routes = [
  "",
  "/services",
  "/services/catalogue-management",
  "/services/publishing",
  "/services/distribution",
  "/resources",
  "/about",
  "/contact",
  "/catalogue-health-check",
] as const;

function localizedUrl(locale: (typeof locales)[number], route: string) {
  return `${baseUrl}/${locale}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: route === "" ? baseUrl : `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/catalogue-health-check" ? 0.9 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, localizedUrl(locale, route)]),
      ),
    },
  }));
}
