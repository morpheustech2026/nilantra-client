import { motion } from "framer-motion";
import video from "../../src/assets/epoxy.mp4";

export default function EpoxyVideo() {
  return (
   
    <section className="relative w-full bg-gradient-to-br from-[#011f4b] to-[#000a1a] py-32 overflow-hidden">
      
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#c9a24d]/5 rounded-full blur-[120px]" />
        
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#022c5e]/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-[#c9a24d] rounded-2xl transform translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="
                relative
                w-full
                h-[400px] md:h-[500px]
                object-cover
                rounded-2xl
                border border-white/5
                shadow-[0_25px_60px_rgba(0,0,0,0.6)]
              "
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full border border-[#c9a24d]/20 bg-[#c9a24d]/5 text-[#c9a24d] text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                Premium Finish
              </span>
              
              <h2 className="font-heading text-4xl md:text-5xl leading-tight text-white">
                Luxury <span className="text-[#c9a24d] italic">Epoxy</span> <br />
                Flooring Solutions
              </h2>
            </div>

            <div className="space-y-4">
              <p className="leading-relaxed text-lg text-gray-300 font-light">
                Experience seamless, high-gloss epoxy flooring crafted for
                elegance and durability. Each surface is poured and finished
                with precision to elevate modern interiors.
              </p>

              <p className="leading-relaxed text-base text-gray-400/70">
                Perfect for homes, villas, showrooms, and commercial spaces,
                offering stain resistance, easy maintenance, and long-term beauty.
              </p>
            </div>

           <motion.button
  onClick={() => window.location.href = "/gallery"} 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group relative px-10 py-4 rounded-full bg-[#c9a24d] text-[#001529] font-bold shadow-[0_0_20px_rgba(201,162,77,0.3)] hover:shadow-[0_0_30px_rgba(201,162,77,0.5)] transition-all duration-300 overflow-hidden"
>
  <span className="relative z-10">Explore Designs</span>
  <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
</motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}