import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicDetailHero } from "@/components/public/page/public-detail-hero";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { defaultLocale, type Locale } from "@/i18n/locales";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import {
  getActiveBranches,
  getActiveSpecialists,
  getLocalizedContent,
  getPrimaryOpeningHours,
  getSpecialistBySlug,
  getSpecialistExperienceLabel,
  getSpecialistSpecialties,
  getSpecialistSummary,
  transformSpecialistForCard,
} from "@/lib/public-data";
import { createBreadcrumbSchema, createPersonProfileSchema } from "@/lib/schema";
import { getBookingPath, getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

const specialistPageCopy = {
  lt: {
    metadataMissingTitle: "Specialistas nerastas",
    metadataMissingDescription: "Nepavyko rasti pasirinkto specialisto profilio.",
    fallbackRole: "Komandos narys",
    fallbackSummary:
      "Profilis netrukus bus papildytas. Kol kas kvieciame perziureti paslaugas, filialus ir rezervacijos galimybes.",
    backLabel: "< Atgal i komandos perziura",
    heroEyebrow: "Specialisto profilis",
    heroRoleLabel: "Pareigos",
    heroExperienceLabel: "Patirtis",
    heroBranchLabel: "Filialas",
    aboutSubtitle: "Profilis",
    aboutTitle: "Apie specialista",
    aboutDescription:
      "Trumpa perziura, kuri padeda suprasti specialisto vaidmeni, darbo krypti ir kaip patogiai pereiti prie kito zingsnio.",
    branchConnectedLine:
      "Profilis jau pateikiamas su filialo kontekstu, todel nuo perziuros galima sklandziai pereiti prie rezervacijos ar lokacijos pasirinkimo.",
    branchPendingLine:
      "Filialo priskyrimas siuo metu nerodomas, todel toliau galima ramiai lyginti paslaugas, filialus ir tik tada rinktis rezervacijos kelia.",
    specialtiesSubtitle: "Pagrindines sritys",
    specialtiesTitle: "Specializacijos",
    specialtiesDescription:
      "Trumpai pateiktos sritys, kurios padeda greitai suprasti specialisto darba ir tinkamiausia vizito krypti.",
    ctaEyebrow: "Tolimesnis zingsnis",
    ctaTitle: "Pereikite nuo profilio prie rezervacijos.",
    ctaDescription:
      "Jei jau zinote, ko ieskote, rezervuokite vizita arba palyginkite paslaugas ir filialus pries priimdami sprendima.",
    ctaBranchAssigned: "Priskirtas filialas: {branch}.",
    ctaBranchPending:
      "Filialas dar nenurodytas, tad patogiausia pradeti nuo paslaugu arba filialu perziuros.",
    bookLabel: "Rezervuoti vizita",
    servicesLabel: "Ziureti paslaugas",
    branchesLabel: "Ziureti filialus",
    branchSectionSubtitle: "Filialas",
    branchSectionTitle: "Kur pradeti si specialisto kelia",
    branchSectionDescription:
      "Jei specialistas jau susietas su konkrecia lokacija, zemiau pateikiamas tiesioginis kelias i filialo informacija ir rezervacija.",
    branchEyebrow: "Filialas",
    branchCardLabel: "Ziureti filiala",
    branchBookingLabel: "Rezervuoti cia",
    mapAriaLabelPrefix: "Atidaryti zemelapi",
    relatedSubtitle: "Komanda",
    relatedTitle: "Komandoje taip pat",
    relatedDescription:
      "Perziurekite ir kitus komandos narius, kad lengviau susidarytumete bendra specialistu lygio ir stiliaus ispudi.",
    cardCtaLabel: "Ziureti profili",
  },
  en: {
    metadataMissingTitle: "Specialist not found",
    metadataMissingDescription: "The requested specialist profile could not be found.",
    fallbackRole: "Team member",
    fallbackSummary:
      "This profile will be expanded further. For now, you can continue through services, branches, and the booking path.",
    backLabel: "< Back to team overview",
    heroEyebrow: "Specialist profile",
    heroRoleLabel: "Role",
    heroExperienceLabel: "Experience",
    heroBranchLabel: "Branch",
    aboutSubtitle: "Profile",
    aboutTitle: "About the specialist",
    aboutDescription:
      "A concise overview that helps frame the specialist's role, focus, and the next practical step toward booking.",
    branchConnectedLine:
      "This profile is already presented with branch context, making it easier to move from review into booking or location selection.",
    branchPendingLine:
      "No branch assignment is currently shown, so the next step can stay simple: compare services, review branches, then choose the booking path that fits.",
    specialtiesSubtitle: "Focus areas",
    specialtiesTitle: "Specialties",
    specialtiesDescription:
      "A clean summary of the areas that help clients quickly understand the specialist's work and the most suitable appointment direction.",
    ctaEyebrow: "Next step",
    ctaTitle: "Move from profile review into booking.",
    ctaDescription:
      "If you already know what you need, book the visit directly or compare services and branches before deciding.",
    ctaBranchAssigned: "Assigned branch: {branch}.",
    ctaBranchPending:
      "No branch has been assigned publicly yet, so the easiest next step is to review services or branches first.",
    bookLabel: "Book appointment",
    servicesLabel: "View services",
    branchesLabel: "View branches",
    branchSectionSubtitle: "Branch",
    branchSectionTitle: "Where to start this specialist journey",
    branchSectionDescription:
      "If the specialist is already connected to a specific location, the branch details and booking path are shown below.",
    branchEyebrow: "Branch",
    branchCardLabel: "View branch",
    branchBookingLabel: "Book here",
    mapAriaLabelPrefix: "Open map for",
    relatedSubtitle: "Team",
    relatedTitle: "Also on the team",
    relatedDescription:
      "Browse the rest of the team to get a clearer feel for the specialist bench, tone, and overall service level.",
    cardCtaLabel: "View profile",
  },
} as const;

function getCopy(locale: Locale) {
  return specialistPageCopy[locale];
}

function getSpecialistDetailPath(slug: string, locale: Locale) {
  return getLocalizedDetailRoute("specialists", slug, locale);
}

function getSpecialistPageTitle(name: string, role: string, locale: Locale) {
  const fallbackRole = getCopy(locale).fallbackRole;
  return `${name} | ${role || fallbackRole}`;
}

export async function getSpecialistProfileStaticParams() {
  const specialists = await getActiveSpecialists();

  return specialists.map((specialist) => ({
    slug: specialist.slug,
  }));
}

export async function generateSpecialistProfileMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const copy = getCopy(locale);
  const specialist = await getSpecialistBySlug(slug);

  if (!specialist) {
    return createLocalizedPageMetadata({
      title: copy.metadataMissingTitle,
      description: copy.metadataMissingDescription,
      path: getLocalizedRoute("about", locale),
      locale,
      noIndex: true,
    });
  }

  const role = getLocalizedContent(specialist, "role", locale) || copy.fallbackRole;
  const summary = getSpecialistSummary(specialist, locale) || copy.fallbackSummary;

  return createLocalizedPageMetadata({
    title: getSpecialistPageTitle(specialist.full_name, role, locale),
    description: summary,
    path: getSpecialistDetailPath(specialist.slug, locale),
    alternatePath: getSpecialistDetailPath(
      specialist.slug,
      locale === defaultLocale ? "en" : defaultLocale,
    ),
    locale,
    image: specialist.photo_url || undefined,
  });
}

