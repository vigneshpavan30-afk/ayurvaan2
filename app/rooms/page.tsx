import type { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: "Discover Ayurvan's premium wooden cottages, deluxe garden suites, and heritage rooms — each a sanctuary within ancient mango groves.",
};

export default function RoomsPage() {
  return <RoomsClient />;
}
