import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BranchForm } from "../branch-form";

export const dynamic = "force-dynamic";

export default function NewBranchPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Create Branch"
        description="Add a new physical salon location to your website."
      />
      <BranchForm />
    </div>
  );
}
