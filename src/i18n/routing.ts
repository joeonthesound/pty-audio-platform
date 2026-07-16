import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "zh", "hi"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always",
});
