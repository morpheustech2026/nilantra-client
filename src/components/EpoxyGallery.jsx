import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Images Imports 
import img1 from "../../src/assets/epoxy1.jpg";
import img2 from "../../src/assets/epoxy1.jpg";
import img3 from "../../src/assets/epoxy3.jpg";
import img4 from "../../src/assets/epoxy4.jpg";
import img5 from "../../src/assets/epoxy5.jpg";
import img6 from "../../src/assets/epoxy6.jpg";
import img7 from "../../src/assets/epoxy7.avif";
import img8 from "../../src/assets/epoxy8.avif";
import img9 from "../../src/assets/flooring1.jpeg";
import img10 from "../../src/assets/flooring2.jpeg";
import img11 from "../../src/assets/flooring3.jpeg";
import img12 from "../../src/assets/flooring4.jpeg";
import img13 from "../../src/assets/flooring5.jpeg";

const galleryItems = [
    { id: 1, type: 'image', url: img1, title: 'Metallic Marble' },
    { id: 2, type: 'image', url: img2, title: 'Deep Ocean Blue' },
    { id: 3, type: 'image', url: img3, title: 'Golden Vein Finish' },
    { id: 4, type: 'image', url: img4, title: 'Cloudy White Pearl' },
    { id: 5, type: 'image', url: img5, title: 'Emerald Glass' },
    { id: 6, type: 'image', url: img6, title: 'Royal Velvet' },
    { id: 7, type: 'image', url: img7, title: 'Arctic Flow' },
    { id: 8, type: 'image', url: img8, title: 'Sunset Glow' },
    { id: 9, type: 'image', url: img9, title: 'Industrial Chic' },
    { id: 10, type: 'image', url: img10, title: 'Midnight Galaxy' },
    { id: 11, type: 'image', url: img11, title: 'Crystal Clear' },
    { id: 12, type: 'image', url: img12, title: 'Luxury Terrazzo' },
    { id: 13, type: 'image', url: img13, title: 'Modern Abstract' },
];

const steps = [
    { number: "01", title: "Surface Prep", desc: "Grinding and cleaning to ensure the perfect bond." },
    { number: "02", title: "Base Coat", desc: "Applying moisture vapor barrier and primer." },
    { number: "03", title: "Artistic Layer", desc: "Pouring hand-mixed pigments for unique patterns." },
    { number: "04", title: "Top Protection", desc: "High-gloss, scratch-resistant protective clear coat." },
];

const faqs = [
    { q: "How long does the installation take?", a: "Typically, a standard residential project takes 3 to 5 days including curing time." },
    { q: "Is it slippery when wet?", a: "We can add slip-resistant additives to the top coat to ensure safety without losing clarity." },
    { q: "Can it be applied over old tiles?", a: "Yes, epoxy can be applied over existing tiles after proper diamond grinding and preparation." },
];

