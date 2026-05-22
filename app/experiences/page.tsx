import type { Metadata } from "next";
import ExperiencesClient from "./ExperiencesClient";

export const metadata: Metadata = {
  title: "Experiences & Events",
  description: "From intimate nature retreats to grand weddings and corporate events — discover all that Ayurvan has to offer.",
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
