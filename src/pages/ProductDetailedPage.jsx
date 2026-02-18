import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Axios ഇമ്പോർട്ട് ചെയ്യുക
import Loader from "../components/Loader";
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductDetailed() {
  const { productId } = useParams(); // URL-ൽ നിന്ന് ID എടുക്കുന്നു
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // പ്രോഡക്റ്റ് സ്റ്റേറ്റ്
  const [activeImg, setActiveImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        // DB-ൽ നിന്ന് സിംഗിൾ പ്രോഡക്റ്റ് എടുക്കുന്നു
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
        setActiveImg(response.data.images[0]); // ആദ്യത്തെ ഇമേജ് സെറ്റ് ചെയ്യുന്നു
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
        
       
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <motion.img
            src={activeImg || "https://via.placeholder.com/500"}
            whileHover={{ scale: 1.03 }}
            className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
          />

          <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 rounded-xl cursor-pointer object-cover border-2 shrink-0 ${
                  activeImg === img ? "border-gray-900" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* DETAILS SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="space-y-8">
          <p className="uppercase tracking-widest text-sm text-gray-500 font-bold">
            {product.mainCategory} / {product.subCategory}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-4">
            <div className="text-yellow-500">★★★★☆</div>
            <span className="text-gray-500 text-sm">4.0 (Authentic Design)</span>
            {product.isBestSeller && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Best Seller</span>
            )}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-6">
                <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                {product.offerPrice > 0 && (
                    <p className="text-xl text-gray-400 line-through">₹{product.offerPrice}</p>
                )}
            </div>
            <p className="text-sm text-gray-500">Material: <span className="font-semibold text-gray-700">{product.material || "N/A"}</span></p>
          </div>

          {/* CONTACT BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}. Price: ₹${product.price}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#128C7E] transition shadow-lg"
            >
              <FaWhatsapp size={24} />
              <span>Inquiry on WhatsApp</span>
            </a>

            <a href="tel:+919876543210" className="flex items-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition shadow-md">
              <FaPhoneAlt size={18} />
              <span>Call Now</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}