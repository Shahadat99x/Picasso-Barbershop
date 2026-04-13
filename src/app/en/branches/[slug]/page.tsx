import type { Metadata } from "next";
import { Bus, Car, Clock, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PublicDetailHero } from "@/components/public/page/public-detail-hero";
import { BlogCard } from "@/components/shared/BlogCard";
import { FeaturedArticleCard } from "@/components/shared/FeaturedArticleCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { StructuredData } from "@/components/shared/StructuredData";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  getAvailableServicesForBranch,
  getBlogPostsForBranch,
  getBranchBySlug,
  getBranchTrustPoints,
  getGalleryItemsForBranch,
  getLocalizedContent,
  getLocalizedSlug,
  getLocalizedOpeningHours,
  getPrimaryOpeningHours,
  transformBlogPostForCard,
  transformGalleryItemForMosaic,
  transformServiceForCard,
} from "@/lib/public-data";
import { createLocalizedPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/schema";
import { getLocalizedDetailRoute, getLocalizedRoute } from "@/lib/site-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    return createLocalizedPageMetadata({
      title: "Branch not found",
      description: "The requested branch could not be found.",
      path: getLocalizedRoute("branches", "en"),
      locale: "en",
      noIndex: true,
    });
  }

  const resolvedSlug = getLocalizedSlug(branch, "en");
  const alternateSlug = getLocalizedSlug(branch, "lt");

  return createLocalizedPageMetadata({
    title: getLocalizedContent(branch, "name", "en"),
    description: getLocalizedContent(branch, "short_description", "en"),
    path: getLocalizedDetailRoute("branches", resolvedSlug, "en"),
    alternatePath: getLocalizedDetailRoute("branches", alternateSlug, "lt"),
    locale: "en",
    image: branch.cover_image_url || branch.gallery_preview_image_url || undefined,
  });
}

