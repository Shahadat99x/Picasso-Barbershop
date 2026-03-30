import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import {
  getActiveBranches,
  getActivePromotions,
  getFeaturedGalleryItems,
  getFeaturedServices,
  getFeaturedSpecialists,
  getPromotionCtaText,
  getPublishedBlogPosts,
  getVisibleTestimonials,
  getLocalizedContent,
  transformBlogPostForCard,
  transformBranchForCard,
  transformGalleryItemForMosaic,
  transformServiceForCard,
  transformSpecialistForCard,
  transformTestimonialForCard,
} from "@/lib/public-data";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { getBookingPath, getLocalizedRoute } from "@/lib/site-routes";
import { createLocalBusinessSchema } from "@/lib/schema";

export const metadata = createLocalizedPageMetadata({
  title: "Premium salon in Vilnius",
  description:
    "Discover premium services, three Vilnius branches, real client testimonials, and an easy booking path with Picasso Barbershop.",
  path: "/",
  locale: "en",
});

export default async function EnHomePage() {
  const [services, branches, specialists, galleryItems, testimonials, blogPosts, promotions] =
    await Promise.all([
      getFeaturedServices(3),
      getActiveBranches(),
      getFeaturedSpecialists(4),
      getFeaturedGalleryItems(6),
      getVisibleTestimonials(2),
      getPublishedBlogPosts(3),
      getActivePromotions(1),
    ]);

  const featuredBranches = branches.slice(0, 3);
  const branchMap = new Map(
    branches.map((branch) => [branch.id, getLocalizedContent(branch, "name", "en")]),
  );
  const serviceCards = services.map((service) => transformServiceForCard(service, "en"));
  const branchCards = featuredBranches.map((branch) => transformBranchForCard(branch, "en"));
  const specialistCards = specialists.map((specialist) =>
    transformSpecialistForCard(
      specialist,
      "en",
      branchMap.get(specialist.branch_id || ""),
    ),
  );
  const testimonialCards = testimonials.map((testimonial) =>
    transformTestimonialForCard(testimonial, "en"),
  );
  const blogCards = blogPosts.map((post) => transformBlogPostForCard(post, "en"));
  const galleryMosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "en", index),
  );

  return (
    <main>
      <StructuredData data={createLocalBusinessSchema()} />
      <HeroSection locale="en" />

      {serviceCards.length > 0 ? (
        <Section id="services" className="border-t border-border/60 bg-background">
          <Container>
            <SectionHeading
              title="Signature services"
              subtitle="Selected from real CMS-managed offerings"
              description="A concise edit of real services managed in the CMS, with a stronger focus on craft, finish quality, and appointment feel."
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
                  startingLabel="From"
                  detailLabel="Details"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {branchCards.length > 0 ? (
        <Section id="branches" className="bg-[linear-gradient(180deg,#f5f0ea_0%,#f8f5f0_100%)]">
          <Container>
            <SectionHeading
              title="Branches in Vilnius"
              subtitle="Find the location that suits your routine"
              description="Each branch keeps the same premium service standard, while fitting a different part of the city and a different daily rhythm."
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
                  detailLabel="View branch"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <WhyChooseUsSection locale="en" />

      {specialistCards.length > 0 ? (
        <Section className="bg-background" variant="padded">
          <Container>
            <SectionHeading
              title="Meet the team"
              subtitle="Featured specialists"
              description="Specialists whose work is built around consultation, precision, and a result clients want to come back to."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {specialistCards.map((specialist) => (
                <SpecialistCard
                  key={specialist.id}
                  name={specialist.name}
                  title={specialist.title}
                  summary={specialist.summary}
                  specialties={specialist.specialties}
                  branchLabel={specialist.branchLabel}
                  experienceLabel={specialist.experienceLabel}
                  imageUrl={specialist.imageUrl}
                  eyebrowLabel="Team"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <GallerySection items={galleryMosaicItems} locale="en" />

      {testimonialCards.length > 0 ? (
        <Section className="bg-[linear-gradient(180deg,#f7f2eb_0%,#fdfaf6_100%)]">
          <Container>
            <SectionHeading
              title="Client experiences"
              subtitle="Testimonials"
              description="A quick read on why clients return for more than the cut itself: the consistency, the care, and the overall atmosphere."
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
              eyebrow="Featured offer"
              title={getLocalizedContent(promotions[0], "title", "en")}
              description={getLocalizedContent(promotions[0], "description", "en")}
              ctaText={getPromotionCtaText(promotions[0], "en")}
              ctaHref={promotions[0].cta_url || getBookingPath("en")}
            />
          </Container>
        </Section>
      ) : null}

      {blogCards.length > 0 ? (
        <Section id="blog" className="bg-background pt-24">
          <Container>
            <SectionHeading
              title="Editorial"
              subtitle="Latest posts"
              description="Practical reading on grooming, style, and the small habits that help a sharp result hold between appointments."
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
                href={getLocalizedRoute("blog", "en")}
                className="text-sm font-semibold uppercase tracking-[0.22em] text-primary hover:underline underline-offset-4"
              >
                Explore all articles {"->"}
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCtaSection locale="en" />
    </main>
  );
}
