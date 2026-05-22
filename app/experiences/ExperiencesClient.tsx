"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";
import { wellnessPackages, treatments } from "@/data/wellness";

const venues = [
  { id:"convention", n:"01", name:"Convention Hall", cap:"500 guests", size:"Grand Ballroom", desc:"Climate-controlled elegance for 500 guests. Full AV, central air conditioning, and dedicated catering.", img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=90", occasions:["Weddings","Receptions","Corporate Events","Conferences","Galas"] },
  { id:"woods", n:"02", name:"Under The Woods", cap:"Up to 200", size:"4,000 sq ft", desc:"A natural canopy of mature mango trees above 4,000 sq ft of atmospheric outdoor space — intimate and unique.", img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=90", occasions:["Haldi","Mehndi","Sangeeth","Bachelor Parties","Open-air Dining"] },
  { id:"lawn", n:"03", name:"Open Lawn", cap:"Open capacity", size:"7,000 sq ft", desc:"Seven thousand square feet of pristine lawn for destination weddings and outdoor celebrations beneath open skies.", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90", occasions:["Destination Weddings","Cocktail Evenings","Haldi","Product Launches"] },
  { id:"gokulam", n:"04", name:"Gokulam", cap:"Intimate", size:"Heritage Hall", desc:"Chettinad-inspired interiors — antique doors, Attangudi tiles, and a koi fish pond at the centre.", img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=90", occasions:["Birthday Parties","Intimate Dinners","Engagements","Photo Sessions"] },
];

function TiltCard({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useSpring(useTransform(y,[-0.5,0.5],[4,-4]),{stiffness:200,damping:30});
  const rY = useSpring(useTransform(x,[-0.5,0.5],[-4,4]),{stiffness:200,damping:30});
  const mv = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return; x.set((e.clientX-r.left)/r.width-0.5); y.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} style={{rotateX:rX,rotateY:rY,transformStyle:"preserve-3d"}}
      onMouseMove={mv} onMouseLeave={()=>{x.set(0);y.set(0);}} className={className}>
      {children}
    </motion.div>
  );
}

export default function ExperiencesClient() {
  return (
    <>
      <section className="pt-[72px] bg-warm-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-20 pb-16 border-b border-warm-200">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-4">Venues & Events</span>
            <h1 className="font-serif text-6xl md:text-7xl text-black font-normal" style={{letterSpacing:"-0.02em"}}>
              Spaces for Every<br />Occasion
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-0">
        {venues.map((v, i) => (
          <div key={v.id} id={v.id} className="grid grid-cols-1 lg:grid-cols-2 border-b border-warm-200">
            <motion.div initial={{opacity:0, x: i%2===0 ? -30 : 30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}}
              className={`relative h-80 lg:h-auto min-h-[420px] overflow-hidden group ${i%2===1?"lg:order-2":""}`}>
              <Image src={v.img} alt={v.name} fill className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-105" />
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-warm-600">{v.cap}</span>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1}}
              className={`p-10 lg:p-16 flex flex-col justify-center ${i%2===1?"lg:order-1":""}`}>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-2xl text-warm-200">{v.n}</span>
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-terra-500">{v.size}</span>
              </div>
              <h2 className="font-serif text-4xl text-black font-normal mb-4" style={{letterSpacing:"-0.01em"}}>{v.name}</h2>
              <motion.div initial={{width:0}} whileInView={{width:40}} viewport={{once:true}} transition={{duration:0.8,delay:0.3}} className="h-px bg-terra-400 mb-6" />
              <p className="font-sans text-base text-warm-600 leading-relaxed mb-7 max-w-md">{v.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {v.occasions.map(o => (
                  <motion.span key={o} whileHover={{scale:1.05,borderColor:"#c96830",color:"#c96830"}} transition={{type:"spring",stiffness:400}}
                    className="font-mono text-[8px] tracking-wider text-warm-600 border border-warm-200 px-3 py-1.5 cursor-default">{o}</motion.span>
                ))}
              </div>
              <Button href="/contact" variant="outline" arrow>Enquire About This Space</Button>
            </motion.div>
          </div>
        ))}
      </section>

      {/* Nature experiences */}
      <section className="bg-warm-50 py-24 border-t border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="During Your Stay" title="Nature Experiences" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-warm-200">
            {treatments.map((t, i) => (
              <motion.div key={t.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07,duration:0.6}}
                whileHover={{y:-4,boxShadow:"0 12px 40px -8px rgba(0,0,0,0.1)"}}
                className="border-r border-b border-warm-200 p-8 hover:bg-white transition-all duration-300 group cursor-default">
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-terra-400 block mb-4">{t.duration} · {t.category}</span>
                <h3 className="font-serif text-xl text-black font-normal mb-3 group-hover:text-terra-500 transition-colors duration-300">{t.name}</h3>
                <p className="font-sans text-sm text-warm-500 leading-relaxed">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages — 3D tilt */}
      <section className="bg-white py-28">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Curated Packages" title="Stay Experiences" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wellnessPackages.map((pkg, i) => (
              <TiltCard key={pkg.id}>
                <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09,duration:0.6}}
                  className="border border-warm-200 hover:border-terra-300 hover:shadow-card-hover transition-all duration-400 overflow-hidden group"
                  style={{transform:"translateZ(0)"}}>
                  <div className="relative h-52 overflow-hidden">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-4 left-5 font-mono text-[8px] tracking-[0.4em] uppercase text-white/80">{pkg.duration}</span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-2xl text-black font-normal mb-2">{pkg.name}</h3>
                    <p className="font-sans text-sm text-warm-600 leading-relaxed mb-5">{pkg.description}</p>
                    <div className="flex items-center justify-between pt-5 border-t border-warm-100">
                      {pkg.price > 0
                        ? <div>
                            <span className="font-mono text-[8px] uppercase text-warm-400 tracking-wider block">From</span>
                            <span className="font-serif text-2xl text-black">₹{pkg.price.toLocaleString("en-IN")}</span>
                          </div>
                        : <span className="font-sans text-sm text-warm-400">Custom pricing</span>}
                      <Button href="/contact" variant="outline" size="sm">Enquire</Button>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Plan Your Celebration" title="Let Us Create Something Extraordinary"
        subtitle="Our events team will craft a celebration as unique as the occasion itself."
        primaryCta={{ label:"Start Planning", href:"/contact" }}
        secondaryCta={{ label:"View Rooms", href:"/rooms" }} />
    </>
  );
}
