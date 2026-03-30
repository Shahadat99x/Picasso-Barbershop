import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const specialists = [
  {
    full_name: "Picasso",
    slug: "picasso",
    role_lt: "Vadovas",
    role_en: "Head Barber",
    bio_lt:
      "Picasso formuoja komandos aptarnavimo tona, darba be skubos ir aisku kokybes standarta kiekvienam vizitui.",
    bio_en:
      "Picasso sets the tone for calm service, sharp execution, and a clear quality standard across the team.",
    specialties_lt: ["Konsultacija", "Tikslus rezultatas", "Premium aptarnavimas"],
    specialties_en: ["Consultation", "Precise finish", "Premium service"],
    years_experience: null,
    photo_url: null,
    branch_id: null,
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    full_name: "Agne",
    slug: "agne",
    role_lt: "Vyresnioji barberė",
    role_en: "Senior Barber",
    bio_lt:
      "Agne dirba ramiai ir tiksliai, daug demesio skiria konsultacijai, svariai formai ir lengvai priziurimam rezultatui.",
    bio_en:
      "Agne works with calm precision, focusing on clear consultation, clean shape, and a result that is easy to maintain.",
    specialties_lt: ["Svarus siluetas", "Tvarkinga barzda", "Rami patirtis"],
    specialties_en: ["Clean shape", "Tidy beard work", "Calm appointment flow"],
    years_experience: null,
    photo_url: null,
    branch_id: null,
    is_featured: true,
    is_active: true,
    sort_order: 2,
  },
  {
    full_name: "Iliass",
    slug: "iliass",
    role_lt: "Vyresnysis barberis",
    role_en: "Senior Barber",
    bio_lt:
      "Iliass orientuojasi i aiskias linijas, tvarkinga bendra ivaizdi ir nuoseklu darba nuo konsultacijos iki galutinio rezultato.",
    bio_en:
      "Iliass focuses on clean lines, a polished overall look, and steady execution from consultation through the final result.",
    specialties_lt: ["Aiskios linijos", "Kirpimo tvarka", "Isbaigtas ivaizdis"],
    specialties_en: ["Clean lines", "Structured haircut", "Polished finish"],
    years_experience: null,
    photo_url: null,
    branch_id: null,
    is_featured: true,
    is_active: true,
    sort_order: 3,
  },
];

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local not found.");
  }

  return Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separatorIndex = line.indexOf("=");
        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        return [key, value];
      }),
  );
}

async function main() {
  const env = loadEnvFile();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase credentials are missing in .env.local.");
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const currentSlugs = specialists.map((specialist) => specialist.slug);

  console.log("Upserting current team specialists...");

  const { data: upsertedSpecialists, error: upsertError } = await supabase
    .from("specialists")
    .upsert(specialists, { onConflict: "slug" })
    .select("id, full_name, slug, is_active, is_featured, sort_order")
    .order("sort_order", { ascending: true });

  if (upsertError) {
    throw upsertError;
  }

  const { data: legacyActiveSpecialists, error: legacyQueryError } = await supabase
    .from("specialists")
    .select("id, full_name, slug")
    .eq("is_active", true)
    .not("slug", "in", `(${currentSlugs.map((slug) => `"${slug}"`).join(",")})`);

  if (legacyQueryError) {
    throw legacyQueryError;
  }

  const legacyIds = (legacyActiveSpecialists ?? []).map((specialist) => specialist.id);

  if (legacyIds.length > 0) {
    const { error: deactivateError } = await supabase
      .from("specialists")
      .update({ is_active: false, is_featured: false })
      .in("id", legacyIds);

    if (deactivateError) {
      throw deactivateError;
    }
  }

  const { data: verifiedSpecialists, error: verifyError } = await supabase
    .from("specialists")
    .select(
      "id, full_name, slug, role_lt, role_en, bio_lt, bio_en, specialties_lt, specialties_en, years_experience, photo_url, branch_id, is_active, is_featured, sort_order",
    )
    .in("slug", currentSlugs)
    .order("sort_order", { ascending: true });

  if (verifyError) {
    throw verifyError;
  }

  const duplicates = currentSlugs.filter(
    (slug, index) => currentSlugs.indexOf(slug) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(`Duplicate target slugs detected: ${duplicates.join(", ")}`);
  }

  console.log("Current team specialists:");
  (verifiedSpecialists ?? []).forEach((specialist) => {
    console.log(
      `- ${specialist.full_name} (${specialist.slug}) | active=${specialist.is_active} | featured=${specialist.is_featured} | order=${specialist.sort_order}`,
    );
  });

  if ((verifiedSpecialists ?? []).length !== specialists.length) {
    throw new Error(
      `Expected ${specialists.length} team specialists after upsert, found ${(verifiedSpecialists ?? []).length}.`,
    );
  }

  if (legacyActiveSpecialists && legacyActiveSpecialists.length > 0) {
    console.log("Deactivated legacy active specialists:");
    legacyActiveSpecialists.forEach((specialist) => {
      console.log(`- ${specialist.full_name} (${specialist.slug})`);
    });
  }

  console.log(`Upsert completed for ${upsertedSpecialists?.length ?? 0} specialists.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
