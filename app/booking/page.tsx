import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Make a Reservation",
  description: "Reserve your stay at Ayurvan Resort — premium wooden cottages, suites, and rooms in Vijayawada.",
};

export default function BookingPage() {
  return <BookingClient />;
}
