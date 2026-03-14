import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getPromotions } from "@/app/admin/actions/promotions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const promotions = await getPromotions();

  return (
    <div>
      <AdminPageHeader
        title="Promotions"
        description="Manage special offers and campaigns."
        action={{
          label: "New Promotion",
          href: "/admin/promotions/new",
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Title (LT)</TableHead>
                <TableHead className="font-medium text-slate-500">Discount</TableHead>
                <TableHead className="font-medium text-slate-500">Dates</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No promotions found. Create your first promotion to get started.
                  </TableCell>
                </TableRow>
              ) : (
                promotions.map((promo) => (
                  <TableRow
                    key={promo.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {promo.title_lt}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {promo.discount_label_lt || "-"}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {promo.starts_at && promo.ends_at
                        ? `${new Date(promo.starts_at).toLocaleDateString("lt-LT")} - ${new Date(promo.ends_at).toLocaleDateString("lt-LT")}`
                        : promo.starts_at
                          ? `From ${new Date(promo.starts_at).toLocaleDateString("lt-LT")}`
                          : promo.ends_at
                            ? `Until ${new Date(promo.ends_at).toLocaleDateString("lt-LT")}`
                            : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {promo.is_featured && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                          >
                            Featured
                          </Badge>
                        )}
                        {promo.is_active ? (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 hover:bg-slate-100"
                          >
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/promotions/${promo.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-8 w-8 text-slate-400 hover:text-slate-900"
                        )}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit promotion</span>
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
