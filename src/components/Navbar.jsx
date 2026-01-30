import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useScrollSpy from "../hooks/useScrollSpy";
import logo from "../../src/assets/nilantra-logo.png"; 
import { Menu, X } from 'lucide-react'; 

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const active = useScrollSpy(["home", "collections", "about", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setIsOpen(false); 
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500
        ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-lg shadow-xl" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* LOGO */}
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => handleNav("home")}
        >
          <img 
            src={logo} 
            alt="Nilantra Logo" 
            className="h-16 md:h-20 w-auto object-contain" 
          />
          <span className="font-serif text-xl text-white">Nilantra</span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 text-sm text-gray-300">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`
                cursor-pointer relative transition
                ${active === item.id ? "text-[#d29a23]" : "hover:text-white"}
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:bg-[#d29a23] after:transition-all
                ${active === item.id ? "after:w-full" : "after:w-0 hover:after:w-full"}
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* DESKTOP LOGIN BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block px-6 py-2 rounded-full
                     bg-white text-black text-sm font-medium
                     hover:bg-[#d29a23] hover:text-white transition"
        >
          Login
        </button>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- MOBILE DROPDOWN BOX (New Code) --- */}
        {isOpen && (
          <div className="absolute top-full right-6 mt-2 w-48 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl py-2 flex flex-col md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
            <ul className="flex flex-col text-gray-300">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    cursor-pointer px-6 py-3 hover:bg-white/5 transition-colors text-sm font-medium
                    ${active === item.id ? "text-[#d29a23]" : ""}
                  `}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            
            <div className="h-[1px] bg-gray-800 my-1 mx-4"></div> {/* Divider Line */}
            
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="mx-4 my-2 px-4 py-2 rounded-lg bg-[#d29a23] text-white text-sm font-medium hover:bg-[#b5851d] transition text-center"
            >
              Login
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;