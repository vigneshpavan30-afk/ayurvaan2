"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", occasion:"", date:"", message:"" });
  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const inputCls = "w-full border-b border-warm-200 bg-transparent py-3.5 font-sans text-sm text-black placeholder:text-warm-300 focus:border-terra-500 focus:outline-none transition-colors";
  const labelCls = "font-mono text-[8px] tracking-[0.45em] uppercase text-warm-400 block mb-2.5";

  return (
    <>
      <section className="pt-[72px] grid grid-cols-1 lg:grid-cols-2 min-h-[55vh]">
        <div className="flex flex-col justify-center px-10 lg:px-20 py-20 bg-white">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-5">Reach Us</span>
            <h1 className="font-serif text-6xl text-black font-normal leading-none mb-6" style={{ letterSpacing: "-0.02em" }}>
              Get in<br />Touch
            </h1>
            <div className="h-px w-10 bg-terra-400 mb-8" />
            <ul className="space-y-5">
              {[
                { Icon: MapPin, label: "Address", val: "Vikas College Road, Beside Polavaram Canal, Nunna, Vijayawada, AP 521212", href: "#" },
                { Icon: Phone, label: "Phone",   val: "+91 93915 89999",         href: "tel:+919391589999" },
                { Icon: Mail,  label: "Email",   val: "info@ayurvanresort.com",  href: "mailto:info@ayurvanresort.com" },
                { Icon: Clock, label: "Hours",   val: "Daily · 7:00 AM – 10:00 PM", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <li key={label} className="flex gap-4 items-start">
                  <div className="w-8 h-8 border border-warm-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-terra-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-warm-400 block mb-0.5">{label}</span>
                    {href !== "#"
                      ? <a href={href} className="font-sans text-sm text-warm-700 hover:text-terra-500 transition-colors leading-relaxed">{val}</a>
                      : <p className="font-sans text-sm text-warm-700 leading-relaxed">{val}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="relative min-h-[300px]">
          <Image src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=90" alt="Resort" fill className="object-cover" />
        </div>
      </section>

      <section className="bg-warm-50 py-24 border-t border-warm-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            {!sent ? (
              <>
                <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-terra-500 block mb-4">Enquiry Form</span>
                <h2 className="font-serif text-4xl text-black font-normal mb-10" style={{ letterSpacing: "-0.01em" }}>Send an Enquiry</h2>
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div><label className={labelCls}>Full Name</label><input type="text" name="name" value={form.name} onChange={set} placeholder="Your name" className={inputCls} required /></div>
                    <div><label className={labelCls}>Email Address</label><input type="email" name="email" value={form.email} onChange={set} placeholder="your@email.com" className={inputCls} required /></div>
                    <div><label className={labelCls}>Phone Number</label><input type="tel" name="phone" value={form.phone} onChange={set} placeholder="+91 00000 00000" className={inputCls} /></div>
                    <div><label className={labelCls}>Preferred Date</label><input type="date" name="date" value={form.date} onChange={set} className={inputCls} /></div>
                  </div>
                  <div>
                    <label className={labelCls}>Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={set} className={`${inputCls} bg-transparent`}>
                      <option value="">Select type of occasion</option>
                      {["Accommodation / Stay","Wedding / Reception","Corporate Event","Birthday Party","Engagement / Haldi / Mehndi","Photography Session","Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Message</label>
                    <textarea name="message" value={form.message} onChange={set} rows={5} placeholder="Tell us about your plans, guest count, or specific requirements..." className={`${inputCls} resize-none`} />
                  </div>
                  <button type="submit" className="font-sans text-[10px] tracking-[0.22em] uppercase px-10 py-4 bg-black text-white hover:bg-terra-500 transition-colors duration-300">
                    Send Enquiry
                  </button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="h-px w-10 bg-terra-400 mb-8" />
                <h3 className="font-serif text-4xl text-black font-normal mb-4">Thank You</h3>
                <p className="font-sans text-base text-warm-600 leading-relaxed max-w-sm mb-8">Your enquiry has been received. Our hospitality team will be in touch within 24 hours.</p>
                <button onClick={() => setSent(false)} className="font-mono text-[9px] tracking-[0.4em] uppercase text-terra-500 border-b border-terra-300 pb-px hover:text-terra-600 transition-colors">Send Another Enquiry</button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="h-80 border-t border-warm-200">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.3!2d80.6!3d16.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f089a3e1c8f7%3A0x5e5a84e6f62e3742!2sAyurvan%20Resort%20%26%20Convention!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ayurvan Location" />
      </div>
    </>
  );
}
