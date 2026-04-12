import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Cookie Policy",
  description:
    "A concise explanation of which cookies may be used on the Picasso Barbershop website and how you can control them.",
  path: getLocalizedRoute("cookiePolicy", "en"),
  alternatePath: getLocalizedRoute("cookiePolicy", "lt"),
  locale: "en",
});

export default function EnCookiePolicyPage() {
  return <LegalDocumentPage locale="en" documentKey="cookiePolicy" />;
}
