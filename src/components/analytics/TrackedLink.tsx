"use client";

import * as React from "react";
import Link from "next/link";

import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from "@/lib/analytics";

interface TrackedLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  analyticsEvent: AnalyticsEventName;
  analyticsParams?: AnalyticsEventParams;
  prefetch?: boolean;
}

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function TrackedLink({
  href,
  analyticsEvent,
  analyticsParams,
  onClick,
  prefetch,
  rel,
  ...props
}: TrackedLinkProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    trackEvent(analyticsEvent, analyticsParams);
  };

  const computedRel =
    rel ??
    (props.target === "_blank" && isExternalHref(href)
      ? "noopener noreferrer"
      : undefined);

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        rel={computedRel}
        onClick={handleClick}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      rel={computedRel}
      onClick={handleClick}
      {...props}
    />
  );
}
