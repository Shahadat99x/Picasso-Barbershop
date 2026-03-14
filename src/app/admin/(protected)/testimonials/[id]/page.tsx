import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getTestimonial } from "@/app/admin/actions/testimonials";
import { TestimonialForm } from "../testimonial-form";

export const dynamic = "force-dynamic";

interface EditTestimonialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonial(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Testimonial"
        description="Update testimonial details."
      />
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
