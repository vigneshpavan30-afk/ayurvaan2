"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";

const values = [
  { n:"01", title:"Nature First",        body:"Every decision begins with the land. Ayurvan's structures rose within ancient groves — no tree displaced, no root disturbed." },
  { n:"02", title:"Genuine Hospitality", body:"We treat hospitality as a relationship, not a service. Personal, warm, and remembered long after departure." },
  { n:"03", title:"Rooted Heritage",     body:"From Chettinad-inspired Gokulam to traditional plantings — Ayurvan honours the cultural depth of South India." },
  { n:"04", title:"Light Footprint",     body:"Built sustainably within nature — Ayurvan's presence on the land is deliberate, considered, and minimal." },
];

function TiltCard({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y,[-0.5,0.5],[6,-6]),{stiffness:300,damping:30});
  const rotY = useSpring(useTransform(x,[-0.5,0.5],[-6,6]),{stiffness:300,damping:30});
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX-r.left)/r.width-0.5);
    y.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} style={{rotateX:rotX,rotateY:rotY,transformStyle:"preserve-3d"}}
      onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0);}} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative h-[75vh] min-h-[560px] overflow-hidden flex items-end">
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <Image src="/img/aerial-day.jpg"
            alt="Mango groves" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 pb-20 w-full">
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}>
            <motion.span initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
              className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-300 block mb-5">Our Story</motion.span>
            <h1 className="font-serif text-6xl md:text-8xl text-white font-normal leading-none" style={{letterSpacing:"-0.02em"}}>
              About<br /><em className="italic text-terra-300">Ayurvan</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.9}}>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-5">A Place Born from Purpose</span>
            <h2 className="font-serif text-4xl md:text-5xl text-black font-normal leading-tight mb-6" style={{letterSpacing:"-0.01em"}}>
              The Name Carries<br />the Vision
            </h2>
            <div className="h-px w-10 bg-terra-400 mb-6" />
            <div className="space-y-4 font-sans text-base text-warm-600 leading-relaxed">
              <p><strong className="font-medium text-black">Ayurvan</strong> draws from Sanskrit: <em>Ayur</em> — life, and <em>Van</em> — the forest. The natural world is not a backdrop here. It is the host.</p>
              <p>Located in Nunna, beside the Polavaram Canal on the outskirts of Vijayawada, Ayurvan occupies a landscape of remarkable quiet — close enough for the city to reach, far enough for the city to disappear.</p>
              <p>Every mango tree that stood here before us, still stands. The rare tropical plants were added as companions, never as replacements.</p>
            </div>
            <div className="mt-10"><Button href="/contact" variant="outline" arrow>Plan Your Visit</Button></div>
          </motion.div>

          <TiltCard className="relative h-[460px]">
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}
              className="absolute right-0 top-0 w-4/5 aspect-[4/5] overflow-hidden shadow-3d" style={{transform:"translateZ(0)"}}>
              <Image src="/img/gokulam-day.jpg" alt="Ayurvan" fill className="object-cover" />
            </motion.div>
            <motion.div animate={{y:[0,-8,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
              className="absolute bottom-0 left-0 w-44 h-44 border-4 border-white shadow-3d-warm overflow-hidden z-10">
              <Image src="/img/heritage-pavilion.jpg" alt="Interior" fill className="object-cover" />
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Image strip */}
      <div className="flex h-72 md:h-96">
        {["/img/cottage-ext-1.jpg",
          "/img/pool-dusk.jpg",
          "/img/gokulam-garland.jpg"].map((src, i) => (
          <motion.div key={i} initial={{opacity:0,scaleY:0.9}} whileInView={{opacity:1,scaleY:1}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.7}}
            className="relative flex-1 overflow-hidden group">
            <Image src={src} alt="" fill className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" />
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <section className="bg-warm-50 py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Philosophy" title="What We Believe" className="mb-14" />
          <div className="space-y-0 border-t border-warm-200">
            {values.map((v, i) => (
              <motion.div key={v.n} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.6}}
                className="grid grid-cols-12 py-8 border-b border-warm-200 gap-4 group hover:bg-white px-2 -mx-2 transition-colors duration-300">
                <span className="col-span-1 font-mono text-xs text-warm-300 group-hover:text-terra-400 transition-colors">{v.n}</span>
                <h3 className="col-span-4 md:col-span-3 font-serif text-xl text-black font-normal group-hover:text-terra-500 transition-colors duration-300">{v.title}</h3>
                <p className="col-span-7 md:col-span-8 font-sans text-sm text-warm-600 leading-relaxed self-center">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Experience Ayurvan" title="Come and Stay a While"
        subtitle="Reserve your dates and discover what it means to truly rest within nature."
        primaryCta={{ label:"Book a Stay", href:"/booking" }}
        secondaryCta={{ label:"Contact Us", href:"/contact" }}
        backgroundImage="/img/aerial-night.jpg" />
    </>
  );
}
