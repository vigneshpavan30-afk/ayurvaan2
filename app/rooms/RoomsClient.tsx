"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Users, Maximize, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";
import { rooms } from "@/data/rooms";

function TiltCard({ children, className="" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useSpring(useTransform(y,[-0.5,0.5],[5,-5]),{stiffness:200,damping:30});
  const rY = useSpring(useTransform(x,[-0.5,0.5],[-5,5]),{stiffness:200,damping:30});
  const mv = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX-r.left)/r.width-0.5);
    y.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} style={{rotateX:rX,rotateY:rY,transformStyle:"preserve-3d"}}
      onMouseMove={mv} onMouseLeave={()=>{x.set(0);y.set(0);}} className={className}>
      {children}
    </motion.div>
  );
}

export default function RoomsClient() {
  return (
    <>
      {/* Header */}
      <section className="pt-[72px] bg-warm-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-20 pb-16 border-b border-warm-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.9}}>
              <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-4">Accommodation</span>
              <h1 className="font-serif text-6xl md:text-7xl text-black font-normal" style={{letterSpacing:"-0.02em"}}>Rooms &amp;<br />Suites</h1>
            </motion.div>
            <motion.p initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.2}}
              className="font-sans text-base text-warm-600 leading-relaxed max-w-sm md:text-right">
              Each accommodation is a considered environment — crafted for comfort, privacy, and genuine connection with the landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Rooms — 3D tilt cards */}
      <section className="bg-white">
        {rooms.map((room, i) => (
          <motion.div key={room.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.7}}
            className="grid grid-cols-1 lg:grid-cols-2 border-b border-warm-200">
            <motion.div
              initial={{opacity:0, x: i%2===0 ? -30 : 30}} whileInView={{opacity:1,x:0}}
              viewport={{once:true}} transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
              className={`relative h-80 lg:h-auto min-h-[480px] overflow-hidden group ${i%2===1?"lg:order-2":""}`}>
              <Image src={room.image} alt={room.name} fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105" />
              <motion.div initial={{opacity:0}} whileHover={{opacity:1}}
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-5 left-5 bg-white px-3 py-1.5">
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-warm-600">{room.category}</span>
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.1}}
              className={`p-10 lg:p-16 flex flex-col justify-center bg-white ${i%2===1?"lg:order-1":""}`}>
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-terra-500 block mb-4">{room.size} · {room.capacity} guests</span>
              <h2 className="font-serif text-4xl text-black font-normal mb-3" style={{letterSpacing:"-0.01em"}}>{room.name}</h2>
              <motion.div initial={{width:0}} whileInView={{width:40}} viewport={{once:true}} transition={{duration:0.8,delay:0.3}} className="h-px bg-terra-400 mb-6" />
              <p className="font-sans text-base text-warm-600 leading-relaxed mb-8 max-w-md">{room.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {room.features.map(f => (
                  <motion.span key={f} whileHover={{scale:1.05,borderColor:"#c96830",color:"#c96830"}} transition={{type:"spring",stiffness:400}}
                    className="font-mono text-[8px] tracking-wider text-warm-600 border border-warm-200 px-3 py-1.5 cursor-default">
                    {f}
                  </motion.span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-warm-100">
                <div>
                  <span className="font-mono text-[8px] tracking-wider uppercase text-warm-400 block">Starting from</span>
                  <span className="font-serif text-3xl text-black">
                    ₹{room.pricePerNight.toLocaleString("en-IN")}
                    <span className="font-sans text-sm text-warm-400 font-normal"> / night</span>
                  </span>
                </div>
                <Button href="/booking" variant="secondary" arrow>Reserve</Button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </section>

      {/* Amenities grid */}
      <section className="bg-warm-50 py-24 border-t border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Included" title="Standard in Every Room" className="mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 border-l border-t border-warm-200">
            {["Air Conditioning","High-Speed WiFi","Hot Water","Smart Television","Daily Housekeeping","24hr Concierge","Room Service","Garden Access","Complimentary Breakfast","Safety Locker","Ample Parking","Premium Toiletries"].map((item, i) => (
              <motion.div key={item} initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.04,type:"spring"}}
                whileHover={{backgroundColor:"#FFFFFF",y:-2}} className="border-r border-b border-warm-200 p-5 flex flex-col items-center text-center gap-2 transition-colors duration-300 cursor-default">
                <Check className="w-3.5 h-3.5 text-terra-400" />
                <span className="font-sans text-xs text-warm-600 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Availability" title="Secure Your Dates"
        subtitle="Our accommodations fill quickly during festive and wedding seasons."
        primaryCta={{ label:"Check Availability", href:"/booking" }}
        secondaryCta={{ label:"Enquire", href:"/contact" }}
        backgroundImage="/img/cottage-moonlit.jpg" />
    </>
  );
}
