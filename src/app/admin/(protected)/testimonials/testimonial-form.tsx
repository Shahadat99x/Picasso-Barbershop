"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createTestimonial, updateTestimonial } from "@/app/admin/actions/testimonials";
import type { Database } from "@/lib/supabase/types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

export function TestimonialForm({ initialData }: { initialData?: Testimonial }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      customer_name: formData.get("customer_name") as string,
      quote_lt: formData.get("quote_lt") as string,
      quote_en: (formData.get("quote_en") as string) || null,
      rating: formData.get("rating")
        ? parseInt(formData.get("rating") as string, 10)
        : null,
      is_featured: formData.get("is_featured") === "on",
      is_visible: formData.get("is_visible") === "on",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateTestimonial(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createTestimonial(data);
          if (res.error) throw new Error(res.error);
        }
        router.push("/admin/testimonials");
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
          <Label htmlFor="customer_name">Customer Name</Label>
          <Input
            id="customer_name"
            name="customer_name"
            defaultValue={initialData?.customer_name || ""}
            required
            placeholder="e.g. Jonas Jonaitis"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={initialData?.rating ?? ""}
            placeholder="5"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="quote_lt">Quote (LT)</Label>
          <Textarea
            id="quote_lt"
            name="quote_lt"
            defaultValue={initialData?.quote_lt || ""}
            required
            rows={4}
            placeholder="Customer testimonial in Lithuanian..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="quote_en">Quote (EN)</Label>
          <Textarea
            id="quote_en"
            name="quote_en"
            defaultValue={initialData?.quote_en || ""}
            rows={4}
            placeholder="Customer testimonial in English..."
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

        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="is_visible"
            name="is_visible"
            defaultChecked={initialData?.is_visible ?? true}
          />
          <Label htmlFor="is_visible">Visible (Public)</Label>
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="is_featured"
            name="is_featured"
            defaultChecked={initialData?.is_featured ?? false}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/testimonials")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Testimonial" : "Create Testimonial"}
        </Button>
      </div>
    </form>
  );
}
