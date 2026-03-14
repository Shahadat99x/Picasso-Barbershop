"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getMainNav, siteConfig } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Detect locale from pathname
  const locale = pathname?.startsWith("/en") ? "en" : "lt";
  const nav = getMainNav(locale);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button onClick={toggle} className="p-2 -mr-2 text-foreground transition-colors hover:text-primary">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity"
          onClick={toggle}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-background px-6 py-6 transition-transform duration-300 ease-out sm:max-w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold tracking-tight">Picasso</span>
          <button onClick={toggle} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
            <X className="h-6 w-6" />
            <span className="sr-only">Close Menu</span>
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-lg font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggle}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-6">
          <LanguageSwitcher className="justify-center" />
          <Link href={siteConfig.bookingUrl} onClick={toggle}>
            <PrimaryButton className="w-full">Book Now</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
