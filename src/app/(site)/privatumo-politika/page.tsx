import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Privatumo politika",
  description:
    "Kaip Picasso Barbershop tvarko kontaktines uzklausas, rezervacijos informacija ir ribotus svetaines naudojimo duomenis.",
  path: getLocalizedRoute("privacyPolicy", "lt"),
  alternatePath: getLocalizedRoute("privacyPolicy", "en"),
  locale: "lt",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage locale="lt" documentKey="privacyPolicy" />;
}
