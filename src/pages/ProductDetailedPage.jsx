import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate,useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { products } from "../data/products";
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

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
  const { productId } = useParams();
  const navigate = useNavigate();

  // Find product based on ID from URL
  const product = products.find((p) => p.id === productId);

  // Initialize state only if product exists
  const [activeImg, setActiveImg] = useState(product?.images?.[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update active image if product changes
    if (product) {
      setActiveImg(product.images[0]);
    }
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [productId, product]);

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button 
          onClick={() => navigate("/")}
          className="ml-4 text-blue-600 underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
   
    <div className="bg-gray-50 min-h-screen pt-40 pb-20 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
       
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <motion.img
            src={activeImg}
            whileHover={{ scale: 1.03 }}
            className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
          />

          <div className="flex gap-4 mt-6">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 rounded-xl cursor-pointer object-cover border-2 ${
                  activeImg === img
                    ? "border-gray-900" 
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </motion.div>

        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <p className="uppercase tracking-widest text-sm text-gray-500 font-bold">
            {product.room.replace("-", " ")}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-yellow-500">★★★★☆</div>
            <span className="text-gray-500 text-sm">
              4.0 (120 Reviews)
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
              Best Seller
            </span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Crafted with premium materials and designed for refined modern interiors.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-3xl font-bold text-gray-900">
              {product.price}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          {/* <div className="flex gap-6 pt-6">
            <button
              onClick={() => navigate("/cart")}
              className="px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 transition shadow-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="px-10 py-4 border border-gray-400 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Buy Now
            </button>
          </div> */}

         <div className="flex flex-wrap gap-4 pt-6">
  
  <a
    href="https://wa.me/916238383942?text=I am interested in this product"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#128C7E] transition shadow-lg"
  >
    <FaWhatsapp size={24} />
    <span>WhatsApp</span>
  </a>

 
  <a
    href="tel:+916238383942"
    className="flex items-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition shadow-md"
  >
    <FaPhoneAlt size={18} />
    <span>Call Now</span>
  </a>
</div>
        </motion.div>
      </div>

    
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Related Products
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {products
            .filter(
              (p) => p.room === product.room && p.id !== product.id
            )
            .slice(0, 3)
            .map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                onClick={() => {
                   navigate(`/product-details/${item.id}`);
                   window.scrollTo(0,0);
                }}
                
                className="cursor-pointer bg-white rounded-3xl p-5 shadow-lg border border-gray-100"
              >
                <img
                  src={item.images[0]}
                  className="h-60 w-full object-cover rounded-2xl"
                />
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-500 font-medium">
                  {item.price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}