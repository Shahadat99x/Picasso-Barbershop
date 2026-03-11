import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "border-border text-foreground hover:bg-secondary hover:text-secondary-foreground",
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
SecondaryButton.displayName = "SecondaryButton";
