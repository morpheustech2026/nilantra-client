import { useEffect, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const adminPhone = "918129013942"; 

    const whatsappMessage = `
Hello, New Enquiry from Chat Widget:

 *Name:* ${form.name}
 *Mobile:* ${form.phone}
 *Email:* ${form.email}
 *Message:* ${form.message}
    `;

  
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");

    
    setForm({ name: "", email: "", phone: "", message: "" });
    setOpen(false);
  };

  /* ================= AUTO-HIDE ON FOOTER ================= */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0.3 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-md transition-opacity"
        />
      )}

      {/* FLOATING ICON BUTTON */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="
          fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full
          bg-[#1f3a4d] text-ivory
          flex items-center justify-center
          animate-floatPulse
          hover:bg-[#183042] hover:scale-110
          active:scale-95
          transition-all duration-300
          shadow-2xl
        "
      >
        {/* CHAT ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>

      {/* CHAT BOX */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6 z-40 w-[360px]
            bg-[#f2f5f7]
            rounded-3xl overflow-hidden
            shadow-[0_40px_120px_rgba(0,0,0,0.45)]
            animate-chatEnter
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#1f3a4d] text-ivory">
            <p className="font-semibold tracking-wide">
              Nilantra Design Support
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-ivory/70 hover:text-ivory transition"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-4">
            <p className="text-sm text-[#2f3e46]">
              Share your details. Our interior expert will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { name: "name", placeholder: "Your Name", type: "text" },
                { name: "phone", placeholder: "Mobile Number", type: "tel" },
                { name: "email", placeholder: "Email Address", type: "email" },
              ].map((field) => (
                <input
                  key={field.name}
                  {...field}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  // 👇 ADDED 'text-black' HERE
                  className="
                    w-full border border-black/10
                    rounded-xl px-4 py-2.5 text-sm
                    bg-white text-black 
                    transition-all duration-300
                    focus:-translate-y-0.5
                    focus:shadow-lg
                    focus:outline-none
                    focus:ring-2 focus:ring-[#1f3a4d]/40
                  "
                />
              ))}

              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                rows="3"
                // 👇 ADDED 'text-black' HERE ALSO
                className="
                  w-full border border-black/10
                  rounded-xl px-4 py-2.5 text-sm
                  bg-white text-black
                  transition-all duration-300
                  focus:-translate-y-0.5
                  focus:shadow-lg
                  focus:outline-none
                  focus:ring-2 focus:ring-[#1f3a4d]/40
                "
              />

              <button
                type="submit"
                className="
                  w-full bg-[#1f3a4d] text-ivory py-2.5 rounded-xl
                  hover:bg-[#183042]
                  hover:scale-[1.02]
                  active:scale-95
                  transition-all duration-300
                "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}