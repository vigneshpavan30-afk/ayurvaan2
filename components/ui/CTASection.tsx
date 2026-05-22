"use client";
import { motion } from "framer-motion";
import Button from "./Button";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?:   { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
  variant?: "dark" | "terra" | "light";
}

export default function CTASection({ eyebrow, title, subtitle, primaryCta, secondaryCta, backgroundImage, variant = "dark" }: Props) {
  const bg = backgroundImage ? undefined
    : variant === "terra" ? "bg-terra-500"
    : variant === "light" ? "bg-warm-50"
    : "bg-black";

  return (
    <section className={`relative py-28 overflow-hidden ${bg ?? ""}`}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center"
      >
        {eyebrow && (
          <span className={`font-mono text-[9px] tracking-[0.45em] uppercase block mb-5 ${variant === "light" ? "text-terra-500" : "text-terra-300"}`}>
            {eyebrow}
          </span>
        )}
        <h2 className={`font-serif text-4xl md:text-5xl font-normal leading-tight mb-5 ${variant === "light" ? "text-black" : "text-white"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`font-sans text-sm leading-relaxed max-w-md mx-auto mb-10 ${variant === "light" ? "text-warm-600" : "text-white/70"}`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {primaryCta   && <Button href={primaryCta.href}   variant="white"  size="lg" arrow>{primaryCta.label}</Button>}
          {secondaryCta && <Button href={secondaryCta.href} variant="ghost"  size="lg">{secondaryCta.label}</Button>}
        </div>
      </motion.div>
    </section>
  );
}
