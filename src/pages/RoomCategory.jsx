import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import roomCategories from "../data/roomCategories";

function RoomCategory() {
  const { room } = useParams();
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOADER ON ROUTE CHANGE ================= */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth UX

    return () => clearTimeout(timer);
  }, [room]);

  if (!room || !roomCategories[room]) return null;

  /* ================= LOADER UI ================= */
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#f5f3ef] flex items-center justify-center z-[9999]">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          opacity: bgImage ? 0.75 : 0,
        }}
      />

      {/* DARK TINT */}
      <div className="absolute inset-0 -z-10 bg-black/10 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-heading font-semibold text-ink mb-14 capitalize">
          {room.replace("-", " ")}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {roomCategories[room].map((item) => (
            <div
              key={item.slug}
              onMouseEnter={() => setBgImage(item.image)}
              onMouseLeave={() => setBgImage(null)}
              onClick={() =>
                navigate(`/collections/${room}/${item.slug}`)
              }
              className="
                bg-white/70
                backdrop-blur
                rounded-xl
                overflow-hidden
                cursor-pointer
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[260px] w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/60 mt-1">
                  View Collection
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default RoomCategory;
