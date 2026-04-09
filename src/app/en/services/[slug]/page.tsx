import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicDetailHero } from "@/components/public/page/public-detail-hero";
import { BlogCard } from "@/components/shared/BlogCard";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { FeaturedArticleCard } from "@/components/shared/FeaturedArticleCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
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
      title: "Service not found",
      description: "The requested service could not be found.",
      path: getLocalizedRoute("services", "en"),
      locale: "en",
      noIndex: true,
    });
  }

  const resolvedSlug = getLocalizedSlug(service, "en");
  const alternateSlug = getLocalizedSlug(service, "lt");

  return createLocalizedPageMetadata({
    title: getLocalizedContent(service, "title", "en"),
    description: getLocalizedContent(service, "short_description", "en"),
    path: getLocalizedDetailRoute("services", resolvedSlug, "en"),
    alternatePath: getLocalizedDetailRoute("services", alternateSlug, "lt"),
    locale: "en",
    image: service.cover_image_url || undefined,
  });
}

export default async function EnServiceDetailPage({ params }: PageProps) {
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

  const benefits = getServiceBenefits(service, "en");
  const faqs = getServiceFaqs(service, "en");
  const galleryMosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "en", index),
  );
  const blogCards = relatedPosts.map((post) => transformBlogPostForCard(post, "en"));
  const featuredPost = blogCards[0];
  const remainingPosts = blogCards.slice(1);
  const resolvedSlug = getLocalizedSlug(service, "en");
  const title = getLocalizedContent(service, "title", "en");
  const shortDescription = getLocalizedContent(service, "short_description", "en");
  const fullDescription = getLocalizedContent(service, "full_description", "en");
  const structuredData = [
    createBreadcrumbSchema([
      { name: "Home", path: getLocalizedRoute("home", "en") },
      { name: "Services", path: getLocalizedRoute("services", "en") },
      {
        name: title,
        path: getLocalizedDetailRoute("services", resolvedSlug, "en"),
      },
    ]),
    ...(faqs.length > 0 ? [createFaqSchema(faqs)] : []),
  ];

  return (
    <main>
      <StructuredData data={structuredData} />

      <PublicDetailHero
        backHref={getLocalizedRoute("services", "en")}
        backLabel="< Back to all services"
        eyebrow="Service details"
        title={title}
        description={shortDescription}
        meta={[
          {
            label: "From",
            value: formatPrice(service.starting_price, service.currency_code, "en"),
          },
          {
            label: "Duration",
            value: formatDuration(service.duration_minutes, "en"),
          },
          {
            label: "Branches",
            value: availableBranches.length > 0 ? String(availableBranches.length) : "On request",
          },
        ]}
        actions={
          <>
            <PrimaryButton href={getLocalizedRoute("contact", "en")} className="h-12 w-full px-8 text-base sm:w-auto">
              Contact us
            </PrimaryButton>
            <SecondaryButton
              href={getLocalizedRoute("branches", "en")}
              className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto"
            >
              View branches
            </SecondaryButton>
          </>
        }
        visual={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#1a1a1a]">
            {service.cover_image_url ? (
              <OptimizedImage
                src={service.cover_image_url}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 34vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#201c19] px-6 text-center text-sm leading-7 text-[#c7b9ac]">
                A service visual will appear here once an image is assigned in the admin.
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
                  title="About this service"
                  subtitle="Editorial overview"
                  description="A clear summary of who this service is for, how the appointment flows, and what kind of result clients can expect."
                  align="left"
                />
                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                  {fullDescription}
                </p>
              </div>

              {benefits.length > 0 ? (
                <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f7f1ea_0%,#fcf8f4_100%)] p-8 shadow-sm shadow-black/5 md:p-10">
                  <SectionHeading
                    title="What to expect during the visit"
                    subtitle="Value points"
                    description="The practical details that help frame the service level, the finish, and the overall appointment experience."
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
                  Next step
                </span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">
                  Choose the branch that fits best.
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#c7b9ac]">
                  {availableBranches.length > 0
                    ? "This service is available at the branches below, so you can easily review where to visit us."
                    : "Branch availability has not been configured yet. Contact us and we will help you choose the best timing."}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <PrimaryButton
                    href={getLocalizedRoute("branches", "en")}
                    className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                  >
                    Browse branches
                  </PrimaryButton>
                  <SecondaryButton
                    href={getLocalizedRoute("contact", "en")}
                    className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                  >
                    Contact us
                  </SecondaryButton>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#bba998]">
                    At a glance
                  </div>
                  <div className="mt-4 space-y-4 text-sm text-[#d9cfc5]">
                    <div className="flex items-center justify-between gap-4">
                      <span>Price</span>
                      <span className="font-medium text-[#faf5ee]">
                        {formatPrice(service.starting_price, service.currency_code, "en")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Duration</span>
                      <span className="font-medium text-[#faf5ee]">
                        {formatDuration(service.duration_minutes, "en")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Branches</span>
                      <span className="font-medium text-[#faf5ee]">
                        {availableBranches.length > 0 ? availableBranches.length : "On request"}
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
              title="Where this service is available"
              subtitle="Branches"
              description="The locations where this service is available across our network. View branch details or contact us directly."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {availableBranches.map((branch) => (
                <BranchSummaryCard
                  key={branch.id}
                  name={getLocalizedContent(branch, "name", "en")}
                  address={getLocalizedContent(branch, "address", "en")}
                  phone={branch.phone}
                  hoursSummary={getPrimaryOpeningHours(branch, "en")}
                  mapUrl={branch.map_url || undefined}
                  branchHref={getLocalizedDetailRoute("branches", getLocalizedSlug(branch, "en"), "en")}
                  bookingHref={branch.booking_url || getBookingPath("en")}
                  eyebrow="Branch"
                  branchLabel="View branch"
                  bookingLabel="Call branch"
                  mapAriaLabel={`Open map for ${getLocalizedContent(branch, "name", "en")}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <GallerySection items={galleryMosaicItems} locale="en" />

      {faqs.length > 0 ? (
        <ServiceFaqSection
          faqs={faqs}
          title="Common questions"
          subtitle="FAQ"
        />
      ) : null}

      {blogCards.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Articles related to this service"
              subtitle="Editorial"
              description="Additional context around maintenance, style choices, and how to keep the result looking sharp between appointments."
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
                  featuredLabel="Featured article"
                  readLabel="Read"
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

      <FinalCtaSection locale="en" />
    </main>
  );
}
