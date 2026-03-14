import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

// Core Mock Data
import { 
  mockFeaturedServices, 
  mockBranches, 
  mockSpecialists, 
  mockTestimonials 
} from "@/data/mock";
import { blogPosts, formatBlogDate } from "@/data/blog";

// UI Cards
import { ServiceCard } from "@/components/shared/ServiceCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { StructuredData } from "@/components/shared/StructuredData";

// Page Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { createPageMetadata } from "@/lib/metadata";
import { createLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Premium Barbershop in Vilnius",
  description:
    "Discover premium grooming services, three Vilnius branches, editorial inspiration, and easy booking with Picasso Barbershop.",
  path: "/en",
});

// Hero content for English homepage
const heroContent = {
  title: "Premium Barbershop in Vilnius",
  subtitle: "Three branches, professional masters, your style",
  cta: "Book appointment",
  ctaSecondary: "View Services",
};

export default function EnHome() {
  return (
    <main>
      <StructuredData data={createLocalBusinessSchema()} />
      {/* Hero with English content */}
      <Section className="!pb-0">
        <div className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-[#F5F2ED]">
          <Container className="relative z-10 pt-20">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl lg:text-7xl">
                {heroContent.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
                {heroContent.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/en/contact#rezervacija"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#1a1a1a] px-8 text-sm font-medium text-white transition-colors hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
                >
                  {heroContent.cta}
                </Link>
                <Link
                  href="/en/services"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-transparent px-8 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a]/5 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
                >
                  {heroContent.ctaSecondary}
                </Link>
              </div>
            </div>
          </Container>
          {/* Decorative elements */}
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#d4cfc4] opacity-40 blur-3xl" />
        </div>
      </Section>

      {/* 2. Featured Services */}
      <Section id="services" className="bg-background">
        <Container>
          <SectionHeading 
            title="Signature Services" 
            subtitle="Tailored for the modern gentleman" 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFeaturedServices.map((service, idx) => (
              <ServiceCard 
                key={idx}
                title={service.title}
                description={service.description}
                price={service.price}
                duration={service.duration}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Branches Preview */}
      <Section id="branches" className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Our Locations" 
            subtitle="Find a salon near you" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBranches.map((branch, idx) => (
              <BranchCard 
                key={idx}
                name={branch.name}
                address={branch.address}
                hours={branch.hours}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 5. Specialists Preview */}
      <Section className="bg-background" variant="padded">
        <Container>
          <SectionHeading 
            title="Meet The Team" 
            subtitle="Master Specialists" 
            align="left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockSpecialists.map((specialist, idx) => (
              <SpecialistCard 
                key={idx}
                name={specialist.name}
                title={specialist.title}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Gallery Preview */}
      <GallerySection />

      {/* 7. Testimonials */}
      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Client Experiences" 
            subtitle="Testimonials" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mockTestimonials.map((testimonial, idx) => (
              <TestimonialCard 
                key={idx}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Promotions / Featured Offer */}
      <Section className="bg-background !py-0 -mt-10 relative z-10">
        <Container>
          <PromoBanner 
            title="First Visit Privilege"
            description="Experience our premium barbering services with an exclusive 15% discount on your first appointment. Use code WELCOME15 when booking."
            ctaText="Claim Offer"
          />
        </Container>
      </Section>

      {/* 9. Latest Blog Preview */}
      <Section id="blog" className="bg-background pt-24">
        <Container>
          <SectionHeading 
            title="Editorial" 
            subtitle="Journal & Trends" 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={formatBlogDate(post.publishedAt)}
                readingTime={post.readingTime}
                category={post.category}
                imageUrl={post.coverImageSrc}
                href={`/en/blog/${post.slug}`}
              />
            ))}
          </div>
          <div className="mt-10 text-center md:text-left">
            <Link
              href="/en/blog"
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              Explore all editorial articles →
            </Link>
          </div>
        </Container>
      </Section>

      {/* 10. Final CTA */}
      <FinalCtaSection />
    </main>
  );
}
