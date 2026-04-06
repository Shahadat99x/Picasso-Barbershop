import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getBlogPosts } from "@/app/admin/actions/blog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TranslationStatusBadge } from "@/components/admin/TranslationStatusBadge";
import { calculateTranslationStatus } from "@/i18n/get-content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description="Manage blog articles and editorial content."
        action={{
          label: "New Blog Post",
          href: "/admin/blog/new",
        }}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm shadow-black/5 sm:rounded-[2rem] sm:p-2 md:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Title (LT)</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Category</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Author</TableHead>
                <TableHead className="hidden font-medium text-slate-500 lg:table-cell">Published</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Translation</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No blog posts found. Create your first blog post to get started.
                  </TableCell>
                </TableRow>
              ) : (
                blogPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {post.title_lt}
                    </TableCell>
                    <TableCell className="hidden text-slate-500 md:table-cell">{post.category}</TableCell>
                    <TableCell className="hidden text-slate-500 md:table-cell">{post.author_name}</TableCell>
                    <TableCell className="hidden text-slate-500 lg:table-cell">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("lt-LT")
                        : "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <TranslationStatusBadge status={calculateTranslationStatus(post.title_lt, post.title_en)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {post.is_featured && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                          >
                            Featured
                          </Badge>
                        )}
                        {post.is_published ? (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          >
                            Published
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 hover:bg-slate-100"
                          >
                            Draft
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit blog post</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
