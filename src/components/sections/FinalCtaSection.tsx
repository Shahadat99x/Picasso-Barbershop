import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { siteConfig } from "@/config/navigation";

export function FinalCtaSection() {
  return (
    <Section className="bg-primary text-primary-foreground py-20 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            Ready for your next look?
          </h2>
          <p className="text-primary-foreground/80 md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients who trust Picasso Barbershop for their grooming needs. Book your appointment today.
          </p>
          <Link href={siteConfig.bookingUrl}>
            <PrimaryButton className="bg-background text-foreground hover:bg-muted h-14 px-10 text-base font-semibold border-none">
              Book an Appointment
            </PrimaryButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