export default async function EnBranchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const [services, galleryItems, relatedPosts] = await Promise.all([
    getAvailableServicesForBranch(branch.id),
    getGalleryItemsForBranch(branch.id),
    getBlogPostsForBranch(branch.id),
  ]);

  const openingHours = getLocalizedOpeningHours(branch.opening_hours_json, "en");
  const trustPoints = getBranchTrustPoints(branch, "en");
  const serviceCards = services.map((service) => transformServiceForCard(service, "en"));
  const galleryMosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "en", index),
  );
  const blogCards = relatedPosts.map((post) => transformBlogPostForCard(post, "en"));
  const featuredPost = blogCards[0];
  const remainingPosts = blogCards.slice(1);
  const resolvedSlug = getLocalizedSlug(branch, "en");
  const name = getLocalizedContent(branch, "name", "en");
  const shortDescription = getLocalizedContent(branch, "short_description", "en");
  const address = getLocalizedContent(branch, "address", "en");
  const primaryHours = getPrimaryOpeningHours(branch, "en");

  return (
    <main>
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", path: getLocalizedRoute("home", "en") },
          { name: "Branches", path: getLocalizedRoute("branches", "en") },
          {
            name,
            path: getLocalizedDetailRoute("branches", resolvedSlug, "en"),
          },
        ])}
      />

      <PublicDetailHero
        backHref={getLocalizedRoute("branches", "en")}
        backLabel="< Back to all branches"
        eyebrow="Branch profile"
        title={name}
        description={shortDescription}
        meta={[
          { label: "Hours", value: primaryHours },
          { label: "Phone", value: branch.phone },
          {
            label: "Services",
            value: (
              <TrackedLink
                href={getLocalizedRoute("services", "en")}
                analyticsEvent="service_explore_intent"
                analyticsParams={{
                  branch_slug: resolvedSlug,
                  cta_label: "Explore services",
                  placement: "branch_detail_meta",
                }}
                className="underline transition-colors hover:text-white"
              >
                Explore services
              </TrackedLink>
            ),
          },
        ]}
        actions={
          <>
            <PrimaryButton
              href="#contact"
              analyticsEvent="cta_click"
              analyticsParams={{
                branch_slug: resolvedSlug,
                cta_label: "Visit branch",
                placement: "branch_detail_hero",
              }}
              className="h-12 w-full px-8 text-base sm:w-auto"
            >
              Visit branch
            </PrimaryButton>
            {branch.map_url ? (
              <SecondaryButton
                href={branch.map_url}
                target="_blank"
                rel="noreferrer"
                analyticsEvent="map_open"
                analyticsParams={{
                  branch_slug: resolvedSlug,
                  cta_label: "Open map",
                  placement: "branch_detail_hero",
                }}
                className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto"
              >
                Open map
              </SecondaryButton>
            ) : null}
          </>
        }
        visual={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#1a1a1a]">
            {branch.cover_image_url || branch.gallery_preview_image_url ? (
              <OptimizedImage
                src={branch.cover_image_url || branch.gallery_preview_image_url || ""}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 34vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#201c19] px-6 text-center text-sm leading-7 text-[#c7b9ac]">
                A branch visual will appear here once an image is added in the admin.
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
                  title="About this branch"
                  subtitle="Location overview"
                  description="A concise view of the setting, atmosphere, and why this location may be the right fit for your routine."
                  align="left"
                />
                <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                  <p>{shortDescription}</p>
                  <p>
                    {serviceCards.length > 0
                      ? `This branch currently offers ${serviceCards.length} published services, with a clear path from browsing to booking.`
                      : "The service selection for this branch is still being expanded, while the contact and booking path are already in place."}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f7f1ea_0%,#fcf8f4_100%)] p-8 shadow-sm shadow-black/5 md:p-10">
                <SectionHeading
                  title="Arrival and convenience"
                  subtitle="Before your visit"
                  description="Practical guidance around parking and public transport so getting to your appointment feels straightforward."
                  align="left"
                  className="max-w-3xl"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5 md:col-span-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Location & Map
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {address}. You can easily find us following street signs or use your{" "}
                          {branch.map_url ? (
                            <TrackedLink
                              href={branch.map_url}
                              target="_blank"
                              analyticsEvent="map_open"
                              analyticsParams={{
                                branch_slug: resolvedSlug,
                                cta_label: "map app",
                                placement: "branch_detail_copy",
                              }}
                              className="focus-ring rounded-sm text-primary underline hover:text-primary/80"
                            >
                              map app
                            </TrackedLink>
                          ) : "map app"}{" "}
                          for exact directions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5">
                    <div className="flex items-start gap-3">
                      <Car className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Parking
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {getLocalizedContent(branch, "parking_info", "en") ||
                            "Parking information will be added soon."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5">
                    <div className="flex items-start gap-3">
                      <Bus className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Public transport
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {getLocalizedContent(branch, "transport_info", "en") ||
                            "Public transport guidance will be added soon."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div id="contact" className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Contact and opening hours
                </span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">
                  Everything essential in one place.
                </h3>

                <div className="mt-8 space-y-5 text-sm text-[#d9cfc5]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                        Address
                      </div>
                      <address className="mt-2 not-italic leading-7 text-[#f5efe7]">{address}</address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                        Phone
                      </div>
                      <TrackedLink
                        href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                        analyticsEvent="phone_click"
                        analyticsParams={{
                          branch_slug: resolvedSlug,
                          cta_label: branch.phone,
                          placement: "branch_detail_contact",
                        }}
                        className="focus-ring-inverse mt-2 inline-block rounded-sm text-[#f5efe7] transition-colors hover:text-[#d2af88]"
                      >
                        {branch.phone}
                      </TrackedLink>
                    </div>
                  </div>

                  {branch.email ? (
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                          Email
                        </div>
                        <a
                          href={`mailto:${branch.email}`}
                          className="focus-ring-inverse mt-2 inline-block rounded-sm text-[#f5efe7] transition-colors hover:text-[#d2af88]"
                        >
                          {branch.email}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>

                {openingHours.length > 0 ? (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-[#d2af88]" />
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#bba998]">
                        Opening hours
                      </span>
                    </div>
                    <ul className="space-y-3 text-sm text-[#d9cfc5]">
                      {openingHours.map((hour) => (
                        <li
                          key={`${hour.day}-${hour.time}`}
                          className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                        >
                          <span>{hour.day}</span>
                          <span className="font-medium text-[#faf5ee]">{hour.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col gap-3">
                  <PrimaryButton
                    href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                    analyticsEvent="phone_click"
                    analyticsParams={{
                      branch_slug: resolvedSlug,
                      cta_label: "Call branch",
                      placement: "branch_detail_sidebar",
                    }}
                    className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]"
                  >
                    Call branch
                  </PrimaryButton>
                  {branch.map_url ? (
                    <SecondaryButton
                      href={branch.map_url}
                      target="_blank"
                      rel="noreferrer"
                      analyticsEvent="map_open"
                      analyticsParams={{
                        branch_slug: resolvedSlug,
                        cta_label: "Open map",
                        placement: "branch_detail_sidebar",
                      }}
                      className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]"
                    >
                      Open map
                    </SecondaryButton>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {trustPoints.length > 0 ? (
        <Section className="border-y border-border/50 bg-[linear-gradient(180deg,#f5f0ea_0%,#fbf8f4_100%)]">
          <Container>
            <SectionHeading
              title="Why clients choose this location"
              subtitle="Trust signals"
              description="Short proof points that help communicate convenience, service quality, and the tone of the branch experience."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.5rem] border border-[#ddcfbf]/60 bg-background/85 p-5 shadow-sm shadow-black/5"
                >
                  <span className="text-base font-medium leading-7 text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {serviceCards.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Services at this branch"
              subtitle="Service selection"
              description="Browse the services currently assigned to this branch and move directly into the option that matches your visit goal."
              align="left"
              className="max-w-3xl"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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

      <GallerySection
        items={galleryMosaicItems}
        locale="en"
        variant="supporting"
        analyticsPlacement="branch_detail_gallery_preview"
      />

      {blogCards.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Editorial related to this branch"
              subtitle="Blog"
              description="Extra context around care, style, and location-specific stories connected to this branch."
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
