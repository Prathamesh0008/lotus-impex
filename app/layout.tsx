import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { siteConfig } from "@/data/site";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4efe7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lotus Impex | Export House",
    template: "%s | Lotus Impex",
  },
  description: siteConfig.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Lotus Impex | Export House",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Lotus Impex",
    images: [
      {
        url: "/lotus-final-logo-wide.png",
        width: 1200,
        height: 630,
        alt: "Lotus Impex logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Impex | Export House",
    description: siteConfig.description,
    images: ["/lotus-final-logo-wide.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
