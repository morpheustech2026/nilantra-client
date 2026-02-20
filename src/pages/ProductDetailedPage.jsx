import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductDetailed() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
        setActiveImg(response.data.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-40 pb-20 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* LEFT: IMAGE GALLERY SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <motion.img
            src={activeImg || "https://via.placeholder.com/500"}
            whileHover={{ scale: 1.02 }}
            className="w-full h-[400px] md:h-[520px] object-cover rounded-3xl shadow-xl border border-gray-200"
            alt={product.name}
          />

          <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-xl cursor-pointer object-cover border-2 transition-all shrink-0 ${
                  activeImg === img ? "border-gray-900 scale-105" : "border-transparent opacity-70"
                }`}
                alt={`Gallery ${i}`}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT: DETAILS & SPECIFICATIONS SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="space-y-8">
          <div>
            <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-gray-500 font-black mb-2">
              {product.mainCategory} / {product.subCategory}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-yellow-500 tracking-tighter">★★★★☆</div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Premium Collection</span>
            {product.isBestSeller && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] rounded-full font-black uppercase">Best Seller</span>
            )}
          </div>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium italic">
            "{product.description}"
          </p>

          <div className="space-y-6">
          
            <div className="flex items-baseline gap-4">
   
    <p className="text-3xl md:text-4xl font-black text-gray-900">
      ₹{product.offerPrice?.toLocaleString()}
    </p>

    
    {product.price > 0 && (
        <p className="text-xl text-gray-400 line-through font-bold">
          ₹{product.price?.toLocaleString()}
        </p>
    )}
</div>
            
            {/* TECHNICAL SPECS GRID */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              
              {/* Material */}
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Material</p>
                <p className="font-bold text-gray-800">{product.material || "High Grade Solid Wood"}</p>
              </div>

              {/* Seating / Size */}
              {product.seat && product.seat.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Configurations</p>
                  <p className="font-bold text-gray-800">{product.seat.join(", ")} Seater</p>
                </div>
              )}

              {/* Dimensions */}
              {product.dimensions && (
                <div className="col-span-1 space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Dimensions (L×W×H)</p>
                  <p className="font-bold text-gray-800">
                    {product.dimensions.length || '--'}" × {product.dimensions.width || '--'}" × {product.dimensions.height || '--'}"
                  </p>
                </div>
              )}

              {/* Stock Status */}
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Availability</p>
                <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </p>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="col-span-2 pt-2 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-3">Available Finishes</p>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <div key={idx} className="group relative">
                        <div 
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-help ring-1 ring-gray-200 transition-transform hover:scale-110"
                          style={{ backgroundColor: color.startsWith('#') ? color : '#e5e7eb' }}
                        />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase font-bold">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={`https://wa.me/919876543210?text=Hi, I'm interested in the "${product.name}". Price: ₹${product.price}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#1da851] transition-all shadow-xl shadow-green-100"
            >
              <FaWhatsapp size={22} />
              <span>WhatsApp Inquiry</span>
            </a>

            <a href="tel:+919876543210" className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-lg shadow-gray-100">
              <FaPhoneAlt size={16} />
              <span>Call Expert</span>
            </a>
          </div>
          
          <p className="text-center sm:text-left text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            * Delivery available across Kerala within 7-10 working days.
          </p>
        </motion.div>
      </div>
    </div>
  );
}