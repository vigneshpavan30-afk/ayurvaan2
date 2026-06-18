"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";

const menu = [
  { cat: "Morning",     dishes: ["Seasonal Fruit Basket", "Pesarattu with Coconut Chutney", "Filter Kaapi", "Oats with Local Honey"] },
  { cat: "Afternoon",   dishes: ["Andhra Thali — Seven Courses", "Grilled Farm Vegetables", "Coconut Rasam", "Mango Lassi"] },
  { cat: "Evening",     dishes: ["Murukku & Sundal Platter", "Garden Herbal Teas", "Vada with Sambar"] },
  { cat: "Candlelight", dishes: ["Chef's Seasonal Tasting", "Coastal Prawn Curry", "Grilled Pomfret", "Kesari Halwa"] },
];

export default function DiningClient() {
  return (
    <>
      {/* Header */}
      <section className="pt-[72px] grid grid-cols-1 lg:grid-cols-2 min-h-[65vh]">
        <div className="flex flex-col justify-center px-10 lg:px-20 py-20 bg-white order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-5">Farm to Table</span>
            <h1 className="font-serif text-6xl text-black font-normal leading-none mb-6" style={{ letterSpacing: "-0.02em" }}>
              Dining at<br />Ayurvan
            </h1>
            <div className="h-px w-10 bg-terra-400 mb-6" />
            <p className="font-sans text-base text-warm-600 leading-relaxed max-w-xs">
              The kitchen follows seasons, not trends. Every dish celebrates the terroir of Andhra Pradesh — honest, nourishing, deeply flavoured.
            </p>
          </motion.div>
        </div>
        <div className="relative min-h-[360px] order-1 lg:order-2">
          <Image src="/img/woods-fairy.jpg"
            alt="Garden dining" fill className="object-cover" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-warm-50 py-24 border-y border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-5">Our Approach</span>
            <h2 className="font-serif text-4xl text-black font-normal mb-6" style={{ letterSpacing: "-0.01em" }}>
              The Land Provides.<br />We Simply Listen.
            </h2>
            <div className="h-px w-10 bg-terra-400 mb-6" />
            <p className="font-sans text-base text-warm-600 leading-relaxed mb-4">
              Our chefs source directly from local farms and Ayurvan's own grounds. Ingredients that grow here arrive in your bowl the same day — no cold chain, no compromise.
            </p>
            <p className="font-sans text-sm text-warm-500 leading-relaxed mb-8">
              The dining experience is unhurried. Tables are never rushed. Meals are treated as essential to the Ayurvan experience — not an afterthought.
            </p>
            <Button href="/contact" variant="outline" arrow>Reserve a Table</Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/img/dining-outdoor.jpg"
              alt="Farm to table" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Dining spaces */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Where We Dine" title="Restaurants & Spaces" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-warm-200">
            {[
              { name: "Garden Restaurant",   type: "All-day", desc: "Dine beneath mango canopies with garden views — the menu celebrates seasonal Andhra produce.", img: "/img/woods-seating.jpg" },
              { name: "Outdoor Lawn Dining", type: "Special occasions", desc: "Open-air dining on the sprawling green lawn — from dawn breakfasts to star-lit evening meals.", img: "/img/lawn-dining.jpg" },
              { name: "In-Cottage Dining",   type: "24-hour", desc: "Complete privacy — a curated menu delivered to your private deck at any hour.", img: "/img/cottage-ext-2.jpg" },
            ].map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border-r border-b border-warm-200 group overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <span className="absolute bottom-3 left-4 font-mono text-[8px] tracking-[0.35em] uppercase bg-white/90 text-warm-600 px-2.5 py-1">{s.type}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-black font-normal mb-2">{s.name}</h3>
                  <p className="font-sans text-sm text-warm-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-warm-50 py-24 border-t border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Seasonal Selections" title="Menu Highlights" className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-t border-warm-200">
            {menu.map((m, i) => (
              <motion.div key={m.cat}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border-r border-b border-warm-200 p-8 hover:bg-white transition-colors duration-300"
              >
                <span className="font-mono text-[8px] tracking-[0.45em] uppercase text-terra-500 block mb-6">{m.cat}</span>
                <ul className="space-y-4">
                  {m.dishes.map(d => (
                    <li key={d} className="font-serif text-base text-black font-normal leading-snug">{d}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-warm-400 text-center mt-6">
            Menu varies seasonally · Dietary requirements accommodated with advance notice
          </p>
        </div>
      </section>

      <CTASection eyebrow="Private Dining" title="Host Your Dinner at Ayurvan"
        subtitle="For private celebrations — our team will create an experience tailored entirely to you."
        primaryCta={{ label: "Enquire About Private Dining", href: "/contact" }}
        variant="terra" />
    </>
  );
}
