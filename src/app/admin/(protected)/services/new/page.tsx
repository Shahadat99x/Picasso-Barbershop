import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceForm } from "../service-form";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Create Service"
        description="Add a new salon service to your catalog."
      />
      <ServiceForm />
    </div>
  );
}
