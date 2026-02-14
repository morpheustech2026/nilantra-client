import { motion } from "framer-motion";


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

export default function EpoxyGallery() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] selection:bg-[#c9a24d]/20">
            
           
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
                        className="mt-4 text-5xl md:text-8xl font-extrabold tracking-tighter text-[#001f4b]"
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

            
            <section className="max-w-7xl mx-auto px-4 md:p-8">
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