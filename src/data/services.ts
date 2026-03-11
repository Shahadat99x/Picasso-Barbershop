export interface ServiceData {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  duration: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    title: "Haircuts & Styling",
    description: "Precision cuts and styling tailored to your natural hair growth and facial structure.",
  },
  {
    id: "beard",
    title: "Beard & Shave",
    description: "Expert shaping, fading, and traditional hot towel straight razor shaves.",
  },
  {
    id: "packages",
    title: "Signature Packages",
    description: "Complete grooming experiences combining our best services for the ultimate reset.",
  },
];

export const mockServices: ServiceData[] = [
  // Hair Category
  {
    id: "srv-1",
    slug: "classic-haircut",
    categoryId: "hair",
    title: "Classic Haircut",
    shortDescription: "A precision cut tailored to your face shape, including wash and brief scalp massage.",
    fullDescription: "Our signature haircut service begins with a thorough consultation to determine the ideal style based on your face shape, hair texture, and lifestyle. This is followed by a relaxing wash, a precision cut executed with masterful technique, and finished with a style using premium bespoke products suited for your hair type.",
    price: "€35",
    duration: "45 min",
    benefits: [
      "In-depth style consultation",
      "Relaxing hair wash with premium shampoo",
      "Precision cut using scissors and clippers",
      "Neck line straight razor finish",
      "Professional styling and product recommendation"
    ],
    faqs: [
      { question: "Do I need to wash my hair before arriving?", answer: "No, a professional hair wash is included with the service to ensure the best possible results." },
      { question: "Can the barber help me choose a style?", answer: "Absolutely. Every service begins with a consultation to determine what suits you best." },
    ]
  },
  {
    id: "srv-2",
    slug: "buzz-cut",
    categoryId: "hair",
    title: "Buzz Cut & Fade",
    shortDescription: "A clean, sharp clipper cut with a seamless fade on the back and sides.",
    fullDescription: "Perfect for those who prefer a low-maintenance yet sharp look. This service utilizes expert clipper work to deliver a uniform length on top with a seamless skin or shadow fade on the sides and back, finished with precise line-ups.",
    price: "€25",
    duration: "30 min",
    benefits: [
      "Consultation on fade height and top length",
      "Expert clipper fading technique",
      "Sharp edge-ups along the hairline",
      "Quick and efficient process"
    ],
    faqs: [
      { question: "Is a skin fade included?", answer: "Yes, you can request anything from a taper to a high skin fade." }
    ]
  },
  // Beard Category
  {
    id: "srv-3",
    slug: "beard-trim",
    categoryId: "beard",
    title: "Beard Trim & Shape",
    shortDescription: "Expert shaping and fading using straight razor techniques for a clean finish.",
    fullDescription: "Maintain a sharp appearance with our expert beard sculpting. This service targets stray hairs, sharpens the cheek and neck lines with a straight razor, and fades the sideburns seamlessly into your haircut. It is completed with premium beard oils for hydration and shine.",
    price: "€25",
    duration: "30 min",
    benefits: [
      "Symmetrical beard shaping",
      "Straight razor cheek and neck lines",
      "Sideburn blending",
      "Application of premium beard oils and balms"
    ],
    faqs: [
      { question: "Do you use a straight razor for the lines?", answer: "Yes, we always use a hot towel and straight razor to ensure the sharpest possible contour lines." }
    ]
  },
  {
    id: "srv-4",
    slug: "hot-towel-shave",
    categoryId: "beard",
    title: "Traditional Hot Towel Shave",
    shortDescription: "A luxurious close shave utilizing hot towels, lather, and a straight razor.",
    fullDescription: "Experience the timeless luxury of a traditional wet shave. Pre-shave oils are massaged in before applying steaming hot towels to open pores and soften the hair. A rich lather is applied by brush before a meticulous straight razor shave leaves your face incredibly smooth. Finished with a cold towel and soothing aftershave balm.",
    price: "€30",
    duration: "45 min",
    benefits: [
      "Deep pore cleansing with hot towels",
      "Meticulous, irritation-free straight razor shave",
      "Exfoliates dead skin cells",
      "Deeply relaxing experience"
    ],
    faqs: [
      { question: "I have sensitive skin, is this suitable?", answer: "Yes, the multi-step preparation process actually reduces irritation compared to home shaving." }
    ]
  },
  // Packages Category
  {
    id: "srv-5",
    slug: "the-full-experience",
    categoryId: "packages",
    title: "The Full Experience",
    shortDescription: "Haircut, beard sculpt, hot towel shave, and a relaxing shoulder massage.",
    fullDescription: "Our ultimate grooming package for the modern gentleman. This comprehensive session includes our Classic Haircut, your choice of a thorough Beard Sculpt or Traditional Hot Towel Shave, an extended scalp massage during the wash, and concludes with a brief, tension-relieving shoulder massage.",
    price: "€65",
    duration: "90 min",
    benefits: [
      "Complete transformation in one session",
      "Includes both hair and facial hair care",
      "Extended relaxation with scalp and shoulder massages",
      "Excellent value compared to individual services"
    ],
    faqs: [
      { question: "Can I substitute the shave for a beard trim?", answer: "Yes, the facial hair portion can be either a full shave or a precise beard sculpt." },
      { question: "Is this a good gift?", answer: "It is our most popular gift voucher option." }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return mockServices.find(s => s.slug === slug);
}
export function getServicesByCategory(categoryId: string): ServiceData[] {
  return mockServices.filter(s => s.categoryId === categoryId);
}
