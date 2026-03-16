import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Minimal types for the script
type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Service data from user
const rawServices = [
  {
    "title_lt": "Kirpimas",
    "slug_lt": "kirpimas",
    "short_description_lt": "Preciziškas vyriškas kirpimas, pritaikytas jūsų stiliui ir plaukų tipui.",
    "full_description_lt": "Profesionalus vyriškas kirpimas, orientuotas į švarų siluetą, tikslumą ir lengvą kasdienę priežiūrą. Tinka tiek klasikiniam, tiek modernesniam įvaizdžiui.",
    "category": "Haircuts",
    "duration_minutes": 45,
    "starting_price": 17,
    "currency": "EUR",
    "sort_order": 1,
    "published": true,
    "featured_on_homepage": true
  },
  {
    "title_lt": "Vaikų kirpimas",
    "slug_lt": "vaiku-kirpimas",
    "short_description_lt": "Tvarkingas ir patogus vaikų kirpimas draugiškoje aplinkoje.",
    "full_description_lt": "Kirpimas vaikams, atliekamas kruopščiai ir ramiai, atsižvelgiant į patogumą, amžių ir norimą stilių.",
    "category": "Haircuts",
    "duration_minutes": 30,
    "starting_price": 15,
    "currency": "EUR",
    "sort_order": 2,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Kariškių kirpimas",
    "slug_lt": "kariskiu-kirpimas",
    "short_description_lt": "Itin trumpas, tvarkingas ir praktiškas kirpimas.",
    "full_description_lt": "Trumpas ir švarus kirpimas, vertinamas dėl praktiškumo, aiškios formos ir lengvos priežiūros kasdien.",
    "category": "Haircuts",
    "duration_minutes": 30,
    "starting_price": 12,
    "currency": "EUR",
    "sort_order": 3,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Barzdos tvarkymas",
    "slug_lt": "barzdos-tvarkymas",
    "short_description_lt": "Tiksli barzdos forma, kontūrai ir tvarkingas rezultatas.",
    "full_description_lt": "Barzdos formavimas ir tvarkymas, akcentuojant linijų švarą, simetriją ir prie veido bruožų priderintą rezultatą.",
    "category": "Beard",
    "duration_minutes": 30,
    "starting_price": 12,
    "currency": "EUR",
    "sort_order": 4,
    "published": true,
    "featured_on_homepage": true
  },
  {
    "title_lt": "Kirpimas ir barzdos tvarkymas",
    "slug_lt": "kirpimas-ir-barzdos-tvarkymas",
    "short_description_lt": "Pilnas kirpimo ir barzdos tvarkymo derinys vientisam įvaizdžiui.",
    "full_description_lt": "Derinamas vyriškas kirpimas ir barzdos tvarkymas, kad bendras įvaizdis būtų vientisas, tvarkingas ir išbaigtas.",
    "category": "Combo",
    "duration_minutes": 60,
    "starting_price": 27,
    "currency": "EUR",
    "sort_order": 5,
    "published": true,
    "featured_on_homepage": true
  },
  {
    "title_lt": "Veido masažas",
    "slug_lt": "veido-masazas",
    "short_description_lt": "Atpalaiduojanti procedūra gaivesnei savijautai ir komfortui.",
    "full_description_lt": "Veido masažas, skirtas atsipalaidavimui, komfortui ir maloniam papildymui prie grooming patirties.",
    "category": "Spa",
    "duration_minutes": 20,
    "starting_price": 10,
    "currency": "EUR",
    "sort_order": 6,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Galvos masažas",
    "slug_lt": "galvos-masazas",
    "short_description_lt": "Trumpa atpalaiduojanti procedūra geresnei savijautai.",
    "full_description_lt": "Galvos masažas, padedantis atsipalaidoti ir suteikiantis papildomo komforto poilsio akimirkai.",
    "category": "Spa",
    "duration_minutes": 20,
    "starting_price": 10,
    "currency": "EUR",
    "sort_order": 7,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Plaukų plovimas",
    "slug_lt": "plauku-plovimas",
    "short_description_lt": "Gaivus plaukų plovimas prieš arba po kirpimo.",
    "full_description_lt": "Plaukų plovimas kaip papildoma paslauga švarai, gaivai ir geresniam bendram rezultatui.",
    "category": "Add-on",
    "duration_minutes": 10,
    "starting_price": 5,
    "currency": "EUR",
    "sort_order": 8,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Veido kaukė",
    "slug_lt": "veido-kauke",
    "short_description_lt": "Papildoma priežiūros procedūra gaivesnei odos išvaizdai.",
    "full_description_lt": "Veido kaukė kaip trumpa papildoma procedūra komfortui ir gaivesniam pojūčiui.",
    "category": "Spa",
    "duration_minutes": 10,
    "starting_price": 5,
    "currency": "EUR",
    "sort_order": 9,
    "published": true,
    "featured_on_homepage": false
  },
  {
    "title_lt": "Studentų pasiūlymas antradienį",
    "slug_lt": "studentu-pasiulymas-antradieni",
    "short_description_lt": "Speciali antradienio kaina studentams.",
    "full_description_lt": "Specialus pasiūlymas studentams antradieniais, suteikiantis galimybę gauti kokybišką kirpimą už patrauklesnę kainą.",
    "category": "Offers",
    "duration_minutes": 45,
    "starting_price": 15,
    "currency": "EUR",
    "sort_order": 10,
    "published": true,
    "featured_on_homepage": true
  }
];

// Helper to load env variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  console.log(`Loading env from: ${envPath}`);
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local not found');
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env: Record<string, string> = {};
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  });
  console.log('Available env keys:', Object.keys(env));
  return env;
}

async function main() {
  const env = loadEnv();
  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL or Service Key missing in .env.local');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log('Starting services upsert...');

  const servicesToUpsert = rawServices.map(s => ({
    title_lt: s.title_lt,
    title_en: s.title_lt, // Placeholder EN
    slug_lt: s.slug_lt,
    slug_en: s.slug_lt, // Placeholder EN
    short_description_lt: s.short_description_lt,
    short_description_en: s.short_description_lt, // Placeholder EN
    full_description_lt: s.full_description_lt,
    full_description_en: s.full_description_lt, // Placeholder EN
    category: s.category,
    duration_minutes: s.duration_minutes,
    starting_price: s.starting_price,
    currency_code: s.currency,
    is_published: s.published,
    is_featured: s.featured_on_homepage,
    sort_order: s.sort_order,
    // Required Json fields in schema
    benefits_lt: [],
    benefits_en: [],
    faq_lt: [],
    faq_en: [],
  }));

  const { data, error } = await supabase
    .from('services')
    .upsert(servicesToUpsert, { onConflict: 'slug_lt' })
    .select();

  if (error) {
    console.error('Error upserting services:', error);
    process.exit(1);
  }

  console.log(`Successfully upserted ${data.length} services.`);
  data.forEach(s => console.log(`- ${s.title_lt} (${s.slug_lt})`));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
