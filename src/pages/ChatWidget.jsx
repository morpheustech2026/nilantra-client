import { useEffect, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPhone = "918129013942"; 
    const whatsappMessage = `Hello, New Enquiry:\n*Name:* ${form.name}\n*Mobile:* ${form.phone}\n*Email:* ${form.email}\n*Message:* ${form.message}`;
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/50 backdrop-blur-md transition-opacity" />
      )}

      
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#1f3a4d] text-ivory flex items-center justify-center animate-floatPulse hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>

      
      {open && (
        <div className="fixed bottom-40 right-6 z-40 w-[360px] bg-[#f2f5f7] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.45)] animate-chatEnter">
          <div className="flex items-center justify-between px-5 py-4 bg-[#1f3a4d] text-ivory">
            <p className="font-semibold text-sm">Nilantra Design Support</p>
            <button onClick={() => setOpen(false)} className="text-ivory/70 hover:text-ivory transition">✕</button>
          </div>

          <div className="p-5 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              {['name', 'phone', 'email'].map((f) => (
                <input key={f} name={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]} onChange={handleChange} required className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#1f3a4d]/40" />
              ))}
              <textarea name="message" placeholder="How can we help you?" value={form.message} onChange={handleChange} rows="3" className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#1f3a4d]/40" />
              <button type="submit" className="w-full bg-[#1f3a4d] text-ivory py-2.5 rounded-xl hover:bg-[#183042] transition-all">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}