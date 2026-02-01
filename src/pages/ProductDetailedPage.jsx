import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"
// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Dummy Data
const images = [
  "https://images.unsplash.com/photo-1630585308572-f53438fc684f?q=80&w=821&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1630581630833-27c2b470e9cc?q=80&w=996&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1630581630833-27c2b470e9cc?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1630585308572-f53438fc684f?w=600&auto=format&fit=crop&q=60",
];

const relatedProducts = [
  { name: "Luxury Arm Chair", price: "₹24,999", img: "https://poshhousefurniture.ae/wp-content/uploads/2025/06/2-29-2-430x430.jpg" },
  { name: "Modern Coffee Table", price: "₹18,499", img: "https://www.lighthouseco.ca/cdn/shop/files/DBA97BLK_1.jpg" },
  { name: "Wooden TV Unit", price: "₹32,999", img: "https://images.woodenstreet.de/image/cache/data/tv-units-mdf/hailey-wall-mounted-tv-unit/exotic/updated+new/updated/upda/new-logo/9-810x702.jpg" },
];

export default function ProductDetailed() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(images[0]);
  const [isLoading, setIsLoading] = useState(true); // Loading State

  // Page Load Simulation
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

 
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen pt-40 py-16">
      {/* IMAGE + DETAILS */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* IMAGE */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}>
          <motion.img
            src={activeImg}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            alt="Product Image"
            className="w-full h-[520px] object-cover rounded-3xl shadow-lg"
          />
          <div className="flex gap-4 mt-6">
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-2 ${
                  activeImg === img ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* DETAILS - PROFESSIONAL STYLISH VERSION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8"
        >
          {/* Product Category */}
          <p className="uppercase text-sm tracking-widest text-gray-500">Premium Furniture</p>

          {/* Product Name */}
          <h1 className="text-4xl font-extrabold mt-2 text-gray-900">
            Modern Wooden Sofa Set
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= 4 ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
            </div>
            <p className="text-gray-500 text-sm">4.0 (120 Reviews)</p>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best Seller</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-lg">
            Crafted with premium solid wood and high-density cushions, this sofa set blends comfort and elegance for modern homes. Perfect for living rooms, lounges, and modern interiors.
          </p>

          {/* Price & Discount */}
          <div className="flex items-center gap-6 mt-4">
            <p className="text-3xl font-extrabold text-gray-900">₹59,999</p>
            <span className="text-green-600 font-medium text-lg">25% OFF</span>
            <span className="text-gray-500 line-through">₹79,999</span>
          </div>

          {/* Material Options */}
          <div>
            <h3 className="font-medium mb-3 text-black">Material</h3>
            <div className="flex gap-4">
              {["Teak Wood", "Oak Wood", "Walnut"].map((m) => (
                <motion.span
                  key={m}
                  whileHover={{ scale: 1.05 }}
                  className="
                    px-5 py-2
                    border border-gray-300
                    text-black
                    font-medium
                    rounded-full
                    cursor-pointer
                    transition
                    hover:bg-black hover:text-white
                  "
                >
                  {m}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div>
            <h3 className="font-medium mb-3 text-gray-800">Available Colors</h3>
            <div className="flex gap-4">
              {["#B68C5A", "#1F2937", "#E7D8C9"].map((color) => (
                <span
                  key={color}
                  className="w-8 h-8 rounded-full border-2 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-3 text-gray-800">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>High-density foam cushions for maximum comfort</li>
              <li>Premium solid wood frame for durability</li>
              <li>Ergonomic design for perfect posture support</li>
              <li>Modern and timeless aesthetics</li>
              <li>Easy maintenance and cleaning</li>
            </ul>
          </div>

          {/* Dimensions */}
          <div className="flex gap-8">
            <div>
              <p className="text-gray-500 text-sm">Seating Capacity</p>
              <p className="text-gray-900 font-medium">3 Seater</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Dimensions</p>
              <p className="text-gray-900 font-medium">84” W × 34” D × 30” H</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Finish</p>
              <p className="text-gray-900 font-medium">Matte Walnut</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => navigate("/cart")}
              className="px-10 py-4 bg-black text-white rounded-full shadow-lg hover:bg-white hover:text-black border border-black"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => navigate("/checkout")}
              className="
                px-10 py-4
                border border-black
                text-black
                rounded-full
                hover:bg-black hover:text-white
                shadow-lg
                transition-colors
              "
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* RATING SECTION */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto px-6 mt-32">
        <h2 className="text-3xl md:text-4xl font-semibold mb-14 relative inline-block text-gray-800">
          Loved by Home Owners
          <span className="block w-28 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded mt-2"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-16 items-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
            <p className="text-6xl font-bold mb-2 text-gray-800">4.8</p>
            <div className="flex space-x-1 mb-2 text-yellow-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= 4.8 ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
            </div>
            <p className="text-gray-500">Based on 120 reviews</p>
          </div>

          <div className="space-y-4">
            {[{ star: "5 Star", value: 85 }, { star: "4 Star", value: 10 }, { star: "3 Star", value: 3 }, { star: "2 Star", value: 1 }, { star: "1 Star", value: 1 }].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <p className="w-14 text-sm text-gray-600">{item.star}</p>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full" />
                </div>
                <span className="w-8 text-right text-sm text-gray-600">{item.value}%</span>
              </div>
            ))}
          </div>

          <motion.div whileHover={{ y: -6 }} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="italic text-gray-700">“Exceptional quality and comfort. Perfect for our living room!”</p>
            <p className="mt-4 font-medium text-gray-800">Anoop R</p>
            <p className="text-sm text-gray-400">Kochi</p>
          </motion.div>
        </div>
      </motion.div>

      {/* LUXURY PRODUCT DETAILS */}
      <div className="max-w-6xl mx-auto px-6 mt-32 space-y-20">
        {/* Section Header */}
        <div className="text-center">
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-2">Product Information</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 inline-block relative">
            Crafted for Modern Living
            <span className="block w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mt-2 mx-auto"></span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 leading-relaxed text-lg">
            Designed with a focus on comfort, durability, and timeless aesthetics, this sofa set is crafted from premium solid wood and upholstered with high-quality fabric. Ideal for modern homes and refined interiors.
          </p>
        </div>

        {/* Features Grid with Icons */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: "🪵", label: "Frame", value: "Solid Teak Wood" },
            { icon: "🛋️", label: "Upholstery", value: "Premium Fabric" },
            { icon: "💺", label: "Cushioning", value: "High Density Foam" },
            { icon: "👥", label: "Seating Capacity", value: "3 Seater" },
            { icon: "📏", label: "Dimensions", value: `84” W × 34” D × 30” H` },
            { icon: "🎨", label: "Finish", value: "Matte Walnut" },
            { icon: "⚖️", label: "Weight", value: "75 Kg" },
            { icon: "🧰", label: "Assembly", value: "Tool-Free Setup" },
            { icon: "🧴", label: "Maintenance", value: "Wipe with damp cloth, avoid harsh chemicals" },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col gap-2">
              <div className="text-2xl">{item.icon}</div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 my-20" />

        {/* Care & Warranty */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Care Instructions</p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>Clean with a soft dry cloth or microfiber.</li>
              <li>Avoid prolonged exposure to direct sunlight.</li>
              <li>Keep away from moisture to preserve wood finish.</li>
              <li>Use furniture polish occasionally for extra shine.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">Warranty & Assembly</p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>1 year manufacturing warranty included.</li>
              <li>Assembly is quick & tool-free.</li>
              <li>Customer support available for queries.</li>
              <li>Replacement parts available if needed.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 mt-28">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 relative inline-block">
          Related Products
          <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 rounded"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {relatedProducts.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-lg p-5 transition-transform duration-300">
              <img src={item.img} alt={item.name} className="w-full h-60 object-cover rounded-2xl" />
              <h3 className="mt-5 font-medium text-gray-800 text-lg">{item.name}</h3>
              <p className="text-gray-600 mt-2">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}