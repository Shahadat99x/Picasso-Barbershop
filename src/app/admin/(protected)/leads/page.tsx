import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getLeads } from "@/app/admin/actions/leads";
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

const STATUS_LABELS: Record<string, string> = {
  new: "Naujas",
  in_progress: "Vykdomas",
  answered: "Atsakyta",
  closed: "Uždarytas",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  answered: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-100 text-slate-600",
};

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        description="Review contact form submissions and inquiries."
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Name</TableHead>
                <TableHead className="font-medium text-slate-500">Contact</TableHead>
                <TableHead className="font-medium text-slate-500">Source</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="font-medium text-slate-500">Date</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No leads found. Contact form submissions will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {lead.full_name}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      <div className="text-sm">{lead.email || "-"}</div>
                      <div className="text-xs text-slate-400">{lead.phone || "-"}</div>
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {lead.source_page || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn("hover:bg-opacity-100", STATUS_COLORS[lead.status] || STATUS_COLORS.new)}
                      >
                        {STATUS_LABELS[lead.status] || lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("lt-LT")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-8 w-8 text-slate-400 hover:text-slate-900"
                        )}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">View lead</span>
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
