"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createSpecialist, updateSpecialist } from "@/app/admin/actions/specialists";
import type { Database } from "@/lib/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Specialist = Database["public"]["Tables"]["specialists"]["Row"];
type Branch = Pick<Database["public"]["Tables"]["branches"]["Row"], "id" | "name_lt">;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Parse numeric fields safely
    const rawYears = formData.get("years_experience") as string;
    const years_experience = rawYears ? parseInt(rawYears, 10) : null;

    const rawSortOrder = formData.get("sort_order") as string;
    const sort_order = rawSortOrder ? parseInt(rawSortOrder, 10) : 0;

    const branch_id = (formData.get("branch_id") as string) || null;

    const data = {
      full_name: formData.get("full_name") as string,
      role_lt: formData.get("role_lt") as string,
      bio_lt: (formData.get("bio_lt") as string) || null,
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
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createSpecialist(data);
          if (res.error) throw new Error(res.error);
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
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={initialData?.full_name || ""}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role_lt">Role (LT)</Label>
          <Input
            id="role_lt"
            name="role_lt"
            defaultValue={initialData?.role_lt || ""}
            required
            placeholder="Vyriausiasis kirpėjas"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="bio_lt">Bio (LT)</Label>
          <Textarea
            id="bio_lt"
            name="bio_lt"
            defaultValue={initialData?.bio_lt || ""}
            rows={3}
            placeholder="Optional biography..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo_url">Photo URL (Cloudinary)</Label>
          <Input
            id="photo_url"
            name="photo_url"
            defaultValue={initialData?.photo_url || ""}
            placeholder="https://res.cloudinary.com/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years_experience">Years of Experience</Label>
          <Input
            id="years_experience"
            name="years_experience"
            type="number"
            defaultValue={initialData?.years_experience ?? ""}
            placeholder="5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch_id">Primary Branch</Label>
          <Select name="branch_id" defaultValue={initialData?.branch_id || undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Select a branch (optional)" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name_lt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              id="is_active"
              name="is_active"
              defaultChecked={initialData?.is_active ?? true}
            />
            <Label htmlFor="is_active">Active</Label>
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
          onClick={() => router.push("/admin/specialists")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Specialist" : "Create Specialist"}
        </Button>
      </div>
    </form>
  );
}
