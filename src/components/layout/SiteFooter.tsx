"use client";

import React from "react";
import { Container } from "./Container";
import { getFooterNav } from "@/config/navigation";
import { footerDictionary } from "@/i18n/dictionaries/ui";
import { getLocalizedRoute } from "@/lib/site-routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteFooterProps {
  businessName?: string;
  description?: string;
  footerText?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  socialInstagram?: string | null;
  socialFacebook?: string | null;
  socialTikTok?: string | null;
}

export function SiteFooter({
  businessName,
  description,
  footerText,
  contactEmail,
  contactPhone,
  socialInstagram,
  socialFacebook,
  socialTikTok,
}: SiteFooterProps) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "lt";
  const footerNav = getFooterNav(locale);
  const t = footerDictionary[locale];
  const homeHref = getLocalizedRoute("home", locale);
  
  const name = businessName || "Picasso Barbershop";
  const desc = description || "Premium grooming, haircut, beard, and salon experiences across three Vilnius branches.";
  const copy = footerText || desc;
  const email = contactEmail || "hello@picassobarbershop.lt";
  const phone = contactPhone || "+370 600 00000";
  const instagram = socialInstagram || "https://instagram.com";
  const facebook = socialFacebook || "https://facebook.com";
  const socialLinks = [
    { href: instagram, label: "Instagram" },
    { href: facebook, label: "Facebook" },
    ...(socialTikTok ? [{ href: socialTikTok, label: "TikTok" }] : []),
  ];
  
  return (
    <footer className="relative overflow-hidden border-t border-[#7d5d3b]/25 bg-[linear-gradient(180deg,#151211_0%,#100e0d_100%)] pb-8 pt-16 text-[#f5efe7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,123,74,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,123,74,0.08),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ba8c59]/35 to-transparent" />
      <Container>
        <div className="relative mb-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <Link href={homeHref} className="inline-block text-2xl font-semibold tracking-tight transition-opacity hover:opacity-90">
              {name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#c8bbaf]">
              {copy}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-[#d9cfc5]">
              <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                {email}
              </a>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-white">
                {phone}
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d3b08c]">{t.explore}</h4>
            <ul className="space-y-3 text-sm text-[#c8bbaf]">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#d3b08c]">{t.legal}</h4>
            <ul className="space-y-3 text-sm text-[#c8bbaf]">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-[#a99b8d] md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {name}. {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
