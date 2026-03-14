import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getService } from "@/app/admin/actions/services";
import { ServiceForm } from "../service-form";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const service = await getService(id).catch(() => null);

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit Service"
        description={`Update details for ${service.title_lt}.`}
      />
      <ServiceForm initialData={service} />
    </div>
  );
}
