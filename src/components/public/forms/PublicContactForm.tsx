"use client";

import { useId, useRef, useState } from "react";

import {
  initialPublicContactFormState,
  type PublicContactFormState,
  type PublicContactValues,
} from "@/lib/public-contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { Locale } from "@/i18n/locales";

interface PublicContactFormProps {
  locale: Locale;
  sourcePage: string;
  branches: Array<{
    id: string;
    name: string;
  }>;
}

const formCopy = {
  lt: {
    helper:
      "Privalomi laukai pazymeti zvaigzdute. Nurodykite bent viena kontakta: telefona arba el. pasta.",
    name: "Vardas ir pavarde",
    phone: "Telefonas",
    email: "El. pastas",
    branch: "Pageidaujamas filialas",
    message: "Zinute",
    branchPlaceholder: "Pasirinkite filiala, jei turite pageidavima",
    namePlaceholder: "Jusu vardas",
    phonePlaceholder: "+370 6XX XXXXX",
    emailPlaceholder: "vardas@example.com",
    messagePlaceholder: "Trumpai aprasykite, kuo galime padeti.",
    contactHint: "Bent vienas is siu lauku yra privalomas.",
    submit: "Siusti uzklausa",
    submitting: "Siunciama...",
  },
  en: {
    helper:
      "Required fields are marked with an asterisk. Share at least one contact method: phone or email.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    branch: "Preferred branch",
    message: "Message",
    branchPlaceholder: "Choose a branch if you have a preference",
    namePlaceholder: "Your name",
    phonePlaceholder: "+370 6XX XXXXX",
    emailPlaceholder: "name@example.com",
    messagePlaceholder: "Briefly describe how we can help.",
    contactHint: "At least one of these fields is required.",
    submit: "Send enquiry",
    submitting: "Sending...",
  },
} satisfies Record<Locale, Record<string, string>>;

export function PublicContactForm({
  locale,
  sourcePage,
  branches,
}: PublicContactFormProps) {
  const [values, setValues] = useState<PublicContactValues>(
    initialPublicContactFormState.values,
  );
  const [formState, setFormState] = useState<
    Omit<PublicContactFormState, "values">
  >({
    status: initialPublicContactFormState.status,
    message: initialPublicContactFormState.message,
    fieldErrors: initialPublicContactFormState.fieldErrors,
  });
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailHintId = useId();
  const phoneHintId = useId();
  const t = formCopy[locale];

  function updateValue(field: keyof PublicContactValues, nextValue: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));
    setFormState((currentState) => ({
      ...currentState,
      fieldErrors: {
        ...currentState.fieldErrors,
        [field]:
          field === "preferredBranchId" ? undefined : currentState.fieldErrors[field],
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    setIsPending(true);
    setFormState((currentState) => ({
      ...currentState,
      message: null,
    }));

    const payload = new FormData(formRef.current);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });
      const nextState = (await response.json()) as PublicContactFormState;

      setFormState({
        status: nextState.status,
        message: nextState.message,
        fieldErrors: nextState.fieldErrors,
      });
      setValues(nextState.values);

      if (nextState.status === "success") {
        formRef.current.reset();
      }
    } catch {
      setFormState({
        status: "error",
        message:
          locale === "en"
            ? "We could not send your enquiry right now. Please try again."
            : "Siuo metu nepavyko issiusti jusu uzklausos. Bandykite dar karta.",
        fieldErrors: {},
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-8 grid min-w-0 gap-5 md:grid-cols-2"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sourcePage" value={sourcePage} />

      <p className="min-w-0 text-sm leading-7 text-muted-foreground md:col-span-2">
        {t.helper}
      </p>

      <div className="min-w-0">
        <Label
          htmlFor={`contact-name-${locale}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t.name} *
        </Label>
        <Input
          id={`contact-name-${locale}`}
          name="fullName"
          autoComplete="name"
          required
          value={values.fullName}
          onChange={(event) => updateValue("fullName", event.target.value)}
          aria-invalid={formState.fieldErrors.fullName ? "true" : undefined}
          aria-describedby={
            formState.fieldErrors.fullName ? `contact-name-error-${locale}` : undefined
          }
          className="h-12 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder={t.namePlaceholder}
        />
        {formState.fieldErrors.fullName ? (
          <p
            id={`contact-name-error-${locale}`}
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {formState.fieldErrors.fullName}
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        <Label
          htmlFor={`contact-phone-${locale}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t.phone}
        </Label>
        <Input
          id={`contact-phone-${locale}`}
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => updateValue("phone", event.target.value)}
          aria-invalid={formState.fieldErrors.phone ? "true" : undefined}
          aria-describedby={[
            phoneHintId,
            formState.fieldErrors.phone ? `contact-phone-error-${locale}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
          className="h-12 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder={t.phonePlaceholder}
        />
        <p id={phoneHintId} className="mt-2 text-sm text-muted-foreground">
          {t.contactHint}
        </p>
        {formState.fieldErrors.phone ? (
          <p
            id={`contact-phone-error-${locale}`}
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {formState.fieldErrors.phone}
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        <Label
          htmlFor={`contact-email-${locale}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t.email}
        </Label>
        <Input
          id={`contact-email-${locale}`}
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateValue("email", event.target.value)}
          aria-invalid={formState.fieldErrors.email ? "true" : undefined}
          aria-describedby={[
            emailHintId,
            formState.fieldErrors.email ? `contact-email-error-${locale}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
          className="h-12 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder={t.emailPlaceholder}
        />
        <p id={emailHintId} className="mt-2 text-sm text-muted-foreground">
          {t.contactHint}
        </p>
        {formState.fieldErrors.email ? (
          <p
            id={`contact-email-error-${locale}`}
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {formState.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        <Label
          htmlFor={`contact-branch-${locale}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t.branch}
        </Label>
        <select
          id={`contact-branch-${locale}`}
          name="preferredBranchId"
          value={values.preferredBranchId}
          onChange={(event) => updateValue("preferredBranchId", event.target.value)}
          className="focus-ring h-12 w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground md:text-base"
        >
          <option value="">{t.branchPlaceholder}</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-0 md:col-span-2">
        <Label
          htmlFor={`contact-message-${locale}`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t.message} *
        </Label>
        <Textarea
          id={`contact-message-${locale}`}
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          aria-invalid={formState.fieldErrors.message ? "true" : undefined}
          aria-describedby={
            formState.fieldErrors.message ? `contact-message-error-${locale}` : undefined
          }
          className="min-h-36 rounded-2xl border-border/60 bg-background px-4 py-3 text-sm md:text-base"
          placeholder={t.messagePlaceholder}
        />
        {formState.fieldErrors.message ? (
          <p
            id={`contact-message-error-${locale}`}
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {formState.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="min-w-0 md:col-span-2">
        <PrimaryButton
          type="submit"
          className="h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-sm leading-6 sm:text-base"
          disabled={isPending}
        >
          {isPending ? t.submitting : t.submit}
        </PrimaryButton>
        <p
          className="mt-3 text-sm leading-7 text-muted-foreground"
          role={formState.status === "error" ? "alert" : "status"}
        >
          {formState.message}
        </p>
      </div>
    </form>
  );
}
