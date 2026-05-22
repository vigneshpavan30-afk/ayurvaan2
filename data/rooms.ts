export interface Room {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  size: string;
  capacity: number;
  pricePerNight: number;
  features: string[];
  amenities: string[];
  image: string;
  galleryImages: string[];
  featured: boolean;
}

export const rooms: Room[] = [
  {
    id: "wooden-cottage-premium",
    name: "Premium Wooden Cottage",
    category: "Cottage",
    description: "American-style wooden cottages nestled in lush greenery, blending modern comfort with natural surroundings.",
    longDescription: "Our signature wooden cottages represent the finest in nature-integrated accommodation. Each cottage is crafted with responsibly sourced timber and placed thoughtfully among ancient mango groves, offering guests complete immersion in Ayurvan's natural landscape. Wake to birdsong, dine on your private deck, and sleep in the embrace of the forest.",
    size: "650 sq ft",
    capacity: 2,
    pricePerNight: 8500,
    features: ["Private deck", "Forest view", "King bed", "Outdoor seating"],
    amenities: ["Air conditioning", "Rain shower", "Mini bar", "Smart TV", "High-speed WiFi", "Room service", "Premium toiletries", "Safe"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "deluxe-suite",
    name: "Deluxe Garden Suite",
    category: "Suite",
    description: "Spacious suites with curated interiors, garden-facing terraces, and the quiet luxury of a private sanctuary.",
    longDescription: "The Deluxe Garden Suite offers an elevated experience of resort living. Meticulously appointed with handpicked furnishings, each suite commands sweeping views of Ayurvan's manicured gardens and mango groves beyond. The oversized terrace becomes a personal retreat where mornings unfold slowly and evenings linger over nature's stillness.",
    size: "850 sq ft",
    capacity: 2,
    pricePerNight: 12000,
    features: ["Garden terrace", "Living area", "Clawfoot soaking tub", "King bed"],
    amenities: ["Central air conditioning", "Whirlpool bath", "Minibar", "65-inch Smart TV", "WiFi", "Butler service", "Nespresso machine", "In-room dining"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "standard-room",
    name: "Heritage Room",
    category: "Room",
    description: "Thoughtfully designed standard rooms with 5-star amenities, curated for comfort and quiet retreat.",
    longDescription: "Every Heritage Room at Ayurvan is a study in considered luxury. Though our most intimate accommodation, no detail is overlooked — from the hand-loomed cotton linens to the locally crafted furniture and the carefully framed view of the surrounding grounds. These rooms offer genuine sanctuary without excess.",
    size: "420 sq ft",
    capacity: 2,
    pricePerNight: 5500,
    features: ["Garden view", "Queen bed", "Work desk", "Sitting area"],
    amenities: ["Air conditioning", "Hot shower", "Flat-screen TV", "WiFi", "Tea/coffee maker", "Daily housekeeping", "Toiletries", "Safety locker"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=90",
    galleryImages: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],
    featured: false,
  },
];

export const amenitiesGrid = [
  { icon: "wifi", label: "High-Speed WiFi" },
  { icon: "snowflake", label: "Central Air Conditioning" },
  { icon: "car", label: "Ample Parking" },
  { icon: "utensils", label: "In-Room Dining" },
  { icon: "phone", label: "24/7 Concierge" },
  { icon: "shield", label: "24-Hour Security" },
  { icon: "droplets", label: "Hot Water" },
  { icon: "tv", label: "Smart Television" },
];
