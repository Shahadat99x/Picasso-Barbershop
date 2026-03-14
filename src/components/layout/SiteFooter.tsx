import React from "react";
import { Container } from "./Container";
import { getFooterNav, siteConfig } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "lt";
  const footerNav = getFooterNav(locale);
  
  return (
    <footer className="border-t border-border/40 bg-muted/30 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight inline-block mb-4 hover:opacity-90 transition-opacity">
              {siteConfig.name}
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{siteConfig.contactEmail}</span>
              <span>{siteConfig.contactPhone}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-center md:text-left text-sm text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {footerNav.social?.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
