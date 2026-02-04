// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function StickySection({ title, description, media, mediaType, reverse }) {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

//   return (
//     <section ref={ref} className="py-40">
//       <div
//         className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center ${
//           reverse ? "lg:flex-row-reverse" : ""
//         }`}
//       >
//         {/* TEXT */}
//         <motion.div
//           className="lg:sticky lg:top-32"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-4xl font-light mb-6">{title}</h2>
//           <p className="text-neutral-400 max-w-md leading-relaxed">
//             {description}
//           </p>
//         </motion.div>

//         {/* MEDIA */}
//         {mediaType === "video" ? (
//           <motion.video
//             src={media}
//             autoPlay
//             muted
//             loop
//             playsInline
//             style={{ y }}
//             className="rounded-3xl w-full h-[520px] object-cover"
//           />
//         ) : (
//           <motion.img
//             src={media}
//             alt={title}
//             style={{ y }}
//             className="rounded-3xl w-full h-[520px] object-cover"
//           />
//         )}
//       </div>
//     </section>
//   );
// }
