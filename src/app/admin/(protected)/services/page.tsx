import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getServices } from "@/app/admin/actions/services";
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

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Manage your salon's service offerings."
        action={{
          label: "New Service",
          href: "/admin/services/new",
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Title (LT)</TableHead>
                <TableHead className="font-medium text-slate-500">Category</TableHead>
                <TableHead className="font-medium text-slate-500">Translation</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="font-medium text-slate-500">Featured</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No services found. Create your first service to get started.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow
                    key={service.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {service.title_lt}
                    </TableCell>
                    <TableCell className="text-slate-500">{service.category}</TableCell>
                    <TableCell>
                      <TranslationStatusBadge status={calculateTranslationStatus(service.title_lt, service.title_en)} />
                    </TableCell>
                    <TableCell>
                      {service.is_published ? (
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
                    </TableCell>
                    <TableCell>
                      {service.is_featured && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                        >
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit service</span>
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
