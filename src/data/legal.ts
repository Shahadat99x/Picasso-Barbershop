import type { Locale } from "@/i18n/locales";
import type { ArticleBodyBlock } from "@/lib/public-data";

export type LegalDocumentKey = "privacyPolicy" | "terms" | "cookiePolicy";

export interface LegalDocumentContent {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  applicabilityLabel: string;
  applicabilityValue: string;
  blocks: ArticleBodyBlock[];
}

const legalDocuments: Record<Locale, Record<LegalDocumentKey, LegalDocumentContent>> = {
  lt: {
    privacyPolicy: {
      eyebrow: "Privatumas",
      title: "Privatumo politika",
      description:
        "Kaip Picasso Barbershop tvarko kontaktines uzklausas, rezervacijos informacija ir ribotus svetaines naudojimo duomenis.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Taikoma",
      applicabilityValue: "Viešajai svetainei, uzklausoms ir bendravimui",
      blocks: [
        {
          id: "privacy-lt-1",
          type: "paragraph",
          text: "Si politika paaiskina, kokius duomenis galime gauti per Picasso Barbershop svetaine, kaip juos naudojame ir kada su jais dirba musu paslaugu teikejai. Stengiames rinkti tik tai, kas reikalinga aiskiai komunikacijai, uzklausos administravimui ir svetainei saugiai palaikyti.",
        },
        {
          id: "privacy-lt-2",
          type: "heading",
          level: 2,
          text: "Kokius duomenis galime rinkti",
        },
        {
          id: "privacy-lt-3",
          type: "list",
          style: "bullet",
          items: [
            "kontaktinius duomenis, kuriuos pateikiate patys: varda, telefono numeri, el. pasta ir zinutes turini",
            "informacija apie jusu pageidaujama paslauga, filiala ar laika, jei tai nurodote uzklausoje",
            "techninius duomenis, kurie reikalingi svetainei veikti ir apsaugoti, pavyzdziui, IP adresa, narsykles tipa ar apsilankymo laika",
            "ribotus naudojimo duomenis apie puslapiu perziuras ir srauto saltinius, jei svetaineje aktyvuota analitika",
          ],
        },
        {
          id: "privacy-lt-4",
          type: "heading",
          level: 2,
          text: "Kaip naudojame informacija",
        },
        {
          id: "privacy-lt-5",
          type: "list",
          style: "bullet",
          items: [
            "atsakyti i jusu uzklausa arba patikslinti del vizito",
            "suderinti ar patvirtinti apsilankymo detales, kai rezervacija vyksta per susisiekimo kanala",
            "palaikyti, apsaugoti ir tobulinti svetaines veikima",
            "suprasti, kurie puslapiai ar turinys yra naudingi, kai tam naudojama ribota analitika",
          ],
        },
        {
          id: "privacy-lt-6",
          type: "heading",
          level: 2,
          text: "Teisiniai pagrindai",
        },
        {
          id: "privacy-lt-7",
          type: "paragraph",
          text: "Paprastai remiames jusu prasymu imtis veiksmu pries suteikiant paslauga, musu teisetu interesu atsakyti i uzklausas ir uztikrinti svetaines sauguma, o tam tikrais atvejais ir jusu sutikimu, kai jis reikalingas.",
        },
        {
          id: "privacy-lt-8",
          type: "heading",
          level: 2,
          text: "Kiek laiko saugome duomenis",
        },
        {
          id: "privacy-lt-9",
          type: "paragraph",
          text: "Kontaktines uzklausas ir susijusia komunikacija saugome tiek, kiek to reikia atsakymui, paslaugu administravimui ir pagristiems verslo irasu poreikiams. Jei duomenis privalome saugoti ilgiau del apskaitos, teisiniu ar saugumo priezasciu, ta darome tik tiek, kiek butina.",
        },
        {
          id: "privacy-lt-10",
          type: "heading",
          level: 2,
          text: "Kam galime perduoti duomenis",
        },
        {
          id: "privacy-lt-11",
          type: "paragraph",
          text: "Duomenis galime perduoti tik tiems paslaugu teikejams, kurie padeda uztikrinti svetaines talpinima, komunikacija, rezervacijos uzklausas ar ribota analitika. Tokie teikejai duomenis tvarko tik tiek, kiek reikia ju funkcijai atlikti. Neparduodame jusu duomenu reklamos tarpininkams.",
        },
        {
          id: "privacy-lt-12",
          type: "heading",
          level: 2,
          text: "Jusu teises",
        },
        {
          id: "privacy-lt-13",
          type: "list",
          style: "bullet",
          items: [
            "prasyti susipazinti su turimais jusu duomenimis",
            "prasyti juos istaisyti arba papildyti",
            "prasyti istrinti duomenis, kai nebera pagrindo ju saugoti",
            "apriboti tvarkyma arba nesutikti su tam tikru tvarkymu, kai tai taikoma",
            "pateikti skunda prieziuros institucijai, jei manote, kad su duomenimis elgiamasi netinkamai",
          ],
        },
        {
          id: "privacy-lt-14",
          type: "heading",
          level: 2,
          text: "Slapukai ir matavimas",
        },
        {
          id: "privacy-lt-15",
          type: "paragraph",
          text: "Svetaine gali naudoti butinus techninius slapukus ir ribotus analitikos irankius tam, kad suprastume puslapiu naudojima ir islaikytume patikima veikima. Placiau tai paaiskinta [Slapuku politikoje](/slapuku-politika).",
        },
        {
          id: "privacy-lt-16",
          type: "heading",
          level: 2,
          text: "Kaip su mumis susisiekti",
        },
        {
          id: "privacy-lt-17",
          type: "paragraph",
          text: "Del privatumo klausimu galite rasyti adresu **hello@picassobarbershop.lt** arba naudoti [kontaktu puslapi](/kontaktai). Atsakysime per protinga termina ir, jei reikes, paprasysime papildomos informacijos jusu tapatybei patvirtinti.",
        },
      ],
    },
    terms: {
      eyebrow: "Salygos",
      title: "Paslaugu teikimo sąlygos",
      description:
        "Svarbiausia informacija apie tai, kaip naudotis Picasso Barbershop svetaine, kaip suprasti pateikiama informacija ir kada vizitas laikomas patvirtintu.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Apima",
      applicabilityValue: "Viešaja informacija, uzklausas ir bendravima",
      blocks: [
        {
          id: "terms-lt-1",
          type: "paragraph",
          text: "Naudodamiesi Picasso Barbershop svetaine sutinkate su siomis salygomis tiek, kiek jos taikomos jusu narshymui, uzklausoms ir bendravimui su musu komanda. Jei su salygomis nesutinkate, rekomenduojame svetaine nesinaudoti.",
        },
        {
          id: "terms-lt-2",
          type: "heading",
          level: 2,
          text: "Svetainės paskirtis",
        },
        {
          id: "terms-lt-3",
          type: "paragraph",
          text: "Svetainė skirta supazindinti su filialais, paslaugomis, kainu orientyrais, galerija, straipsniais ir susisiekimo budais. Ji padeda pradeti kelia i vizita, bet pati savaime negarantuoja rezervacijos ar paslaugos suteikimo.",
        },
        {
          id: "terms-lt-4",
          type: "heading",
          level: 2,
          text: "Paslaugų, kainų ir prieinamumo informacija",
        },
        {
          id: "terms-lt-5",
          type: "paragraph",
          text: "Stengiames, kad informacija apie paslaugas, kainas, trukme ir filialu prieinamuma butu tiksli, taciau ji gali keistis. Galutines detales gali priklausyti nuo pasirinkto specialisto, filialo, konsultacijos ar faktines dienos apkrovos.",
        },
        {
          id: "terms-lt-6",
          type: "heading",
          level: 2,
          text: "Uzklausos ir rezervacijos",
        },
        {
          id: "terms-lt-7",
          type: "list",
          style: "bullet",
          items: [
            "uzklausa per svetaine, telefonu ar el. pastu dar nereiskia, kad vizitas jau patvirtintas",
            "vizitas laikomas suderintu tik tada, kai ji patvirtina Picasso Barbershop komanda",
            "kai kuriems vizitams gali reiketi papildomo patikslinimo del laiko, meistro ar paslaugos apimties",
          ],
        },
        {
          id: "terms-lt-8",
          type: "heading",
          level: 2,
          text: "Priimtinas naudojimas",
        },
        {
          id: "terms-lt-9",
          type: "paragraph",
          text: "Sutinkate nenaudoti svetaines neteisetiems tikslams, nebandyti trikdyti jos veikimo, nekelti kenksmingo turinio ir nenaudoti kontaktiniu formu brukalui ar apgaulingiems pranesimams.",
        },
        {
          id: "terms-lt-10",
          type: "heading",
          level: 2,
          text: "Intelektinė nuosavybė",
        },
        {
          id: "terms-lt-11",
          type: "paragraph",
          text: "Svetainės tekstai, vizualai, prekių zenklai, dizaino elementai ir kita medziaga priklauso Picasso Barbershop arba naudojama teisetu pagrindu. Be isankstinio leidimo sios medziagos negalima kopijuoti, platinti ar naudoti komerciniais tikslais.",
        },
        {
          id: "terms-lt-12",
          type: "heading",
          level: 2,
          text: "Atsakomybės ribojimas",
        },
        {
          id: "terms-lt-13",
          type: "paragraph",
          text: "Svetainė pateikiama tokia, kokia yra siuo metu. Imames protingu priemoniu, kad ji veiktu patikimai, taciau negalime garantuoti, kad joje niekada nebus laikinu netikslumu, pertrukiu ar treciuju saliu paslaugu sutrikimu.",
        },
        {
          id: "terms-lt-14",
          type: "heading",
          level: 2,
          text: "Sąlygų atnaujinimai",
        },
        {
          id: "terms-lt-15",
          type: "paragraph",
          text: "Kartais sias salygas galime atnaujinti, kad jos atspindetu svetaines, paslaugu ar teisiniu reikalavimu pokycius. Naujausia versija visada skelbiama siame puslapyje.",
        },
        {
          id: "terms-lt-16",
          type: "heading",
          level: 2,
          text: "Kontaktai",
        },
        {
          id: "terms-lt-17",
          type: "paragraph",
          text: "Jei turite klausimu del siu salygu arba del planuojamo vizito, susisiekite el. pastu **hello@picassobarbershop.lt** arba apsilankykite [kontaktu puslapyje](/kontaktai).",
        },
      ],
    },
    cookiePolicy: {
      eyebrow: "Slapukai",
      title: "Slapukų politika",
      description:
        "Trumpas paaiskinimas, kokie slapukai gali buti naudojami Picasso Barbershop svetaineje ir kaip galite juos valdyti savo narsykleje.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Susije su",
      applicabilityValue: "Svetaines veikimu ir ribota analitika",
      blocks: [
        {
          id: "cookies-lt-1",
          type: "paragraph",
          text: "Slapukai yra mazi tekstiniai failai, kuriuos narsykle issaugo jusu irenginyje. Jie padeda uztikrinti pagrindini svetaines veikima, issaugoti techninius pasirinkimus ir suprasti, kaip naudojami svarbiausi puslapiai.",
        },
        {
          id: "cookies-lt-2",
          type: "heading",
          level: 2,
          text: "Kokias slapukų kategorijas galime naudoti",
        },
        {
          id: "cookies-lt-3",
          type: "list",
          style: "bullet",
          items: [
            "butinus slapukus, reikalingus svetaines veikimui, saugumui ir pagrindinems funkcijoms",
            "analitinius slapukus arba panasius matavimo irankius, jei jie aktyvuoti svetaineje tam, kad suprastume puslapiu naudojima",
            "nuostatų arba sesijos lygiu techninius sprendimus, jei jie reikalingi kalbai, formoms ar kitoms patirtims islaikyti",
          ],
        },
        {
          id: "cookies-lt-4",
          type: "heading",
          level: 2,
          text: "Ko nedarome",
        },
        {
          id: "cookies-lt-5",
          type: "paragraph",
          text: "Sioje politikoje nenaudojame klaidinanciu pazadu apie rinkodaros sekima ar reklamos platformas, jei jos realiai nera ijungtos. Jei ateityje svetaineje atsirastu nauju neesminiu irankiu, si politika bus atnaujinta.",
        },
        {
          id: "cookies-lt-6",
          type: "heading",
          level: 2,
          text: "Kaip galite valdyti slapukus",
        },
        {
          id: "cookies-lt-7",
          type: "list",
          style: "ordered",
          items: [
            "perziurekite savo narsykles nustatymus ir apribokite arba istrinkite slapukus",
            "isvalykite narsykles saugykla, jei norite atnaujinti issaugotus duomenis",
            "jei naudojate privatumo plėtinius ar naršykles apsaugas, ivertinkite, kad kai kurios svetaines funkcijos gali veikti kitaip",
          ],
        },
        {
          id: "cookies-lt-8",
          type: "heading",
          level: 2,
          text: "Trečiųjų šalių įrankiai",
        },
        {
          id: "cookies-lt-9",
          type: "paragraph",
          text: "Jei svetaineje aktyvuota ribota analitika, slapukai gali buti nustatomi per treciuju saliu paslauga, pavyzdziui, analitikos teikeja. Tokiu atveju papildomai taikomos ir to teikejo taisykles.",
        },
        {
          id: "cookies-lt-10",
          type: "heading",
          level: 2,
          text: "Daugiau informacijos",
        },
        {
          id: "cookies-lt-11",
          type: "paragraph",
          text: "Jei turite klausimu apie slapukus ar privatuma, rasykite **hello@picassobarbershop.lt** arba perskaitykite [Privatumo politika](/privatumo-politika).",
        },
      ],
    },
  },
  en: {
    privacyPolicy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      description:
        "How Picasso Barbershop handles contact enquiries, appointment-related information, and limited website usage data.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Applies to",
      applicabilityValue: "Public website, enquiries, and communication",
      blocks: [
        {
          id: "privacy-en-1",
          type: "paragraph",
          text: "This policy explains what information Picasso Barbershop may receive through the website, how it is used, and when selected service providers may process it on our behalf. We aim to collect only what is reasonably needed for clear communication, enquiry handling, and a reliable website experience.",
        },
        {
          id: "privacy-en-2",
          type: "heading",
          level: 2,
          text: "What information we may collect",
        },
        {
          id: "privacy-en-3",
          type: "list",
          style: "bullet",
          items: [
            "contact information you provide directly, such as your name, phone number, email address, and message content",
            "details about your preferred service, branch, or visit timing when you include them in an enquiry",
            "technical information required for website operation and security, such as IP address, browser type, or visit time",
            "limited page-usage and traffic-source data when analytics is enabled on the site",
          ],
        },
        {
          id: "privacy-en-4",
          type: "heading",
          level: 2,
          text: "How we use the information",
        },
        {
          id: "privacy-en-5",
          type: "list",
          style: "bullet",
          items: [
            "to respond to your enquiry or follow up about a requested visit",
            "to coordinate or confirm appointment details when booking starts through a contact channel",
            "to maintain, protect, and improve the website",
            "to understand which pages are useful when limited analytics is active",
          ],
        },
        {
          id: "privacy-en-6",
          type: "heading",
          level: 2,
          text: "Legal basis",
        },
        {
          id: "privacy-en-7",
          type: "paragraph",
          text: "Depending on the situation, we rely on steps requested before providing a service, our legitimate interests in responding to enquiries and maintaining website security, and your consent where consent is required.",
        },
        {
          id: "privacy-en-8",
          type: "heading",
          level: 2,
          text: "How long we keep information",
        },
        {
          id: "privacy-en-9",
          type: "paragraph",
          text: "We keep contact enquiries and related communication for as long as reasonably necessary to respond, manage follow-up, and maintain appropriate business records. If we must retain information longer for accounting, legal, or security reasons, we do so only as needed.",
        },
        {
          id: "privacy-en-10",
          type: "heading",
          level: 2,
          text: "Who may process information",
        },
        {
          id: "privacy-en-11",
          type: "paragraph",
          text: "Information may be processed by selected providers that support website hosting, communication, enquiry handling, or limited analytics. Those providers only process data to the extent needed for their function. We do not sell personal data to advertising brokers.",
        },
        {
          id: "privacy-en-12",
          type: "heading",
          level: 2,
          text: "Your rights",
        },
        {
          id: "privacy-en-13",
          type: "list",
          style: "bullet",
          items: [
            "request access to the personal data we hold about you",
            "request correction or completion of inaccurate data",
            "request erasure where there is no longer a valid reason to retain the data",
            "restrict or object to certain processing where applicable",
            "lodge a complaint with a supervisory authority if you believe your data is handled improperly",
          ],
        },
        {
          id: "privacy-en-14",
          type: "heading",
          level: 2,
          text: "Cookies and measurement",
        },
        {
          id: "privacy-en-15",
          type: "paragraph",
          text: "The website may use essential technical cookies and limited analytics tools to understand page usage and maintain reliable performance. You can read more in the [Cookie Policy](/en/cookie-policy).",
        },
        {
          id: "privacy-en-16",
          type: "heading",
          level: 2,
          text: "How to contact us",
        },
        {
          id: "privacy-en-17",
          type: "paragraph",
          text: "For privacy-related questions, email **hello@picassobarbershop.lt** or use the [contact page](/en/contact). We will respond within a reasonable timeframe and may ask for additional information to verify identity when needed.",
        },
      ],
    },
    terms: {
      eyebrow: "Terms",
      title: "Terms of Service",
      description:
        "The main conditions for using the Picasso Barbershop website, understanding the information shown here, and knowing when an appointment is actually confirmed.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Covers",
      applicabilityValue: "Public information, enquiries, and communication",
      blocks: [
        {
          id: "terms-en-1",
          type: "paragraph",
          text: "By using the Picasso Barbershop website, you agree to these terms to the extent they apply to your browsing, enquiries, and communication with our team. If you do not agree, please do not use the site.",
        },
        {
          id: "terms-en-2",
          type: "heading",
          level: 2,
          text: "Purpose of the website",
        },
        {
          id: "terms-en-3",
          type: "paragraph",
          text: "The website is designed to present branches, services, indicative pricing, gallery content, articles, and contact options. It is part of the path to a visit, but it does not by itself guarantee a booking or the delivery of a service.",
        },
        {
          id: "terms-en-4",
          type: "heading",
          level: 2,
          text: "Service, pricing, and availability information",
        },
        {
          id: "terms-en-5",
          type: "paragraph",
          text: "We aim to keep service descriptions, price guidance, durations, and branch availability accurate, but they may change. Final details can depend on the selected specialist, branch, consultation outcome, or real-time schedule constraints.",
        },
        {
          id: "terms-en-6",
          type: "heading",
          level: 2,
          text: "Enquiries and appointments",
        },
        {
          id: "terms-en-7",
          type: "list",
          style: "bullet",
          items: [
            "an enquiry sent through the website, by phone, or by email does not by itself confirm an appointment",
            "a visit is considered arranged only once it is confirmed by the Picasso Barbershop team",
            "some visits may require an extra clarification step about timing, specialist, or service scope",
          ],
        },
        {
          id: "terms-en-8",
          type: "heading",
          level: 2,
          text: "Acceptable use",
        },
        {
          id: "terms-en-9",
          type: "paragraph",
          text: "You agree not to use the website for unlawful purposes, not to interfere with its operation, not to submit harmful content, and not to misuse contact forms for spam or deceptive messages.",
        },
        {
          id: "terms-en-10",
          type: "heading",
          level: 2,
          text: "Intellectual property",
        },
        {
          id: "terms-en-11",
          type: "paragraph",
          text: "Website copy, imagery, trademarks, design elements, and other materials belong to Picasso Barbershop or are used on a lawful basis. They may not be copied, distributed, or reused for commercial purposes without prior permission.",
        },
        {
          id: "terms-en-12",
          type: "heading",
          level: 2,
          text: "Limitation of liability",
        },
        {
          id: "terms-en-13",
          type: "paragraph",
          text: "The website is provided as it currently stands. We take reasonable steps to keep it accurate and available, but we cannot guarantee that it will always be free from temporary inaccuracies, interruptions, or third-party service issues.",
        },
        {
          id: "terms-en-14",
          type: "heading",
          level: 2,
          text: "Updates to these terms",
        },
        {
          id: "terms-en-15",
          type: "paragraph",
          text: "We may update these terms from time to time to reflect changes in the website, the services, or applicable requirements. The latest version will always appear on this page.",
        },
        {
          id: "terms-en-16",
          type: "heading",
          level: 2,
          text: "Contact",
        },
        {
          id: "terms-en-17",
          type: "paragraph",
          text: "If you have questions about these terms or about arranging a visit, email **hello@picassobarbershop.lt** or visit the [contact page](/en/contact).",
        },
      ],
    },
    cookiePolicy: {
      eyebrow: "Cookies",
      title: "Cookie Policy",
      description:
        "A concise explanation of which cookies may be used on the Picasso Barbershop website and how you can control them in your browser.",
      lastUpdated: "2026-04-13",
      applicabilityLabel: "Related to",
      applicabilityValue: "Website operation and limited analytics",
      blocks: [
        {
          id: "cookies-en-1",
          type: "paragraph",
          text: "Cookies are small text files stored by your browser on your device. They help the website deliver core functionality, remember technical preferences, and understand how key pages are being used.",
        },
        {
          id: "cookies-en-2",
          type: "heading",
          level: 2,
          text: "Cookie categories we may use",
        },
        {
          id: "cookies-en-3",
          type: "list",
          style: "bullet",
          items: [
            "essential cookies required for website operation, security, and basic functionality",
            "analytics cookies or similar measurement tools when they are enabled to understand page usage",
            "session or preference-level technical storage when needed for language, forms, or related experience continuity",
          ],
        },
        {
          id: "cookies-en-4",
          type: "heading",
          level: 2,
          text: "What this policy does not claim",
        },
        {
          id: "cookies-en-5",
          type: "paragraph",
          text: "This policy does not pretend that marketing trackers or advertising platforms are in use when they are not. If new non-essential tools are added later, this page should be updated accordingly.",
        },
        {
          id: "cookies-en-6",
          type: "heading",
          level: 2,
          text: "How you can manage cookies",
        },
        {
          id: "cookies-en-7",
          type: "list",
          style: "ordered",
          items: [
            "review your browser settings and block or delete cookies if you prefer",
            "clear browser storage when you want to reset saved website data",
            "keep in mind that privacy extensions or strict browser settings can affect how some site functions behave",
          ],
        },
        {
          id: "cookies-en-8",
          type: "heading",
          level: 2,
          text: "Third-party tools",
        },
        {
          id: "cookies-en-9",
          type: "paragraph",
          text: "If limited analytics is active, cookies may be set through a third-party service such as an analytics provider. In those cases, that provider's own policies also apply.",
        },
        {
          id: "cookies-en-10",
          type: "heading",
          level: 2,
          text: "More information",
        },
        {
          id: "cookies-en-11",
          type: "paragraph",
          text: "If you have questions about cookies or privacy, email **hello@picassobarbershop.lt** or read the [Privacy Policy](/en/privacy-policy).",
        },
      ],
    },
  },
};

export function getLegalDocument(locale: Locale, key: LegalDocumentKey) {
  return legalDocuments[locale][key];
}

export function getLegalDocumentLinks(locale: Locale) {
  return (Object.entries(legalDocuments[locale]) as [LegalDocumentKey, LegalDocumentContent][])
    .map(([key, value]) => ({
      key,
      label: value.title,
    }));
}
