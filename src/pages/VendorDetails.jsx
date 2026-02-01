import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { vendors } from "../data/vendors";
import { MapPin, Briefcase, Award, Phone, Mail } from "lucide-react";

function VendorDetails() {
  const { slug } = useParams();
  const vendor = vendors.find((v) => v.slug === slug);

  if (!vendor) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
        <p className="text-gray-500">Vendor not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#1b1b1b]">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-20 text-center">
        <p className="text-xs tracking-[0.35em] text-[#c9a24d] mb-4">
          VENDOR PROFILE
        </p>

        <h1 className="font-heading text-4xl md:text-5xl mb-6">
          {vendor.name}
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          {vendor.description}
        </p>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">

            {/* LEFT CONTENT */}
            <div className="md:col-span-2 bg-white rounded-3xl p-10 shadow-xl border border-gray-100 space-y-10">
              
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  About the Vendor
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {vendor.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Specializations
                </h2>

                <div className="flex flex-wrap gap-3">
                  {vendor.specialization.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-[#062859]/10 text-[#062859] text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="bg-[#062859] rounded-3xl text-white p-8 space-y-8 shadow-xl">

              <div className="flex items-start gap-4">
                <Briefcase className="w-6 h-6 opacity-90" />
                <div>
                  <p className="text-sm opacity-80">Experience</p>
                  <p className="font-semibold text-lg">
                    {vendor.experience}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 opacity-90" />
                <div>
                  <p className="text-sm opacity-80">Location</p>
                  <p className="font-semibold text-lg">
                    {vendor.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 opacity-90" />
                <div>
                  <p className="text-sm opacity-80">Vendor Type</p>
                  <p className="font-semibold text-lg">
                    Premium Partner
                  </p>
                </div>
              </div>

              {/* CONTACT */}
              <div className="border-t border-white/20 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+91 9XXXXXXXXX</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>vendor@email.com</span>
                </div>
              </div>

              <button
                className="
                  w-full mt-4
                  bg-white text-[#062859]
                  py-3 rounded-xl font-semibold
                  hover:bg-[#c9a24d] hover:text-[#062859]
                  transition-all
                "
              >
                Contact Vendor
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default VendorDetails;
