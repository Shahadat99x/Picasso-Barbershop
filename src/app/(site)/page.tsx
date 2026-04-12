import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomepageTeamSection } from "@/components/sections/HomepageTeamSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  buildHomepageTeamBranchPreviews,
  getActiveBranches,
  getActiveSpecialists,
  getActivePromotions,
  getFeaturedGalleryItems,
  getFeaturedServices,
  getHomepageGalleryPreviewItems,
  getPromotionCtaText,
  getPublishedBlogPosts,
  getVisibleTestimonials,
  getLocalizedContent,
  transformBlogPostForCard,
  transformBranchForCard,
  transformServiceForCard,
  transformTestimonialForCard,
} from "@/lib/public-data";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getBookingPath, getLocalizedRoute } from "@/lib/site-routes";
import { createLocalBusinessSchema } from "@/lib/schema";

export const metadata = createLocalizedPageMetadata({
  title: "Premium grozio salonas Vilniuje",
  description:
    "Atraskite premium paslaugas, tris Vilniaus filialus, tikrus klientu atsiliepimus ir uztikrinta Picasso Barbershop patirti.",
  path: "/",
  locale: "lt",
});

export default async function HomePage() {
  const [services, branches, specialists, galleryItems, testimonials, blogPosts, promotions] =
    await Promise.all([
      getFeaturedServices(3),
      getActiveBranches(),
      getActiveSpecialists(),
      getFeaturedGalleryItems(3),
      getVisibleTestimonials(2),
      getPublishedBlogPosts(3),
      getActivePromotions(1),
    ]);

  const featuredBranches = branches.slice(0, 3);
  const serviceCards = services.map((service) => transformServiceForCard(service, "lt"));
  const branchCards = featuredBranches.map((branch) => transformBranchForCard(branch, "lt"));
  const teamBranchPreviews = buildHomepageTeamBranchPreviews(
    branches,
    specialists,
    "lt",
    3,
  );
  const testimonialCards = testimonials.map((testimonial) =>
    transformTestimonialForCard(testimonial, "lt"),
  );
  const blogCards = blogPosts.map((post) => transformBlogPostForCard(post, "lt"));
  const galleryPreviewItems = getHomepageGalleryPreviewItems(galleryItems, "lt", 3);

  return (
    <main>
      <StructuredData data={createLocalBusinessSchema()} />
      <HeroSection locale="lt" />

      {serviceCards.length > 0 ? (
        <Section id="services" className="border-t border-border/60 bg-background">
          <Container>
            <SectionHeading
              title="Pagrindines paslaugos"
              subtitle="Populiariausi pasirinkimai kasdieniam stiliui"
              description="Trumpa atranka tiems, kurie nori greitai suprasti, nuo ko pradeti, ir issirinkti paslauga pagal rezultata, laika bei prieziuros ritma."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((service) => (
                <ServiceCard
                  key={service.href}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  href={service.href}
                  startingLabel="Nuo"
                  detailLabel="Placiau"
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-border/50 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Namu puslapyje paliekame tik aiskia pradine atranka, o visas paslaugu
                pasirinkimas su papildomais variantais pateikiamas atskirame puslapyje.
              </p>
              <SecondaryButton
                href={getLocalizedRoute("services", "lt")}
                analyticsEvent="service_explore_intent"
                analyticsParams={{
                  cta_label: "Ziureti visas paslaugas",
                  placement: "homepage_services_preview",
                }}
                className="w-full md:w-auto"
              >
                Ziureti visas paslaugas
              </SecondaryButton>
            </div>
          </Container>
        </Section>
      ) : null}

      {branchCards.length > 0 ? (
        <Section id="branches" className="bg-[linear-gradient(180deg,#f5f0ea_0%,#f8f5f0_100%)]">
          <Container>
            <SectionHeading
              title="Filialai Vilniuje"
              subtitle="Raskite jums patogiausia lokacija"
              description="Kiekviena lokacija islaiko ta pati premium aptarnavimo lygi, bet skirtingai prisitaiko prie miesto ritmo ir jusu dienotvarkes."
              align="center"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {branchCards.map((branch) => (
                <BranchCard
                  key={branch.href}
                  name={branch.name}
                  address={branch.address}
                  hours={branch.hours}
                  imageUrl={branch.imageUrl}
                  href={branch.href}
                  detailLabel="Ziureti filiala"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <WhyChooseUsSection locale="lt" />

      {teamBranchPreviews.length > 0 ? (
        <HomepageTeamSection
          branches={teamBranchPreviews}
          title="Musu komanda"
          subtitle="Komanda pagal filiala"
          description="Trumpa kiekvieno filialo komandos perziura, kad galetumete issirinkti jums patogiausia lokacija neperkraunant namu puslapio."
          eyebrowLabel="Komanda"
          selectedBranchLabel="Pasirinktas filialas"
          specialistCountLabel="Komanda: {count}"
          previewNote="Rodome tik trumpa sios lokacijos komandos perziura. Visas filialo kontekstas ir tolimesnis pasirinkimas pateikiami filialo puslapyje."
          visitBranchLabel="Aplankyti filiala"
          tabListLabel="Filialo komandos pasirinkimas"
        />
      ) : null}

      <GallerySection items={galleryPreviewItems} locale="lt" />

      {testimonialCards.length > 0 ? (
        <Section className="bg-[linear-gradient(180deg,#f7f2eb_0%,#fdfaf6_100%)]">
          <Container>
            <SectionHeading
              title="Klientu patirtys"
              subtitle="Tikri atsiliepimai"
              description="Trumpi atsiliepimai is klientu, kurie grizta ne tik del kirpimo, bet ir del visos uztikrintos patirties."
              align="center"
              className="max-w-3xl"
            />
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {testimonialCards.map((testimonial) => (
                <TestimonialCard
                  key={`${testimonial.author}-${testimonial.content}`}
                  content={testimonial.content}
                  author={testimonial.author}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {promotions[0] ? (
        <Section className="bg-background !py-0 -mt-10 relative z-10">
          <Container>
            <PromoBanner
              eyebrow="Aktualus pasiulymas"
              title={getLocalizedContent(promotions[0], "title", "lt")}
              description={getLocalizedContent(promotions[0], "description", "lt")}
              ctaText={getPromotionCtaText(promotions[0], "lt")}
              ctaHref={promotions[0].cta_url || getBookingPath("lt")}
            />
          </Container>
        </Section>
      ) : null}

      {blogCards.length > 0 ? (
        <Section id="blog" className="bg-background pt-24">
          <Container>
            <SectionHeading
              title="Naujienos ir idejos"
              subtitle="Tinklarastis"
              description="Redakciniai straipsniai apie prieziura, stiliu ir kasdienius pasirinkimus, kurie padeda islaikyti tvarkinga rezultata tarp vizitu."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {blogCards.map((post) => (
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
            <div className="mt-10 text-center md:text-left">
              <Link
                href={getLocalizedRoute("blog", "lt")}
                className="text-sm font-semibold uppercase tracking-[0.22em] text-primary hover:underline underline-offset-4"
              >
                Skaityti visus straipsnius {"->"}
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection locale="lt" />
    </main>
  );
}
