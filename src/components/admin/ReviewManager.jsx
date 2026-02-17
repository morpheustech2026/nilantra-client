import React, { useState, useEffect } from "react";
import { FiStar, FiTrash2, FiMessageSquare, FiUser, FiSend, FiX } from "react-icons/fi";
import axios from "axios";
// Importing Toast for better notifications
import toast, { Toaster } from "react-hot-toast";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/reviews");
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews from the server.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      const loadingToast = toast.loading("Deleting review...");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        await axios.delete(`http://localhost:3000/api/reviews/${id}`, config);
        setReviews(reviews.filter((rev) => (rev._id || rev.id) !== id));
        toast.success("Review deleted successfully!", { id: loadingToast });
      } catch (error) {
        toast.error("Delete failed. Please ensure you have Admin permissions.", { id: loadingToast });
      }
    }
  };

  const handleReplySubmit = async (id) => {
    if (!replyText.trim()) {
        return toast.error("Please enter a reply message.");
    }

    const loadingToast = toast.loading("Sending your reply...");
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      
      await axios.put(`http://localhost:3000/api/reviews/${id}`, { reply: replyText }, config);

      await fetchReviews(); 
      setReplyingId(null);
      setReplyText("");
      toast.success("Reply sent successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to send reply. Please try again.", { id: loadingToast });
    }
  };

  return (
    <div className="bg-white min-h-screen p-6 font-sans text-left">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
       

        {/* PAGE SUB-HEADER */}
        <header className="mb-10">
          <h2 className="text-4xl font-serif font-bold italic tracking-tight text-[#001f3f]">
            Review Control Center
          </h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">
            ADMINISTRATIVE HUB / USER FEEDBACK
          </p>
        </header>

        {/* REVIEWS GRID */}
        <div className="grid gap-6">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev._id} className="bg-[#001f3f] rounded-[2.5rem] p-8 shadow-[0_20px_50px_-15px_rgba(0,31,63,0.4)] border border-white/5">
                <div className="flex justify-between items-start">
                  <div className="flex gap-6">
                    <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#d4af37] border border-white/20 shadow-inner">
                      <FiUser size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <h4 className="font-bold text-white text-lg tracking-wide">{rev.name || rev.user?.name}</h4>
                        <div className="flex text-[#d4af37]">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "opacity-20"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/70 mt-3 italic text-base leading-relaxed">"{rev.comment}"</p>

                      {rev.reply && (
                        <div className="mt-5 bg-white/5 p-4 rounded-2xl border-l-2 border-[#d4af37] ml-2">
                          <p className="text-[10px] text-[#d4af37] font-black uppercase tracking-widest">Admin Reply</p>
                          <p className="text-sm text-white/60 mt-2 italic">{rev.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                        onClick={() => { setReplyingId(rev._id); setReplyText(rev.reply || ""); }} 
                        className="p-3.5 bg-white/10 text-[#d4af37] rounded-2xl hover:bg-[#d4af37] hover:text-[#001f3f] transition-all border border-white/10"
                        title="Reply to Review"
                    >
                        <FiMessageSquare size={18} />
                    </button>
                    <button 
                        onClick={() => handleDelete(rev._id)} 
                        className="p-3.5 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                        title="Delete Review"
                    >
                        <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {replyingId === rev._id && (
                  <div className="mt-8 pt-8 border-t border-white/10 animate-in fade-in duration-300">
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:border-[#d4af37] text-white placeholder-white/20 transition-all"
                      placeholder="Write your professional response here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows="4"
                    />
                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={() => handleReplySubmit(rev._id)} 
                        className="bg-[#d4af37] text-[#001f3f] px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        <FiSend /> Send Reply
                      </button>
                      <button 
                        onClick={() => setReplyingId(null)} 
                        className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors"
                      >
                        <FiX className="inline mr-1" /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-[#001f3f] rounded-[2.5rem] border border-dashed border-white/10">
                <p className="text-white/30 italic font-serif text-lg">No reviews found in the secure system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewManager;