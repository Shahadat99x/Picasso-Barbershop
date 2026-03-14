import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getPromotion } from "@/app/admin/actions/promotions";
import { PromotionForm } from "../promotion-form";

export const dynamic = "force-dynamic";

interface EditPromotionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPromotionPage({ params }: EditPromotionPageProps) {
  const { id } = await params;
  const promotion = await getPromotion(id);

  if (!promotion) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Promotion"
        description="Update promotion details."
      />
      <PromotionForm initialData={promotion} />
    </div>
  );
}
