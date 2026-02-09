import React, { useState } from "react";
import { FiStar, FiEdit2, FiTrash2, FiMessageSquare, FiCheck, FiX, FiUser } from "react-icons/fi";

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
    <div className="w-full animate-in fade-in duration-700">
      <section className="bg-[#000e1a] rounded-[2rem] p-8 border border-[#c7a17a]/20 shadow-2xl">
        <header className="mb-8">
          <h3 className="text-white font-bold text-2xl italic flex items-center gap-3">
            <FiMessageSquare className="text-[#c7a17a]" /> Customer Reviews
          </h3>
          <p className="text-gray-500 text-xs mt-2 italic">
            Manage and moderate feedback from Nilantra customers.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {reviews.length === 0 ? (
            <div className="text-gray-600 text-center py-10 italic">No reviews available at the moment.</div>
          ) : (
            reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-[#00152b] rounded-2xl p-6 border border-[#c7a17a]/10 hover:border-[#c7a17a]/30 transition-all group"
              >
                {editingId === rev.id ? (
                  
                  <div className="space-y-4 animate-in zoom-in-95 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-[#c7a17a] uppercase font-bold mb-1 block">User Name</label>
                        <input 
                          className="w-full bg-[#000e1a] border border-[#c7a17a]/30 p-3 rounded-xl text-white text-sm outline-none focus:border-[#c7a17a]"
                          value={editForm.userName}
                          onChange={(e) => setEditForm({...editForm, userName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#c7a17a] uppercase font-bold mb-1 block">Rating</label>
                        <select 
                          className="w-full bg-[#000e1a] border border-[#c7a17a]/30 p-3 rounded-xl text-white text-sm outline-none"
                          value={editForm.rating}
                          onChange={(e) => setEditForm({...editForm, rating: Number(e.target.value)})}
                        >
                          {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-[#c7a17a] uppercase font-bold mb-1 block">Comment</label>
                      <textarea 
                        className="w-full bg-[#000e1a] border border-[#c7a17a]/30 p-3 rounded-xl text-white text-sm outline-none h-24"
                        value={editForm.comment}
                        onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(rev.id)} className="bg-green-600 text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                        <FiCheck /> Update Review
                      </button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-800 text-white px-6 py-2 rounded-xl text-xs font-bold">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-[#c7a17a]/10 p-2 rounded-full">
                          <FiUser className="text-[#c7a17a]" size={18} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{rev.userName}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <FiStar key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-700"} />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#c7a17a] font-bold mb-1 uppercase tracking-tighter">Product: {rev.productName}</div>
                      <p className="text-gray-400 text-sm italic leading-relaxed font-light">"{rev.comment}"</p>
                    </div>

                    <div className="flex gap-2 self-end md:self-center">
                      <button 
                        onClick={() => startEdit(rev)}
                        className="p-3 bg-[#c7a17a]/10 text-[#c7a17a] rounded-xl hover:bg-[#c7a17a] hover:text-[#000e1a] transition-all"
                        title="Edit Feedback"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(rev.id)}
                        className="p-3 bg-red-600/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        title="Remove Review"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewManager;