import Script from "next/script";

import { BodyClassName } from "@/components/BodyClassName";
import { PublicSiteShell } from "@/components/PublicSiteShell";
import { getCurrentAdmin } from "@/lib/auth";

export default async function SiteLayout({ children }) {
  const { admin } = await getCurrentAdmin();

  return (
    <>
      <BodyClassName className="site-body" />
      <PublicSiteShell isAdminAuthenticated={Boolean(admin)}>
        {children}
      </PublicSiteShell>
      <Script src="/js/site.js" strategy="afterInteractive" />
    </>
  );
}
