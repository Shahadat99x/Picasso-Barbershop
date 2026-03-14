import Link from "next/link";
import { Edit2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getBranches } from "@/app/admin/actions/branches";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <div>
      <AdminPageHeader
        title="Branches"
        description="Manage your physical salon locations."
        action={{
          label: "New Branch",
          href: "/admin/branches/new",
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm shadow-black/5 sm:p-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-medium text-slate-500">Name (LT)</TableHead>
                <TableHead className="font-medium text-slate-500">Slug</TableHead>
                <TableHead className="font-medium text-slate-500">City</TableHead>
                <TableHead className="font-medium text-slate-500">Status</TableHead>
                <TableHead className="text-right font-medium text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-sm text-slate-500"
                  >
                    No branches found. Create your first branch to get started.
                  </TableCell>
                </TableRow>
              ) : (
                branches.map((branch) => (
                  <TableRow
                    key={branch.id}
                    className="border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {branch.name_lt}
                    </TableCell>
                    <TableCell className="text-slate-500">{branch.slug_lt}</TableCell>
                    <TableCell className="text-slate-500">{branch.city}</TableCell>
                    <TableCell>
                      {branch.is_active ? (
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
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8 text-slate-400 hover:text-slate-900"
                      >
                        <Link href={`/admin/branches/${branch.id}`}>
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit branch</span>
                        </Link>
                      </Button>
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
