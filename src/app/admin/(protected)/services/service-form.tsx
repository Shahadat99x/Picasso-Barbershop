"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { createService, updateService } from "@/app/admin/actions/services";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SlugInput } from "@/components/admin/SlugInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  formatFaqList,
  formatStringList,
  parseFaqList,
  parseStringList,
} from "@/lib/admin/form-content";
import type { Database } from "@/lib/supabase/types";
import { generateSlug } from "@/lib/utils/slug";

type Service = Database["public"]["Tables"]["services"]["Row"];

function LocaleSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/60 p-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ServiceForm({ initialData }: { initialData?: Service }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [titleLt, setTitleLt] = useState(initialData?.title_lt || "");
  const [slugLt, setSlugLt] = useState(initialData?.slug_lt || "");
  const [slugLtEdited, setSlugLtEdited] = useState(false);
  const [titleEn, setTitleEn] = useState(initialData?.title_en || "");
  const [slugEn, setSlugEn] = useState(initialData?.slug_en || "");
  const [slugEnEdited, setSlugEnEdited] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || "");

  const handleTitleLtChange = (value: string) => {
    setTitleLt(value);
    if (!slugLtEdited && value) {
      setSlugLt(generateSlug(value));
    }
  };

  const handleSlugLtChange = (value: string) => {
    setSlugLtEdited(true);
    setSlugLt(value);
  };

  const handleRegenerateLt = () => {
    setSlugLtEdited(false);
    setSlugLt(generateSlug(titleLt));
  };

  const handleTitleEnChange = (value: string) => {
    setTitleEn(value);
    if (!slugEnEdited && value) {
      setSlugEn(generateSlug(value));
    }
  };

  const handleSlugEnChange = (value: string) => {
    setSlugEnEdited(true);
    setSlugEn(value);
  };

  const handleRegenerateEn = () => {
    setSlugEnEdited(false);
    setSlugEn(generateSlug(titleEn));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const rawPrice = formData.get("starting_price") as string;
    const starting_price = rawPrice ? parseFloat(rawPrice) : null;
    const rawDuration = formData.get("duration_minutes") as string;
    const duration_minutes = rawDuration ? parseInt(rawDuration, 10) : null;
    const rawSortOrder = formData.get("sort_order") as string;
    const sort_order = rawSortOrder ? parseInt(rawSortOrder, 10) : 0;

    const data = {
      title_lt: formData.get("title_lt") as string,
      title_en: (formData.get("title_en") as string) || null,
      slug_lt: formData.get("slug_lt") as string,
      slug_en: (formData.get("slug_en") as string) || null,
      short_description_lt: formData.get("short_description_lt") as string,
      short_description_en: (formData.get("short_description_en") as string) || null,
      full_description_lt: formData.get("full_description_lt") as string,
      full_description_en: (formData.get("full_description_en") as string) || null,
      benefits_lt: parseStringList(formData.get("benefits_lt") as string),
      benefits_en: parseStringList(formData.get("benefits_en") as string),
      faq_lt: parseFaqList(formData.get("faq_lt") as string),
      faq_en: parseFaqList(formData.get("faq_en") as string),
      category: formData.get("category") as string,
      starting_price,
      currency_code: (formData.get("currency_code") as string) || "EUR",
      duration_minutes,
      cover_image_url: (formData.get("cover_image_url") as string) || null,
      is_published: formData.get("is_published") === "on",
      is_featured: formData.get("is_featured") === "on",
      sort_order,
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateService(initialData.id, data);
          if (res.error) {
            throw new Error(res.error);
          }
        } else {
          const res = await createService(data);
          if (res.error) {
            throw new Error(res.error);
          }
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
      {error ? (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <LocaleSection
          title="Lithuanian"
          description="Primary public content for LT routes."
        >
          <div className="space-y-2">
            <SlugInput
              sourceLabel="Title (LT)"
              slugLabel="Slug (LT)"
              sourceValue={titleLt}
              slugValue={slugLt}
              onSourceChange={handleTitleLtChange}
              onSlugChange={handleSlugLtChange}
              editState={slugLtEdited ? "manual" : "auto"}
              onRegenerate={handleRegenerateLt}
              placeholder="e.g. Vyru kirpimas"
              required
            />
            <input type="hidden" name="title_lt" value={titleLt} />
            <input type="hidden" name="slug_lt" value={slugLt} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description_lt">Short Description (LT)</Label>
            <Textarea
              id="short_description_lt"
              name="short_description_lt"
              defaultValue={initialData?.short_description_lt || ""}
              required
              rows={2}
            />
          </div>

          <div className="space-y-2">
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
            <Label htmlFor="benefits_lt">Benefits (LT)</Label>
            <Textarea
              id="benefits_lt"
              name="benefits_lt"
              defaultValue={formatStringList(initialData?.benefits_lt)}
              rows={4}
              placeholder={"One benefit per line\nTikslus konsultacijos etapas\nSvarus ir uztikrintas rezultatas"}
            />
            <p className="text-xs text-slate-500">One benefit per line.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq_lt">FAQ (LT)</Label>
            <Textarea
              id="faq_lt"
              name="faq_lt"
              defaultValue={formatFaqList(initialData?.faq_lt)}
              rows={5}
              placeholder={"One item per line: Klausimas | Atsakymas\nAr reikia registracijos? | Taip, rekomenduojame rezervuoti is anksto."}
            />
            <p className="text-xs text-slate-500">Format each line as `Question | Answer`.</p>
          </div>
        </LocaleSection>

        <LocaleSection
          title="English"
          description="Secondary public content for EN routes. Falls back to LT only when empty."
        >
          <div className="space-y-2">
            <SlugInput
              sourceLabel="Title (EN)"
              slugLabel="Slug (EN)"
              sourceValue={titleEn}
              slugValue={slugEn}
              onSourceChange={handleTitleEnChange}
              onSlugChange={handleSlugEnChange}
              editState={slugEnEdited ? "manual" : "auto"}
              onRegenerate={handleRegenerateEn}
              placeholder="e.g. Men's haircut"
            />
            <input type="hidden" name="title_en" value={titleEn} />
            <input type="hidden" name="slug_en" value={slugEn} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description_en">Short Description (EN)</Label>
            <Textarea
              id="short_description_en"
              name="short_description_en"
              defaultValue={initialData?.short_description_en || ""}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description_en">Full Description (EN)</Label>
            <Textarea
              id="full_description_en"
              name="full_description_en"
              defaultValue={initialData?.full_description_en || ""}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits_en">Benefits (EN)</Label>
            <Textarea
              id="benefits_en"
              name="benefits_en"
              defaultValue={formatStringList(initialData?.benefits_en)}
              rows={4}
              placeholder={"One benefit per line\nClear consultation stage\nPrecise and polished finish"}
            />
            <p className="text-xs text-slate-500">One benefit per line.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq_en">FAQ (EN)</Label>
            <Textarea
              id="faq_en"
              name="faq_en"
              defaultValue={formatFaqList(initialData?.faq_en)}
              rows={5}
              placeholder={"One item per line: Question | Answer\nDo I need to book in advance? | Yes, booking ahead is recommended."}
            />
            <p className="text-xs text-slate-500">Format each line as `Question | Answer`.</p>
          </div>
        </LocaleSection>
      </div>

      <section className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/60 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Shared service settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            These values are shared across both locales.
          </p>
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

        <div className="space-y-2 sm:col-span-2">
          <ImageUpload
            label="Service Cover Image"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            placeholder="https://res.cloudinary.com/.../service-cover.jpg"
          />
          <input type="hidden" name="cover_image_url" value={coverImageUrl} />
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

        <div className="sm:col-span-2 flex flex-wrap gap-8 pt-4">
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
      </section>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/services")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {initialData ? "Update Service" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
