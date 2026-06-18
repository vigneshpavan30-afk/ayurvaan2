"use client";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useRef } from "react";

const cats = ["All", "Nature", "Rooms", "Venues", "Leisure"];
const items = [
  { src:"/img/aerial-day.jpg",      cat:"Nature",  title:"Aerial Over Ayurvan",  aspect:"landscape" },
  { src:"/img/cottage-ext-1.jpg",   cat:"Rooms",   title:"Wooden Cottage",       aspect:"landscape" },
  { src:"/img/garden-walkway.jpg",  cat:"Nature",  title:"Mango Grove Path",     aspect:"portrait"  },
  { src:"/img/convention-ext-2.jpg", cat:"Venues", title:"Convention Hall",      aspect:"landscape" },
  { src:"/img/aerial-pool.jpg",     cat:"Leisure", title:"Pool From Above",      aspect:"landscape" },
  { src:"/img/lawn-open.jpg",       cat:"Nature",  title:"Open Green Lawn",      aspect:"landscape" },
  { src:"/img/pool-dusk.jpg",       cat:"Leisure", title:"Poolside at Dusk",     aspect:"landscape" },
  { src:"/img/room-ensuite.jpg",    cat:"Rooms",   title:"Garden Suite",         aspect:"landscape" },
  { src:"/img/aerial-grove.jpg",    cat:"Nature",  title:"Grove & River",        aspect:"landscape" },
  { src:"/img/woods-tents.jpg",     cat:"Venues",  title:"Under The Woods",      aspect:"landscape" },
  { src:"/img/nature-grove.jpg",    cat:"Nature",  title:"Mango Orchard",        aspect:"landscape" },
  { src:"/img/aerial-night.jpg",    cat:"Leisure", title:"Twilight Aerial",      aspect:"landscape" },
];

function TiltImg({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rX = useSpring(useTransform(my,[-0.5,0.5],[8,-8]),{stiffness:250,damping:25});
  const rY = useSpring(useTransform(mx,[-0.5,0.5],[-8,8]),{stiffness:250,damping:25});
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX-r.left)/r.width-0.5);
    my.set((e.clientY-r.top)/r.height-0.5);
  };
  return (
    <motion.div ref={ref} style={{rotateX:rX,rotateY:rY,transformStyle:"preserve-3d"}}
      onMouseMove={move} onMouseLeave={()=>{mx.set(0);my.set(0);}}>
      {/* lifted shadow layer */}
      <div className="absolute inset-0 shadow-3d rounded-none translate-z-[-10px]" style={{transform:"translateZ(-10px)"}} />
    </motion.div>
  );
}

export default function GalleryClient() {
  const [active, setActive] = useState("All");
  const [lb, setLb] = useState<null | typeof items[0]>(null);
  const filtered = active === "All" ? items : items.filter(i => i.cat === active);

  return (
    <>
      {/* Header */}
      <section className="pt-[72px] bg-white border-b border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-20 pb-10">
          <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-4">Visual Journey</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.9}}
              className="font-serif text-6xl md:text-7xl text-black font-normal" style={{letterSpacing:"-0.02em"}}>Gallery</motion.h1>
            <div className="flex flex-wrap gap-2">
              {cats.map((c,i) => (
                <motion.button key={c} onClick={()=>setActive(c)}
                  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                  whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                  className={`font-mono text-[8px] tracking-[0.4em] uppercase px-4 py-2 border transition-all duration-300
                    ${active===c ? "border-black bg-black text-white" : "border-warm-200 text-warm-500 hover:border-warm-400 hover:text-black"}`}>
                  {c}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry with 3D hover */}
      <section className="bg-warm-50 py-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div key={item.src} layout
                  initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
                  transition={{duration:0.4}}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer border border-warm-200 hover:border-terra-300 transition-all duration-300 hover:shadow-card-hover"
                  onClick={()=>setLb(item)}
                  style={{perspective:"600px"}}
                >
                  <motion.div
                    whileHover={{scale:1.02, rotateY:1.5, rotateX:-1.5}}
                    transition={{type:"spring",stiffness:200,damping:20}}
                    style={{transformStyle:"preserve-3d"}}
                    className={`relative ${item.aspect==="portrait"?"aspect-[3/4]":"aspect-[4/3]"} overflow-hidden`}
                  >
                    <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <motion.div initial={{opacity:0}} whileHover={{opacity:1}}
                      className="absolute inset-0 bg-gradient-to-t from-terra-500/30 via-black/10 to-transparent" />
                    <motion.div initial={{opacity:0,y:10}} whileHover={{opacity:1,y:0}} transition={{duration:0.2}}
                      className="absolute inset-0 flex items-end p-5">
                      <div>
                        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/70 block">{item.cat}</span>
                        <span className="font-serif text-base text-white">{item.title}</span>
                      </div>
                    </motion.div>
                    <motion.div initial={{opacity:0}} whileHover={{opacity:1}}
                      className="absolute top-4 right-4 w-8 h-8 border border-white/80 flex items-center justify-center">
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={()=>setLb(null)}>
            <motion.button initial={{opacity:0}} animate={{opacity:1}} className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors" onClick={()=>setLb(null)}>
              <X className="w-5 h-5" />
            </motion.button>
            <motion.div
              initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
              transition={{type:"spring",stiffness:300,damping:30}}
              className="relative max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
              <Image src={lb.src.replace("w=800","w=1400")} alt={lb.title}
                width={1400} height={933} className="w-full h-auto object-contain max-h-[82vh]" />
              <div className="flex items-center justify-between mt-3">
                <p className="font-serif text-base text-white">{lb.title}</p>
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/40">{lb.cat}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
