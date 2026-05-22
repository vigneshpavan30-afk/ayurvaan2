"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";
import { testimonials } from "@/data/testimonials";

/* ─── data ─────────────────────────────────────────────── */
const venues = [
  { n:"01", title:"Convention Hall",  sub:"500 guests · Grand ballroom",    img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=85", href:"/experiences" },
  { n:"02", title:"Under The Woods",  sub:"4,000 sq ft · Open canopy",      img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85", href:"/experiences" },
  { n:"03", title:"Open Lawn",        sub:"7,000 sq ft · Outdoor events",   img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85", href:"/experiences" },
  { n:"04", title:"Gokulam",          sub:"Heritage · Intimate gatherings", img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85", href:"/experiences" },
];

const gallery = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=85",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=85",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=85",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85",
];

/* ─── RAW 3D TILT CARD ──────────────────────────────────── */
function Card3D({ children, className = "", depth = 20 }: {
  children: React.ReactNode; className?: string; depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);   // -1 to 1
    const maxTilt = 12;
    el.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg) scale3d(1.02,1.02,1.02)`;
    // Move shine
    const shine = el.querySelector('.shine') as HTMLElement | null;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(dx+1)/2*100}% ${(dy+1)/2*100}%, rgba(255,255,255,0.18) 0%, transparent 70%)`;
      shine.style.opacity = '1';
    }
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const shine = el.querySelector('.shine') as HTMLElement | null;
    if (shine) shine.style.opacity = '0';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Shine overlay */}
      <div className="shine absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-0 rounded-[inherit]" />
      {/* Depth shadow layer */}
      <div className="absolute inset-0 -z-10 translate-y-2 scale-95 bg-black/20 blur-xl rounded-[inherit]" />
      {children}
    </div>
  );
}

/* ─── ANIMATED COUNTER ─────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const steps = 50;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} key={started ? "counting" : "idle"} className={started ? "count-flip" : ""}>
      {val.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── PARALLAX SECTION ──────────────────────────────────── */
