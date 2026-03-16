"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { createBranch, updateBranch } from "@/app/admin/actions/branches";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SlugInput } from "@/components/admin/SlugInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  formatOpeningHoursList,
  formatStringList,
  parseOpeningHoursList,
  parseStringList,
} from "@/lib/admin/form-content";
import type { Database } from "@/lib/supabase/types";
import { generateSlug } from "@/lib/utils/slug";

type Branch = Database["public"]["Tables"]["branches"]["Row"];

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

export function BranchForm({ initialData }: { initialData?: Branch }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [nameLt, setNameLt] = useState(initialData?.name_lt || "");
  const [slugLt, setSlugLt] = useState(initialData?.slug_lt || "");
  const [slugLtEdited, setSlugLtEdited] = useState(false);
  const [nameEn, setNameEn] = useState(initialData?.name_en || "");
  const [slugEn, setSlugEn] = useState(initialData?.slug_en || "");
  const [slugEnEdited, setSlugEnEdited] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || "");

  const handleNameLtChange = (value: string) => {
    setNameLt(value);
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
    setSlugLt(generateSlug(nameLt));
  };

  const handleNameEnChange = (value: string) => {
    setNameEn(value);
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
    setSlugEn(generateSlug(nameEn));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name_lt: formData.get("name_lt") as string,
      name_en: (formData.get("name_en") as string) || null,
      slug_lt: formData.get("slug_lt") as string,
      slug_en: (formData.get("slug_en") as string) || null,
      short_description_lt: formData.get("short_description_lt") as string,
      short_description_en: (formData.get("short_description_en") as string) || null,
      full_description_lt: formData.get("full_description_lt") as string,
      full_description_en: (formData.get("full_description_en") as string) || null,
      address_lt: formData.get("address_lt") as string,
      address_en: (formData.get("address_en") as string) || null,
      parking_info_lt: (formData.get("parking_info_lt") as string) || null,
      parking_info_en: (formData.get("parking_info_en") as string) || null,
      transport_info_lt: (formData.get("transport_info_lt") as string) || null,
      transport_info_en: (formData.get("transport_info_en") as string) || null,
      trust_points_lt: parseStringList(formData.get("trust_points_lt") as string),
      trust_points_en: parseStringList(formData.get("trust_points_en") as string),
      opening_hours_json: parseOpeningHoursList(formData.get("opening_hours_json") as string),
      city: (formData.get("city") as string) || "Vilnius",
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      map_url: (formData.get("map_url") as string) || null,
      booking_url: (formData.get("booking_url") as string) || null,
      cover_image_url: (formData.get("cover_image_url") as string) || null,
      is_active: formData.get("is_active") === "on",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateBranch(initialData.id, data);
          if (res.error) {
            throw new Error(res.error);
          }
        } else {
          const res = await createBranch(data);
          if (res.error) {
            throw new Error(res.error);
          }
        }

        router.push("/admin/branches");
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
              sourceLabel="Name (LT)"
              slugLabel="Slug (LT)"
              sourceValue={nameLt}
              slugValue={slugLt}
              onSourceChange={handleNameLtChange}
              onSlugChange={handleSlugLtChange}
              editState={slugLtEdited ? "manual" : "auto"}
              onRegenerate={handleRegenerateLt}
              placeholder="e.g. Centro filialas"
              required
            />
            <input type="hidden" name="name_lt" value={nameLt} />
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
            <Label htmlFor="address_lt">Address (LT)</Label>
            <Input
              id="address_lt"
              name="address_lt"
              defaultValue={initialData?.address_lt || ""}
              required
              placeholder="Gedimino pr. 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parking_info_lt">Parking Info (LT)</Label>
            <Textarea
              id="parking_info_lt"
              name="parking_info_lt"
              defaultValue={initialData?.parking_info_lt || ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transport_info_lt">Transport Info (LT)</Label>
            <Textarea
              id="transport_info_lt"
              name="transport_info_lt"
              defaultValue={initialData?.transport_info_lt || ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trust_points_lt">Trust Points (LT)</Label>
            <Textarea
              id="trust_points_lt"
              name="trust_points_lt"
              defaultValue={formatStringList(initialData?.trust_points_lt)}
              rows={4}
              placeholder={"One point per line\nPatogi vieta centre\nGreitas rezervacijos kelias"}
            />
            <p className="text-xs text-slate-500">One trust point per line.</p>
          </div>
        </LocaleSection>

        <LocaleSection
          title="English"
          description="Secondary public content for EN routes. Falls back to LT only when empty."
        >
          <div className="space-y-2">
            <SlugInput
              sourceLabel="Name (EN)"
              slugLabel="Slug (EN)"
              sourceValue={nameEn}
              slugValue={slugEn}
              onSourceChange={handleNameEnChange}
              onSlugChange={handleSlugEnChange}
              editState={slugEnEdited ? "manual" : "auto"}
              onRegenerate={handleRegenerateEn}
              placeholder="e.g. Central branch"
            />
            <input type="hidden" name="name_en" value={nameEn} />
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
            <Label htmlFor="address_en">Address (EN)</Label>
            <Input
              id="address_en"
              name="address_en"
              defaultValue={initialData?.address_en || ""}
              placeholder="Gediminas Ave. 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parking_info_en">Parking Info (EN)</Label>
            <Textarea
              id="parking_info_en"
              name="parking_info_en"
              defaultValue={initialData?.parking_info_en || ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transport_info_en">Transport Info (EN)</Label>
            <Textarea
              id="transport_info_en"
              name="transport_info_en"
              defaultValue={initialData?.transport_info_en || ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trust_points_en">Trust Points (EN)</Label>
            <Textarea
              id="trust_points_en"
              name="trust_points_en"
              defaultValue={formatStringList(initialData?.trust_points_en)}
              rows={4}
              placeholder={"One point per line\nCentral location\nFast booking path"}
            />
            <p className="text-xs text-slate-500">One trust point per line.</p>
          </div>
        </LocaleSection>
      </div>

      <section className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/60 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Shared branch settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            These values are shared across both locales.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            defaultValue={initialData?.city || "Vilnius"}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={initialData?.phone || ""}
            required
            placeholder="+370 600 00000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email || ""}
            placeholder="info@picasso.lt"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="map_url">Map URL</Label>
          <Input
            id="map_url"
            name="map_url"
            defaultValue={initialData?.map_url || ""}
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="booking_url">Booking URL</Label>
          <Input
            id="booking_url"
            name="booking_url"
            defaultValue={initialData?.booking_url || ""}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="opening_hours_json">Opening Hours</Label>
          <Textarea
            id="opening_hours_json"
            name="opening_hours_json"
            defaultValue={formatOpeningHoursList(initialData?.opening_hours_json)}
            rows={7}
            placeholder={"One line per entry: Day | Time\nPirmadienis | 09:00 - 18:00\nAntradienis | 09:00 - 18:00"}
          />
          <p className="text-xs text-slate-500">
            Format each line as `Day | Time`. Day names are normalized for LT and EN display.
          </p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <ImageUpload
            label="Branch Cover Image"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
            placeholder="https://res.cloudinary.com/.../branch-cover.jpg"
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

        <div className="sm:col-span-2 flex items-center space-x-2 pt-4">
          <Switch
            id="is_active"
            name="is_active"
            defaultChecked={initialData?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active (Visible to public)</Label>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/branches")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {initialData ? "Update Branch" : "Create Branch"}
        </Button>
      </div>
    </form>
  );
}
