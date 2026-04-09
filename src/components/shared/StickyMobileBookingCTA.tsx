import React from "react";

import { PrimaryButton } from "../ui/PrimaryButton";

interface StickyMobileBookingCTAProps {
  bookingUrl: string;
  label: string;
}

export function StickyMobileBookingCTA({
  bookingUrl,
  label,
}: StickyMobileBookingCTAProps) {
  return (
    <div className="mobile-booking-cta fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur transition-all duration-300 md:hidden">
      <PrimaryButton href={bookingUrl} className="h-14 w-full text-lg">
        {label}
      </PrimaryButton>
    </div>
  );
}
