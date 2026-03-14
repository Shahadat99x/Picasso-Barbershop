import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getBranches } from "@/app/admin/actions/branches";
import { SpecialistForm } from "../specialist-form";

export const dynamic = "force-dynamic";

export default async function NewSpecialistPage() {
  const branches = await getBranches();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Create Specialist"
        description="Add a new team member."
      />
      <SpecialistForm branches={branches} />
    </div>
  );
}
