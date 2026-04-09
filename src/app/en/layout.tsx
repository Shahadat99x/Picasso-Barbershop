import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PublicAnalytics } from "@/components/analytics/PublicAnalytics";
import { StickyMobileBookingCTA } from "@/components/shared/StickyMobileBookingCTA";
import {
  getSiteFooterCopy,
  getSiteSettingsWithDefaults,
  SiteSettingsWithDefaults,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export default async function EnSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings for header/footer
  const settings: SiteSettingsWithDefaults = await getSiteSettingsWithDefaults();
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader 
        locale="en" 
        businessName={settings.business_name}
        bookingUrl={getLocalizedRoute("branches", "en")}
        logoUrl={settings.logo_url}
      />
      <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>
      <SiteFooter 
        locale="en"
        businessName={settings.business_name}
        description="Premium grooming, haircut, beard, and salon experiences across three Vilnius branches."
        footerText={getSiteFooterCopy(settings, "en")}
        contactEmail={settings.default_email}
        contactPhone={settings.default_phone}
        socialInstagram={settings.social_instagram}
        socialFacebook={settings.social_facebook}
        socialTikTok={settings.social_tiktok}
      />
      <PublicAnalytics measurementId={settings.analytics_ga4_id} />
      <StickyMobileBookingCTA bookingUrl={getLocalizedRoute("branches", "en")} label="Visit branch" />
    </div>
  );
}
