import React from "react";
import Link from "next/link";

import { PrimaryButton } from "../ui/PrimaryButton";
import { siteConfig } from "@/config/navigation";

export function StickyMobileBookingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur border-t border-border p-4 md:hidden">
      <Link href={siteConfig.bookingUrl}>
        <PrimaryButton className="w-full h-14 text-lg">
          Book Appointment
        </PrimaryButton>
      </Link>
    </div>
  );
}
