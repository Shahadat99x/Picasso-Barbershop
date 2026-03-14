import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSpecialists } from "@/app/admin/actions/specialists";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SpecialistsPage() {
  const specialists = await getSpecialists();

  return (
    <div>
      <AdminPageHeader
        title="Specialists"
        description="Manage your salon's professional team."
        action={{
          label: "New Specialist",
          href: "/admin/specialists/new",
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Name</TableHead>
                <TableHead className="font-medium text-slate-500">Role</TableHead>
                <TableHead className="font-medium text-slate-500">Branch</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="font-medium text-slate-500">Featured</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialists.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No specialists found. Create your first team member to get started.
                  </TableCell>
                </TableRow>
              ) : (
                specialists.map((specialist) => (
                  <TableRow
                    key={specialist.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {specialist.full_name}
                    </TableCell>
                    <TableCell className="text-slate-500">{specialist.role_lt}</TableCell>
                    <TableCell className="text-slate-500">
                      {specialist.branches?.name_lt || "None"}
                    </TableCell>
                    <TableCell>
                      {specialist.is_active ? (
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
                    </TableCell>
                    <TableCell>
                      {specialist.is_featured && (
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
                        href={`/admin/specialists/${specialist.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-8 w-8 text-slate-400 hover:text-slate-900"
                        )}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit specialist</span>
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