function ParallaxSection({ src, children }: { src: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative h-[65vh] min-h-96 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-125">
        <Image src={src} alt="" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {children}
      </div>
    </section>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Parallax: content fades and lifts as user scrolls
  const heroTextY      = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOp     = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — CSS animated video-like slideshow
          + 3D orbit rings + letter-drop animation
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden bg-black">

        {/* CSS Ken Burns slideshow — 3 images crossfading with zoom/pan */}
        <div className="hero-slide" />
        <div className="hero-slide" />
        <div className="hero-slide" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/42" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        {/* 3D Orbit rings — perspective container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}>
          <div className="orbit-ring"  />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
        </div>

        {/* Hero content — moves on scroll */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOp }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block h-px w-14 bg-terra-400/70 origin-right"
            />
            <span className="font-mono text-[9px] tracking-[0.6em] uppercase text-white/70">
              Vijayawada &nbsp;·&nbsp; Andhra Pradesh
            </span>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block h-px w-14 bg-terra-400/70 origin-left"
            />
          </motion.div>

          {/* Main title — letter by letter drop */}
          <div style={{ perspective: "600px" }}>
            <h1 className="font-serif font-normal leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(64px, 11vw, 128px)" }}>
              {"Ayurvan".split("").map((ch, i) => (
                <span
                  key={i}
                  className="letter-anim text-white"
                  style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                >
                  {ch}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-serif italic text-white/75 mt-3 font-normal"
            style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
          >
            Resort &amp; Convention
          </motion.p>

          {/* Animated gold line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 bg-terra-400 mx-auto mt-8 mb-7 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="font-sans text-white/85 text-sm md:text-base leading-relaxed max-w-sm mx-auto"
          >
            A sanctuary within ancient mango groves — where every occasion finds its perfect setting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <Button href="/booking" variant="white" size="lg" arrow>Reserve a Stay</Button>
            <Button href="/about"   variant="ghost" size="lg">Discover More</Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-white/40">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>


      </section>

      {/* ══════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════ */}
      <div className="bg-terra-500 overflow-hidden py-3.5 relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-0 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex items-center">
              {["Convention Hall","Wooden Cottages","Open Lawn","Under The Woods","Gokulam","Mango Groves","Bird Enclosure","Photoshoot Arena"].map(t => (
                <span key={t} className="flex items-center gap-8 px-8">
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/85">{t}</span>
                  <span className="text-white/30 text-xs">·</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          INTRO — 3D floating images
      ══════════════════════════════════════════════ */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-5">Est. Vijayawada</span>
              <h2 className="font-serif text-5xl md:text-6xl text-black font-normal leading-[1.05] mb-6"
                style={{ letterSpacing: "-0.02em" }}>
                Where Nature<br />Becomes the Host
              </h2>
              <motion.div
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px w-10 bg-terra-400 mb-6 origin-left"
              />
              <p className="font-sans text-base text-warm-600 leading-relaxed mb-4">
                Ayurvan was born from the belief that the most memorable gatherings happen within nature's quiet embrace. Our structures rose within ancient mango groves without disturbing a single root.
              </p>
              <p className="font-sans text-sm text-warm-500 leading-relaxed mb-10">
                Set beside the Polavaram Canal in Nunna, Vijayawada — close enough for the city to reach, far enough for it to disappear.
              </p>
              <div className="flex items-center gap-5">
                <Button href="/about" variant="outline" arrow>Our Story</Button>
                <Link href="/gallery" className="font-sans text-[11px] tracking-[0.2em] uppercase text-warm-500 hover:text-terra-500 transition-colors flex items-center gap-1.5">
                  Gallery <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* 3D floating image composition */}
            <div className="relative h-[460px]">
              {/* Main image — 3D tilt on hover */}
              <Card3D className="absolute right-0 top-0 w-[82%] aspect-[4/3]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=85"
                    alt="Mango groves" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
                </div>
              </Card3D>

              {/* Floating sub-image — CSS float animation */}
              <div className="float-a absolute -bottom-4 left-0 w-48 h-48 border-4 border-white overflow-hidden z-10
                shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]">
                <Image src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=85"
                  alt="Cottage" fill className="object-cover" />
              </div>

              {/* Floating stat badge */}
              <div className="float-c absolute top-4 -left-4 bg-black text-white px-5 py-4 z-20
                shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)]">
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-terra-300 mb-1">Guests Hosted</p>
                <p className="font-serif text-3xl leading-none">5,000+</p>
              </div>

              {/* Decorative dot grid */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 float-b opacity-40"
                style={{ backgroundImage: "radial-gradient(circle, #c96830 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ANIMATED STATS
      ══════════════════════════════════════════════ */}
      <section className="bg-warm-50 border-y border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-warm-200">
            {[
              { target: 7000, suffix: " sq ft", label: "Open Lawn" },
              { target: 500,  suffix: "+",      label: "Convention Capacity" },
              { target: 4000, suffix: " sq ft", label: "Under The Woods" },
              { target: 10,   suffix: "+ acres", label: "Mango Grove" },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "#ffffff" }}
                className="py-12 px-8 text-center cursor-default transition-colors duration-300"
              >
                <p className="font-serif text-4xl text-black leading-none">
                  <Counter target={s.target} suffix={s.suffix} />
                </p>
                <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VENUES — list with animated arrows
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <SectionHeading eyebrow="Our Spaces" title="Venues for Every Occasion" align="left" className="mb-0" />
            <Button href="/experiences" variant="outline" arrow>All Venues</Button>
          </div>

          <div className="space-y-0 border-t border-warm-200">
            {venues.map((v, i) => (
              <motion.div key={v.n}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={v.href}
                  className="group flex items-center gap-6 md:gap-10 py-7 border-b border-warm-200
                    hover:bg-warm-50 transition-all duration-300 px-2 -mx-2">
                  <span className="font-mono text-xs text-warm-300 w-8 shrink-0 group-hover:text-terra-400 transition-colors">{v.n}</span>

                  {/* Thumbnail with zoom on hover */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden shrink-0">
                    <Image src={v.img} alt={v.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl md:text-3xl text-black font-normal
                      group-hover:text-terra-500 transition-colors duration-300">{v.title}</h3>
                    <p className="font-sans text-xs text-warm-400 mt-1 tracking-wide">{v.sub}</p>
                  </div>

                  {/* Arrow with spring motion */}
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 600, damping: 20 }}
                    className="shrink-0"
                  >
                    <ArrowRight className="w-5 h-5 text-warm-300 group-hover:text-terra-500 transition-colors duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PARALLAX CINEMATIC BREAK
      ══════════════════════════════════════════════ */}
      <ParallaxSection src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-[9px] tracking-[0.5em] uppercase text-terra-300 block mb-5"
          >
            Living Heritage
          </motion.span>

          <h2 className="font-serif text-5xl md:text-6xl text-white font-normal leading-tight max-w-2xl mx-auto"
            style={{ letterSpacing: "-0.01em" }}>
            Ancient Groves, Enduring Peace
          </h2>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4 }}
            className="h-px w-14 bg-terra-400 mx-auto mt-6 mb-6 origin-center"
          />

          <p className="font-sans text-white/80 text-sm leading-relaxed max-w-md mx-auto mb-10">
            Ayurvan was built within its land — mango trees standing as they have for generations, joined by rare tropical plants and a resident bird sanctuary.
          </p>
          <Button href="/about" variant="white" arrow>Our Natural Heritage</Button>
        </motion.div>
      </ParallaxSection>

      {/* ══════════════════════════════════════════════
          GALLERY — 3D hover cards
      ══════════════════════════════════════════════ */}
      <section className="bg-warm-50 py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading eyebrow="Gallery" title="A Glimpse of Ayurvan" align="left" className="mb-0" />
            <Button href="/gallery" variant="outline" arrow className="hidden md:inline-flex">View All</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <motion.div key={src}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 ? "row-span-2" : ""}
              >
                <Card3D className={`overflow-hidden w-full group ${i === 0 ? "h-full min-h-[500px]" : "aspect-[4/3]"}`}>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image src={src} alt={`Gallery ${i + 1}`} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-terra-500/40 to-transparent"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 left-4 right-4 flex items-end justify-between"
                    >
                      <span className="font-mono text-[9px] tracking-widest uppercase text-white/80">View</span>
                      <div className="w-8 h-8 border border-white flex items-center justify-center">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS — 3D tilt cards
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Guest Stories" title="What Our Guests Remember" className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
              >
                <Card3D>
                  <div className="border border-warm-200 p-8 bg-white hover:border-terra-200 transition-all duration-300">
                    {/* Stars with stagger */}
                    <div className="flex gap-0.5 mb-6">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <motion.span key={j}
                          initial={{ scale: 0, rotate: -30 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + j * 0.06, type: "spring", stiffness: 400 }}
                          className="text-terra-400 text-sm"
                        >★</motion.span>
                      ))}
                    </div>
                    <blockquote className="font-serif text-lg text-black font-normal leading-relaxed italic mb-6">
                      &ldquo;{t.review}&rdquo;
                    </blockquote>
                    <div className="pt-5 border-t border-warm-100">
                      <p className="font-sans text-sm font-medium text-black">{t.name}</p>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-terra-400 mt-0.5">
                        {t.occasion} · {t.location}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <CTASection
        eyebrow="Begin Your Journey"
        title="Reserve Your Moment at Ayurvan"
        subtitle="Whether a quiet retreat, a grand celebration, or a corporate offsite — Ayurvan holds every occasion with care."
        primaryCta={{ label: "Make a Reservation", href: "/booking" }}
        secondaryCta={{ label: "Plan an Event",     href: "/contact" }}
        backgroundImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=90"
      />
    </>
  );
}
