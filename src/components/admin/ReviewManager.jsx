import React, { useState, useEffect } from "react";
import { FiStar, FiEdit2, FiTrash2, FiMessageSquare, FiCheck, FiUser } from "react-icons/fi";
import axios from "axios";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ userName: "", comment: "", rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/reviews/general");
      const formatted = data.map(rev => ({
        id: rev._id || rev.id,
        userName: rev.name || rev.userName,
        comment: rev.comment || rev.text,
        rating: rev.rating,
        date: rev.date || "2026-02-13"
      }));
      setReviews(formatted);
    } catch (error) {
      console.error("Error loading reviews", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this review permanently?")) {
      try {
        await axios.delete(`http://localhost:3000/api/reviews/${id}`);
        setReviews(reviews.filter((rev) => rev.id !== id));
      } catch (error) {
        alert("Delete failed.");
      }
    }
  };

  const handleSave = async (id) => {
    try {
      const updatedData = {
        name: editForm.userName,
        comment: editForm.comment,
        rating: editForm.rating
      };
      await axios.put(`http://localhost:3000/api/reviews/${id}`, updatedData);
      setReviews(reviews.map((rev) => (rev.id === id ? { ...rev, ...editForm } : rev)));
      setEditingId(null);
    } catch (error) {
      alert("Save failed.");
    }
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditForm({ userName: review.userName, comment: review.comment, rating: review.rating });
  };

  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-[#c7a17a] transition-all";
  const labelStyle = "text-[8px] text-gray-500 uppercase font-bold mb-1 block tracking-widest";

  return (
    <div className="w-full animate-in fade-in duration-700 space-y-4 px-4 md:px-0 max-w-4xl mx-auto">
      
      
      <header className="border-b border-[#c7a17a]/20 pb-6 mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-tight text-[#001f3f] dark:text-white">
            Review Control Center
          </h2>
          <p className="text-[#c7a17a] text-[10px] md:text-xs mt-1 uppercase tracking-[0.2em] font-bold">
            Manage Artisan Feedback & Network
          </p>
        </div>
      </header>

      
      <section className="bg-[#001f3f] rounded-[1.5rem] p-4 md:p-6 border border-[#c7a17a]/10 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
           <h3 className="text-[#c7a17a] font-bold uppercase text-[9px] tracking-[0.2em] flex items-center gap-2">
             <FiMessageSquare size={12}/>
             Active Reviews
           </h3>
           <span className="bg-[#c7a17a]/20 text-[#c7a17a] px-2 py-0.5 rounded text-[9px] font-bold">
             {reviews.length} Total
           </span>
        </div>

        <div className="grid gap-3">
          {reviews.map((rev) => (
            <div key={rev.id} className="group bg-[#00152b] rounded-xl p-4 border border-white/5 hover:border-[#c7a17a]/30 transition-all">
              {editingId === rev.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>Name</label>
                      <input className={inputStyle} value={editForm.userName} onChange={(e)=>setEditingId({...editForm, userName: e.target.value})}/>
                    </div>
                    <div>
                      <label className={labelStyle}>Stars</label>
                      <select className={inputStyle} value={editForm.rating} onChange={(e)=>setEditForm({...editForm, rating: Number(e.target.value)})}>
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                  </div>
                  <textarea className={`${inputStyle} h-16`} value={editForm.comment} onChange={(e)=>setEditForm({...editForm, comment: e.target.value})}/>
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(rev.id)} className="bg-[#c7a17a] text-[#001f3f] px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-1"><FiCheck size={12}/> Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 text-[10px] font-bold">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-[#c7a17a]/5 p-2.5 rounded-lg text-[#c7a17a] shrink-0 border border-[#c7a17a]/10">
                        <FiUser size={16}/>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-white truncate">{rev.userName}</h4>
                        <div className="flex text-[#c7a17a] gap-0.5">
                          {[...Array(5)].map((_, i) => (
                              <FiStar key={i} size={8} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "opacity-20"}/>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400 italic text-xs leading-snug mt-0.5 line-clamp-1 group-hover:line-clamp-none transition-all">
                        "{rev.comment}"
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(rev)} className="p-2 bg-white/5 rounded-lg hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all"><FiEdit2 size={12}/></button>
                    <button onClick={() => handleDelete(rev.id)} className="p-2 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 size={12}/></button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-10 border border-dashed border-white/5 rounded-xl">
                <p className="text-gray-500 font-serif italic text-xs">No active reviews.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewManager;