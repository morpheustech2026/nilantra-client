import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const brand = "NILANTRA";

  // About സെക്ഷനിലേക്ക് സ്ക്രോൾ ചെയ്യാനുള്ള ഫങ്ക്ഷൻ
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section"); // ID ശ്രദ്ധിക്കുക
    if (aboutSection) {
      const navbarOffset = 110;
      const y = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section" 
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/simple-decor2.png')" }}
      />
      
      {/* Gradients to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Subtitle */}
        <p className="text-xs md:text-sm tracking-[0.4em] text-[#c9a24d] mb-6 animate-fade-in-up">
          HANDCRAFTED FURNITURE FOR MODERN LIVING
        </p>

        {/* Brand Name with Letter Animation */}
        <h1 className="font-heading font-extrabold text-[clamp(3rem,10vw,7rem)] leading-none mb-8 text-white">
          {brand.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-luxury-letter"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="max-w-xl text-gray-300 text-lg md:text-xl mb-10 opacity-0 animate-fade-in-up delay-700" style={{ animationFillMode: 'forwards' }}>
          Premium timber furniture designed with timeless elegance and
          natural warmth for refined modern spaces.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-6 opacity-0 animate-fade-in-up delay-1000" style={{ animationFillMode: 'forwards' }}>
          <button
            onClick={() => navigate("/collections")}
            className="px-8 py-3.5 rounded-full bg-[#c9a24d] text-black font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Collection
          </button>

          <button
            onClick={scrollToAbout}
            className="px-8 py-3.5 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes luxury-letter {
          0% { opacity: 0; transform: translateY(30px) rotateX(-90deg); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-luxury-letter {
          animation: luxury-letter 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}} />
    </section>
  );
}

export default HeroSection;