import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

// Core Mock Data
import { 
  mockFeaturedServices, 
  mockBranches, 
  mockSpecialists, 
  mockTestimonials, 
  mockBlogPosts 
} from "@/data/mock";

// UI Cards
import { ServiceCard } from "@/components/shared/ServiceCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { PromoBanner } from "@/components/shared/PromoBanner";

// Page Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

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
            {mockBlogPosts.map((post, idx) => (
              <BlogCard 
                key={idx}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. Final CTA */}
      <FinalCtaSection />
    </main>
  );
}
