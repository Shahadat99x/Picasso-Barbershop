import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyMobileBookingCTA } from "@/components/shared/StickyMobileBookingCTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Picasso Barbershop",
  description: "Premium bilingual salon based in Vilnius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <StickyMobileBookingCTA />
        </div>
      </body>
    </html>
  );
}
