import Link from "next/link";

type FooterColumn = {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
};

type SiteFooterProps = {
  locale: string;
  copy: {
    description: string;
    services: string;
    company: string;
    resources: string;
    social: string;
    copyright: string;
    createdBy: string;
    sitemap: string;
  };
};

export function SiteFooter({ locale, copy }: SiteFooterProps) {
  const columns: FooterColumn[] = [
    {
      title: copy.services,
      links: [
        { label: "Distribution", href: `/${locale}/services/distribution` },
        { label: "Publishing", href: `/${locale}/services/publishing` },
        {
          label: "Catalogue",
          href: `/${locale}/services/catalogue-management`,
        },
        { label: "Health Check", href: `/${locale}/catalogue-health-check` },
      ],
    },
    {
      title: copy.company,
      links: [
        { label: "About", href: `/${locale}/about` },
        { label: "Contact", href: `/${locale}/contact` },
      ],
    },
    {
      title: copy.resources,
      links: [
        { label: "Resources", href: `/${locale}/resources` },
        { label: copy.sitemap, href: "/sitemap.xml" },
      ],
    },
    {
      title: copy.social,
      links: [
        { label: "Instagram", href: "#", external: true },
        { label: "YouTube", href: "#", external: true },
        { label: "LinkedIn", href: "#", external: true },
        { label: "X", href: "#", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.34em]">
              PTY Audio
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/48">
              {copy.description}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>
                <div className="mt-4 grid gap-3">
                  {column.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-sm text-white/45 transition-colors hover:text-[#E50914]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-white/45 transition-colors hover:text-[#E50914]"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.copyright}</p>
          <p>
            {copy.createdBy}{" "}
            <a
              href="https://josuethacevedo.online"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#E50914] hover:text-white"
            >
              JoeCodex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
