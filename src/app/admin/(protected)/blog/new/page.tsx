import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BlogPostForm } from "../blog-form";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Blog Post"
        description="Create a new blog article."
      />
      <BlogPostForm />
    </div>
  );
}
