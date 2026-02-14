import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiTrash2, FiCornerDownRight } from "react-icons/fi"; 

export default function UserReviews() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [reviews, setReviews] = useState([]);

 
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const isAdmin = userInfo && userInfo.isAdmin;

  const fetchBackendReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/reviews/general");
      if (data && data.length > 0) {
        const formattedData = data.map(rev => ({
          id: rev._id,
          name: rev.name || "Anonymous",
          text: rev.comment || rev.text,
          rating: rev.rating || 5,
          reply: rev.reply || "", 
          image: rev.image || `https://ui-avatars.com/api/?name=${rev.name}&background=001f3f&color=fff`
        }));
        setReviews(formattedData);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchBackendReviews();
  }, []);

  
  const handleDelete = async (id) => {
    if (window.confirm("ഈ റിവ്യൂ എന്നെന്നേക്കുമായി ഡിലീറ്റ് ചെയ്യണോ?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`http://localhost:3000/api/reviews/${id}`, config);
        alert("Review Deleted!");
        fetchBackendReviews(); 
      } catch (error) {
        alert(error.response?.data?.message || "Delete failed");
      }
    }
  };

  const stats = [
    { value: 11000, label: "Happy Customers", suffix: "+" },
    { value: 100, label: "Cities Served", suffix: "+" },
    { value: 7, label: "Easy Return Policy", suffix: " Days" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  useEffect(() => {
    if (!visible) return;
    statsRef.current.forEach((el, index) => {
      if (!el) return;
      let start = 0;
      const end = stats[index].value;
      const duration = 1500;
      const increment = end / (duration / 16);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          el.innerText = end.toLocaleString() + (stats[index].suffix || "");
          clearInterval(counter);
        } else {
          el.innerText = Math.floor(start).toLocaleString();
        }
      }, 16);
    });
  }, [visible]);

  return (
    <section ref={sectionRef} className="relative bg-[#f6f8fa] py-32 overflow-hidden">
      
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001f3f]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#001f3f] font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              See <span className="text-[#001f3f]">Why They</span> <br /> Love Us
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-sm font-light">
              Hear from our community of over 11k happy homeowners.
            </p>
            
            <div className="flex items-center gap-3">
              {reviews.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? "w-10 bg-[#001f3f]" : "w-2 bg-slate-300 hover:bg-slate-400"}`} 
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[450px] flex items-center">
          <AnimatePresence mode="wait">
            {reviews.length > 0 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-[#001f3f] rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col justify-between border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21Z" fillOpacity="0.4"/><path d="M14.017 11C14.017 4.92487 18.9419 0 25.017 0V4C21.151 4 18.017 7.13401 18.017 11V13H21.017C22.1216 13 23.017 13.8954 23.017 15V20C23.017 21.1046 22.1216 22 21.017 22H16.017C14.9124 22 14.017 21.1046 14.017 20V11H11L14.017 11Z" fill="white"/><path d="M3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21Z" fillOpacity="0.4"/><path d="M3 11C3 4.92487 7.92487 0 14 0V4C10.134 4 7 7.13401 7 11V13H10C11.1046 13 12 13.8954 12 15V20C12 21.1046 11.1046 22 10 22H5C3.89543 22 3 21.1046 3 20V11H0L3 11Z" fill="white"/></svg>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex text-yellow-400 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < reviews[activeIndex]?.rating ? "text-xl" : "text-xl opacity-20"}>★</span>
                      ))}
                    </div>
                   
                    {isAdmin && (
                      <button 
                        onClick={() => handleDelete(reviews[activeIndex].id)}
                        className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      >
                        <FiTrash2 size={18}/>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-white/90 text-xl md:text-2xl font-light leading-snug italic mt-6">
                    “{reviews[activeIndex]?.text}”
                  </p>

                  
                  {reviews[activeIndex]?.reply && (
                    <div className="mt-4 flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <FiCornerDownRight className="text-green-400 shrink-0 mt-1" />
                      <p className="text-sm text-white/60 leading-relaxed italic">
                        <span className="text-green-400 font-bold not-italic">Nilantra:</span> {reviews[activeIndex].reply}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-5 mt-10">
                  <div className="relative">
                    <img
                      src={reviews[activeIndex]?.image}
                      alt=""
                      className="w-16 h-16 rounded-[20px] object-cover border-2 border-white/20"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + reviews[activeIndex]?.name }} 
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{reviews[activeIndex]?.name}</h4>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 mt-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-slate-200 rounded-[30px] overflow-hidden">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-10 text-center hover:bg-slate-50 transition-colors">
              <h3 
                ref={(el) => (statsRef.current[i] = el)} 
                className="text-4xl font-black text-[#001f3f] mb-1"
              >0</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[3px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}