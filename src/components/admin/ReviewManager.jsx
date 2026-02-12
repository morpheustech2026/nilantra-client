import React, { useState } from "react";
import { FiStar, FiEdit2, FiTrash2, FiMessageSquare, FiCheck, FiUser, FiX } from "react-icons/fi";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Amal Raj",
      productName: "Premium Teak Sofa",
      rating: 5,
      comment: "Excellent quality furniture. The finishing is absolutely premium!",
      date: "2026-02-01",
    },
    {
      id: 2,
      userName: "Shruthi Lakshmi",
      productName: "King Size Bed",
      rating: 4,
      comment: "Loved the design, but the delivery was slightly delayed.",
      date: "2026-02-08",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ userName: "", comment: "", rating: 5 });

  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-3 md:py-4 outline-none focus:border-[#c7a17a] text-white transition-all text-sm placeholder:text-gray-600";
  const labelStyle = "text-[10px] text-gray-500 uppercase font-bold ml-1 mb-2 block tracking-widest";

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      setReviews(reviews.filter((rev) => rev.id !== id));
    }
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditForm({ 
      userName: review.userName, 
      comment: review.comment, 
      rating: review.rating 
    });
  };

  const handleSave = (id) => {
    setReviews(reviews.map((rev) => (rev.id === id ? { ...rev, ...editForm } : rev)));
    setEditingId(null);
  };

  return (
    <div className="w-full animate-in fade-in duration-700 space-y-8 md:space-y-12 px-4 md:px-0 max-w-5xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c7a17a]/20 pb-6 md:pb-8 mb-6 md:mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-wide">Customer Feedback</h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">Manage Nilantra Luxury Experience</p>
        </div>
      </header>

      
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 space-y-6 md:space-y-10 shadow-2xl border border-[#c7a17a]/10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-6 md:pb-8 gap-4">
          <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-3 italic">
            <FiMessageSquare /> Moderate Reviews
          </h3>
          <div className="px-5 py-2 bg-[#c7a17a]/5 border border-[#c7a17a]/20 rounded-full text-[#c7a17a] text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
            Total Count: {reviews.length}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {reviews.length === 0 ? (
            <div className="text-gray-600 text-center py-16 md:py-20 italic border-2 border-dashed border-[#c7a17a]/10 rounded-2xl md:rounded-[2.5rem] uppercase text-[9px] md:text-[10px] tracking-widest font-black">
              No reviews available at the moment.
            </div>
          ) : (
            reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-[#00152b] rounded-2xl md:rounded-[2rem] p-5 md:p-8 border border-[#c7a17a]/5 hover:border-[#c7a17a]/30 transition-all duration-500 group shadow-inner"
              >
                {editingId === rev.id ? (
                  
                  <div className="space-y-4 md:space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-1">
                        <label className={labelStyle}>User Name</label>
                        <input 
                          className={inputStyle}
                          value={editForm.userName}
                          onChange={(e) => setEditForm({...editForm, userName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle}>Rating Score</label>
                        <select 
                          className={inputStyle}
                          value={editForm.rating}
                          onChange={(e) => setEditForm({...editForm, rating: Number(e.target.value)})}
                        >
                          {[5,4,3,2,1].map(num => <option key={num} value={num} className="bg-[#00152b]">{num} Stars</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className={labelStyle}>Comment Narrative</label>
                      <textarea 
                        className={`${inputStyle} h-28 md:h-32 resize-none`}
                        value={editForm.comment}
                        onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                      <button onClick={() => handleSave(rev.id)} className="flex-1 bg-[#c7a17a] text-[#001f3f] py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2">
                        <FiCheck strokeWidth={3} /> Save Changes
                      </button>
                      <button onClick={() => setEditingId(null)} className="flex-1 border border-[#c7a17a]/30 text-[#c7a17a] py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-6">
                        <div className="bg-[#c7a17a]/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-[#c7a17a]/20 shadow-xl shrink-0">
                          <FiUser className="text-[#c7a17a]" size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-black text-lg md:text-xl tracking-tight mb-1 truncate">{rev.userName}</h4>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <div className="flex text-yellow-500 gap-0.5 md:gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-800"} />
                              ))}
                            </div>
                            <span className="text-[8px] md:text-[9px] text-gray-600 font-black uppercase tracking-widest">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="inline-block px-3 py-1 bg-[#c7a17a]/10 border border-[#c7a17a]/20 rounded-full text-[8px] md:text-[9px] text-[#c7a17a] font-black mb-3 md:mb-4 uppercase tracking-widest">
                        Item: {rev.productName}
                      </div>
                      <p className="text-gray-400 text-xs md:text-sm italic leading-relaxed font-light md:pr-12">"{rev.comment}"</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                      <button 
                        onClick={() => startEdit(rev)}
                        className="p-3 md:p-4 bg-[#c7a17a]/10 text-[#c7a17a] rounded-xl md:rounded-2xl hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all border border-[#c7a17a]/20"
                        title="Edit Review"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(rev.id)}
                        className="p-3 md:p-4 bg-red-600/10 text-red-500 rounded-xl md:rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
                        title="Delete Permanently"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-white/20 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
          Nilantra artisan review protocol © 2026
      </footer>
    </div>
  );
};

export default ReviewManager;