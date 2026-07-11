import "@/app/globals.css";

import { siteDescription, siteName } from "@/lib/site-config";

export const metadata = {
  title: `${siteName} | Portal Resmi`,
  description: siteDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
