import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Privacy Policy",
  description:
    "How Picasso Barbershop handles contact enquiries, appointment-related information, and limited website usage data.",
  path: getLocalizedRoute("privacyPolicy", "en"),
  alternatePath: getLocalizedRoute("privacyPolicy", "lt"),
  locale: "en",
});

export default function EnPrivacyPolicyPage() {
  return <LegalDocumentPage locale="en" documentKey="privacyPolicy" />;
}