interface SpecialistProfilePageProps {
  locale?: Locale;
  slug: string;
}

export async function SpecialistProfilePage({
  locale = defaultLocale,
  slug,
}: SpecialistProfilePageProps) {
  const copy = getCopy(locale);
  const [specialist, branches, allSpecialists] = await Promise.all([
    getSpecialistBySlug(slug),
    getActiveBranches(),
    getActiveSpecialists(6),
  ]);

  if (!specialist) {
    notFound();
  }

  const branch = specialist.branch_id
    ? branches.find((item) => item.id === specialist.branch_id) ?? null
    : null;
  const branchMap = new Map(
    branches.map((item) => [item.id, getLocalizedContent(item, "name", locale)]),
  );
  const relatedSpecialists = allSpecialists
    .filter((item) => item.id !== specialist.id)
    .slice(0, 3)
    .map((item) =>
      transformSpecialistForCard(item, locale, branchMap.get(item.branch_id || "")),
    );
  const role = getLocalizedContent(specialist, "role", locale) || copy.fallbackRole;
  const summary = getSpecialistSummary(specialist, locale) || copy.fallbackSummary;
  const specialties = getSpecialistSpecialties(specialist, locale);
  const experienceLabel = getSpecialistExperienceLabel(specialist, locale);
  const branchLabel = branch ? getLocalizedContent(branch, "name", locale) : "";
  const detailPath = getSpecialistDetailPath(specialist.slug, locale);
  const structuredData = [
    createBreadcrumbSchema([
      {
        name: locale === "en" ? "Home" : "Pradzia",
        path: getLocalizedRoute("home", locale),
      },
      {
        name: locale === "en" ? "About" : "Apie mus",
        path: getLocalizedRoute("about", locale),
      },
      {
        name: specialist.full_name,
        path: detailPath,
      },
    ], locale),
    createPersonProfileSchema({
      name: specialist.full_name,
      path: detailPath,
      description: summary,
      jobTitle: role,
      image: specialist.photo_url || undefined,
      locale,
      specialties,
    }),
  ];
  const heroMeta = [
    {
      label: copy.heroRoleLabel,
      value: role,
    },
    ...(experienceLabel
      ? [
          {
            label: copy.heroExperienceLabel,
            value: experienceLabel,
          },
        ]
      : []),
    ...(branchLabel
      ? [
          {
            label: copy.heroBranchLabel,
            value: branchLabel,
          },
        ]
      : []),
  ];

  return (
    <main>
      <StructuredData data={structuredData} />

      <PublicDetailHero
        backHref={getLocalizedRoute("about", locale)}
        backLabel={copy.backLabel}
        eyebrow={copy.heroEyebrow}
        title={specialist.full_name}
        description={summary}
        meta={heroMeta}
        actions={
          <>
            <Link href={getBookingPath(locale)}>
              <PrimaryButton className="h-12 w-full px-8 text-base sm:w-auto">
                {copy.bookLabel}
              </PrimaryButton>
            </Link>
            <Link href={getLocalizedRoute("services", locale)}>
              <SecondaryButton className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto">
                {copy.servicesLabel}
              </SecondaryButton>
            </Link>
            <Link href={getLocalizedRoute("branches", locale)}>
              <SecondaryButton className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto">
                {copy.branchesLabel}
              </SecondaryButton>
            </Link>
          </>
        }
        visual={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#1a1a1a]">
            {specialist.photo_url ? (
              <Image
                src={specialist.photo_url}
                alt={specialist.full_name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,rgba(210,175,136,0.3),rgba(24,18,13,0.92))] text-[6rem] font-medium tracking-tight text-[#f5efe7]/70">
                {specialist.full_name.trim().charAt(0).toUpperCase() || "P"}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/82 via-[#120f0d]/18 to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <div className="rounded-[1.4rem] border border-white/10 bg-black/15 px-4 py-4 backdrop-blur-sm">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#d1af89]">
                  {copy.heroRoleLabel}
                </div>
                <div className="mt-2 text-lg font-medium text-[#faf5ee]">{role}</div>
              </div>
            </div>
          </div>
        }
      />

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
                <SectionHeading
                  title={copy.aboutTitle}
                  subtitle={copy.aboutSubtitle}
                  description={copy.aboutDescription}
                  align="left"
                />
                <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                  <p>{summary}</p>
                  <p>{branchLabel ? copy.branchConnectedLine : copy.branchPendingLine}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-border/60 bg-background px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {role}
                  </span>
                  {experienceLabel ? (
                    <span className="rounded-full border border-border/60 bg-background px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {experienceLabel}
                    </span>
                  ) : null}
                  {branchLabel ? (
                    <span className="rounded-full border border-border/60 bg-background px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {branchLabel}
                    </span>
                  ) : null}
                </div>
              </div>

              {specialties.length > 0 ? (
                <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f7f1ea_0%,#fcf8f4_100%)] p-8 shadow-sm shadow-black/5 md:p-10">
                  <SectionHeading
                    title={copy.specialtiesTitle}
                    subtitle={copy.specialtiesSubtitle}
                    description={copy.specialtiesDescription}
                    align="left"
                    className="max-w-3xl"
                  />
                  <div className="flex flex-wrap gap-3">
                    {specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full border border-[#ddcfbf]/70 bg-background/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  {copy.ctaEyebrow}
                </span>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">{copy.ctaTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">{copy.ctaDescription}</p>
                <p className="mt-4 text-sm leading-7 text-[#d9cfc5]">
                  {branchLabel
                    ? copy.ctaBranchAssigned.replace("{branch}", branchLabel)
                    : copy.ctaBranchPending}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link href={getBookingPath(locale)}>
                    <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                      {copy.bookLabel}
                    </PrimaryButton>
                  </Link>
                  <Link href={getLocalizedRoute("services", locale)}>
                    <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                      {copy.servicesLabel}
                    </SecondaryButton>
                  </Link>
                  <Link href={getLocalizedRoute("branches", locale)}>
                    <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                      {copy.branchesLabel}
                    </SecondaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {branch ? (
        <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
          <Container>
            <SectionHeading
              title={copy.branchSectionTitle}
              subtitle={copy.branchSectionSubtitle}
              description={copy.branchSectionDescription}
              align="left"
              className="max-w-3xl"
            />
            <BranchSummaryCard
              name={getLocalizedContent(branch, "name", locale)}
              address={getLocalizedContent(branch, "address", locale) || branch.city}
              phone={branch.phone}
              hoursSummary={getPrimaryOpeningHours(branch, locale)}
              mapUrl={branch.map_url || undefined}
              branchHref={getLocalizedDetailRoute(
                "branches",
                locale === "en" ? branch.slug_en || branch.slug_lt : branch.slug_lt,
                locale,
              )}
              bookingHref={branch.booking_url || getBookingPath(locale)}
              eyebrow={copy.branchEyebrow}
              branchLabel={copy.branchCardLabel}
              bookingLabel={copy.branchBookingLabel}
              mapAriaLabel={`${copy.mapAriaLabelPrefix} ${getLocalizedContent(branch, "name", locale)}`}
            />
          </Container>
        </Section>
      ) : null}

      {relatedSpecialists.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title={copy.relatedTitle}
              subtitle={copy.relatedSubtitle}
              description={copy.relatedDescription}
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedSpecialists.map((item) => (
                <SpecialistCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  summary={item.summary}
                  specialties={item.specialties}
                  branchLabel={item.branchLabel}
                  experienceLabel={item.experienceLabel}
                  imageUrl={item.imageUrl}
                  eyebrowLabel={copy.relatedSubtitle}
                  href={item.href}
                  ctaLabel={copy.cardCtaLabel}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection locale={locale} />
    </main>
  );
}
