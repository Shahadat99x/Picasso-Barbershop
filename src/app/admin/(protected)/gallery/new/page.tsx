import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { GalleryItemForm } from "../gallery-form";

export const dynamic = "force-dynamic";

export default function NewGalleryPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Gallery Item"
        description="Add a new image to the gallery."
      />
      <GalleryItemForm />
    </div>
  );
}
