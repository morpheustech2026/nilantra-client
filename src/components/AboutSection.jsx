import React, { useRef, useState, useEffect } from 'react'; // 1. Imported useState & useEffect
import { useNavigate } from 'react-router-dom';
import logo from "../../src/assets/nilantra-logo.png";

// Icons
const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><rect width="16" height="13" x="2" y="5" rx="2" /><path d="M16 8h4a2 2 0 0 1 2 2v5h-2" /><path d="M5 18a2 2 0 1 0 4 0" /><path d="M15 18a2 2 0 1 0 4 0" /></svg>
);

function AboutSection() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  
  // 2. Add Refs and State for Scroll Reveal
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  // 3. Add Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          observer.disconnect(); // Reveal only once
        }
      },
      { threshold: 0.35 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    imageRef.current.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  };

  const resetImage = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1.08) translate(0,0)";
    }
  };

  return (
    <div>
      <section
        id="about"
        ref={aboutRef} // 4. Attached Ref to Section
        className="bg-[#f5f3ef] py-32 overflow-hidden relative"
      >
        {/* 5. Added Animation Classes based on 'aboutVisible' state */}
        <div 
          className={`
            max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center 
            transition-all duration-1000 ease-out 
            ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
        >

          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.35em] text-[#c9a24d] uppercase font-semibold">
                About Nilantra
              </p>

              <h2 className="font-heading text-4xl md:text-5xl text-[#1b1b1b] leading-tight">
                Designed for <br />
                <span className="text-[#c9a24d] italic">Modern Living</span>
              </h2>
            </div>

            <p className="text-black/70 leading-relaxed text-lg">
              We craft premium furniture that blends timeless design, modern comfort, and refined craftsmanship.
              Each piece is thoughtfully designed to elevate your living spaces, combining durability with aesthetic elegance.
            </p>

            <div className="space-y-5 pt-4">

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#c9a24d]/10 rounded-full border border-[#c9a24d]/20">
                  <IconMap />
                </div>
                <div>
                  <h4 className="text-[#1b1b1b] font-medium text-lg">Global Sourcing</h4>
                  <p className="text-sm text-black/60">Premium materials imported from Italy, Indonesia & Turkey.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#c9a24d]/10 rounded-full border border-[#c9a24d]/20">
                  <IconStar />
                </div>
                <div>
                  <h4 className="text-[#1b1b1b] font-medium text-lg">3 Years of Trusted Service</h4>
                  <p className="text-sm text-black/60">
                    we have transformed countless visions into reality with dedication and excellence.
                    Thank you for believing in us as we continue to build spaces that inspire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#c9a24d]/10 rounded-full border border-[#c9a24d]/20">
                  <IconTruck />
                </div>
                <div>
                  <h4 className="text-[#1b1b1b] font-medium text-lg">Full-Service Support</h4>
                  <p className="text-sm text-black/60">Includes secure shipping, installation & logistics.</p>
                </div>
              </div>

            </div>

            <button
  onClick={() => window.open('https://www.instagram.com/nilantradecors?utm_source=qr&igsh=OHFpODhicjRmNXFt', '_blank', 'noopener,noreferrer')}
  className="mt-6 px-8 py-4 bg-[#c9a24d] text-[#000a1a] font-bold rounded-full hover:bg-[#1b1b1b] hover:text-[#c9a24d] transition-all duration-300 flex items-center gap-2 group"
>
  Explore Our Story
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</button>
          </div>

          {/* Right Side Image Section */}
          <div className="relative">
            <div
              className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-black/5 shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetImage}
            >
              <img
                ref={imageRef}
                src="/house.jpg"
                alt="About Nilantra"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Rotating Badge */}
            <div className="
                absolute 
                -top-10 
                left-1/2 -translate-x-1/2 
                md:translate-x-0            
                md:-left-12 
                md:top-1/2 md:-translate-y-1/2 
                z-20 
                w-32 h-32 md:w-40 md:h-40 
                flex items-center justify-center 
                pointer-events-none
            ">
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite] w-full h-full">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path
                    id="textPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[11px] font-bold uppercase tracking-[2px]" fill="#d29a23">
                    <textPath href="#textPath" startOffset="0%">
                      • Premium • Quality • Design • Luxury
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="
                  w-16 h-16 md:w-20 md:h-20 
                  bg-[#03396C] 
                  rounded-full 
                  shadow-lg 
                  border-4 border-[#f5f3ef] 
                  overflow-hidden flex items-center justify-center
              ">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default AboutSection;