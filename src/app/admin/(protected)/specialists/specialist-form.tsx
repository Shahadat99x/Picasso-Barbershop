"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { createSpecialist, updateSpecialist } from "@/app/admin/actions/specialists";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SlugInput } from "@/components/admin/SlugInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { formatStringList, parseStringList } from "@/lib/admin/form-content";
import type { Database } from "@/lib/supabase/types";
import { generateSlug } from "@/lib/utils/slug";

type Specialist = Database["public"]["Tables"]["specialists"]["Row"];
type Branch = Pick<Database["public"]["Tables"]["branches"]["Row"], "id" | "name_lt" | "name_en">;
const UNASSIGNED_BRANCH = "__none__";

function FormSection({
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

export function SpecialistForm({
  initialData,
  branches,
}: {
  initialData?: Specialist;
  branches: Branch[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState(initialData?.full_name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(initialData?.photo_url || "");

  const handleNameChange = (value: string) => {
    setFullName(value);

    if (!slugEdited && value) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugEdited(true);
    setSlug(value);
  };

  const handleRegenerateSlug = () => {
    setSlugEdited(false);
    setSlug(generateSlug(fullName));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const rawYears = formData.get("years_experience") as string;
    const years_experience = rawYears ? parseInt(rawYears, 10) : null;
    const rawSortOrder = formData.get("sort_order") as string;
    const sort_order = rawSortOrder ? parseInt(rawSortOrder, 10) : 0;
    const rawBranchId = formData.get("branch_id") as string;
    const branch_id = rawBranchId && rawBranchId !== UNASSIGNED_BRANCH ? rawBranchId : null;

    const data = {
      full_name: formData.get("full_name") as string,
      slug: formData.get("slug") as string,
      role_lt: formData.get("role_lt") as string,
      role_en: (formData.get("role_en") as string) || null,
      bio_lt: (formData.get("bio_lt") as string) || null,
      bio_en: (formData.get("bio_en") as string) || null,
      specialties_lt: parseStringList(formData.get("specialties_lt") as string),
      specialties_en: parseStringList(formData.get("specialties_en") as string),
      photo_url: (formData.get("photo_url") as string) || null,
      years_experience,
      branch_id,
      is_active: formData.get("is_active") === "on",
      is_featured: formData.get("is_featured") === "on",
      sort_order,
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateSpecialist(initialData.id, data);
          if (res.error) {
            throw new Error(res.error);
          }
        } else {
          const res = await createSpecialist(data);
          if (res.error) {
            throw new Error(res.error);
          }
        }

        router.push("/admin/specialists");
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

      <FormSection
        title="Basic info"
        description="Shared public identity fields used across both languages."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(15rem,1fr)]">
          <div className="space-y-2">
            <SlugInput
              sourceLabel="Name"
              slugLabel="Slug"
              sourceValue={fullName}
              slugValue={slug}
              onSourceChange={handleNameChange}
              onSlugChange={handleSlugChange}
              editState={slugEdited ? "manual" : "auto"}
              onRegenerate={handleRegenerateSlug}
              placeholder="e.g. Tomas Petrauskas"
              required
            />
            <input type="hidden" name="full_name" value={fullName} />
            <input type="hidden" name="slug" value={slug} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_experience">Years of experience</Label>
            <Input
              id="years_experience"
              name="years_experience"
              type="number"
              min={0}
              defaultValue={initialData?.years_experience ?? ""}
              placeholder="5"
            />
            <p className="text-xs text-slate-500">
              Structured experience value used for concise public profile summaries.
            </p>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Photo"
        description="Upload or paste a Cloudinary image URL for the specialist profile photo."
      >
        <div className="max-w-xl space-y-2">
          <ImageUpload
            label="Profile photo"
            value={photoUrl}
            onChange={setPhotoUrl}
            placeholder="https://res.cloudinary.com/..."
          />
          <input type="hidden" name="photo_url" value={photoUrl} />
        </div>
      </FormSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <FormSection
          title="Lithuanian content"
          description="Primary public-facing copy for LT routes."
        >
          <div className="space-y-2">
            <Label htmlFor="role_lt">Role / title (LT)</Label>
            <Input
              id="role_lt"
              name="role_lt"
              defaultValue={initialData?.role_lt || ""}
              required
              placeholder="Vyriausiasis kirpejas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio_lt">Short bio (LT)</Label>
            <Textarea
              id="bio_lt"
              name="bio_lt"
              defaultValue={initialData?.bio_lt || ""}
              rows={4}
              placeholder="Trumpas specialisto aprasas..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties_lt">Specialties (LT)</Label>
            <Textarea
              id="specialties_lt"
              name="specialties_lt"
              defaultValue={formatStringList(initialData?.specialties_lt)}
              rows={4}
              placeholder={"One specialty per line\nFade kirpimai\nBarzdos formavimas"}
            />
            <p className="text-xs text-slate-500">One specialty per line.</p>
          </div>
        </FormSection>

        <FormSection
          title="English content"
          description="Secondary public-facing copy for EN routes. Empty fields fall back to LT."
        >
          <div className="space-y-2">
            <Label htmlFor="role_en">Role / title (EN)</Label>
            <Input
              id="role_en"
              name="role_en"
              defaultValue={initialData?.role_en || ""}
              placeholder="Senior barber"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio_en">Short bio (EN)</Label>
            <Textarea
              id="bio_en"
              name="bio_en"
              defaultValue={initialData?.bio_en || ""}
              rows={4}
              placeholder="Short specialist summary..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties_en">Specialties (EN)</Label>
            <Textarea
              id="specialties_en"
              name="specialties_en"
              defaultValue={formatStringList(initialData?.specialties_en)}
              rows={4}
              placeholder={"One specialty per line\nFade cuts\nBeard shaping"}
            />
            <p className="text-xs text-slate-500">One specialty per line.</p>
          </div>
        </FormSection>
      </div>

      <FormSection
        title="Branch, ordering, and visibility"
        description="Assign the specialist to a branch and control public ordering or homepage priority."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="branch_id">Primary branch</Label>
            <Select
              name="branch_id"
              defaultValue={initialData?.branch_id || UNASSIGNED_BRANCH}
            >
              <SelectTrigger id="branch_id">
                <SelectValue placeholder="Select a branch (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UNASSIGNED_BRANCH}>No primary branch</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name_lt}
                    {branch.name_en ? ` / ${branch.name_en}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort order</Label>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order ?? 0}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              name="is_active"
              defaultChecked={initialData?.is_active ?? true}
            />
            <Label htmlFor="is_active">Publicly active</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              name="is_featured"
              defaultChecked={initialData?.is_featured ?? false}
            />
            <Label htmlFor="is_featured">Featured on homepage</Label>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/specialists")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {initialData ? "Update Specialist" : "Create Specialist"}
        </Button>
      </div>
    </form>
  );
}
