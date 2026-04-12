import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Terms of Service",
  description:
    "The main conditions for using the Picasso Barbershop website and when an appointment is actually confirmed.",
  path: getLocalizedRoute("terms", "en"),
  alternatePath: getLocalizedRoute("terms", "lt"),
  locale: "en",
});

export default function EnTermsPage() {
  return <LegalDocumentPage locale="en" documentKey="terms" />;
}
