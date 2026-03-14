"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createService, updateService } from "@/app/admin/actions/services";
import type { Database } from "@/lib/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];

export function ServiceForm({ initialData }: { initialData?: Service }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Parse numeric fields safely
    const rawPrice = formData.get("starting_price") as string;
    const starting_price = rawPrice ? parseFloat(rawPrice) : null;
    
    const rawDuration = formData.get("duration_minutes") as string;
    const duration_minutes = rawDuration ? parseInt(rawDuration, 10) : null;

    const rawSortOrder = formData.get("sort_order") as string;
    const sort_order = rawSortOrder ? parseInt(rawSortOrder, 10) : 0;

    const data = {
      title_lt: formData.get("title_lt") as string,
      slug_lt: formData.get("slug_lt") as string,
      short_description_lt: formData.get("short_description_lt") as string,
      full_description_lt: formData.get("full_description_lt") as string,
      category: formData.get("category") as string,
      starting_price,
      currency_code: (formData.get("currency_code") as string) || "EUR",
      duration_minutes,
      is_published: formData.get("is_published") === "on",
      is_featured: formData.get("is_featured") === "on",
      sort_order,
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateService(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createService(data);
          if (res.error) throw new Error(res.error);
        }
        router.push("/admin/services");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while saving.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title_lt">Title (LT)</Label>
          <Input
            id="title_lt"
            name="title_lt"
            defaultValue={initialData?.title_lt || ""}
            required
            placeholder="e.g. Vyrų kirpimas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug_lt">Slug (LT)</Label>
          <Input
            id="slug_lt"
            name="slug_lt"
            defaultValue={initialData?.slug_lt || ""}
            required
            placeholder="e.g. vyru-kirpimas"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="short_description_lt">Short Description (LT)</Label>
          <Textarea
            id="short_description_lt"
            name="short_description_lt"
            defaultValue={initialData?.short_description_lt || ""}
            required
            rows={2}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="full_description_lt">Full Description (LT)</Label>
          <Textarea
            id="full_description_lt"
            name="full_description_lt"
            defaultValue={initialData?.full_description_lt || ""}
            required
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            required
            placeholder="e.g. Haircuts, Beard, Spa"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration_minutes">Duration (minutes)</Label>
          <Input
            id="duration_minutes"
            name="duration_minutes"
            type="number"
            defaultValue={initialData?.duration_minutes ?? ""}
            placeholder="45"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="starting_price">Starting Price</Label>
          <Input
            id="starting_price"
            name="starting_price"
            type="number"
            step="0.01"
            defaultValue={initialData?.starting_price ?? ""}
            placeholder="25.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency_code">Currency</Label>
          <Input
            id="currency_code"
            name="currency_code"
            defaultValue={initialData?.currency_code || "EUR"}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={initialData?.sort_order ?? 0}
            required
          />
        </div>

        <div className="sm:col-span-2 pt-4 flex gap-8">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_published"
              name="is_published"
              defaultChecked={initialData?.is_published ?? true}
            />
            <Label htmlFor="is_published">Published</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              name="is_featured"
              defaultChecked={initialData?.is_featured ?? false}
            />
            <Label htmlFor="is_featured">Featured on Homepage</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/services")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Service" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
