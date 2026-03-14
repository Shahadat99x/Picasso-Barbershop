"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createBlogPost, updateBlogPost } from "@/app/admin/actions/blog";
import type { Database } from "@/lib/supabase/types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

export function BlogPostForm({ initialData }: { initialData?: BlogPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title_lt: formData.get("title_lt") as string,
      title_en: (formData.get("title_en") as string) || null,
      slug_lt: formData.get("slug_lt") as string,
      slug_en: (formData.get("slug_en") as string) || null,
      excerpt_lt: formData.get("excerpt_lt") as string,
      excerpt_en: (formData.get("excerpt_en") as string) || null,
      body_lt: formData.get("body_lt") as string,
      body_en: (formData.get("body_en") as string) || null,
      cover_image_url: (formData.get("cover_image_url") as string) || null,
      cover_alt_text_lt: (formData.get("cover_alt_text_lt") as string) || null,
      cover_alt_text_en: (formData.get("cover_alt_text_en") as string) || null,
      author_name: formData.get("author_name") as string,
      category: formData.get("category") as string,
      published_at: (formData.get("published_at") as string) || null,
      is_published: formData.get("is_published") === "on",
      is_featured: formData.get("is_featured") === "on",
    };

    startTransition(async () => {
      try {
        if (initialData?.id) {
          const res = await updateBlogPost(initialData.id, data);
          if (res.error) throw new Error(res.error);
        } else {
          const res = await createBlogPost(data);
          if (res.error) throw new Error(res.error);
        }
        router.push("/admin/blog");
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
            placeholder="e.g. Kaip prižiūrėti barzdą"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title_en">Title (EN)</Label>
          <Input
            id="title_en"
            name="title_en"
            defaultValue={initialData?.title_en || ""}
            placeholder="e.g. How to care for your beard"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug_lt">Slug (LT)</Label>
          <Input
            id="slug_lt"
            name="slug_lt"
            defaultValue={initialData?.slug_lt || ""}
            required
            placeholder="e.g. kaip-priziureti-barzda"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug_en">Slug (EN)</Label>
          <Input
            id="slug_en"
            name="slug_en"
            defaultValue={initialData?.slug_en || ""}
            placeholder="e.g. how-to-care-for-beard"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author_name">Author Name</Label>
          <Input
            id="author_name"
            name="author_name"
            defaultValue={initialData?.author_name || "Picasso Barber"}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            required
            placeholder="e.g. grooming, tips, style"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="excerpt_lt">Excerpt (LT)</Label>
          <Textarea
            id="excerpt_lt"
            name="excerpt_lt"
            defaultValue={initialData?.excerpt_lt || ""}
            required
            rows={3}
            placeholder="Short summary for the blog listing..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="excerpt_en">Excerpt (EN)</Label>
          <Textarea
            id="excerpt_en"
            name="excerpt_en"
            defaultValue={initialData?.excerpt_en || ""}
            rows={3}
            placeholder="Short summary for the blog listing..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="body_lt">Body (LT)</Label>
          <Textarea
            id="body_lt"
            name="body_lt"
            defaultValue={typeof initialData?.body_lt === "string" ? initialData.body_lt : ""}
            required
            rows={10}
            placeholder="Full article content in Lithuanian..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="body_en">Body (EN)</Label>
          <Textarea
            id="body_en"
            name="body_en"
            defaultValue={typeof initialData?.body_en === "string" ? initialData.body_en : ""}
            rows={10}
            placeholder="Full article content in English..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cover_image_url">Cover Image URL</Label>
          <Input
            id="cover_image_url"
            name="cover_image_url"
            defaultValue={initialData?.cover_image_url || ""}
            placeholder="https://res.cloudinary.com/.../cover.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover_alt_text_lt">Cover Alt Text (LT)</Label>
          <Input
            id="cover_alt_text_lt"
            name="cover_alt_text_lt"
            defaultValue={initialData?.cover_alt_text_lt || ""}
            placeholder="e.g. Barzdos priežiūros nuotrauka"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover_alt_text_en">Cover Alt Text (EN)</Label>
          <Input
            id="cover_alt_text_en"
            name="cover_alt_text_en"
            defaultValue={initialData?.cover_alt_text_en || ""}
            placeholder="e.g. Beard care photo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="published_at">Published Date</Label>
          <Input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={initialData?.published_at || ""}
          />
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="is_published"
            name="is_published"
            defaultChecked={initialData?.is_published ?? false}
          />
          <Label htmlFor="is_published">Published</Label>
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

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Blog Post" : "Create Blog Post"}
        </Button>
      </div>
    </form>
  );
}
