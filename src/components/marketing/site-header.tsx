"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
};

type SiteHeaderProps = {
  locale: string;
  brand: string;
  logo: {
    src: string;
    alt: string;
  };
  navItems: NavItem[];
  cta: string;
};

const languageOptions = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "zh", label: "ZH (中文)" },
  { code: "hi", label: "HI (हिन्दी)" },
] as const;

type LocaleCode = (typeof languageOptions)[number]["code"];

export function SiteHeader({
  locale,
  brand,
  logo,
  navItems,
  cta,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const switchPath = (nextLocale: LocaleCode) => {
    const parts = pathname.split("/");

    if (languageOptions.some((option) => option.code === parts[1])) {
      parts[1] = nextLocale;
      return parts.join("/") || `/${nextLocale}`;
    }

    return `/${nextLocale}${pathname}`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/8 bg-[#050505]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href={`/${locale}`}
          aria-label={brand}
          onClick={() => {
            setMobileOpen(false);
            setOpenMobileSubmenu(null);
          }}
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={36}
            height={36}
            priority
            className="size-9"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white">
            {brand}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex"
        >
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);

            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex h-16 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                  {hasChildren ? (
                    <ChevronDown className="size-3.5 text-white/42 transition-transform group-hover:rotate-180" />
                  ) : null}
                </Link>

                {hasChildren ? (
                  <div className="invisible absolute left-1/2 top-14 w-80 -translate-x-1/2 rounded-3xl border border-white/10 bg-[#050505]/95 p-2 opacity-0 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-200 group-focus-within:visible group-focus-within:top-16 group-focus-within:opacity-100 group-hover:visible group-hover:top-16 group-hover:opacity-100">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-2xl px-4 py-3 transition-colors hover:bg-white/10"
                      >
                        <span className="block text-sm font-semibold text-white">
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="mt-1 block text-xs leading-5 text-white/48">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="menu"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm font-medium text-white/78 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-white"
            >
              <Globe2 className="size-4" />
              {locale.toUpperCase()}
              <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
            </button>
            <div
              role="menu"
              className="invisible absolute right-0 top-11 min-w-28 rounded-2xl border border-white/10 bg-[#050505]/95 p-1 opacity-0 shadow-2xl backdrop-blur-xl transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
            >
              {languageOptions.map((option) => (
                <Link
                  key={option.code}
                  role="menuitem"
                  href={switchPath(option.code)}
                  className="block rounded-lg px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href={`/${locale}/catalogue-health-check`}
            className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(229,9,20,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff1020] hover:shadow-[0_0_42px_rgba(229,9,20,0.42)]"
          >
            {cta}
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((open) => !open);
            setOpenMobileSubmenu(null);
          }}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-white/8 bg-[#050505]/98 px-5 pb-6 pt-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile primary" className="grid gap-1">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const expanded = openMobileSubmenu === item.href;

              return (
                <div
                  key={item.href}
                  className="rounded-2xl border border-white/8 bg-white/[0.025]"
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setOpenMobileSubmenu((current) =>
                          current === item.href ? null : item.href,
                        )
                      }
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 text-white/40 transition-transform ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenMobileSubmenu(null);
                      }}
                      className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasChildren && expanded ? (
                    <div className="grid gap-1 px-2 pb-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenMobileSubmenu(null);
                          }}
                          className="rounded-xl px-3 py-2 text-sm text-white/58 transition-colors hover:bg-white/8 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="mt-4 grid gap-3 border-t border-white/8 pt-4">
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((option) => (
                <Link
                  key={option.code}
                  href={switchPath(option.code)}
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenMobileSubmenu(null);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/72"
                >
                  {option.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}/catalogue-health-check`}
                onClick={() => {
                  setMobileOpen(false);
                  setOpenMobileSubmenu(null);
                }}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(229,9,20,0.24)]"
              >
                {cta}
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
