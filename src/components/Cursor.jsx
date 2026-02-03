// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Cursor() {
//   const [pos, setPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     window.addEventListener("mousemove", e =>
//       setPos({ x: e.clientX, y: e.clientY })
//     );
//   }, []);

//   return (
//     <motion.div
//       className="fixed w-6 h-6 border border-[#c9a45c] rounded-full pointer-events-none z-[999]"
//       animate={{ x: pos.x - 12, y: pos.y - 12 }}
//       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//     />
//   );
// }
