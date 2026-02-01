import React from "react";
import { useNavigate } from "react-router-dom";

function Vendors() {
  const navigate = useNavigate();

  const vendors = [
    "Teakwood Co.",
    "Royal Upholstery",
    "Artisan Metals",
    "Pure Timber Works",
  ];

  return (
    <section
      id="vendors"
      className="bg-gradient-to-br from-[#011f4b] to-[#000a1a] py-32"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.35em] text-[#c9a24d] mb-4">
          OUR TRUSTED PARTNERS
        </p>

        <h2 className="font-heading text-4xl mb-16 text-white">
          Crafted With <span className="text-[#c9a24d]">Premium Vendors</span>
        </h2>

        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              onClick={() => navigate("/vendorslist")}
              className="
                cursor-pointer
                bg-[#001533]/50 border border-white/10
                rounded-2xl py-14
                hover:border-[#c9a24d] hover:-translate-y-1
                hover:shadow-2xl
                transition-all duration-500
                backdrop-blur-sm
              "
            >
              <h3 className="font-heading text-xl text-white tracking-wide">
                {vendor}
              </h3>
            </div>
          ))}
        </div>

        
        <button
          onClick={() => navigate("/vendorslist")}
          className="
            mt-20 px-10 py-3 rounded-full
            border border-white/20 text-gray-300
            hover:bg-[#c9a24d] hover:text-[#000a1a]
            hover:border-[#c9a24d]
            transition-all duration-300
          "
        >
          View All Vendors
        </button>
      </div>
    </section>
  );
}

export default Vendors;
