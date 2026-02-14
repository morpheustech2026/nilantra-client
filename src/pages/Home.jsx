import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Bestseller from "../components/Bestseller";
import Offer from "../components/Offer";
import UserReviews from "../components/UserReviews";
import ChatWidget from "./ChatWidget";
import EpoxyVideo from "../components/EpoxyVideo";
import Collections from "../components/Collections";
import Vendors from "../components/Vendors";
import AboutSection from "../components/AboutSection";
import Services from "../components/Services";
import Loader from "../components/Loader"; // 
import ReviewChatbox from "../components/ReviewChatbox";

function Home() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
   
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
   
    window.scrollTo(0, 0);

    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (!loading) {
      const id = location.state?.scrollTo;

    
      const targetId = id || "hero-section";
      const element = document.getElementById(targetId);

      if (element) {
        
        const scrollTimer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150); 

        return () => clearTimeout(scrollTimer);
      }
    }
  }, [loading, location]);

  if (loading) return <Loader />;

  return (
    <main className="w-full bg-ink text-ivory overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Bestseller />
      <Offer />
      <UserReviews />
      
      <ChatWidget />
      <ReviewChatbox/>
      <EpoxyVideo />
      <Collections />
      <Vendors />
      <AboutSection />
      <Services />
    </main>
  );
}

export default Home;