export default function EpoxyGallery() {
    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] selection:bg-[#c9a24d]/20 scroll-smooth">
            
            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#c9a24d] uppercase tracking-[0.4em] text-xs font-bold"
                    >
                        Pure Craftsmanship
                    </motion.span>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-4 text-6xl md:text-8xl font-extrabold tracking-tighter text-[#001f4b]"
                    >
                        Luxury <span className="text-[#c9a24d] italic font-serif">Awaits</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Nilantra presents a curated collection of resin artistry. Transforming mundane floors into radiant, glass-like canvases that redefine architectural elegance.
                    </motion.p>
                </div>
            </section>

           

            {/* FEATURES SECTION */}
            <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Diamond Hardness", desc: "Our epoxy layers are engineered to withstand the test of time and heavy traffic." },
                    { title: "Artistic Freedom", desc: "Infinite colors and textures tailored to reflect your unique personality." },
                    { title: "Hygienic Surface", desc: "Anti-bacterial and dust-free surfaces that prioritize your family's health." }
                ].map((feature, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 31, 75, 0.2)" }}
                        className="p-10 rounded-3xl bg-[#001f4b] border border-white/10 shadow-xl transition-all duration-500 group"
                    >
                        <div className="w-12 h-[2px] bg-[#c9a24d] mb-6 transition-all group-hover:w-20"></div>
                        <h3 className="text-white font-bold text-xl mb-4 tracking-wide">{feature.title}</h3>
                        <p className="text-gray-300 font-light leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* QUALITY STANDARDS SECTION (New Content) */}
            <section className="max-w-7xl mx-auto px-6 mb-32 flex flex-col md:flex-row gap-12 items-center bg-[#c9a24d]/5 p-8 md:p-16 rounded-[3rem]">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold text-[#001f4b] mb-6">Uncompromising Quality Standards</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">Every square inch we pour goes through a rigorous quality check. We use only industrial-grade resins that are UV-stable, meaning your floors won't yellow over time.</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["UV Resistance", "Solvent Free", "Eco-Friendly", "Non-Toxic", "High Impact Resistance", "Waterproof"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-[#001f4b] font-semibold">
                                <span className="w-2 h-2 bg-[#c9a24d] rounded-full"></span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <img src={img11} className="rounded-2xl shadow-lg w-full h-48 object-cover" alt="Detail 1" />
                    <img src={img12} className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8" alt="Detail 2" />
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section className="max-w-7xl mx-auto px-4 md:p-8 mb-32">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#001f4b]">Explore the Palette</h2>
                    <div className="w-20 h-1 bg-[#c9a24d] mx-auto mt-4"></div>
                </div>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ 
                                y: -8,
                                boxShadow: "0 15px 35px rgba(201, 162, 77, 0.3)",
                                borderColor: "rgba(201, 162, 77, 0.4)" 
                            }}
                            className="relative break-inside-avoid overflow-hidden rounded-2xl bg-white border border-gray-200 group cursor-pointer transition-all duration-500 shadow-sm"
                        >
                            <img
                                src={item.url}
                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt={item.title}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001f4b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-[#c9a24d] text-[10px] uppercase tracking-[0.2em] font-bold">Premium Texture</span>
                                    <h4 className="font-semibold text-lg">{item.title}</h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="bg-white py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#c9a24d] font-bold tracking-widest text-xs uppercase">The Workflow</span>
                            <h2 className="text-4xl md:text-6xl font-black text-[#001f4b] mt-4 mb-8">How We Perfect <br/> Your Floor</h2>
                            <div className="space-y-8">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <span className="text-4xl font-serif italic text-[#c9a24d]/30 font-bold">{step.number}</span>
                                        <div>
                                            <h4 className="font-bold text-xl text-[#001f4b]">{step.title}</h4>
                                            <p className="text-gray-500 font-light">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl">
                                <img src={img9} alt="Process" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 bg-[#c9a24d] p-8 rounded-3xl hidden md:block">
                                <p className="text-[#001f4b] font-black text-4xl">100%</p>
                                <p className="text-[#001f4b] text-xs font-bold uppercase tracking-tighter">Seamless Finish</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON SECTION (New Content) */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#001f4b]">Epoxy vs Traditional Tiles</h2>
                    <p className="text-gray-500 mt-4">Why modern architecture is shifting to resin.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
                    <div className="p-8 md:p-12 bg-white">
                        <h4 className="text-xl font-bold mb-6 text-[#c9a24d]">Traditional Tiles</h4>
                        <ul className="space-y-4">
                            {["Visible Joint Grout lines", "Prone to cracking", "Absorbs dust & bacteria", "Limited custom patterns", "Joints can get stained"].map((point, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">✕ {point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-8 md:p-12 bg-[#001f4b]">
                        <h4 className="text-xl font-bold mb-6 text-[#c9a24d]">Nilantra Epoxy</h4>
                        <ul className="space-y-4">
                            {["100% Seamless Surface", "Diamond-grade impact strength", "Hygienic & Anti-bacterial", "Unlimited artistic designs", "Easy to clean & maintain"].map((point, i) => (
                                <li key={i} className="flex items-center gap-3 text-white text-sm">✓ {point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="max-w-4xl mx-auto px-6 py-32">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-[#001f4b] mb-16">Common Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-gray-200">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full py-6 flex justify-between items-center text-left group"
                            >
                                <span className={`text-lg font-semibold transition-colors ${activeFaq === i ? 'text-[#c9a24d]' : 'text-[#001f4b]'}`}>{faq.q}</span>
                                <span className="text-2xl">{activeFaq === i ? '-' : '+'}</span>
                            </button>
                            <AnimatePresence>
                                {activeFaq === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-gray-500 leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
                <div className="bg-[#001f4b] rounded-[4rem] p-10 md:p-24 border border-white/5 shadow-2xl relative overflow-hidden group text-center text-white">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-[#c9a24d]/20 px-4 py-1 rounded-full text-[#c9a24d] text-xs font-bold mb-6 border border-[#c9a24d]/30">
                            2026 INTERIOR TRENDS
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to Elevate <br /> Your Space?</h2>
                        <p className="text-gray-300 text-lg font-light mb-12 max-w-xl">
                            Join the revolution of seamless flooring. From residential villas to luxury showrooms, we bring your dream designs to life.
                        </p>
                        
                        <motion.a
                            href="https://wa.me/916238383942?text=Hello,%20I%20am%20interested%20in%20your%20Epoxy%20Flooring%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block" 
                        >
                            <motion.button 
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(201, 162, 77, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#c9a24d] text-[#001f4b] px-16 py-5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all hover:bg-white"
                            >
                                Start Your Project
                            </motion.button>
                        </motion.a>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a24d]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[100px]" />
                </div>
            </section>

        </div>
    );
}