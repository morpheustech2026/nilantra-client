import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiBox, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FURNITURE_DATA = {
  "Living Room": ["Sofa", "Chair", "Coffee Table", "TV Unit"],
  "Bedroom": ["Bed", "Wardrobe", "Dressing Table"],
  "Dining": ["Dining Table", "Dining Chair"]
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api/products";
  const BASE_URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Category Change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubCategory("All");
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const loadToast = toast.loading("Deleting product...");

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Product deleted successfully 🗑️", { id: loadToast });

      // ✅ Safe state update
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error deleting product";
      toast.error(errorMsg, { id: loadToast });
    }
  };

  // ✅ EDIT PRODUCT
  const handleUpdate = (id) => {
    toast.success("Opening edit page ✏️");
    navigate(`/admin/edit-product/${id}`);
  };

  // ✅ FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || p.mainCategory === activeCategory;

    const matchesSubCategory =
      activeSubCategory === "All" ||
      p.subCategory === activeSubCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <div className="p-4 md:p-6 bg-[#00152b] min-h-screen text-white">
      {/* HEADER */}
      <header className="flex flex-col space-y-6 border-b border-[#c7a17a]/20 pb-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold italic">
              Inventory Management
            </h2>
            <p className="text-[#c7a17a] text-xs uppercase tracking-widest font-bold">
              Admin Control Panel
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7a17a]" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full bg-[#001f3f] border border-[#c7a17a]/30 rounded-full pl-12 pr-4 py-3 outline-none focus:border-[#c7a17a] text-sm transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3">
          {["All", ...Object.keys(FURNITURE_DATA)].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat
                  ? "bg-[#c7a17a] text-[#001f3f] border-[#c7a17a]"
                  : "bg-transparent text-[#c7a17a]/60 border-[#c7a17a]/20 hover:border-[#c7a17a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SUB CATEGORY */}
        {activeCategory !== "All" && (
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveSubCategory("All")}
              className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase border transition-all ${
                activeSubCategory === "All"
                  ? "border-[#c7a17a] text-[#c7a17a] bg-[#c7a17a]/10"
                  : "border-white/10 text-white/40 hover:border-white/30"
              }`}
            >
              All {activeCategory}
            </button>

            {FURNITURE_DATA[activeCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase border transition-all ${
                  activeSubCategory === sub
                    ? "border-[#c7a17a] text-[#c7a17a] bg-[#c7a17a]/10"
                    : "border-white/10 text-white/40 hover:border-white/30"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#c7a17a]"></div>
        </div>
      ) : (
        <>
          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#001f3f] border border-[#c7a17a]/10 rounded-[2rem] overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] bg-black/20 overflow-hidden">
                  <img
                    src={
                      product.images?.[0]?.startsWith("http")
                        ? product.images[0]
                        : `${BASE_URL}/${product.images?.[0]}`
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300")
                    }
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif font-bold text-xl truncate uppercase">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <p className="text-[#c7a17a] font-serif text-xl">
                      ₹{product.price.toLocaleString()}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="p-2.5 bg-[#c7a17a]/10 border border-[#c7a17a]/30 text-[#c7a17a] rounded-xl hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all"
                      >
                        <FiEdit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-[#c7a17a]/40">
              <FiBox size={48} className="mb-4 opacity-20" />
              <p className="italic font-serif">
                Inventory is empty.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
