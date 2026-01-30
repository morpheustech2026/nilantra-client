import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import roomCategories from "../data/roomCategories";
import Loader from "../components/Loader"; // ✅ NEW LOADER IMPORT

function CollectionCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOADER ON ROUTE CHANGE ================= */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth transition

    return () => clearTimeout(timer);
  }, [category]);

  /* ================= NO CATEGORY ================= */
  if (!category) {
    return <Loader />; // ✅ NEW LOADER
  }

  const categories = roomCategories[category] || [];

  /* ================= LOADER UI ================= */
  if (loading) {
    return <Loader />; // ✅ NEW LOADER
  }

  return (
    <section className="relative min-h-screen py-24 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          opacity: bgImage ? 1 : 0,
        }}
      />

      {/* SOFT GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-heading font-semibold mb-14 capitalize text-ink">
          {category.replace("-", " ")}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((item) => (
            <div
              key={item.slug}
              onMouseEnter={() => setBgImage(item.image)}
              onMouseLeave={() => setBgImage(null)}
              onClick={() =>
                navigate(`/collections/${category}/${item.slug}`)
              }
              className="
                bg-white
                rounded-xl
                shadow-md
                cursor-pointer
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[260px] w-full object-cover rounded-t-xl"
              />

              <div className="p-6">
                <h3 className="text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-ink/70">
                  View Collection
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CollectionCategory;
