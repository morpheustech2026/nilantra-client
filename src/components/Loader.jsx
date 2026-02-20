import React from "react";
import logo from "../assets/nilantra-logo.png"; 

function Loader() {
  return (
    <div className="fixed inset-0 bg-[#0b161b] flex flex-col items-center justify-center z-[9999]">
      
      {/* Logo Image */}
      <img
        src={logo}
        alt="Loading"
        className="
          w-[150px]
          animate-nilantraPulse 
          drop-shadow-[0_0_14px_rgba(212,175,55,0.35)]
        "
      />

      {/* Loading Text */}
      <p className="mt-4 text-[#d4af37] text-xs tracking-[0.35em] font-medium animate-pulse">
        LOADING
      </p>
    </div>
  );
}

export default Loader;