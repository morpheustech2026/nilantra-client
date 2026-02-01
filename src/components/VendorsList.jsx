import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { vendors } from "../data/vendors";

function VendorsList() {
  const navigate = useNavigate();

  return (
    <main className="bg-[#f5f3ef] text-[#1b1b1b] min-h-screen relative">
      <Navbar />

      <div className="fixed top-0 left-0 w-full h-28 bg-[#011f4b] z-40 shadow-xl" />

      <section className="pt-40 pb-24 text-center relative z-0">
        <p className="text-xs tracking-[0.35em] text-[#c9a24d] mb-4">
          OUR PARTNERS
        </p>

        <h1 className="font-heading text-5xl mb-6">
          Trusted <span className="text-[#c9a24d]">Vendors</span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-600">
          We collaborate with industry-leading vendors who share our
          commitment to quality, craftsmanship, and sustainability.
        </p>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {vendors.map((vendor) => (
            <div
              key={vendor.slug}
              onClick={() => navigate(`/vendors/${vendor.slug}`)}
              className="
                bg-[#011f4b] border border-[#011f4b]
                rounded-2xl p-10 cursor-pointer
                hover:border-[#c9a24d] hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-500
              "
            >
              <h3 className="font-heading text-2xl mb-4 text-white">
                {vendor.name}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {vendor.description}
              </p>

              <p className="mt-8 text-xs text-[#c9a24d] tracking-wider">
                VIEW DETAILS →
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default VendorsList;
