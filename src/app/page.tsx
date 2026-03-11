import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { BranchCard } from "@/components/shared/BranchCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { SpecialistCard } from "@/components/shared/SpecialistCard";
import { PromoBanner } from "@/components/shared/PromoBanner";

export default function Home() {
  return (
    <main className="pb-24">
      {/* Hero / Typography Preview */}
      <Section className="bg-secondary/10 border-b border-border/50">
        <Container>
          <div className="py-20 md:py-32 max-w-3xl text-center mx-auto">
            <span className="block mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Phase 1
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8">
              Design System & UI Foundation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A premium, mobile-first preview of core UI components and layout primitives for the Picasso Barbershop website.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryButton>Primary CTA</PrimaryButton>
              <SecondaryButton>Secondary CTA</SecondaryButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section className="bg-background">
        <Container>
          <SectionHeading 
            title="Service Cards" 
            subtitle="Component Preview" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              title="Classic Haircut"
              description="A precision cut tailored to your face shape and style preferences."
              price="€35"
              duration="45 min"
            />
            <ServiceCard 
              title="Beard Trim & Shape"
              description="Expert shaping and fading using straight razor techniques."
              price="€25"
              duration="30 min"
            />
            <ServiceCard 
              title="The Full Experience"
              description="Haircut, beard sculpt, hot towel shave, and scalp massage."
              price="€65"
              duration="90 min"
            />
          </div>
        </Container>
      </Section>

      {/* Branches Preview */}
      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Branch Cards" 
            subtitle="Locations" 
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            <BranchCard 
              name="Old Town Classic"
              address="Vilniaus g. 22, Vilnius"
              hours="Mon-Sun: 9:00 - 20:00"
            />
            <BranchCard 
              name="Užupis Retreat"
              address="Užupio g. 14, Vilnius"
              hours="Mon-Sat: 10:00 - 19:00"
            />
            <BranchCard 
              name="Modern City Center"
              address="Gedimino pr. 9, Vilnius"
              hours="Mon-Sun: 8:00 - 21:00"
            />
          </div>
        </Container>
      </Section>

      {/* Testimonials Preview */}
      <Section className="bg-background">
        <Container>
          <SectionHeading 
            title="Testimonial Cards" 
            subtitle="Client Feedback" 
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard 
              content="Best haircut I've had in Vilnius. The attention to detail is unmatched and the atmosphere is pure luxury."
              author="Marius K."
              role="Regular Client"
              rating={5}
            />
            <TestimonialCard 
              content="A highly professional team. The hot towel shave is incredibly relaxing. Highly recommended."
              author="Tomas L."
              rating={5}
            />
          </div>
        </Container>
      </Section>

      {/* Specialists Preview */}
      <Section className="bg-secondary/10">
        <Container>
          <SectionHeading 
            title="Specialist Cards" 
            subtitle="The Team" 
            align="left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SpecialistCard name="Lukas" title="Master Barber" />
            <SpecialistCard name="Domas" title="Senior Barber" />
            <SpecialistCard name="Andrius" title="Color Specialist" />
            <SpecialistCard name="Jonas" title="Men's Stylist" />
          </div>
        </Container>
      </Section>

      {/* Blog & Promo Preview */}
      <Section className="bg-background" variant="padded">
        <Container>
          <SectionHeading 
            title="Editorial & Promotions" 
            subtitle="Content Modules" 
            align="left"
          />
          <div className="mb-16">
            <PromoBanner 
              title="Experience The Full Treatment"
              description="Book our signature package this month and receive a complimentary styling product tailored to your hair type."
              ctaText="Book Package"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogCard 
              title="5 Trends for Men's Hair in 2026"
              excerpt="Discover the latest styles arriving in Vilnius this season, from textured crops to classic tapers."
              date="March 10, 2026"
              category="Trends"
            />
            <BlogCard 
              title="Beard Care 101"
              excerpt="How to maintain your beard health between visits using the right oils and brushing techniques."
              date="February 28, 2026"
              category="Advice"
            />
            <BlogCard 
              title="Behind the Salon: Užupis"
              excerpt="Take a look inside our newest location and meet the team that brings it to life."
              date="February 15, 2026"
              category="News"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
