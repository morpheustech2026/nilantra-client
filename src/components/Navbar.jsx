import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useScrollSpy from "../hooks/useScrollSpy";
import logo from "../../src/assets/nilantra-logo.png";

/* ================= ICONS ================= */
const IconMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

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

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  // ================= HANDLE NAVIGATION =================
  const handleNav = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    
    const element = document.getElementById(id);
    const offset = 110; 

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
    
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[#011f4b]/95 backdrop-blur shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} className="h-16 md:h-20" />
          <span className="text-white font-serif text-xl">Nilantra</span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10 text-sm text-gray-300">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`cursor-pointer relative ${
                active === item.id ? "text-[#d29a23]" : "hover:text-white"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block px-6 py-2 bg-white text-black rounded-full hover:bg-[#d29a23] hover:text-white transition"
        >
          Login
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <IconX /> : <IconMenu />}
        </button>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="absolute top-full right-6 mt-2 w-48 bg-[#011f4b] rounded-xl shadow-xl md:hidden">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="px-6 py-3 text-sm text-gray-300 hover:bg-white/10 cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
