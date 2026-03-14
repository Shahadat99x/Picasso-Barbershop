import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getGalleryItems } from "@/app/admin/actions/gallery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TranslationStatusBadge, calculateTranslationStatus } from "@/components/admin/TranslationStatusBadge";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Manage gallery items and visual work."
        action={{
          label: "New Gallery Item",
          href: "/admin/gallery/new",
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Image</TableHead>
                <TableHead className="font-medium text-slate-500">Title (LT)</TableHead>
                <TableHead className="font-medium text-slate-500">Category</TableHead>
                <TableHead className="font-medium text-slate-500">Translation</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No gallery items found. Create your first gallery item to get started.
                  </TableCell>
                </TableRow>
              ) : (
                galleryItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="w-20">
                      {item.image_url ? (
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={item.image_url}
                            alt={item.alt_text_lt || item.title_lt}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-slate-100" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {item.title_lt}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {item.category || "-"}
                    </TableCell>
                    <TableCell>
                      <TranslationStatusBadge status={calculateTranslationStatus(item.title_lt, item.title_en)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {item.is_featured && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                          >
                            Featured
                          </Badge>
                        )}
                        {item.is_visible ? (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          >
                            Visible
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 hover:bg-slate-100"
                          >
                            Hidden
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/gallery/${item.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit gallery item</span>
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
