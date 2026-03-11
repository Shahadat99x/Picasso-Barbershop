export interface BranchData {
  id: string;
  slug: string;
  name: string;
  intro: string;
  address: string;
  phone: string;
  email: string;
  hours: { day: string; time: string }[];
  parkingInfo: string;
  transportInfo: string;
  trustPoints: string[];
  featuredServiceSlugs: string[]; // references Phase 2b mockServices slugs
}

export const mockBranches: BranchData[] = [
  {
    id: "loc-1",
    slug: "old-town-classic",
    name: "Old Town Classic",
    intro: "Nestled in the heart of Vilnius Old Town, our flagship location combines historical architecture with modern barbering luxury. Experience premium grooming in a setting that reflects the city's rich heritage.",
    address: "Vilniaus g. 22, Vilnius, 01402",
    phone: "+370 600 11111",
    email: "oldtown@picassobarbershop.lt",
    hours: [
      { day: "Monday - Friday", time: "09:00 - 20:00" },
      { day: "Saturday", time: "10:00 - 18:00" },
      { day: "Sunday", time: "Closed" },
    ],
    parkingInfo: "Paid street parking available on Vilniaus St. (Yellow zone). Alternatively, underground parking at Gedimino Ave. is a 3-minute walk away.",
    transportInfo: "Bus stop 'Vinco Kudirkos aikštė' is a 5-minute walk. Accessible by routes 1G, 11, 53, 88.",
    trustPoints: [
      "Our Flagship Location",
      "Historical Interior Design",
      "Complimentary Premium Beverages",
      "Master Barbers Only"
    ],
    featuredServiceSlugs: ["classic-haircut", "hot-towel-shave", "the-full-experience"]
  },
  {
    id: "loc-2",
    slug: "uzupis-retreat",
    name: "Užupis Retreat",
    intro: "Located in the artistic republic of Užupis, this branch offers a slightly more relaxed, bohemian atmosphere without compromising on our strict standards of grooming excellence.",
    address: "Užupio g. 14, Vilnius, 01200",
    phone: "+370 600 22222",
    email: "uzupis@picassobarbershop.lt",
    hours: [
      { day: "Monday - Friday", time: "10:00 - 19:00" },
      { day: "Saturday", time: "10:00 - 19:00" },
      { day: "Sunday", time: "10:00 - 16:00" },
    ],
    parkingInfo: "Limited free parking is available for clients behind the building. Buzz the gate for entry.",
    transportInfo: "Bus stop 'Užupio' is directly across the street (Route 11).",
    trustPoints: [
      "Artistic Atmosphere",
      "Open Sundays",
      "Private Parking Area",
      "Exclusive Whiskey Selection"
    ],
    featuredServiceSlugs: ["buzz-cut", "beard-trim"]
  },
  {
    id: "loc-3",
    slug: "modern-city-center",
    name: "Modern City Center",
    intro: "Designed for the busy professional, our modern City Center branch offers efficient, top-tier service in a sleek, contemporary environment.",
    address: "Gedimino pr. 9, Vilnius, 01105",
    phone: "+370 600 33333",
    email: "city@picassobarbershop.lt",
    hours: [
      { day: "Monday - Friday", time: "08:00 - 21:00" },
      { day: "Saturday", time: "09:00 - 18:00" },
      { day: "Sunday", time: "Closed" },
    ],
    parkingInfo: "Direct underground parking access (GO9 parking garage). Validation provided for 1 hour.",
    transportInfo: "Centrally located. Most trolleybus and bus routes stop at 'V. Kudirkos aikštė' or 'Jogailos st.'",
    trustPoints: [
      "Extended Early/Late Hours",
      "Direct Parking Access",
      "Express Services Available",
      "Sleek Modern Interior"
    ],
    featuredServiceSlugs: ["classic-haircut", "the-full-experience"]
  }
];

export function getBranchBySlug(slug: string): BranchData | undefined {
  return mockBranches.find(b => b.slug === slug);
}
