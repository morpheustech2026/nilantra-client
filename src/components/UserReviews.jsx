import { useEffect, useRef, useState } from "react";

export default function UserReviews() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= DATA ================= */
  const reviews = [
    {
      name: "Michelle Rose",
      text: "Absolutely love this table! The moment I saw it, I knew it would be perfect for my room.",
      rating: 5,
      image: "/reviews/review1.jpg",
    },
    {
      name: "Paras Chugh",
      text: "My recent purchase was amazing. The quality exceeded my expectations.",
      rating: 4,
      image: "/reviews/review2.jpg",
    },
    {
      name: "Prabhas Upadhyay",
      text: "Beautiful craftsmanship and really strong build quality.",
      rating: 5,
      image: "/reviews/review3.jpg",
    },
    {
      name: "Jayavant Jadhav",
      text: "Comfortable seating and premium finish. Totally worth the price.",
      rating: 5,
      image: "/reviews/review4.jpg",
    },
  ];

  const stats = [
    { value: 11000, label: "Happy Customers", suffix: "+" },
    { value: 100, label: "Cities Served", suffix: "+" },
    { value: 7, label: "Easy Return Policy", suffix: " Days" },
  ];

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= AUTO SLIDE CAROUSEL ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ================= MAGNETIC HOVER ================= */
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateX(${(-y / 20)}deg) rotateY(${(x / 20)}deg)`;
  };

  const resetTilt = (card) => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  /* ================= COUNTER ANIMATION ================= */
  useEffect(() => {
    if (!visible) return;

    statsRef.current.forEach((el, index) => {
      let start = 0;
      const end = stats[index].value;
      const duration = 1200;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          el.innerText = end.toLocaleString();
          clearInterval(counter);
        } else {
          el.innerText = Math.floor(start).toLocaleString();
        }
      }, 16);
    });
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f7f6f4] py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-14">

        {/* LEFT CONTENT */}
        <div className={`${visible ? "animate-fadeUp" : "opacity-0"}`}>
          <p className="text-brand tracking-[0.3em] uppercase text-sm mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-5xl font-bold text-ink mb-6">
            See Why <br /> They Love Us
          </h2>
          <p className="text-ink/70 max-w-sm">
            Premium craftsmanship trusted by thousands of homeowners.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="lg:col-span-2 relative h-[340px]">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index])}
              onMouseLeave={() => resetTilt(cardsRef.current[index])}
              className={`
                absolute inset-0 transition-all duration-1000
                ${index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95"}
                bg-white rounded-3xl p-10
                shadow-[0_40px_120px_rgba(0,0,0,0.08)]
                ${visible ? "animate-fadeUp" : "opacity-0"}
              `}
            >
              <p className="text-ink/80 text-lg leading-relaxed mb-8">
                “{review.text}”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand/30"
                />
                <div>
                  <p className="font-semibold text-ink">{review.name}</p>
                  <div className="text-brand text-sm tracking-widest">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-6 mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map((stat, i) => (
          <div key={i} className={`${visible ? "animate-fadeUp" : "opacity-0"}`}>
            <h3
              ref={(el) => (statsRef.current[i] = el)}
              className="text-4xl font-bold text-ink"
            >
              0
            </h3>
            <p className="text-ink/70 mt-2">
              {stat.label}
              <span className="hidden">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
