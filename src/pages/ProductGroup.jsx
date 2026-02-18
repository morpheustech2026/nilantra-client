import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

function ProductGroup() {
  const { category, type } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCTS FROM BACKEND ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch all products from your MERN backend
        const { data } = await axios.get("http://localhost:3000/api/products");

        // 2. Normalize and Filter
        // Database-ile "Dining Room" matching logic:
        const filtered = data.filter((p) => {
          // DB values (spaces hyphen aakkunnu, lowercase aakkunnu)
          const dbMainCat = p.mainCategory?.toLowerCase().trim().replace(/\s+/g, "-");
          const dbSubCat = p.subCategory?.toLowerCase().trim().replace(/\s+/g, "-");

          // URL params
          const urlMainCat = category?.toLowerCase().trim();
          const urlSubCat = type?.toLowerCase().trim();

          return dbMainCat === urlMainCat && dbSubCat === urlSubCat;
        });

        setProducts(filtered);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Products load cheyyan sadhichilla. Backend server running aano ennu check cheyyuka.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, type]);

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#f5f3ef] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold capitalize text-gray-900">
            {type?.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-500 mt-2">
            Explore our premium {category?.replace(/-/g, " ")} collection.
          </p>
        </header>

        {error && (
          <div className="text-center text-red-500 py-10 font-medium">
            {error}
          </div>
        )}

        {products.length === 0 && !error ? (
          <div className="text-center bg-white p-20 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-gray-500 text-xl font-medium">No products found.</h2>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">
              Category: {category?.replace(/-/g, " ")} | Type: {type?.replace(/-/g, " ")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id} 
                onClick={() => navigate(`/product-details/${product._id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="h-[280px] overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/400"} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-700 transition-colors truncate">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.offerPrice || product.price} 
                      </span>
                      {product.offerPrice && product.offerPrice < product.price && (
                        <span className="ml-2 text-sm line-through text-gray-400">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
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