import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variants = {
  primary:   "bg-black text-white border-black hover:bg-terra-500 hover:border-terra-500",
  secondary: "bg-terra-500 text-white border-terra-500 hover:bg-terra-600 hover:border-terra-600",
  outline:   "bg-transparent text-black border-black hover:bg-black hover:text-white",
  white:     "bg-white text-black border-white hover:bg-terra-500 hover:text-white hover:border-terra-500",
  ghost:     "bg-white/10 backdrop-blur-sm text-white border-white/70 hover:bg-white hover:text-black",
};

const sizes = {
  sm: "text-[9px] tracking-[0.25em] px-5 py-2.5",
  md: "text-[10px] tracking-[0.22em] px-7 py-3.5",
  lg: "text-[10px] tracking-[0.22em] px-8 py-4",
};

export default function Button({ href, onClick, variant = "primary", size = "md", children, arrow = false, className = "", type = "button" }: Props) {
  const cls = `group inline-flex items-center gap-3 font-sans uppercase border transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{content}</button>;
}
