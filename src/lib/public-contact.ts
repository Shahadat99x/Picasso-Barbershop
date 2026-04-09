import { hasSupabaseAdminEnv } from "@/lib/supabase/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type PublicContactLocale = "lt" | "en";

export type PublicContactField = "fullName" | "email" | "phone" | "message";

export type PublicContactValues = {
  fullName: string;
  email: string;
  phone: string;
  preferredBranchId: string;
  message: string;
};

export type PublicContactFormState = {
  status: "idle" | "error" | "success";
  message: string | null;
  fieldErrors: Partial<Record<PublicContactField, string>>;
  values: PublicContactValues;
};

export const initialPublicContactFormState: PublicContactFormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  values: {
    fullName: "",
    email: "",
    phone: "",
    preferredBranchId: "",
    message: "",
  },
};

export function getLocalizedContactMessage(
  locale: PublicContactLocale,
  key: "missingEnv" | "invalid" | "success" | "saveError",
) {
  const messages = {
    lt: {
      missingEnv: "Uzklausos siuo metu issaugoti nepavyko. Susisiekite telefonu arba el. pastu.",
      invalid: "Patikslinkite pazymetus laukus ir bandykite dar karta.",
      success: "Aciu, jusu zinute issiusta. Su jumis susisieksime artimiausiu metu.",
      saveError: "Nepavyko issaugoti uzklausos. Bandykite dar karta arba susisiekite tiesiogiai.",
    },
    en: {
      missingEnv: "We could not save your enquiry right now. Please contact us by phone or email.",
      invalid: "Please review the highlighted fields and try again.",
      success: "Thanks, your message has been sent. We will get back to you soon.",
      saveError: "We could not save your enquiry. Please try again or contact us directly.",
    },
  } satisfies Record<PublicContactLocale, Record<string, string>>;

  return messages[locale][key];
}

export function validatePublicContactValues(
  values: PublicContactValues,
  locale: PublicContactLocale,
) {
  const fieldErrors: PublicContactFormState["fieldErrors"] = {};

  if (values.fullName.length < 2) {
    fieldErrors.fullName =
      locale === "en"
        ? "Enter your name so we know who to reply to."
        : "Iveskite savo varda, kad zinotume, kam atsakyti.";
  }

  if (!values.email && !values.phone) {
    const contactMethodError =
      locale === "en"
        ? "Add at least one contact method: phone or email."
        : "Nurodykite bent viena kontakta: telefona arba el. pasta.";
    fieldErrors.email = contactMethodError;
    fieldErrors.phone = contactMethodError;
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email =
      locale === "en" ? "Enter a valid email address." : "Iveskite galiojanti el. pasto adresa.";
  }

  if (values.phone && values.phone.replace(/[^\d+]/g, "").length < 6) {
    fieldErrors.phone =
      locale === "en" ? "Enter a valid phone number." : "Iveskite galiojanti telefono numeri.";
  }

  if (values.message.length < 10) {
    fieldErrors.message =
      locale === "en"
        ? "Add a short message so we know how to help."
        : "Parasykite trumpa zinute, kad zinotume, kuo galime padeti.";
  }

  return fieldErrors;
}

export async function savePublicContactLead({
  locale,
  values,
  sourcePage,
}: {
  locale: PublicContactLocale;
  values: PublicContactValues;
  sourcePage?: string;
}): Promise<PublicContactFormState> {
  const fieldErrors = validatePublicContactValues(values, locale);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: getLocalizedContactMessage(locale, "invalid"),
      fieldErrors,
      values,
    };
  }

  if (!hasSupabaseAdminEnv()) {
    return {
      status: "error",
      message: getLocalizedContactMessage(locale, "missingEnv"),
      fieldErrors: {},
      values,
    };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("leads").insert({
    full_name: values.fullName,
    email: values.email || null,
    phone: values.phone || null,
    preferred_branch_id: values.preferredBranchId || null,
    message: values.message,
    source_page: sourcePage || null,
  });

  if (error) {
    return {
      status: "error",
      message: getLocalizedContactMessage(locale, "saveError"),
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: getLocalizedContactMessage(locale, "success"),
    fieldErrors: {},
    values: initialPublicContactFormState.values,
  };
}
