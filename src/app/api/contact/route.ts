import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import {
  initialPublicContactFormState,
  savePublicContactLead,
  type PublicContactLocale,
  type PublicContactValues,
} from "@/lib/public-contact";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = (getStringValue(formData, "locale") || "lt") as PublicContactLocale;
  const sourcePage = getStringValue(formData, "sourcePage");
  const values: PublicContactValues = {
    fullName: getStringValue(formData, "fullName"),
    email: getStringValue(formData, "email"),
    phone: getStringValue(formData, "phone"),
    preferredBranchId: getStringValue(formData, "preferredBranchId"),
    message: getStringValue(formData, "message"),
  };

  const state = await savePublicContactLead({
    locale,
    values,
    sourcePage,
  });

  if (state.status === "success") {
    revalidatePath("/admin/leads");
  }

  return NextResponse.json({
    ...state,
    values:
      state.status === "success" ? initialPublicContactFormState.values : state.values,
  });
}
