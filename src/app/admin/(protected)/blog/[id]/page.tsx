import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getBlogPost } from "@/app/admin/actions/blog";
import { BlogPostForm } from "../blog-form";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blogPost = await getBlogPost(id);

  if (!blogPost) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Blog Post"
        description="Update blog article details."
      />
      <BlogPostForm initialData={blogPost} />
    </div>
  );
}
