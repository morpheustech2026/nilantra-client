import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function ProductGroup() {
  const { category, type } = useParams(); // URL params (eg: living-room, table)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 1. API Call
        const response = await axios.get("http://localhost:3000/api/products");
        const allProducts = response.data;

        // 2. URL Formatting
        // URL-ൽ "living-room" എന്ന് വരുന്നത് "living room" ആക്കുന്നു.
        const targetCategory = category ? category.replace(/-/g, " ").toLowerCase().trim() : "";
        const targetType = type ? type.replace(/-/g, " ").toLowerCase().trim() : "";

        // 3. Filter Logic (DB-ൽ നിന്നുള്ള ഡാറ്റയും URL ഉം താരതമ്യം ചെയ്യുന്നു)
      const filtered = allProducts.filter((p) => {
  // 1. URL-ൽ നിന്ന് കിട്ടുന്നവ (eg: dining-room, dining-table)
  let urlCat = category ? category.replace(/-/g, " ").toLowerCase().trim() : "";
  const urlTyp = type ? type.replace(/-/g, " ").toLowerCase().trim() : "";

  // വിശേഷാൽ തിരുത്തൽ: dining-room എന്ന് വന്നാൽ അതിനെ dining ആക്കി മാറ്റുന്നു
  if (urlCat === "dining room") urlCat = "dining";

  // 2. Database-ൽ ഉള്ളവ (eg: Dining, Dining Table)
  const dbCat = p.mainCategory ? p.mainCategory.toLowerCase().trim() : "";
  const dbTyp = p.subCategory ? p.subCategory.toLowerCase().trim() : "";
  
  return dbCat === urlCat && dbTyp === urlTyp;
});

        setProducts(filtered);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category && type) {
      fetchProducts();
    }
  }, [category, type]);

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#f5f3ef] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-heading font-semibold mb-10 capitalize text-gray-900">
          {type?.replace(/-/g, " ")}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <h2 className="text-2xl font-medium text-gray-400">No products found!</h2>
            <p className="text-gray-400 mt-2">Make sure your Category names in DB match with URL.</p>
            <button onClick={() => navigate(-1)} className="mt-5 text-blue-600 font-medium">Go Back</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product._id} 
                onClick={() => navigate(`/product-details/${product._id}`)}
                className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition group overflow-hidden"
              >
                <div className="h-[260px] overflow-hidden bg-gray-100">
                  {/* Cloudinary URL നേരിട്ട് ഉപയോഗിക്കുന്നു */}
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-bold text-gray-800">₹{product.price}</p>
                    {product.offerPrice > 0 && (
                       <p className="text-sm line-through text-gray-400">₹{product.offerPrice}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGroup;