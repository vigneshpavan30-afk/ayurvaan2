"use client";
import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "", dark = false }: Props) {
  const a = { left: "items-start text-left", center: "items-center text-center", right: "items-end text-right" }[align];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${a} ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, x: align === "left" ? -20 : 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-mono text-[9px] tracking-[0.45em] uppercase mb-4 ${dark ? "text-terra-300" : "text-terra-500"}`}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={`font-serif text-4xl md:text-5xl font-normal leading-tight ${dark ? "text-white" : "text-black"}`}
        style={{ letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-sans text-sm leading-relaxed mt-4 max-w-xl ${align === "center" ? "mx-auto" : ""} ${dark ? "text-white/65" : "text-warm-600"}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-px bg-terra-400 overflow-hidden"
        style={{ width: 0 }}
      />
    </motion.div>
  );
}
