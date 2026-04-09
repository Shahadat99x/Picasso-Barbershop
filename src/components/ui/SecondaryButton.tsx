"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ButtonAnalyticsProps {
  analyticsEvent?: AnalyticsEventName;
  analyticsParams?: AnalyticsEventParams;
}

type BaseButtonProps = React.ComponentProps<typeof Button>;
type BaseButtonClickEvent = Parameters<
  NonNullable<BaseButtonProps["onClick"]>
>[0];

type SecondaryButtonLinkProps = {
  href: string;
  prefetch?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> &
  ButtonAnalyticsProps & {
    className?: string;
  };

type SecondaryButtonProps =
  | (React.ComponentProps<typeof Button> &
      ButtonAnalyticsProps & {
      href?: undefined;
      prefetch?: never;
    })
  | SecondaryButtonLinkProps;

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function secondaryButtonStyles(className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-full border border-border text-base font-medium text-foreground transition-all",
    "h-12 px-8 hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "motion-reduce:transform-none motion-reduce:transition-none",
    className,
  );
}

export function SecondaryButton(props: SecondaryButtonProps) {
  if ("href" in props && props.href) {
    const {
      analyticsEvent,
      analyticsParams,
      className,
      children,
      href,
      onClick,
      prefetch,
      rel,
      ...linkProps
    } = props;
    const computedRel =
      rel ?? (linkProps.target === "_blank" && isExternalHref(href) ? "noopener noreferrer" : undefined);
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      onClick?.(event);

      if (event.defaultPrevented || !analyticsEvent) {
        return;
      }

      trackEvent(analyticsEvent, analyticsParams);
    };

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          rel={computedRel}
          onClick={handleClick}
          className={secondaryButtonStyles(className)}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        prefetch={prefetch}
        onClick={handleClick}
        className={secondaryButtonStyles(className)}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    analyticsEvent,
    analyticsParams,
    className,
    children,
    onClick,
    ...buttonProps
  } = props as BaseButtonProps & ButtonAnalyticsProps;
  const handleClick = (event: BaseButtonClickEvent) => {
    onClick?.(event);

    if (event.defaultPrevented || !analyticsEvent) {
      return;
    }

    trackEvent(analyticsEvent, analyticsParams);
  };

  return (
    <Button
      variant="outline"
      className={secondaryButtonStyles(className as string | undefined)}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
