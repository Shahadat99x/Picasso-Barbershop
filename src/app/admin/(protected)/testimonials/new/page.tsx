import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "../testimonial-form";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Testimonial"
        description="Add a new customer testimonial."
      />
      <TestimonialForm />
    </div>
  );
}
