import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { vendors } from "../data/vendors";

function VendorList() {
  const navigate = useNavigate();

  return (
    <main className="bg-ink text-ivory min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-36 pb-24 text-center">
        <p className="text-xs tracking-[0.35em] text-brand mb-4">
          OUR TRUSTED PARTNERS
        </p>

        <h1 className="font-heading text-5xl mb-6">
          Furniture <span className="text-brand">Vendors</span>
        </h1>

        <p className="max-w-xl mx-auto text-ivory/70">
          We collaborate with experienced craftsmen and manufacturers who
          uphold our standards of quality and design.
        </p>
      </section>

      {/* VENDOR GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => navigate(`/vendors/${vendor.slug}`)}
              className="
                cursor-pointer
                bg-black/40 border border-white/10
                rounded-2xl p-10
                hover:border-brand hover:-translate-y-1
                transition-all duration-500
              "
            >
              <h3 className="font-heading text-2xl mb-3">
                {vendor.name}
              </h3>

              <p className="text-ivory/70 text-sm mb-4">
                {vendor.description}
              </p>

              <div className="text-xs text-ivory/50">
                {vendor.location}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default VendorList;
