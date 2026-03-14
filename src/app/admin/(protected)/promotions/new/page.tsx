import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PromotionForm } from "../promotion-form";

export const dynamic = "force-dynamic";

export default function NewPromotionPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Promotion"
        description="Create a new promotion or special offer."
      />
      <PromotionForm />
    </div>
  );
}
