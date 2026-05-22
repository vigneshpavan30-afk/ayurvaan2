"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/about",       label: "About" },
  { href: "/rooms",       label: "Rooms" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery",     label: "Gallery" },
  { href: "/contact",     label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  const dark = !scrolled && isHome;

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
          ${scrolled ? "bg-white/96 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2.5 group">
            <motion.span whileHover={{ letterSpacing: "0.16em" }} transition={{ duration: 0.3 }}
              className={`font-serif text-lg tracking-[0.12em] transition-colors duration-300 ${dark ? "text-white" : "text-black"}`}>
              AYURVAN
            </motion.span>
            <span className={`font-mono text-[8px] tracking-[0.35em] uppercase transition-colors duration-300 ${dark ? "text-white/50" : "text-warm-500"}`}>
              Resort
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`relative font-sans text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 group
                  ${dark ? "text-white/80 hover:text-white" : "text-warm-600 hover:text-black"}
                  ${pathname === l.href ? (dark ? "text-white" : "text-black") : ""}`}>
                {l.label}
                <motion.span
                  className={`absolute -bottom-0.5 left-0 h-px bg-terra-500`}
                  initial={{ width: pathname === l.href ? "100%" : "0%" }}
                  animate={{ width: pathname === l.href ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:+919391589999"
              className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${dark ? "text-white/50 hover:text-white" : "text-warm-400 hover:text-black"}`}>
              +91 93915 89999
            </a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/booking"
                className="font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 bg-terra-500 text-white hover:bg-terra-600 transition-colors duration-300">
                Reserve
              </Link>
            </motion.div>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            className={`lg:hidden flex flex-col gap-[5px] p-1 ${dark ? "text-white" : "text-black"}`}>
            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-[72px] flex flex-col px-8 py-10">
            <nav className="flex flex-col gap-7 mt-4">
              {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
                <motion.div key={l.href}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <Link href={l.href}
                    className={`font-serif text-4xl font-normal tracking-tight block transition-colors ${pathname === l.href ? "text-terra-500" : "text-black hover:text-terra-500"}`}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-warm-200">
              <Link href="/booking"
                className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase bg-terra-500 text-white px-8 py-4 hover:bg-terra-600 transition-colors mb-4">
                Make a Reservation
              </Link>
              <p className="font-mono text-xs text-warm-400 mt-3">+91 93915 89999</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
