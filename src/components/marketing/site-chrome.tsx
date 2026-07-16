"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

type SiteChromeProps = {
  children: React.ReactNode;
  footer: React.ComponentProps<typeof SiteFooter>;
  header: React.ComponentProps<typeof SiteHeader>;
};

export function SiteChrome({ children, footer, header }: SiteChromeProps) {
  const pathname = usePathname();
  const fullScreenDemo = pathname.endsWith("/partner-demo/live");

  if (fullScreenDemo) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader {...header} />
      {children}
      <SiteFooter {...footer} />
    </>
  );
}
