export interface WellnessPackage {
  id: string;
  name: string;
  duration: string;
  description: string;
  includes: string[];
  price: number;
  category: string;
  image: string;
}

export const wellnessPackages: WellnessPackage[] = [
  {
    id: "nature-immersion",
    name: "Nature Immersion Retreat",
    duration: "2 Nights / 3 Days",
    description: "A holistic journey through Ayurvan's natural landscape — morning walks through mango groves, organic meals, and restorative rest.",
    includes: [
      "2 nights in Premium Wooden Cottage",
      "Morning nature walks guided",
      "Farm-to-table organic breakfast daily",
      "Evening bonfire session",
      "Bird watching experience",
      "Complimentary fruit basket"
    ],
    price: 22000,
    category: "retreat",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "celebration-package",
    name: "Celebration Escape",
    duration: "1 Night / 2 Days",
    description: "Curated for milestone moments — anniversaries, birthdays, and special occasions — with personalised touches throughout.",
    includes: [
      "1 night in Deluxe Garden Suite",
      "Floral room decoration",
      "Celebration cake",
      "Candlelight dinner for two",
      "Breakfast in bed",
      "Late checkout"
    ],
    price: 18000,
    category: "celebration",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    id: "family-getaway",
    name: "Family Heritage Stay",
    duration: "2 Nights / 3 Days",
    description: "A complete family experience — spacious accommodations, children's activities, and curated meals that bring generations together.",
    includes: [
      "2 nights in interconnected rooms",
      "Kids play zone access",
      "Guided mango farm tour",
      "Outdoor games",
      "Complimentary breakfast for all",
      "Bird enclosure visit"
    ],
    price: 28000,
    category: "family",
    image: "https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=800&q=80",
  },
  {
    id: "corporate-retreat",
    name: "Executive Retreat",
    duration: "Customisable",
    description: "Strategic offsites and team retreats in a natural setting that fosters clarity, connection, and creative thinking.",
    includes: [
      "Convention hall access",
      "AV equipment & tech setup",
      "Corporate lunch and tea breaks",
      "Team-building activity coordination",
      "Dedicated event coordinator",
      "Flexible catering options"
    ],
    price: 0,
    category: "corporate",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  },
];

export const treatments = [
  {
    name: "Morning Grove Walk",
    description: "A guided 45-minute walk through Ayurvan's ancient mango groves at sunrise, grounding the mind and body in natural rhythm.",
    duration: "45 min",
    category: "wellness",
  },
  {
    name: "Organic Farm Experience",
    description: "Connect with the land — explore the cultivation of seasonal produce that graces Ayurvan's dining tables.",
    duration: "60 min",
    category: "experience",
  },
  {
    name: "Bird Sanctuary Visit",
    description: "An intimate encounter with Ayurvan's resident and migratory birds — a meditative experience in natural observation.",
    duration: "30 min",
    category: "nature",
  },
  {
    name: "Evening Bonfire Circle",
    description: "Gather under a canopy of stars with fellow guests — traditional stories, local music, and the warmth of an open fire.",
    duration: "90 min",
    category: "social",
  },
  {
    name: "Photography Session",
    description: "Capture the beauty of Ayurvan's landscapes, architecture, and natural light in dedicated photoshoot arenas.",
    duration: "60 min",
    category: "creative",
  },
  {
    name: "Mango Harvest Experience",
    description: "Seasonal experience — participate in the traditional harvest of Ayurvan's prized mango varieties with expert guidance.",
    duration: "45 min",
    category: "seasonal",
  },
];
