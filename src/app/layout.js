import "@/app/globals.css";

import { Raleway } from "next/font/google";

import { siteDescription, siteName } from "@/lib/site-config";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata = {
  title: `${siteName} | Portal Resmi`,
  description: siteDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={raleway.variable}>{children}</body>
    </html>
  );
}
