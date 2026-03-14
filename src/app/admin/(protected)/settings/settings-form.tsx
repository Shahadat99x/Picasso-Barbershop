"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteSettings } from "@/app/admin/actions/settings";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Database } from "@/lib/supabase/types";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export function SettingsForm({ initialData }: { initialData?: SiteSettings | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialData?.logo_url || "");
  const [faviconUrl, setFaviconUrl] = useState(initialData?.favicon_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      business_name: formData.get("business_name") as string,
      default_phone: (formData.get("default_phone") as string) || null,
      default_email: (formData.get("default_email") as string) || null,
      logo_url: (formData.get("logo_url") as string) || null,
      favicon_url: (formData.get("favicon_url") as string) || null,
      social_instagram: (formData.get("social_instagram") as string) || null,
      social_facebook: (formData.get("social_facebook") as string) || null,
      social_tiktok: (formData.get("social_tiktok") as string) || null,
      footer_text_lt: (formData.get("footer_text_lt") as string) || null,
      footer_text_en: (formData.get("footer_text_en") as string) || null,
      default_meta_title_lt: (formData.get("default_meta_title_lt") as string) || null,
      default_meta_title_en: (formData.get("default_meta_title_en") as string) || null,
      default_meta_description_lt: (formData.get("default_meta_description_lt") as string) || null,
      default_meta_description_en: (formData.get("default_meta_description_en") as string) || null,
      analytics_ga4_id: (formData.get("analytics_ga4_id") as string) || null,
      theme_color: (formData.get("theme_color") as string) || null,
    };

    startTransition(async () => {
      try {
        const res = await updateSiteSettings(data);
        if (res.error) throw new Error(res.error);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
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

      {success && (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-600">
          Settings saved successfully!
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="business_name">Business Name</Label>
          <Input
            id="business_name"
            name="business_name"
            defaultValue={initialData?.business_name || ""}
            required
            placeholder="Picasso Barber"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme_color">Theme Color</Label>
          <Input
            id="theme_color"
            name="theme_color"
            defaultValue={initialData?.theme_color || ""}
            placeholder="#000000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="default_phone">Default Phone</Label>
          <Input
            id="default_phone"
            name="default_phone"
            defaultValue={initialData?.default_phone || ""}
            placeholder="+370 600 00000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="default_email">Default Email</Label>
          <Input
            id="default_email"
            name="default_email"
            type="email"
            defaultValue={initialData?.default_email || ""}
            placeholder="info@picasso.lt"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <ImageUpload
            label="Logo"
            value={logoUrl}
            onChange={setLogoUrl}
            placeholder="https://res.cloudinary.com/.../logo.png"
          />
          <input type="hidden" name="logo_url" value={logoUrl} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <ImageUpload
            label="Favicon"
            value={faviconUrl}
            onChange={setFaviconUrl}
            placeholder="https://res.cloudinary.com/.../favicon.ico"
          />
          <input type="hidden" name="favicon_url" value={faviconUrl} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_instagram">Instagram</Label>
          <Input
            id="social_instagram"
            name="social_instagram"
            defaultValue={initialData?.social_instagram || ""}
            placeholder="@picassobarber"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_facebook">Facebook</Label>
          <Input
            id="social_facebook"
            name="social_facebook"
            defaultValue={initialData?.social_facebook || ""}
            placeholder="https://facebook.com/picasso"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_tiktok">TikTok</Label>
          <Input
            id="social_tiktok"
            name="social_tiktok"
            defaultValue={initialData?.social_tiktok || ""}
            placeholder="@picassobarber"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="analytics_ga4_id">GA4 Analytics ID</Label>
          <Input
            id="analytics_ga4_id"
            name="analytics_ga4_id"
            defaultValue={initialData?.analytics_ga4_id || ""}
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="footer_text_lt">Footer Text (LT)</Label>
          <Textarea
            id="footer_text_lt"
            name="footer_text_lt"
            defaultValue={initialData?.footer_text_lt || ""}
            rows={3}
            placeholder="© 2024 Picasso Barber. All rights reserved."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="footer_text_en">Footer Text (EN)</Label>
          <Textarea
            id="footer_text_en"
            name="footer_text_en"
            defaultValue={initialData?.footer_text_en || ""}
            rows={3}
            placeholder="© 2024 Picasso Barber. All rights reserved."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="default_meta_title_lt">Default Meta Title (LT)</Label>
          <Input
            id="default_meta_title_lt"
            name="default_meta_title_lt"
            defaultValue={initialData?.default_meta_title_lt || ""}
            placeholder="Picasso Barber - Premium kirpykla Vilniuje"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="default_meta_title_en">Default Meta Title (EN)</Label>
          <Input
            id="default_meta_title_en"
            name="default_meta_title_en"
            defaultValue={initialData?.default_meta_title_en || ""}
            placeholder="Picasso Barber - Premium Barbershop in Vilnius"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="default_meta_description_lt">Default Meta Description (LT)</Label>
          <Textarea
            id="default_meta_description_lt"
            name="default_meta_description_lt"
            defaultValue={initialData?.default_meta_description_lt || ""}
            rows={2}
            placeholder="Premium kirpykla Vilniuje. Modernus kirpimas, barzdos styling ir profesionali komanda."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="default_meta_description_en">Default Meta Description (EN)</Label>
          <Textarea
            id="default_meta_description_en"
            name="default_meta_description_en"
            defaultValue={initialData?.default_meta_description_en || ""}
            rows={2}
            placeholder="Premium barbershop in Vilnius. Modern haircuts, beard styling and professional team."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Settings
        </Button>
      </div>
    </form>
  );
}
