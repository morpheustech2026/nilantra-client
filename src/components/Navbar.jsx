import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useScrollSpy from "../hooks/useScrollSpy";
import logo from "../../src/assets/nilantra-logo.png";
import toast from "react-hot-toast";

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /> <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" /> <path d="m6 6 12 12" />
  </svg>
);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [manualActive, setManualActive] = useState(null);
  
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const location = useLocation();

  const spyActive = useScrollSpy(["home", "collections", "about", "contact"]);
  const active = manualActive || spyActive || (location.pathname === "/" ? "home" : "");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (manualActive) setManualActive(null);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [manualActive]);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (id) => {
    setIsOpen(false);
    setManualActive(id);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      const offset = 100;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setTimeout(() => setManualActive(null), 1000);
  };

  const isHome = location.pathname === "/";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome ? "bg-[#011f4b]/95 backdrop-blur shadow-xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        
        <div onClick={() => handleNav("home")} className="flex items-center gap-2 cursor-pointer">
          <img src={logo} className="h-16 md:h-20" alt="Nilantra Logo" />
          <span className="text-white font-serif text-xl">Nilantra</span>
        </div>

        
        <ul className="hidden md:flex gap-10 text-sm text-gray-300 font-medium items-center">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li 
                key={item.id} 
                onClick={() => handleNav(item.id)} 
                className={`cursor-pointer relative group py-1 transition-colors duration-300 ${isActive ? "text-[#d29a23]" : "hover:text-white"}`}
              >
                {item.label}
                <span className={`absolute left-0 bottom-0 w-full h-[2.5px] bg-[#d29a23] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
              </li>
            );
          })}
          
          
          {userInfo && userInfo.role === "admin" && (
            <li 
              onClick={() => navigate("/admindashboard")} 
              className={`cursor-pointer relative group py-1 transition-colors duration-300 ${location.pathname === "/admindashboard" ? "text-[#d29a23]" : "hover:text-white"}`}
            >
              Admin Panel
              <span className={`absolute left-0 bottom-0 w-full h-[2.5px] bg-[#d29a23] transition-opacity duration-300 ${location.pathname === "/admindashboard" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
            </li>
          )}

      
          {userInfo && userInfo.role === "vendor" && (
            <li 
              onClick={() => navigate("/vendordashboard")} 
              className={`cursor-pointer relative group py-1 transition-colors duration-300 ${location.pathname === "/vendordashboard" ? "text-[#d29a23]" : "hover:text-white"}`}
            >
              Vendor Panel
              <span className={`absolute left-0 bottom-0 w-full h-[2.5px] bg-[#d29a23] transition-opacity duration-300 ${location.pathname === "/vendordashboard" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
            </li>
          )}
        </ul>

       
        <div className="hidden md:block">
          {userInfo ? (
            <button 
              onClick={handleLogout} 
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-[#d29a23] hover:text-white transition-all duration-300 font-bold"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-[#d29a23] hover:text-white transition-all duration-300 font-bold"
            >
              Login
            </button>
          )}
        </div>

        
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <IconX /> : <IconMenu />}
        </button>

        
        {isOpen && (
          <div className="absolute top-full right-6 mt-2 w-56 bg-[#011f4b] rounded-2xl shadow-2xl md:hidden border border-white/10 overflow-hidden">
            <div className="flex flex-col p-2">
              {navItems.map((item) => (
                <div key={item.id} onClick={() => handleNav(item.id)} className={`px-6 py-4 text-sm rounded-xl cursor-pointer transition-all ${active === item.id ? "bg-white/10 text-[#d29a23] font-bold" : "text-gray-300 hover:bg-white/5"}`}>
                  {item.label}
                </div>
              ))}
              
              
              {userInfo && userInfo.role === "admin" && (
                <div 
                  onClick={() => { setIsOpen(false); navigate("/admindashboard"); }} 
                  className={`px-6 py-4 text-sm rounded-xl cursor-pointer transition-all ${location.pathname === "/admindashboard" ? "bg-white/10 text-[#d29a23] font-bold" : "text-gray-300 hover:bg-white/5"}`}
                >
                  Admin Panel
                </div>
              )}

              
              {userInfo && userInfo.role === "vendor" && (
                <div 
                  onClick={() => { setIsOpen(false); navigate("/vendordashboard"); }} 
                  className={`px-6 py-4 text-sm rounded-xl cursor-pointer transition-all ${location.pathname === "/vendordashboard" ? "bg-white/10 text-[#d29a23] font-bold" : "text-gray-300 hover:bg-white/5"}`}
                >
                  Vendor Panel
                </div>
              )}

             
              <div className="p-2 border-t border-white/10 mt-2">
                {userInfo ? (
                  <button onClick={handleLogout} className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-[#d29a23] hover:text-white transition-all">Logout</button>
                ) : (
                  <button onClick={() => { setIsOpen(false); navigate("/login"); }} className="w-full py-3 bg-[#d29a23] text-white rounded-xl font-bold">Login</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;