import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SecondaryButtonLinkProps = {
  href: string;
  prefetch?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    className?: string;
  };

type SecondaryButtonProps =
  | (React.ComponentProps<typeof Button> & {
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
    const { className, children, href, prefetch, rel, ...linkProps } = props;
    const computedRel =
      rel ?? (linkProps.target === "_blank" && isExternalHref(href) ? "noopener noreferrer" : undefined);

    if (isExternalHref(href)) {
      return (
        <a href={href} rel={computedRel} className={secondaryButtonStyles(className)} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} prefetch={prefetch} className={secondaryButtonStyles(className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { className, children, ...buttonProps } = props as React.ComponentProps<typeof Button>;

  return (
    <Button
      variant="outline"
      className={secondaryButtonStyles(className as string | undefined)}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
