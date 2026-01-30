import Navbar from "../components/Navbar";

const vendors = [
  {
    name: "Teakwood Co.",
    description: "Premium-grade teak sourced sustainably for luxury furniture.",
  },
  {
    name: "Royal Upholstery",
    description: "Handcrafted upholstery using Italian fabrics.",
  },
  {
    name: "Artisan Metals",
    description: "Custom metal accents forged by skilled artisans.",
  },
  {
    name: "Pure Timber Works",
    description: "Solid hardwood specialists with 25+ years of experience.",
  },
];

function Vendors() {
  return (
    <main className="bg-ink text-ivory min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-24 text-center">
        <p className="text-xs tracking-[0.35em] text-brand mb-4">
          OUR PARTNERS
        </p>

        <h1 className="font-heading text-5xl mb-6">
          Trusted <span className="text-brand">Vendors</span>
        </h1>

        <p className="max-w-xl mx-auto text-ivory/70">
          We collaborate with industry-leading vendors who share our
          commitment to quality, craftsmanship, and sustainability.
        </p>
      </section>

      {/* ================= VENDOR GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="
                bg-black/40 border border-white/10
                rounded-2xl p-10
                hover:border-brand hover:-translate-y-1
                transition-all duration-500
              "
            >
              <p className="text-xs tracking-widestPlus text-brand mb-2">
                VENDOR {index + 1}
              </p>

              <h3 className="font-heading text-2xl mb-4">
                {vendor.name}
              </h3>

              <p className="text-ivory/70 text-sm leading-relaxed">
                {vendor.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Vendors;
