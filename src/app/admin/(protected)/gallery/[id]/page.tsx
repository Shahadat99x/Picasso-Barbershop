import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getGalleryItem } from "@/app/admin/actions/gallery";
import { GalleryItemForm } from "../gallery-form";

export const dynamic = "force-dynamic";

interface EditGalleryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGalleryPage({ params }: EditGalleryPageProps) {
  const { id } = await params;
  const galleryItem = await getGalleryItem(id);

  if (!galleryItem) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Gallery Item"
        description="Update gallery item details."
      />
      <GalleryItemForm initialData={galleryItem} />
    </div>
  );
}
