"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createBranch, updateBranch } from "@/app/admin/actions/branches";
import type { Database } from "@/lib/supabase/types";

type Branch = Database["public"]["Tables"]["branches"]["Row"];

export function BranchForm({ initialData }: { initialData?: Branch }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name_lt: formData.get("name_lt") as string,
      slug_lt: formData.get("slug_lt") as string,
      short_description_lt: formData.get("short_description_lt") as string,
      full_description_lt: formData.get("full_description_lt") as string,
      address_lt: formData.get("address_lt") as string,
      city: (formData.get("city") as string) || "Vilnius",
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      is_active: formData.get("is_active") === "on",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateBranch(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createBranch(data);
          if (res.error) throw new Error(res.error);
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
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name_lt">Name (LT)</Label>
          <Input
            id="name_lt"
            name="name_lt"
            defaultValue={initialData?.name_lt || ""}
            required
            placeholder="e.g. Centro filialas"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug_lt">Slug (LT)</Label>
          <Input
            id="slug_lt"
            name="slug_lt"
            defaultValue={initialData?.slug_lt || ""}
            required
            placeholder="e.g. centro-filialas"
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
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email || ""}
            placeholder="info@picasso.lt"
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

        <div className="flex items-center space-x-2 pt-8 sm:col-span-2">
          <Switch
            id="is_active"
            name="is_active"
            defaultChecked={initialData?.is_active ?? true}
          />
          <Label htmlFor="is_active">Active (Visible to public)</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/branches")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Branch" : "Create Branch"}
        </Button>
      </div>
    </form>
  );
}
