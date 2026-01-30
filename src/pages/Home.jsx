import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Collections from "./Collections";
import useParallax from "../hooks/useParallax";
import UserReviews from "./UserReviews";
import ChatWidget from "./ChatWidget";
import Loader from "../components/Loader";
import EpoxyVideo from "../components/EpoxyVideo";
import logo from "../../src/assets/nilantra-logo.png"
import Bestseller from "../components/Bestseller";
import Offer from "../components/Offer";

const brand = "NILANTRA";

// ICONS
const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><rect width="16" height="13" x="2" y="5" rx="2" /><path d="M16 8h4a2 2 0 0 1 2 2v5h-2" /><path d="M5 18a2 2 0 1 0 4 0" /><path d="M15 18a2 2 0 1 0 4 0" /></svg>
);

const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const IconBigTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);


function Home() {
  useParallax();
  const location = useLocation();
  const navigate = useNavigate();
  // LOADER
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (location.state?.scrollTo) {
      document
        .getElementById(location.state.scrollTo)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  /* ================= ABOUT REVEAL ================= */
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAboutVisible(true),
      { threshold: 0.35 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= IMAGE PARALLAX ================= */
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    imageRef.current.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  };

  const resetImage = () => {
    imageRef.current.style.transform = "scale(1.08) translate(0,0)";
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <main className="w-full bg-ink text-ivory overflow-x-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/simple-decor2.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36">
          <p className="text-xs tracking-[0.35em] text-brand mb-6">
            HANDCRAFTED FURNITURE FOR MODERN LIVING
          </p>

          <h1 className="font-heading font-extrabold text-[clamp(3.5rem,8vw,6.5rem)] leading-none mb-8 brand-glow">
            {brand.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-luxury-letter"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p className="max-w-xl text-ivory/80 text-lg mb-10">
            Premium timber furniture designed with timeless elegance and
            natural warmth for refined modern spaces.
          </p>

          <div className="flex gap-6">
            <button
              onClick={() =>
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-luxury px-8 py-3 rounded-full bg-brand text-ink font-medium"
            >
              Explore Collection
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-luxury px-8 py-3 rounded-full border border-ivory/40 text-ivory"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <Bestseller />
      <Offer />

      <UserReviews />

      <ChatWidget />
      <EpoxyVideo />

      {/* ================= COLLECTIONS ================= */}
      <section id="collections">
        <Collections />
      </section>

      {/* ================= VENDORS ================= */}
      <section id="vendors" className="bg-[#0e1a1f] py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.35em] text-brand mb-4">
            OUR TRUSTED PARTNERS
          </p>

          <h2 className="font-heading text-4xl mb-16">
            Crafted With <span className="text-brand">Premium Vendors</span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
            {[
              "Teakwood Co.",
              "Royal Upholstery",
              "Artisan Metals",
              "Pure Timber Works",
            ].map((vendor, index) => (
              <div
                key={index}
                onClick={() => navigate("/vendors")}
                className="
                  cursor-pointer
                  bg-black/40 border border-white/10
                  rounded-2xl py-12
                  hover:border-brand hover:-translate-y-1
                  transition-all duration-500
                "
              >
                <p className="text-brand text-xs tracking-widestPlus mb-2">
                  VENDOR {index + 1}
                </p>
                <h3 className="font-heading text-xl">
                  {vendor}
                </h3>
              </div>
            ))}
          </div>

          {/* VIEW ALL */}
          <button
            onClick={() => navigate("/vendors")}
            className="
              mt-16 px-8 py-3 rounded-full
              border border-ivory/40 text-ivory
              hover:bg-brand hover:text-ink
              transition-all
            "
          >
            View All Vendors
          </button>
        </div>
      </section>

      {/* ================= ABOUT================= */}
      <section
        id="about"
        ref={aboutRef}
        className="bg-[#f5f3ef] py-32 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">


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
                  <p className="text-sm text-black/60">we have transformed countless visions into reality with dedication and excellence.
                    Thank you for believing in us as we continue to build spaces that inspire</p>
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
              onClick={() => navigate('/about')}
              className="mt-6 px-8 py-4 bg-[#c9a24d] text-[#0b161b] font-bold rounded-full hover:bg-[#1b1b1b] hover:text-[#c9a24d] transition-all duration-300 flex items-center gap-2 group"
            >
              Explore Our Story
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>


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


      <section className="bg-white py-20 border-t border-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">


            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconBigTruck />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">Home Delivery</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Enjoy fast and safe home delivery on all premium orders directly to your doorstep.
              </p>
            </div>

            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconRefresh />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">10-Day Replacement</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Hassle-free 10-day replacement policy on all items for your complete peace of mind.
              </p>
            </div>


            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconShield />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">5-Year Service Warranty</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Built to last a lifetime, backed by a comprehensive 5-year service warranty.
              </p>
            </div>


            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconPhone />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">24/7 Call Support</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                We’re here for you, anytime. <br />
                <span className="font-semibold text-[#c9a24d]">+91 0000000000</span>
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;