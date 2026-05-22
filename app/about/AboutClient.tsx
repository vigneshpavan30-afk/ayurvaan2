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

const timeline = [
  { year:"2018", title:"The Vision",      body:"A dream to create a nature-integrated retreat without disturbing a single mango tree." },
  { year:"2019", title:"Breaking Ground", body:"Construction begins guided by a core principle: every structure must complement, not compete with, the landscape." },
  { year:"2020", title:"Cottages Rise",   body:"American-style wooden cottages take form, nestled organically within the ancient grove." },
  { year:"2021", title:"Doors Open",      body:"Ayurvan welcomes its first guests — families, couples, and corporate groups into its natural embrace." },
  { year:"2023", title:"Expanding",       body:"Gokulam opens; bird enclosure expanded; new tropical species planted across the grounds." },
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
          <Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=90"
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
              <Image src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=85" alt="Ayurvan" fill className="object-cover" />
            </motion.div>
            <motion.div animate={{y:[0,-8,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
              className="absolute bottom-0 left-0 w-44 h-44 border-4 border-white shadow-3d-warm overflow-hidden z-10">
              <Image src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=85" alt="Interior" fill className="object-cover" />
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Image strip */}
      <div className="flex h-72 md:h-96">
        {["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=85",
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=85",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=85"].map((src, i) => (
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

      {/* Timeline */}
      <section className="bg-white py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Journey" title="Our Milestones" className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12,duration:0.7}}
                className="relative pl-6 md:pl-0 md:pt-6 pb-10 md:pb-0 border-l md:border-l-0 md:border-t-2 border-warm-200 group hover:border-terra-400 transition-colors duration-400">
                <motion.div
                  initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{delay:i*0.12+0.3,type:"spring"}}
                  className="absolute left-0 md:left-auto md:top-0 top-0 w-2.5 h-2.5 -translate-x-1/2 md:-translate-y-1/2 bg-warm-300 rotate-45 group-hover:bg-terra-500 transition-colors duration-400" />
                <div className="md:pt-5 md:pr-5">
                  <span className="font-mono text-xs text-terra-400 block mb-2">{t.year}</span>
                  <h3 className="font-serif text-lg text-black font-normal mb-2">{t.title}</h3>
                  <p className="font-sans text-sm text-warm-500 leading-relaxed">{t.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Experience Ayurvan" title="Come and Stay a While"
        subtitle="Reserve your dates and discover what it means to truly rest within nature."
        primaryCta={{ label:"Book a Stay", href:"/booking" }}
        secondaryCta={{ label:"Contact Us", href:"/contact" }}
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90" />
    </>
  );
}
