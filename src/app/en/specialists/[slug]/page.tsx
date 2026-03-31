import type { Metadata } from "next";

import {
  generateSpecialistProfileMetadata,
  getSpecialistProfileStaticParams,
  SpecialistProfilePage,
} from "@/components/public/page/specialist-profile-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getSpecialistProfileStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateSpecialistProfileMetadata("en", slug);
}

export default async function EnSpecialistProfileRoute({ params }: PageProps) {
  const { slug } = await params;
  return <SpecialistProfilePage locale="en" slug={slug} />;
}
