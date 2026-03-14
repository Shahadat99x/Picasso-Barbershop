import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getBranch } from "@/app/admin/actions/branches";
import { BranchForm } from "../branch-form";

export const dynamic = "force-dynamic";

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    const branch = await getBranch(id);

    return (
      <div className="mx-auto max-w-3xl">
        <AdminPageHeader
          title="Edit Branch"
          description={`Update details for ${branch.name_lt}.`}
        />
        <BranchForm initialData={branch} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
