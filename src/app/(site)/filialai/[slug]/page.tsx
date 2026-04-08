import type { Metadata } from "next";
import Link from "next/link";
import { Bus, Car, Clock, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

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
      title: "Filialas nerastas",
      description: "Nepavyko rasti pasirinkto filialo.",
      path: getLocalizedRoute("branches", "lt"),
      locale: "lt",
      noIndex: true,
    });
  }

  const resolvedSlug = getLocalizedSlug(branch, "lt");
  const alternateSlug = getLocalizedSlug(branch, "en");

  return createLocalizedPageMetadata({
    title: getLocalizedContent(branch, "name", "lt"),
    description: getLocalizedContent(branch, "short_description", "lt"),
    path: getLocalizedDetailRoute("branches", resolvedSlug, "lt"),
    alternatePath: getLocalizedDetailRoute("branches", alternateSlug, "en"),
    locale: "lt",
    image: branch.cover_image_url || branch.gallery_preview_image_url || undefined,
  });
}

export default async function BranchDetailPage({ params }: PageProps) {
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

  const openingHours = getLocalizedOpeningHours(branch.opening_hours_json, "lt");
  const trustPoints = getBranchTrustPoints(branch, "lt");
  const serviceCards = services.map((service) => transformServiceForCard(service, "lt"));
  const galleryMosaicItems = galleryItems.map((item, index) =>
    transformGalleryItemForMosaic(item, "lt", index),
  );
  const blogCards = relatedPosts.map((post) => transformBlogPostForCard(post, "lt"));
  const featuredPost = blogCards[0];
  const remainingPosts = blogCards.slice(1);
  const resolvedSlug = getLocalizedSlug(branch, "lt");
  const name = getLocalizedContent(branch, "name", "lt");
  const shortDescription = getLocalizedContent(branch, "short_description", "lt");
  const address = getLocalizedContent(branch, "address", "lt");
  const primaryHours = getPrimaryOpeningHours(branch, "lt");

  return (
    <main>
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Pradzia", path: "/" },
          { name: "Filialai", path: getLocalizedRoute("branches", "lt") },
          {
            name,
            path: getLocalizedDetailRoute("branches", resolvedSlug, "lt"),
          },
        ])}
      />

      <PublicDetailHero
        backHref={getLocalizedRoute("branches", "lt")}
        backLabel="< Atgal i visus filialus"
        eyebrow="Filialo profilis"
        title={name}
        description={shortDescription}
        meta={[
          { label: "Darbo laikas", value: primaryHours },
          { label: "Telefonas", value: branch.phone },
          { label: "Paslaugos", value: <Link href={getLocalizedRoute("services", "lt")} className="underline hover:text-white transition-colors">Žiūrėti paslaugas</Link> },
        ]}
        actions={
          <>
            <a href="#kontaktai">
              <PrimaryButton className="h-12 w-full px-8 text-base sm:w-auto">
                Aplankyti filialą
              </PrimaryButton>
            </a>
            {branch.map_url ? (
              <a href={branch.map_url} target="_blank" rel="noreferrer">
                <SecondaryButton className="h-12 w-full border-[#715435] bg-[#1a1613] px-8 text-base text-[#f5efe7] hover:bg-[#241d19] hover:text-[#f5efe7] sm:w-auto">
                  Atidaryti žemėlapyje
                </SecondaryButton>
              </a>
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
                Filialo vaizdas bus rodomas, kai admin sistemoje bus prideta nuotrauka.
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
                  title="Apie si filiala"
                  subtitle="Lokacijos apzvalga"
                  description="Svarbiausia informacija apie vieta, atmosfera ir tai, kaip sis filialas isipaiso i jusu kasdienio ritmo pasirinkima."
                  align="left"
                />
                <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                  <p>{shortDescription}</p>
                  <p>
                    {serviceCards.length > 0
                      ? `Siame filiale siuo metu galite rinktis is ${serviceCards.length} publikuotu paslaugu, o rezervacijos kelias paliktas aiskus ir tiesioginis.`
                      : "Paslaugu sarasas siame filiale dar pildomas, taciau kontaktai ir rezervacijos kelias jau yra parengti."}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-[linear-gradient(180deg,#f7f1ea_0%,#fcf8f4_100%)] p-8 shadow-sm shadow-black/5 md:p-10">
                <SectionHeading
                  title="Atvykimas ir patogumas"
                  subtitle="Pries vizita"
                  description="Praktine informacija apie parkavima ir atvykima viesuoju transportu, kad kelias i vizita butu sklandus."
                  align="left"
                  className="max-w-3xl"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5 md:col-span-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Lokacija ir žemėlapis
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {address}. Mus lengvai rasite vadovaudamiesi gatvės nuorodomis arba naudodami{" "}
                          {branch.map_url ? (
                            <a href={branch.map_url} target="_blank" rel="noreferrer" className="text-primary underline hover:text-primary/80">žemėlapio programėlę</a>
                          ) : "žemėlapį"}{" "}
                          tiksliam maršrutui.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5">
                    <div className="flex items-start gap-3">
                      <Car className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Parkavimas
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {getLocalizedContent(branch, "parking_info", "lt") ||
                            "Parkavimo informacija bus atnaujinta netrukus."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[#ddcfbf]/60 bg-background/80 p-5">
                    <div className="flex items-start gap-3">
                      <Bus className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                          Viesasis transportas
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {getLocalizedContent(branch, "transport_info", "lt") ||
                            "Atvykimo viesuoju transportu informacija bus atnaujinta netrukus."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div id="kontaktai" className="rounded-[2rem] border border-border/60 bg-[#171311] p-8 text-[#f5efe7] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d1af89]">
                  Kontaktai ir darbo laikas
                </span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">
                  Visa svarbiausia informacija vienoje vietoje.
                </h3>

                <div className="mt-8 space-y-5 text-sm text-[#d9cfc5]">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                        Adresas
                      </div>
                      <address className="mt-2 not-italic leading-7 text-[#f5efe7]">{address}</address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                        Telefonas
                      </div>
                      <a
                        href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                        className="mt-2 inline-block text-[#f5efe7] transition-colors hover:text-[#d2af88]"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  {branch.email ? (
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#d2af88]" />
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#bba998]">
                          El. pastas
                        </div>
                        <a
                          href={`mailto:${branch.email}`}
                          className="mt-2 inline-block text-[#f5efe7] transition-colors hover:text-[#d2af88]"
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
                        Darbo laikas
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
                  <a href={`tel:${branch.phone.replace(/\s+/g, "")}`}>
                    <PrimaryButton className="w-full bg-[#d2af88] text-[#18120d] hover:bg-[#dec09c]">
                      Skambinti filialui
                    </PrimaryButton>
                  </a>
                  {branch.map_url ? (
                    <a href={branch.map_url} target="_blank" rel="noreferrer">
                      <SecondaryButton className="w-full border-[#6f5335] bg-transparent text-[#f5efe7] hover:bg-[#231c18] hover:text-[#f5efe7]">
                        Atidaryti zemelapyje
                      </SecondaryButton>
                    </a>
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
              title="Kodel klientai renkasi sia lokacija"
              subtitle="Pasitikejimo akcentai"
              description="Trumpi signalai, kurie padeda ivertinti filialo patoguma, aptarnavimo lygi ir bendra patirti."
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
              title="Paslaugos siame filiale"
              subtitle="Paslaugu pasirinkimas"
              description="Perziurekite siuo metu siam filialui priskirtas paslaugas ir pasirinkite jusu vizito tikslui tinkamiausia varianta."
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
                  startingLabel="Nuo"
                  detailLabel="Placiau"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <GallerySection items={galleryMosaicItems} locale="lt" />

      {blogCards.length > 0 ? (
        <Section className="bg-background">
          <Container>
            <SectionHeading
              title="Susije straipsniai apie sia lokacija"
              subtitle="Tinklarastis"
              description="Papildomas kontekstas apie prieziura, stiliu ir lokacijos aktualijas, susijusias su sia vieta."
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
