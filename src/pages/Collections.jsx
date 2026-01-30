import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= COLLECTION DATA ================= */
const originalCollections = [
  { slug: "living-room", title: "Living Room" },
  { slug: "dining-room", title: "Dining Room" },
  { slug: "bedroom", title: "Bedroom" },
  { slug: "kitchen", title: "Kitchen" },
  { slug: "garden", title: "Garden Furniture" },
  { slug: "office", title: "Office Furniture" },
  { slug: "theatre-room", title: "Theatre Room" },
];


const collections = [...originalCollections, ...originalCollections, ...originalCollections];

function Collections() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hoverBg, setHoverBg] = useState(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);

  const navigate = useNavigate();
  const timeless = "Timeless";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setParallaxY(rect.top * 0.12);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Settings for the "Jump"
    const cardWidth = 360; 
    const gap = 40;       
    const scrollStep = cardWidth + gap; 
    const intervalTime = 3000;

    const interval = setInterval(() => {
      
      const singleSetWidth = slider.scrollWidth / 3;
      
      if (slider.scrollLeft >= singleSetWidth * 2) {
        
        slider.style.scrollBehavior = "auto"; 
        slider.scrollLeft -= singleSetWidth;
      }

     
      requestAnimationFrame(() => {
        slider.style.scrollBehavior = "smooth";
        slider.scrollLeft += scrollStep;
      });

    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  /* ================= CENTER CARD DETECTION ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateCenter = () => {
      const cards = slider.children;
      const sliderCenter = slider.offsetWidth / 2 + slider.scrollLeft;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(cards).forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setCenterIndex(closestIndex);
    };

    slider.addEventListener("scroll", updateCenter);
    updateCenter();

    return () => slider.removeEventListener("scroll", updateCenter);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden text-ink">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-[#f5f3ef]" />

      {/* HOVER IMAGE BACKGROUND */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: hoverBg ? `url(${hoverBg})` : "none",
          opacity: hoverBg ? 0.32 : 0,
          filter: "blur(0.6px)",
          transform: hoverBg ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <p className={`text-[11px] uppercase tracking-[0.45em] text-brand mb-4 transition-all duration-[900ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          OUR COLLECTIONS
        </p>

        <h2 className="font-heading text-4xl md:text-[42px] leading-tight mb-4" style={{ transform: `translateY(${parallaxY}px)` }}>
          Crafted for{" "}
          <span className="inline-flex overflow-hidden relative">
            {timeless.split("").map((char, i) => (
              <span key={i} className={`inline-block transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 70 + 200}ms` }}>
                {char}
              </span>
            ))}
            <span className={`absolute left-0 -bottom-2 h-[2px] bg-[#c9a24d] transition-all duration-[900ms] ease-out ${visible ? "w-full opacity-100" : "w-0 opacity-0"}`} style={{ transitionDelay: "900ms" }} />
          </span>{" "}
          Living
        </h2>

        {/* ================= CAROUSEL ================= */}
        <div className="mt-12 py-10" style={{ perspective: "1000px" }}>
          <div
            ref={sliderRef}
            className="flex gap-10 overflow-x-hidden pb-10 scrollbar-hide"
          
          >
            {collections.map((col, index) => {
              const uniqueKey = `${col.slug}-${index}`;
              const image = `/collections/${col.slug}.jpeg`;
              
              const isCenter = index === centerIndex;
              const isLeft = index < centerIndex;
              const isRight = index > centerIndex;

              // TILT LOGIC
              let rotateY = 0;
              if (isLeft) rotateY = 20;
              if (isRight) rotateY = -20;
              if (isCenter) rotateY = 0;

              return (
                <div
                  key={uniqueKey}
                  onClick={() => navigate(`/collections/${col.slug}`)}
                  onMouseEnter={() => setHoverBg(image)}
                  onMouseLeave={() => setHoverBg(null)}
                  // --- DESIGN ---
                  className={`
                    group relative flex-shrink-0
                    w-[320px] md:w-[360px] h-[450px]
                    rounded-[35px] overflow-hidden
                    cursor-pointer shadow-2xl
                    bg-white border-[6px] border-white
                    transition-all duration-700 ease-out
                    ${visible ? "opacity-100" : "opacity-0"}
                  `}
                  style={{
                    transitionDelay: `${(index % originalCollections.length) * 100}ms`,
                    transform: `
                      scale(${isCenter ? 1.1 : 0.9}) 
                      rotateY(${rotateY}deg)
                    `,
                    zIndex: isCenter ? 20 : 10,
                    transformStyle: "preserve-3d", 
                  }}
                >
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                    <img
                      src={image}
                      alt={col.title}
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-[1200ms]
                                 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 p-4">
                      <h3 className={`font-heading text-2xl uppercase tracking-wider text-center font-bold transition-colors duration-500 ${isCenter ? "text-[#ff3385]" : "text-white"}`}>
                        {col.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-sm text-ink/60">
          Center card zooms in automatically.
        </p>
      </div>
    </section>
  );
}

export default Collections;