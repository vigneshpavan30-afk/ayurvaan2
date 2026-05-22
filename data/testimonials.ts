export interface Testimonial {
  id: string;
  name: string;
  location: string;
  occasion: string;
  review: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Karishma Reddy",
    location: "Vijayawada",
    occasion: "Anniversary Celebration",
    review: "Ayurvan is unlike any resort I have experienced. The wooden cottages, surrounded by mango trees and birdsong, created the most peaceful atmosphere for our anniversary. The staff's attention to detail was extraordinary — every moment felt considered.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jayalakshmi Andhoor",
    location: "Vijayawada",
    occasion: "Birthday Celebration",
    review: "A rare gem in Vijayawada. The natural setting — lush, serene, genuinely beautiful — made our celebration feel truly special. The Under the Woods party area exceeded every expectation we had. Cool, atmospheric, and memorable.",
    rating: 5,
  },
  {
    id: "3",
    name: "Madhavi Koppala",
    location: "Vijayawada",
    occasion: "Family Gathering",
    review: "Ayurvan is the ideal destination for any occasion. Spread across lush mango gardens with different bird species creating a soothing natural melody, the property transports you entirely. Once there, you forget the city entirely.",
    rating: 5,
  },
  {
    id: "4",
    name: "Srinivas Rao",
    location: "Hyderabad",
    occasion: "Corporate Retreat",
    review: "We hosted our annual leadership offsite at Ayurvan's convention hall. The combination of professional facilities and natural surroundings created the perfect environment for focused, creative thinking. We will return without question.",
    rating: 5,
  },
];
