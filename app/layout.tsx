import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Ayurvan Resort & Convention | Vijayawada", template: "%s | Ayurvan" },
  description: "Ayurvan Resort — a luxury nature retreat set amidst ancient mango groves in Vijayawada, Andhra Pradesh.",
  keywords: ["Ayurvan Resort", "Vijayawada luxury resort", "mango farm resort", "wedding venue Vijayawada"],
  openGraph: {
    type: "website", locale: "en_IN", url: "https://ayurvanresort.com",
    siteName: "Ayurvan Resort & Convention",
    title: "Ayurvan Resort & Convention | Vijayawada",
    description: "Luxury nature retreat within ancient mango groves. Vijayawada, Andhra Pradesh.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
