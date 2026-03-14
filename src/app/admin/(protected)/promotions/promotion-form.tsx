"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createPromotion, updatePromotion } from "@/app/admin/actions/promotions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Database } from "@/lib/supabase/types";

type Promotion = Database["public"]["Tables"]["promotions"]["Row"];

export function PromotionForm({ initialData }: { initialData?: Promotion }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(initialData?.banner_image_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title_lt: formData.get("title_lt") as string,
      title_en: (formData.get("title_en") as string) || null,
      description_lt: formData.get("description_lt") as string,
      description_en: (formData.get("description_en") as string) || null,
      banner_image_url: (formData.get("banner_image_url") as string) || null,
      discount_label_lt: (formData.get("discount_label_lt") as string) || null,
      discount_label_en: (formData.get("discount_label_en") as string) || null,
      cta_text_lt: (formData.get("cta_text_lt") as string) || null,
      cta_text_en: (formData.get("cta_text_en") as string) || null,
      cta_url: (formData.get("cta_url") as string) || null,
      starts_at: (formData.get("starts_at") as string) || null,
      ends_at: (formData.get("ends_at") as string) || null,
      is_featured: formData.get("is_featured") === "on",
      is_active: formData.get("is_active") === "on",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updatePromotion(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createPromotion(data);
          if (res.error) throw new Error(res.error);
        }
        router.push("/admin/promotions");
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
            placeholder="e.g. Vasaros nuolaida"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title_en">Title (EN)</Label>
          <Input
            id="title_en"
            name="title_en"
            defaultValue={initialData?.title_en || ""}
            placeholder="e.g. Summer discount"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description_lt">Description (LT)</Label>
          <Textarea
            id="description_lt"
            name="description_lt"
            defaultValue={initialData?.description_lt || ""}
            required
            rows={3}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description_en">Description (EN)</Label>
          <Textarea
            id="description_en"
            name="description_en"
            defaultValue={initialData?.description_en || ""}
            rows={3}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <ImageUpload
            label="Banner Image"
            value={bannerImageUrl}
            onChange={setBannerImageUrl}
            placeholder="https://res.cloudinary.com/.../banner.jpg"
          />
          <input type="hidden" name="banner_image_url" value={bannerImageUrl} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount_label_lt">Discount Label (LT)</Label>
          <Input
            id="discount_label_lt"
            name="discount_label_lt"
            defaultValue={initialData?.discount_label_lt || ""}
            placeholder="e.g. -20%"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount_label_en">Discount Label (EN)</Label>
          <Input
            id="discount_label_en"
            name="discount_label_en"
            defaultValue={initialData?.discount_label_en || ""}
            placeholder="e.g. -20%"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta_text_lt">CTA Text (LT)</Label>
          <Input
            id="cta_text_lt"
            name="cta_text_lt"
            defaultValue={initialData?.cta_text_lt || ""}
            placeholder="e.g. Rezervuoti"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta_text_en">CTA Text (EN)</Label>
          <Input
            id="cta_text_en"
            name="cta_text_en"
            defaultValue={initialData?.cta_text_en || ""}
            placeholder="e.g. Book now"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cta_url">CTA URL</Label>
          <Input
            id="cta_url"
            name="cta_url"
            defaultValue={initialData?.cta_url || ""}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="starts_at">Start Date</Label>
          <Input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            defaultValue={initialData?.starts_at || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ends_at">End Date</Label>
          <Input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            defaultValue={initialData?.ends_at || ""}
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
            id="is_active"
            name="is_active"
            defaultChecked={initialData?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="is_featured"
            name="is_featured"
            defaultChecked={initialData?.is_featured ?? false}
          />
          <Label htmlFor="is_featured">Featured (Show on homepage)</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/promotions")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Promotion" : "Create Promotion"}
        </Button>
      </div>
    </form>
  );
}
