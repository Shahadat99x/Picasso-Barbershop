import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import Link from "next/link";
import { siteConfig } from "@/config/navigation";

export function HeroSection() {
  return (
    <Section className="relative bg-secondary/10 overflow-hidden" variant="none">
      {/* Optional: Add a subtle texture or gradient background here */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/90 z-0 pointer-events-none" />
      
      <Container className="relative z-10 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-3xl">
          <span className="block mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
            Mastery in <br className="hidden md:block" /> Every Detail.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
            {siteConfig.description} Experience the city&apos;s finest traditional barbering combined with modern aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
            <Link href={siteConfig.bookingUrl} className="w-full sm:w-auto">
              <PrimaryButton className="w-full sm:w-auto h-12 px-8 text-base">
                Book an Appointment
              </PrimaryButton>
            </Link>
            <Link href="/#services" className="w-full sm:w-auto">
              <SecondaryButton className="w-full sm:w-auto h-12 px-8 text-base">
                View Services
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
