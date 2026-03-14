import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BranchSummaryCard } from "@/components/shared/BranchSummaryCard";
import { mockBranches } from "@/data/mock";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact - Picasso Barbershop",
  description:
    "Get in touch with Picasso Barbershop. Find our locations, contact details, and opening hours in Vilnius.",
  path: "/en/contact",
});

export default function EnContactPage() {
  return (
    <main>
      <Section className="!pb-0">
        <div className="relative flex min-h-[40vh] flex-col justify-center overflow-hidden bg-[#F5F2ED] py-20">
          <Container className="relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
              Contact
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4a4a4a] max-w-xl">
              Get in touch with us. We'd love to hear from you.
            </p>
          </Container>
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#e8e4dc] opacity-50 blur-3xl" />
        </div>
      </Section>

      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionHeading 
                title="Send us a message" 
                subtitle="We'll get back to you" 
                align="left"
              />
              <form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+370 6xx xxxxx"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <SectionHeading 
                  title="Our Locations" 
                  align="left"
                />
                <div className="mt-6 space-y-4">
                  {mockBranches.map((branch, idx) => (
                    <BranchSummaryCard 
                      key={idx}
                      name={branch.name}
                      address={branch.address}
                      phone="+370 600 00000"
                      hoursSummary={branch.hours}
                      mapUrl="#"
                      branchHref="/en/branches"
                      bookingHref="/en/services"
                      bookingLabel="Book"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-secondary/30 rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-4">General Inquiries</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="text-muted-foreground">Email:</span>
                    <a href="mailto:hello@picassobarbershop.lt" className="hover:underline">
                      hello@picassobarbershop.lt
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-muted-foreground">Phone:</span>
                    <a href="tel:+37060000000" className="hover:underline">
                      +370 600 00000
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    IG
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    FB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="rezervacija" className="bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              Ready for a Transformation?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Book your appointment at any of our three Vilnius locations.
            </p>
            <Link
              href="/en/services"
              className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View Services & Book
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
