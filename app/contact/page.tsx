import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ayurvan Resort in Vijayawada. Enquire about rooms, events, and reservations.",
};

export default function ContactPage() {
  return <ContactClient />;
}
