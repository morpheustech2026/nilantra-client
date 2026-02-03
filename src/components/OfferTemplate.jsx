// import ScrollProgress from "./ScrollProgress";
// import StickySection from "./StickySection";
// import { motion } from "framer-motion";

// export default function OfferTemplate({ data }) {
//   return (
//     <div className="bg-[#0b1220] text-white">
//       <ScrollProgress />

//       {/* ================= HERO ================= */}
//       <section className="min-h-screen flex items-center">
//         <div className="max-w-6xl mx-auto px-6">
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="text-sm tracking-[0.3em] text-[#c9a45c] mb-6"
//           >
//             {data.hero.label}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-7xl font-light leading-tight"
//           >
//             {data.hero.title} <br />
//             Crafted for{" "}
//             <span className="text-[#c9a45c]">{data.hero.highlight}</span>
//           </motion.h1>

//           <p className="mt-8 max-w-2xl text-neutral-400 text-lg">
//             {data.hero.description}
//           </p>
//         </div>
//       </section>

//       {/* ================= VIDEO SECTION ================= */}
//       {data.videoSection && (
//         <section className="relative h-[90vh] overflow-hidden">
//           <video
//             src={data.videoSection.src}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/50" />

//           {/* Text */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="relative z-10 h-full flex items-center justify-center text-center px-6"
//           >
//             <h2 className="text-4xl md:text-6xl font-light">
//               {data.videoSection.title}
//             </h2>
//           </motion.div>
//         </section>
//       )}

//       {/* ================= STICKY SCROLL SECTIONS ================= */}
//       {data.sections.map((section, i) => (
//         <StickySection
//           key={i}
//           {...section}
//           reverse={i % 2 !== 0}
//         />
//       ))}

//       {/* ================= CTA ================= */}
//       <section className="py-40 text-center">
//         <p className="text-neutral-400 mb-4">Starting from</p>
//         <h3 className="text-5xl text-[#c9a45c] mb-10">
//           {data.hero.price}
//         </h3>

//         <a
//           href={`https://wa.me/91XXXXXXXXXX?text=${data.hero.whatsappText}`}
//           target="_blank"
//           rel="noreferrer"
//           className="px-10 py-5 rounded-full bg-[#c9a45c] text-black font-medium hover:scale-105 transition"
//         >
//           WhatsApp Enquiry
//         </a>
//       </section>
//     </div>
//   );
// }
