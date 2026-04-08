import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyMobileBookingCTA } from "@/components/shared/StickyMobileBookingCTA";
import {
  getSiteFooterCopy,
  getSiteSettingsWithDefaults,
  SiteSettingsWithDefaults,
} from "@/lib/public-data";
import { getLocalizedRoute } from "@/lib/site-routes";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings for header/footer
  const settings: SiteSettingsWithDefaults = await getSiteSettingsWithDefaults();
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader 
        locale="lt" 
        businessName={settings.business_name}
        bookingUrl={getLocalizedRoute("branches", "lt")}
        logoUrl={settings.logo_url}
      />
      <div className="flex-1">{children}</div>
      <SiteFooter 
        businessName={settings.business_name}
        description="Premium grooming, haircut, beard, and salon experiences across three Vilnius branches."
        footerText={getSiteFooterCopy(settings, "lt")}
        contactEmail={settings.default_email}
        contactPhone={settings.default_phone}
        socialInstagram={settings.social_instagram}
        socialFacebook={settings.social_facebook}
        socialTikTok={settings.social_tiktok}
      />
      <StickyMobileBookingCTA bookingUrl={getLocalizedRoute("branches", "lt")} label="Aplankyti filialą" />
    </div>
  );
}
