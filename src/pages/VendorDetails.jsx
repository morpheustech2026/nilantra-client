import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { vendors } from "../data/vendors";

function VendorDetails() {
  const { slug } = useParams();
  const vendor = vendors.find((v) => v.slug === slug);

  if (!vendor) return null;

  return (
    <main className="bg-ink text-ivory min-h-screen">
      <Navbar />

      <section className="pt-36 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.35em] text-brand mb-4">
            VENDOR PROFILE
          </p>

          <h1 className="font-heading text-4xl mb-6">
            {vendor.name}
          </h1>

          <p className="text-ivory/70 mb-10">
            {vendor.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-10 text-sm">
            <div>
              <p className="text-ivory/40 mb-1">Experience</p>
              <p>{vendor.experience}</p>
            </div>

            <div>
              <p className="text-ivory/40 mb-1">Location</p>
              <p>{vendor.location}</p>
            </div>

            <div>
              <p className="text-ivory/40 mb-1">Specialization</p>
              <p>{vendor.specialization.join(", ")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default VendorDetails;
