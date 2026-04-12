import { LegalDocumentPage } from "@/components/public/page/LegalDocumentPage";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute } from "@/lib/site-routes";

export const metadata = createLocalizedPageMetadata({
  title: "Slapuku politika",
  description:
    "Trumpas paaiskinimas, kokie slapukai gali buti naudojami Picasso Barbershop svetaineje ir kaip juos valdyti.",
  path: getLocalizedRoute("cookiePolicy", "lt"),
  alternatePath: getLocalizedRoute("cookiePolicy", "en"),
  locale: "lt",
});

export default function CookiePolicyPage() {
  return <LegalDocumentPage locale="lt" documentKey="cookiePolicy" />;
}
