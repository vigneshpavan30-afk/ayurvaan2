"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar, Users } from "lucide-react";
import { rooms } from "@/data/rooms";

const steps = ["Dates & Guests", "Choose Room", "Your Details", "Confirm"];

export default function BookingClient() {
  const [step, setStep] = useState(0);
  const [b, setB] = useState({ checkin:"", checkout:"", adults:2, children:0, room:"", name:"", email:"", phone:"", requests:"" });
  const room  = rooms.find(r => r.id === b.room);
  const nights = b.checkin && b.checkout ? Math.ceil((new Date(b.checkout).getTime() - new Date(b.checkin).getTime()) / 86400000) : 0;
  const total  = room && nights > 0 ? room.pricePerNight * nights : 0;

  const inputCls = "w-full border-b border-warm-200 bg-transparent py-3.5 font-sans text-sm text-black placeholder:text-warm-300 focus:border-terra-500 focus:outline-none transition-colors";
  const labelCls = "font-mono text-[8px] tracking-[0.45em] uppercase text-warm-400 block mb-2.5";
  const selCls   = `${inputCls} bg-warm-50`;

  return (
    <section className="min-h-screen bg-white pt-[72px]">
      {/* Page header */}
      <div className="bg-warm-50 border-b border-warm-200 px-6 lg:px-10 py-12 max-w-screen-xl mx-auto">
        <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-3">Reservations</span>
        <h1 className="font-serif text-5xl text-black font-normal" style={{ letterSpacing: "-0.02em" }}>Make a Reservation</h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        {/* Step progress */}
        <div className="flex items-center gap-2 mb-14 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 shrink-0">
              <button onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2.5 ${i <= step ? "cursor-pointer" : "cursor-default"}`}>
                <div className={`w-7 h-7 border flex items-center justify-center font-mono text-[10px] transition-all duration-300
                  ${i < step  ? "bg-terra-500 border-terra-500 text-white"
                   : i === step ? "bg-black border-black text-white"
                   : "border-warm-200 text-warm-300"}`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`font-mono text-[9px] tracking-[0.3em] uppercase hidden sm:block
                  ${i === step ? "text-black" : "text-warm-300"}`}>{s}</span>
              </button>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-terra-400" : "bg-warm-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-8 border border-warm-200 bg-warm-50 p-10 lg:p-14">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-3xl text-black font-normal mb-10">When Would You Like to Visit?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div><label className={labelCls}><Calendar className="w-3 h-3 inline mr-1.5 text-terra-400" />Check-in</label><input type="date" value={b.checkin} onChange={e => setB({...b, checkin: e.target.value})} className={inputCls} /></div>
                  <div><label className={labelCls}><Calendar className="w-3 h-3 inline mr-1.5 text-terra-400" />Check-out</label><input type="date" value={b.checkout} onChange={e => setB({...b, checkout: e.target.value})} className={inputCls} /></div>
                  <div><label className={labelCls}><Users className="w-3 h-3 inline mr-1.5 text-terra-400" />Adults</label>
                    <select value={b.adults} onChange={e => setB({...b, adults:+e.target.value})} className={selCls}>
                      {[1,2,3,4].map(n => <option key={n} value={n}>{n} Adult{n>1?"s":""}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}><Users className="w-3 h-3 inline mr-1.5 text-terra-400" />Children</label>
                    <select value={b.children} onChange={e => setB({...b, children:+e.target.value})} className={selCls}>
                      {[0,1,2,3].map(n => <option key={n} value={n}>{n} {n===1?"Child":"Children"}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-3xl text-black font-normal mb-10">Choose Your Accommodation</h2>
                <div className="space-y-3">
                  {rooms.map(r => (
                    <div key={r.id} onClick={() => setB({...b, room: r.id})}
                      className={`border p-6 cursor-pointer transition-all duration-300 ${b.room===r.id ? "border-terra-500 bg-white" : "border-warm-200 hover:border-warm-400 bg-white"}`}>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-serif text-xl text-black font-normal">{r.name}</h3>
                            {b.room===r.id && <span className="text-terra-500 text-sm">✓</span>}
                          </div>
                          <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-warm-400 mb-2">{r.size} · {r.capacity} guests</p>
                          <p className="font-sans text-sm text-warm-600 leading-relaxed max-w-md">{r.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-[8px] text-warm-400 uppercase tracking-wider block">From</span>
                          <span className="font-serif text-2xl text-black">₹{r.pricePerNight.toLocaleString("en-IN")}</span>
                          <span className="font-mono text-[8px] text-warm-400 block">/night</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-3xl text-black font-normal mb-10">Your Details</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><label className={labelCls}>Full Name</label><input type="text" value={b.name} onChange={e => setB({...b, name:e.target.value})} placeholder="Your name" className={inputCls} /></div>
                    <div><label className={labelCls}>Email Address</label><input type="email" value={b.email} onChange={e => setB({...b, email:e.target.value})} placeholder="your@email.com" className={inputCls} /></div>
                  </div>
                  <div><label className={labelCls}>Phone Number</label><input type="tel" value={b.phone} onChange={e => setB({...b, phone:e.target.value})} placeholder="+91 00000 00000" className={inputCls} /></div>
                  <div><label className={labelCls}>Special Requests</label><textarea value={b.requests} onChange={e => setB({...b, requests:e.target.value})} rows={4} placeholder="Dietary needs, occasion details, preferences..." className={`${inputCls} resize-none`} /></div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-3xl text-black font-normal mb-10">Confirm Reservation</h2>
                <div className="border border-warm-200 bg-white p-8 space-y-4 mb-8">
                  {[["Room", room?.name||"—"],["Check-in",b.checkin||"—"],["Check-out",b.checkout||"—"],["Guests",`${b.adults} Adults, ${b.children} Children`],["Name",b.name||"—"]].map(([k,v]) => (
                    <div key={k} className="flex justify-between items-center pb-4 border-b border-warm-100 last:border-0 last:pb-0">
                      <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400">{k}</span>
                      <span className="font-sans text-sm text-black">{v}</span>
                    </div>
                  ))}
                  {nights > 0 && room && (
                    <div className="flex justify-between items-end border-t-2 border-warm-200 pt-5 mt-2">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-warm-400">₹{room.pricePerNight.toLocaleString("en-IN")} × {nights} nights</span>
                      <span className="font-serif text-3xl text-terra-500">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>
                <p className="font-sans text-xs text-warm-400 leading-relaxed mb-8">Our team will contact you within 24 hours to confirm details and payment arrangements.</p>
                <button onClick={() => alert("Reservation submitted. Our team will be in touch shortly.")}
                  className="font-sans text-[10px] tracking-[0.22em] uppercase px-10 py-4 bg-black text-white hover:bg-terra-500 transition-colors duration-300">
                  Submit Reservation
                </button>
              </motion.div>
            )}

            {/* Nav buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-warm-200">
              <button onClick={() => setStep(s => Math.max(s-1,0))}
                className={`font-mono text-[9px] tracking-[0.3em] uppercase border border-warm-200 text-warm-400 px-6 py-3 hover:border-warm-400 hover:text-black transition-all ${step===0?"opacity-0 pointer-events-none":""}`}>
                Back
              </button>
              {step < 3 && (
                <button onClick={() => setStep(s => Math.min(s+1,3))}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-3 bg-black text-white hover:bg-terra-500 transition-colors duration-300">
                  Continue
                </button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 border border-warm-200 bg-warm-50 p-8">
              <p className="font-serif text-xl text-black font-normal mb-6">Booking Summary</p>
              <div className="space-y-5">
                {b.checkin && <div><span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 block mb-1">Dates</span><p className="font-sans text-sm text-black">{b.checkin} → {b.checkout||"…"}</p></div>}
                <div><span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 block mb-1">Guests</span><p className="font-sans text-sm text-black">{b.adults} Adults · {b.children} Children</p></div>
                {room && <div><span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 block mb-1">Room</span><p className="font-sans text-sm text-black">{room.name}</p><p className="font-mono text-[9px] text-warm-400 mt-0.5">₹{room.pricePerNight.toLocaleString("en-IN")} / night</p></div>}
                {nights > 0 && room && (
                  <div className="pt-5 border-t border-warm-200">
                    <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 block mb-1">Estimated Total</span>
                    <p className="font-serif text-3xl text-terra-500">₹{total.toLocaleString("en-IN")}</p>
                    <p className="font-mono text-[8px] text-warm-300 mt-1">{nights} night{nights!==1?"s":""} · incl. taxes</p>
                  </div>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-warm-200">
                <p className="font-sans text-xs text-warm-400 leading-relaxed">All rates inclusive of applicable taxes. Final confirmation on submission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
