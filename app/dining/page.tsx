import type { Metadata } from "next";
import DiningClient from "./DiningClient";

export const metadata: Metadata = {
  title: "Dining",
  description: "Ayurvan's dining experience celebrates the flavours of Andhra Pradesh — seasonal, organic produce served in beautiful natural settings.",
};

export default function DiningPage() {
  return <DiningClient />;
}
