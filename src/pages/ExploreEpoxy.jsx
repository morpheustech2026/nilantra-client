import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import epoxyData from "../data/epoxyData";

const filters = ["All", "Metallic", "Flake", "Self-leveling", "3D"];

export default function ExploreEpoxy() {
  const [active, setActive] = useState("All");

  const data =
    active === "All"
      ? epoxyData
      : epoxyData.filter(item => item.type === active);

  return (
    <div className="min-h-screen bg-dark">

      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-semibold tracking-wide"
        >
          Epoxy Flooring
        </motion.h1>
        <p className="mt-4 text-gold">
          Metallic · Flake · Self-Leveling · 3D
        </p>
      </section>

      {/* FILTER BAR */}
      <div className="flex gap-3 overflow-x-auto px-6 justify-center">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-2 rounded-full border transition-all duration-300
              ${
                active === f
                  ? "bg-gold text-black border-gold"
                  : "border-neutral-700 hover:border-gold"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {data.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <span className="text-sm text-gold mt-1">
                  {item.type} Epoxy
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}