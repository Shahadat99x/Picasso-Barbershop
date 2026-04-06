import Link from "next/link";
import { Edit2, Star } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getTestimonials } from "@/app/admin/actions/testimonials";
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

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Manage customer testimonials and reviews."
        action={{
          label: "New Testimonial",
          href: "/admin/testimonials/new",
        }}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm shadow-black/5 sm:rounded-[2rem] sm:p-2 md:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Customer</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Quote (LT)</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Rating</TableHead>
                <TableHead className="hidden font-medium text-slate-500 md:table-cell">Translation</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No testimonials found. Add your first testimonial to get started.
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow
                    key={testimonial.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {testimonial.customer_name}
                    </TableCell>
                    <TableCell className="hidden max-w-xs text-slate-500 md:table-cell">
                      <div className="truncate">{testimonial.quote_lt}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        {testimonial.rating && (
                          <>
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{testimonial.rating}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <TranslationStatusBadge status={calculateTranslationStatus(testimonial.quote_lt, testimonial.quote_en)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {testimonial.is_featured && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                          >
                            Featured
                          </Badge>
                        )}
                        {testimonial.is_visible ? (
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
                        href={`/admin/testimonials/${testimonial.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit testimonial</span>
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
