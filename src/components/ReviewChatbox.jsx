import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ReviewChatbox = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0); 
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const handleOpenToggle = () => {
        if (!userInfo) {
            toast.error("Please login to write a review!", {
                duration: 3000,
                position: 'top-center',
                style: { borderRadius: '10px', background: '#1f3a4d', color: '#fff' },
            });
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await axios.post('https://nilantra-server.onrender.com/api/reviews/general', {
                rating: Number(rating),
                comment: comment,
            }, config);

            if (response.status === 201) {
                toast.success("Thank you! Your review is live.");
                setComment("");
                setTimeout(() => {
                    setIsOpen(false);
                    window.location.reload(); 
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Toaster /> 

            <button 
                onClick={handleOpenToggle}
                className="bg-[#1f3a4d] hover:bg-[#c29d59] text-white px-8 py-4 rounded-full shadow-2xl transition-all font-bold flex items-center gap-2 group"
            >
                <span className="group-hover:scale-110 transition-transform text-xl">💬</span>
                {isOpen ? "Close" : "Review Nilantra"}
            </button>

            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[400px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  
                    <div className="bg-[#1f3a4d] p-8 text-white relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <h3 className="font-bold text-xl text-[#c29d59] relative z-10">Hi {userInfo?.name.split(' ')[0]},</h3>
                        <p className="text-sm text-white/70 mt-1 relative z-10 font-light">Your feedback helps us grow!</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                       
                        <div className="space-y-3">
                            <label className="text-xs uppercase tracking-widest font-black text-gray-500">Rate your experience</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`text-3xl transition-all duration-200 transform ${
                                            star <= (hover || rating) ? "scale-110 text-yellow-400" : "scale-100 text-gray-200"
                                        }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        ★
                                    </button>
                                ))}
                                <span className="ml-2 text-xs font-bold text-gray-400 self-center">
                                    {rating === 5 ? "Excellent!" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : "Terrible"}
                                </span>
                            </div>
                        </div>

                       
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-black text-gray-500">Your Message</label>
                            <textarea 
                                placeholder="Tell us what you liked about Nilantra furniture..." 
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#c29d59]/30 rounded-3xl px-6 py-5 text-sm h-36 resize-none outline-none transition-all placeholder:text-gray-400 placeholder:italic text-gray-700 shadow-inner"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>

                       
                        <button 
                            disabled={loading}
                            type="submit"
                            className="w-full bg-[#1f3a4d] hover:bg-[#162a38] text-white py-5 rounded-[1.5rem] font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : "Send Review"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ReviewChatbox;