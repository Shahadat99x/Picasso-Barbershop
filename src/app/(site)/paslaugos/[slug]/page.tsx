import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicDetailHero } from "@/components/public/page/public-detail-hero";
import { BlogCard } from "@/components/shared/BlogCard";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { FeaturedArticleCard } from "@/components/shared/FeaturedArticleCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ServiceFaqSection } from "@/components/sections/ServiceFaqSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  formatDuration,
  formatPrice,
  getAvailableBranchesForService,
  getBlogPostsForService,
  getGalleryItemsForService,
  getLocalizedContent,
  getLocalizedSlug,
  getPrimaryOpeningHours,
  getServiceBenefits,
  getServiceBySlug,
  getServiceFaqs,
  transformBlogPostForCard,
  transformGalleryItemForMosaic,
} from "@/lib/public-data";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/schema";
import { getBookingPath, getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return createLocalizedPageMetadata({
      title: "Paslauga nerasta",
      description: "Nepavyko rasti pasirinktos paslaugos.",
      path: getLocalizedRoute("services", "lt"),
      locale: "lt",
      noIndex: true,
    });
  }

  const resolvedSlug = getLocalizedSlug(service, "lt");
  const alternateSlug = getLocalizedSlug(service, "en");

  return createLocalizedPageMetadata({
    title: getLocalizedContent(service, "title", "lt"),
    description: getLocalizedContent(service, "short_description", "lt"),
    path: getLocalizedDetailRoute("services", resolvedSlug, "lt"),
    alternatePath: getLocalizedDetailRoute("services", alternateSlug, "en"),
    locale: "lt",
    image: service.cover_image_url || undefined,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [availableBranches, galleryItems, relatedPosts] = await Promise.all([
    getAvailableBranchesForService(service.id),
    getGalleryItemsForService(service.id),
    getBlogPostsForService(service.id),
  ]);

  const benefits = getServiceBenefits(service, "lt");
  const faqs = getServiceFaqs(service, "lt");
  const galleryMosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "lt", index),
  );
  const blogCards = relatedPosts.map((post) => transformBlogPostForCard(post, "lt"));
  const featuredPost = blogCards[0];
  const remainingPosts = blogCards.slice(1);
  const resolvedSlug = getLocalizedSlug(service, "lt");
  const title = getLocalizedContent(service, "title", "lt");
  const shortDescription = getLocalizedContent(service, "short_description", "lt");
  const fullDescription = getLocalizedContent(service, "full_description", "lt");
  const structuredData = [
    createBreadcrumbSchema([
      { name: "Pradzia", path: "/" },
      { name: "Paslaugos", path: getLocalizedRoute("services", "lt") },
      {
        name: title,
        path: getLocalizedDetailRoute("services", resolvedSlug, "lt"),
      },
    ]),
    ...(faqs.length > 0 ? [createFaqSchema(faqs)] : []),
  ];

  return (
    <main>
      <StructuredData data={structuredData} />

      <PublicDetailHero
        backHref={getLocalizedRoute("services", "lt")}
        backLabel="< Atgal i visas paslaugas"
        eyebrow="Paslaugos detales"
        title={title}
        description={shortDescription}
        meta={[
          {
            label: "Kaina nuo",
            value: formatPrice(service.starting_price, service.currency_code, "lt"),
          },
          {
            label: "Trukme",
            value: formatDuration(service.duration_minutes, "lt"),
          },
          {
            label: "Filialai",
            value: availableBranches.length > 0 ? String(availableBranches.length) : "Pagal uzklausa",
          },
        ]}
        actions={
          <>
            <Link href={getLocalizedRoute("contact", "lt")}>
              <PrimaryButton className="h-12 w-full px-8 text-base sm:w-auto">
                Susisiekti
              </PrimaryButton>
            </Link>
            <Link href={getLocalizedRoute("branches", "lt")}>
              <SecondaryButton className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto">
                Perziureti filialus
              </SecondaryButton>
            </Link>
          </>
        }
        visual={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#1a1a1a]">
            {service.cover_image_url ? (
              <Image
                src={service.cover_image_url}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#201c19] px-6 text-center text-sm leading-7 text-[#c7b9ac]">
                Vaizdas bus rodomas, kai paslaugai priskirsite nuotrauka admin sistemoje.
              </div>
            )}
          </div>
        }
      />

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5 md:p-10">
                <SectionHeading
                  title="Apie paslauga"
                  subtitle="Redakcinis aprasas"
                  description="Trumpai ir aiskiai apie tai, kam si paslauga skirta, kaip ji atliekama ir kokio rezultato tiketis po vizito."
                  align="left"
                />
                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                  {fullDescription}
                </p>
              </div>

              {benefits.length > 0 ? (
                <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f7f1ea_0%,#fcf8f4_100%)] p-8 shadow-sm shadow-black/5 md:p-10">
                  <SectionHeading
                    title="Ko tiketis vizito metu"
                    subtitle="Vertes"
                    description="Pagrindiniai akcentai, kurie padeda suprasti paslaugos eiga, rezultato kokybe ir aptarnavimo lygi."
                    align="left"
                    className="max-w-3xl"
                  />
                  <ul className="grid gap-4 md:grid-cols-2">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/75 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm leading-7 text-muted-foreground">{benefit}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Kitas žingsnis
                </span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">
                  Pasirinkite patogiausią filialą.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  {availableBranches.length > 0
                    ? "Si paslauga teikiama toliau nurodytuose filialuose, tad galite tiesiog atvykti arba susisiekti tiesiogiai."
                    : "Siai paslaugai filialai dar nepriskirti. Susisiekite ir suderinsime jums patogiausia laika."}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link href={getLocalizedRoute("branches", "lt")}>
                    <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                      Žiūrėti filialus
                    </PrimaryButton>
                  </Link>
                  <Link href={getLocalizedRoute("contact", "lt")}>
                    <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                      Susisiekti
                    </SecondaryButton>
                  </Link>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#bba998]">
                    Trumpai
                  </div>
                  <div className="mt-4 space-y-4 text-sm text-[#d9cfc5]">
                    <div className="flex items-center justify-between gap-4">
                      <span>Kaina</span>
                      <span className="font-medium text-[#faf5ee]">
                        {formatPrice(service.starting_price, service.currency_code, "lt")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Trukme</span>
                      <span className="font-medium text-[#faf5ee]">
                        {formatDuration(service.duration_minutes, "lt")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Filialai</span>
                      <span className="font-medium text-[#faf5ee]">
                        {availableBranches.length > 0 ? availableBranches.length : "Pagal uzklausa"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {availableBranches.length > 0 ? (
        <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
          <Container>
            <SectionHeading
              title="Kur atvykti šiai paslaugai"
              subtitle="Filialai"
              description="Sia paslauga galite gauti siuose filialuose. Perziurekite informacija is anksto arba tiesiog susisiekite su mumis."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {availableBranches.map((branch) => (
                <BranchSummaryCard
                  key={branch.id}
                  name={getLocalizedContent(branch, "name", "lt")}
                  address={getLocalizedContent(branch, "address", "lt")}
                  phone={branch.phone}
                  hoursSummary={getPrimaryOpeningHours(branch, "lt")}
                  mapUrl={branch.map_url || undefined}
                  branchHref={getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "lt"), "lt")}
                  bookingHref={branch.booking_url || getBookingPath("lt")}
                  eyebrow="Filialas"
                  branchLabel="Ziureti filiala"
                  bookingLabel="Paskambinti filialui"
                  mapAriaLabel={`Atidaryti zemelapi ${getLocalizedContent(branch, "name", "lt")}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <GallerySection items={galleryMosaicItems} locale="lt" />

      {faqs.length > 0 ? (
        <ServiceFaqSection
          faqs={faqs}
          title="Dazniausi klausimai"
          subtitle="DUK"
        />
      ) : null}

      {blogCards.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Straipsniai, susije su sia paslauga"
              subtitle="Tinklarastis"
              description="Papildomas kontekstas apie prieziura, stiliu ir tai, kaip rezultatas islaikomas tarp vizitu."
              align="left"
              className="max-w-3xl"
            />

            {featuredPost ? (
              <div className="space-y-6">
                <FeaturedArticleCard
                  title={featuredPost.title}
                  excerpt={featuredPost.excerpt}
                  category={featuredPost.category}
                  date={featuredPost.date}
                  readingTime={featuredPost.readingTime}
                  imageUrl={featuredPost.imageUrl || "/images/hero/picasso-team-hero.jpg"}
                  imageAlt={featuredPost.imageAlt}
                  href={featuredPost.href}
                  featuredLabel="Teminis straipsnis"
                  readLabel="Skaityti"
                />

                {remainingPosts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {remainingPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        readingTime={post.readingTime}
                        category={post.category}
                        imageUrl={post.imageUrl}
                        href={post.href}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection locale="lt" />
    </main>
  );
}
