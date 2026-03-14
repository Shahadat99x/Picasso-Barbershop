"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createGalleryItem, updateGalleryItem } from "@/app/admin/actions/gallery";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Database } from "@/lib/supabase/types";

type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];

export function GalleryItemForm({ initialData }: { initialData?: GalleryItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title_lt: formData.get("title_lt") as string,
      title_en: (formData.get("title_en") as string) || null,
      description_lt: (formData.get("description_lt") as string) || null,
      description_en: (formData.get("description_en") as string) || null,
      alt_text_lt: formData.get("alt_text_lt") as string,
      alt_text_en: (formData.get("alt_text_en") as string) || null,
      image_url: formData.get("image_url") as string,
      category: (formData.get("category") as string) || null,
      is_visible: formData.get("is_visible") === "on",
      is_featured: formData.get("is_featured") === "on",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateGalleryItem(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createGalleryItem(data);
          if (res.error) throw new Error(res.error);
        }
        router.push("/admin/gallery");
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
            placeholder="e.g. Kirpimas ir barzdos tvarkymas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title_en">Title (EN)</Label>
          <Input
            id="title_en"
            name="title_en"
            defaultValue={initialData?.title_en || ""}
            placeholder="e.g. Haircut and beard styling"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description_lt">Description (LT)</Label>
          <Textarea
            id="description_lt"
            name="description_lt"
            defaultValue={initialData?.description_lt || ""}
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
            label="Image"
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="https://res.cloudinary.com/.../image.jpg"
          />
          <input type="hidden" name="image_url" value={imageUrl} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt_text_lt">Alt Text (LT)</Label>
          <Input
            id="alt_text_lt"
            name="alt_text_lt"
            defaultValue={initialData?.alt_text_lt || ""}
            required
            placeholder="e.g. Kirpimo nuotrauka"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt_text_en">Alt Text (EN)</Label>
          <Input
            id="alt_text_en"
            name="alt_text_en"
            defaultValue={initialData?.alt_text_en || ""}
            placeholder="e.g. Haircut photo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            placeholder="e.g. haircut, beard, color"
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

        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="is_visible"
            name="is_visible"
            defaultChecked={initialData?.is_visible ?? true}
          />
          <Label htmlFor="is_visible">Visible (Public)</Label>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="is_featured"
            name="is_featured"
            defaultChecked={initialData?.is_featured ?? false}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/gallery")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Gallery Item" : "Create Gallery Item"}
        </Button>
      </div>
    </form>
  );
}
