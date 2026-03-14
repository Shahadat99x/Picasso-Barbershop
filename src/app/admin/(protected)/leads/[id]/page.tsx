import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getLead } from "@/app/admin/actions/leads";
import { LeadForm } from "../lead-form";

export const dynamic = "force-dynamic";

interface LeadDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLead(id);

  if (!lead) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        title="Lead Details"
        description="View and manage lead details."
      />
      <LeadForm initialData={lead} />
    </div>
  );
}
