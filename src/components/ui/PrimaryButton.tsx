import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "h-12 px-8 text-base font-medium rounded-full transition-all",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
