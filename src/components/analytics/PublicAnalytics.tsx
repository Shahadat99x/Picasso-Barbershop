"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import { trackPageView } from "@/lib/analytics";

interface PublicAnalyticsProps {
  measurementId?: string | null;
}

export function PublicAnalytics({ measurementId }: PublicAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    trackPageView(pathname);
  }, [measurementId, pathname]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
