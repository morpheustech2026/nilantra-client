import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Added for staggered text animation

/* ================= COLLECTION DATA ================= */
const originalCollections = [
  { slug: "living-room", title: "Living Room" },
  { slug: "dining-room", title: "Dining Room" },
  { slug: "bedroom", title: "Bedroom" },
  { slug: "kitchen", title: "Kitchen" },
  { slug: "garden", title: "Garden Furniture" },
  { slug: "office", title: "Office Furniture" },
];

const collections = [
  ...originalCollections,
  ...originalCollections,
  ...originalCollections,
];

function Collections() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hoverBg, setHoverBg] = useState(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= INTERSECTION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= PARALLAX ================= */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setParallaxY(rect.top * 0.12);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= SLIDE HELPERS ================= */
  const slideNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = 360 + 40;
    const singleWidth = slider.scrollWidth / 3;
    if (slider.scrollLeft >= singleWidth * 2) {
      slider.style.scrollBehavior = "auto";
      slider.scrollLeft = singleWidth;
    }
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft += step;
  };

  const slidePrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = 360 + 40;
    const singleWidth = slider.scrollWidth / 3;
    if (slider.scrollLeft <= singleWidth) {
      slider.style.scrollBehavior = "auto";
      slider.scrollLeft = singleWidth * 2;
    }
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft -= step;
  };

  /* ================= AUTO PLAY ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const autoPlay = setInterval(() => {
      if (slider.matches(":hover")) return;
      slideNext();
    }, 3000);
    return () => clearInterval(autoPlay);
  }, []);

  /* ================= CENTER CARD ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const updateCenter = () => {
      const cards = slider.children;
      const center = slider.offsetWidth / 2 + slider.scrollLeft;
      let closest = 0;
      let min = Infinity;
      Array.from(cards).forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setCenterIndex(closest);
    };
    slider.addEventListener("scroll", updateCenter);
    updateCenter();
    return () => slider.removeEventListener("scroll", updateCenter);
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#f5f3ef]"
    >
      {/* Background Hover Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: hoverBg ? `url(${hoverBg})` : "none",
          opacity: hoverBg ? 0.2 : 0,
        }}
      />

      {/* Navigation Zones */}
      <div className="absolute left-0 top-0 h-full w-[12%] z-20 cursor-w-resize" onClick={(e) => { e.stopPropagation(); slidePrev(); }} />
      <div className="absolute right-0 top-0 h-full w-[12%] z-20 cursor-e-resize" onClick={(e) => { e.stopPropagation(); slideNext(); }} />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        
        {/* UPDATED STYLISH SUBTITLE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-[2px] w-12 bg-gradient-to-r from-[#d4af37] to-transparent" />
          <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-black text-[#d4af37] drop-shadow-sm">
            Our Collections
          </p>
        </motion.div>

        {/* UPDATED STYLISH HEADING */}
        <h2
          className="text-5xl md:text-7xl font-serif leading-[1.1] text-[#001f3f] tracking-tight mb-4"
          style={{ 
            transform: `translateY(${parallaxY}px)`,
            transition: "transform 0.2s ease-out" 
          }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block font-medium"
          >
            Crafted for
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block mt-3"
          >
            <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e1a4] to-[#8a6d2d] drop-shadow-md">
              Timeless
            </span>
            
            <motion.span 
              initial={{ width: 0 }}
              animate={visible ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-2 left-0 h-[2px] bg-[#d4af37]/40 rounded-full"
            />
            
            <span className="ml-4 font-light text-[#001f3f] opacity-90">Living</span>
          </motion.span>
        </h2>

        {/* Slider Logic Remains Same */}
        <div className="mt-14 max-w-[1160px] mx-auto overflow-visible">
          <div
            ref={sliderRef}
            className="flex gap-10 overflow-x-auto pb-10 no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {collections.map((col, index) => {
              const isCenter = index === centerIndex;
              return (
                <div
                  key={`${col.slug}-${index}`}
                  onClick={() => navigate(`/collections/${col.slug}`)}
                  onMouseEnter={() => setHoverBg(`/collections/${col.slug}.jpeg`)}
                  onMouseLeave={() => setHoverBg(null)}
                  className="group relative w-[360px] h-[450px] flex-shrink-0 rounded-[35px] overflow-hidden cursor-pointer shadow-xl transition-all duration-700"
                  style={{
                    transform: `scale(${isCenter ? 1 : 0.9})`,
                    opacity: isCenter ? 1 : 0.7,
                    scrollSnapAlign: "center",
                  }}
                >
                  <img
                    src={`/collections/${col.slug}.jpeg`}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl mb-2 font-serif italic">{col.title}</h3>
                    <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      VIEW COLLECTION →
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar{display:none}` }} />
    </section>
  );
}

export default Collections;