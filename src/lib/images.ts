import images from "../../data/images.json";

type Locale = "en" | "es";

type LocalizedImage = {
  src: string;
  alt: Record<Locale, string>;
};

export function getImage(path: "hero" | "logo", locale: string): LocalizedImage {
  const image = images[path];
  const safeLocale: Locale = locale === "es" ? "es" : "en";

  return {
    src: image.src,
    alt: {
      en: image.alt.en,
      es: image.alt[safeLocale],
    },
  };
}
