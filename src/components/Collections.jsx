import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
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

  /* ================= CLEANUP ON ROUTE CHANGE ================= */
  useEffect(() => {
    return () => {
      if (sliderRef.current) {
        sliderRef.current.style.scrollBehavior = "auto";
      }
    };
  }, [location.pathname]);

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

      {/* LEFT CLICK ZONE – ONLY INSIDE COLLECTIONS */}
      <div
        className="absolute left-0 top-0 h-full w-[12%] z-20 cursor-w-resize"
        onClick={(e) => {
          e.stopPropagation();
          slidePrev();
        }}
      />

      {/* RIGHT CLICK ZONE – ONLY INSIDE COLLECTIONS */}
      <div
        className="absolute right-0 top-0 h-full w-[12%] z-20 cursor-e-resize"
        onClick={(e) => {
          e.stopPropagation();
          slideNext();
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <p
          className={`text-[11px] uppercase tracking-[0.45em] mb-4 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          OUR COLLECTIONS
        </p>

        <h2
          className="text-4xl md:text-[42px]"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          Crafted for <span className="text-[#062859]">Timeless</span> Living
        </h2>

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
                  onMouseEnter={() =>
                    setHoverBg(`/collections/${col.slug}.jpeg`)
                  }
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
                    <h3 className="text-2xl mb-2">{col.title}</h3>
                    <p className="text-[#c9a24d] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition">
                      VIEW COLLECTION →
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar{display:none}`,
        }}
      />
    </section>
  );
}

export default Collections;
