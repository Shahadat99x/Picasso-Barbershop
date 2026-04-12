import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/shared/PageHero";
import { ArticleBody } from "@/components/shared/ArticleBody";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { Locale } from "@/i18n/locales";
import { getLegalDocument, getLegalDocumentLinks, type LegalDocumentKey } from "@/data/legal";
import { getLocalizedRoute } from "@/lib/site-routes";

interface LegalDocumentPageProps {
  locale: Locale;
  documentKey: LegalDocumentKey;
}

export function LegalDocumentPage({ locale, documentKey }: LegalDocumentPageProps) {
  const document = getLegalDocument(locale, documentKey);
  const otherDocuments = getLegalDocumentLinks(locale).filter((item) => item.key !== documentKey);
  const labels = locale === "en"
    ? {
        updated: "Last updated",
        related: "Related legal pages",
        contactTitle: "Need clarification?",
        contactBody:
          "If you need a practical answer about privacy, booking communication, or website use, contact the Picasso Barbershop team directly.",
        contactCta: "Contact page",
      }
    : {
        updated: "Atnaujinta",
        related: "Susiję teisiniai puslapiai",
        contactTitle: "Reikia paaiškinimo?",
        contactBody:
          "Jei turite praktiniu klausimu apie privatuma, bendravima del vizito ar svetaines naudojima, susisiekite tiesiogiai su Picasso Barbershop komanda.",
        contactCta: "Kontaktų puslapis",
      };

  return (
    <main>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        actions={
          <SecondaryButton href={getLocalizedRoute("contact", locale)} className="h-12 px-8 text-base">
            {labels.contactCta}
          </SecondaryButton>
        }
      />

      <Section className="bg-background">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <article className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10 lg:p-12">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 border-b border-border/50 pb-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {labels.updated}
                  </span>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{document.lastUpdated}</span>
                    <span>{document.applicabilityLabel}: {document.applicabilityValue}</span>
                  </div>
                </div>
                <ArticleBody blocks={document.blocks} className="max-w-none" />
              </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[1.85rem] border border-border/60 bg-secondary/15 p-6 shadow-sm shadow-black/5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {labels.related}
                </h2>
                <div className="mt-5 space-y-3">
                  {otherDocuments.map((item) => (
                    <Link
                      key={item.key}
                      href={getLocalizedRoute(item.key, locale)}
                      className="block rounded-[1.2rem] border border-border/70 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.85rem] border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
                <h2 className="text-lg font-medium tracking-tight text-foreground">{labels.contactTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{labels.contactBody}</p>
                <Link
                  href={getLocalizedRoute("contact", locale)}
                  className="mt-5 inline-flex text-sm font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:text-foreground"
                >
                  {labels.contactCta}
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
