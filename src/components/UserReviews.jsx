import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiTrash2, FiCheckCircle, FiEdit3, FiX, FiSave, FiCornerDownRight } from "react-icons/fi";

export default function UserReviews() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const fetchBackendReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/reviews/general");
      if (data && data.length > 0) {
        const formattedData = data.map((rev, index) => ({
          id: rev._id,
          userId: rev.user?._id || rev.user,
          name: rev.name || (rev.user && rev.user.name) || "Anonymous",
          text: rev.comment || rev.text,
          rating: rev.rating || 5,
          reply: rev.reply || "", 
          displayId: (index + 1).toString().padStart(2, '0'), 
          image: rev.image || (rev.user && rev.user.image) || `https://ui-avatars.com/api/?name=${rev.name}&background=001f3f&color=fff`
        }));
        setReviews(formattedData);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchBackendReviews();
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:3000/api/reviews/${id}`, config);
        fetchBackendReviews();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:3000/api/reviews/${id}`, { comment: editComment }, config);
      setEditingId(null);
      fetchBackendReviews();
      alert("Review updated!");
    } catch (error) {
      alert("Update failed");
    }
  };

  const myReviews = reviews.filter(r => 
    userInfo && (r.userId === userInfo._id || r.name === userInfo.name)
  );

  return (
    <section ref={sectionRef} className="relative bg-[#F9F9F7] py-32 lg:py-48 overflow-hidden font-sans text-left">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#001f3f]/5 rounded-full blur-[140px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[120px] translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[500px]">
          
          <div className="order-1 flex flex-col justify-center font-['Inter']">
            <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} className="flex items-center gap-4 mb-8">
                <span className="w-10 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></span>
                <span className="text-[#d4af37] text-[10px] font-semibold uppercase tracking-[5px]">Premium Craftsmanship</span>
              </motion.div>

              <h3 className="text-[#001f3f] text-5xl md:text-8xl font-['Playfair_Display'] leading-[1.05] mb-10 tracking-tight">
                See why they <br /> <span className="italic font-medium">choose us</span>
              </h3>

              <p className="text-slate-500/80 max-w-md mb-14 text-xl italic font-['Playfair_Display']">
                "Where every grain of wood tells a story of timeless elegance."
              </p>
              
              <div className="flex gap-14 md:gap-24 items-end">
                <div>
                  <span className="text-[#001f3f] text-5xl font-['Playfair_Display'] font-bold">{reviews.length}</span>
                  <p className="text-slate-400 text-[9px] uppercase tracking-[4px] mt-2">Total Reviews</p>
                </div>
                <div>
                  <span className="text-[#001f3f] text-5xl font-['Playfair_Display'] font-bold">10,000+</span>
                  <p className="text-slate-400 text-[9px] uppercase tracking-[4px] mt-2">Happy Clients</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[450px] flex items-center justify-center lg:justify-end order-2">
            <AnimatePresence mode="wait">
              
              {reviews.length > 0 && reviews[activeIndex] && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full max-w-[420px] bg-[#001f3f] p-10 md:p-14 rounded-[48px] shadow-2xl relative border border-[#d4af37]/20 flex flex-col justify-between h-fit min-h-[350px]"
                >
                  <span className="absolute top-10 right-12 text-[#d4af37]/30 font-mono text-2xl">
                    /{reviews[activeIndex]?.displayId}
                  </span>

                  <div>
                    <p className="text-white text-xl md:text-2xl font-light leading-[1.6] mb-6 italic">
                      "{reviews[activeIndex]?.text}"
                    </p>

                    {reviews[activeIndex]?.reply && (
                      <div className="mb-8 p-4 bg-white/5 rounded-2xl border-l-2 border-[#d4af37] ml-2 text-left">
                        <div className="flex items-center gap-2 text-[#d4af37] text-[10px] uppercase font-bold tracking-widest mb-1">
                          <FiCornerDownRight /> Admin Reply
                        </div>
                        <p className="text-white/70 text-sm italic">
                          {reviews[activeIndex]?.reply}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-5 pt-8 border-t border-white/10 text-left">
                    <img src={reviews[activeIndex]?.image} className="w-14 h-14 rounded-2xl object-cover border border-[#d4af37]/40" alt="" />
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-lg flex items-center gap-2">
                        {reviews[activeIndex]?.name} 
                        <FiCheckCircle className="text-white text-xs" />
                      </h4>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Verified User</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {userInfo && myReviews.length > 0 && (
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10 text-left">
              <h4 className="text-[#001f3f] text-3xl font-['Playfair_Display']">Manage Your Reviews</h4>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <div className="space-y-6">
                {myReviews.map((myRev) => (
                  <motion.div 
                    key={myRev.id} 
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left"
                  >
                    <div className="flex-1 w-full">
                      <span className="text-[#d4af37] text-[10px] font-mono block mb-2">REF: #{myRev.displayId}</span>
                      
                      {editingId === myRev.id ? (
                        <textarea 
                          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-[#d4af37] outline-none text-slate-700 font-light"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          rows="3"
                        />
                      ) : (
                        <p className="text-slate-600 text-lg italic leading-relaxed">"{myRev.text}"</p>
                      )}

                      {myRev.reply && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-l-2 border-[#001f3f] ml-2">
                          <div className="flex items-center gap-2 text-[#001f3f] text-[9px] uppercase font-bold tracking-widest mb-1">
                            <FiCornerDownRight /> Admin Reply
                          </div>
                          <p className="text-slate-500 text-sm italic">
                            {myRev.reply}
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Published Review
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {editingId === myRev.id ? (
                        <>
                          <button onClick={() => handleUpdate(myRev.id)} className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md"><FiSave size={18} /></button>
                          <button onClick={() => setEditingId(null)} className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"><FiX size={18} /></button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => { setEditingId(myRev.id); setEditComment(myRev.text); }}
                            className="p-3 bg-[#001f3f] text-white rounded-xl hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-2 px-5 text-xs font-semibold"
                          >
                            <FiEdit3 /> Edit
                          </button>
                          <button onClick={() => handleDelete(myRev.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><FiTrash2 size={18} /></button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}