import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSpecialist } from "@/app/admin/actions/specialists";
import { getBranches } from "@/app/admin/actions/branches";
import { SpecialistForm } from "../specialist-form";

export const dynamic = "force-dynamic";

export default async function EditSpecialistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const result = await Promise.all([
    getSpecialist(id),
    getBranches(),
  ]).catch(() => null);

  if (!result) {
    notFound();
  }
  
  const [specialist, branches] = result;

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit Specialist"
        description={`Update details for ${specialist.full_name}.`}
      />
      <SpecialistForm initialData={specialist} branches={branches} />
    </div>
  );
}
