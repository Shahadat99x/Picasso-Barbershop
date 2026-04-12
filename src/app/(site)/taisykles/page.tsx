import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Paslaugu teikimo salygos",
  description:
    "Svarbiausia informacija apie Picasso Barbershop svetaines naudojima, uzklausas ir kada vizitas laikomas patvirtintu.",
  path: getLocalizedRoute("terms", "lt"),
  alternatePath: getLocalizedRoute("terms", "en"),
  locale: "lt",
});

export default function TermsPage() {
  return <LegalDocumentPage locale="lt" documentKey="terms" />;
}
