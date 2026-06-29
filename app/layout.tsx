import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/school-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://skalvi.com"),
  title: {
    default: "Skalvi International School JP Nagar Bangalore",
    template: "%s | Skalvi International School"
  },
  description: siteConfig.description,
  openGraph: {
    title: "Skalvi International School",
    description: siteConfig.description,
    url: "https://skalvi.com",
    siteName: "Skalvi International School",
    locale: "en_IN",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
