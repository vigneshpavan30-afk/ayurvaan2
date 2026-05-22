import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journey through Ayurvan Resort — ancient mango groves, premium accommodations, and serene landscapes.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
