import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Discover the story of Ayurvan Resort — a sanctuary built within ancient mango groves in Vijayawada, Andhra Pradesh.",
};

export default function AboutPage() {
  return <AboutClient />;
}
