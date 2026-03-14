import Link from "next/link";
import { Plus } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            buttonVariants({ variant: "default" }),
            "shrink-0 bg-slate-900 transition-colors hover:bg-slate-800"
          )}
        >
          <Plus className="mr-2 h-4 w-4" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
