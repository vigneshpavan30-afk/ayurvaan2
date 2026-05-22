import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const col1 = [
  { href: "/about",       label: "About Ayurvan" },
  { href: "/rooms",       label: "Rooms & Suites" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery",     label: "Gallery" },
];
const col2 = [
  { href: "/experiences", label: "Convention Hall" },
  { href: "/experiences", label: "Under The Woods" },
  { href: "/experiences", label: "Open Lawn" },
  { href: "/experiences", label: "Gokulam" },
  { href: "/contact",     label: "Photo Sessions" },
];

export default function Footer() {
  return (
    <footer className="bg-warm-50 border-t border-warm-200">
      {/* Newsletter / CTA top strip */}
      <div className="border-b border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12
          flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-terra-500 mb-2">Stay Connected</p>
            <h3 className="font-serif text-2xl text-black font-normal">
              Receive updates from Ayurvan
            </h3>
          </div>
          <a href="/contact"
            className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.22em] uppercase px-7 py-3.5 border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
            Make an Enquiry
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16
        grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Brand */}
        <div className="md:col-span-4">
          <p className="font-serif text-xl tracking-[0.1em] text-black mb-1">AYURVAN</p>
          <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 mb-6">Resort & Convention</p>
          <p className="font-sans text-sm text-warm-600 leading-relaxed max-w-xs mb-8">
            A luxury nature retreat within ancient mango groves in Vijayawada — where every occasion finds its perfect setting.
          </p>
          <div className="flex gap-2">
            {[
              { label: "IG", href: "https://www.instagram.com/ayurvanresort" },
              { label: "FB", href: "https://www.facebook.com/people/Ayurvan-Resorts" },
              { label: "YT", href: "https://www.youtube.com/@AyurvanResort" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[8px] tracking-widest text-warm-500 border border-warm-300 w-8 h-8 flex items-center justify-center hover:border-terra-500 hover:text-terra-500 transition-all duration-300">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-5 grid grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-warm-400 mb-5">Explore</p>
            <ul className="space-y-3">
              {col1.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="font-sans text-sm text-warm-600 hover:text-terra-500 transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-warm-400 mb-5">Venues</p>
            <ul className="space-y-3">
              {col2.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="font-sans text-sm text-warm-600 hover:text-terra-500 transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-warm-400 mb-5">Find Us</p>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <MapPin className="w-3.5 h-3.5 text-terra-400 mt-0.5 shrink-0" />
              <span className="font-sans text-sm text-warm-600 leading-relaxed">
                Vikas College Road, Nunna, Vijayawada, NTR District, AP 521212
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-3.5 h-3.5 text-terra-400 shrink-0" />
              <a href="tel:+919391589999" className="font-sans text-sm text-warm-600 hover:text-terra-500 transition-colors">
                +91 93915 89999
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-3.5 h-3.5 text-terra-400 shrink-0" />
              <a href="mailto:info@ayurvanresort.com" className="font-sans text-sm text-warm-600 hover:text-terra-500 transition-colors">
                info@ayurvanresort.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-5
          flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[9px] text-warm-400 tracking-wider">
            &copy; {new Date().getFullYear()} Ayurvan Resort & Convention, Vijayawada
          </p>
          <div className="flex gap-5">
            <Link href="/contact" className="font-mono text-[9px] text-warm-400 hover:text-terra-500 tracking-wider transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="font-mono text-[9px] text-warm-400 hover:text-terra-500 tracking-wider transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
