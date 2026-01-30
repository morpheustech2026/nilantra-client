import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, Upload, Star, Plus, CheckCircle, Clock, 
  XCircle, Trash2, Edit, Save, X 
} from "lucide-react";

// Dummy Data
const dummyProducts = [
  { 
    id: 1, 
    name: "Wooden Chair", 
    category: "Living Room",
    price: 1200, 
    originalPrice: 1500,
    stock: 10, 
    status: "Approved", 
    image: null, 
    offer: "20% Off",
    description: "Premium wooden chair with ergonomic design.",
    dimensions: "24” W x 24” D x 30” H",
    material: "Teak Wood",
    finish: "Matte",
    colors: "#8B4513, #000000",
    features: "Durable, Lightweight",
    warranty: "1 Year"
  },
  { 
    id: 2, 
    name: "Oak Table", 
    category: "Dining",
    price: 4500, 
    originalPrice: 5000,
    stock: 5, 
    status: "Pending", 
    image: null, 
    offer: "10% Off",
    description: "Solid oak dining table for 4 people.",
    dimensions: "40” W x 40” D x 30” H",
    material: "Oak Wood",
    finish: "Glossy",
    colors: "#DEB887",
    features: "Water Resistant",
    warranty: "2 Years"
  },
];

const dummyReviews = [
  { id: 1, product: "Wooden Chair", rating: 5, comment: "Excellent build quality!" },
  { id: 2, product: "Oak Table", rating: 4, comment: "Good, but heavy." },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } }
};

function VendorDashboard() {
  const [products, setProducts] = useState(dummyProducts);
  const [formData, setFormData] = useState({
    name: "", category: "", price: "", originalPrice: "", stock: "", 
    offer: "", description: "", dimensions: "", material: "", 
    finish: "", colors: "", features: "", warranty: "", image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ ...product });
    setImagePreview(product.image ? URL.createObjectURL(product.image) : null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) handleCancelEdit();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ 
      name: "", category: "", price: "", originalPrice: "", stock: "", offer: "", 
      description: "", dimensions: "", material: "", finish: "", colors: "", 
      features: "", warranty: "", image: null 
    });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts((prev) => prev.map((p) => p.id === editingId ? { ...p, ...formData, price: parseFloat(formData.price) } : p));
    } else {
      const newProduct = { id: Date.now(), ...formData, price: parseFloat(formData.price), status: "Pending" };
      setProducts((prev) => [newProduct, ...prev]);
    }
    handleCancelEdit();
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. BLURRED BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/retro-living-room-interior-design_53876-145503.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)', // High blur for modern look
          transform: 'scale(1.1)', // Prevents white/vignette edges
        }}
      />
      
      {/* Dark overlay to make text pop more */}
      <div className="fixed inset-0 z-0 bg-black/10" />

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 p-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 max-w-7xl mx-auto shadow-2xl border border-white/50"
        >
          <motion.h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            Vendor Dashboard
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN - PRODUCT LIST */}
            <div className="lg:col-span-2 space-y-8">
              <motion.section variants={containerVariants} initial="hidden" animate="visible">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Products</h2>

                <div className="overflow-x-auto bg-white/50 rounded-2xl shadow-lg border border-gray-100">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                          <th key={h} className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {products.map((p) => (
                          <motion.tr
                            key={p.id}
                            variants={itemVariants}
                            initial="hidden" animate="visible" exit="exit" layout
                            className={`border-b border-gray-100 last:border-0 hover:bg-white/80 transition-colors ${editingId === p.id ? "bg-blue-50/50" : ""}`}
                          >
                            <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                {p.image ? (
                                  <img src={p.image instanceof File ? URL.createObjectURL(p.image) : p.image} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                                )}
                              </div>
                              {p.name}
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{p.category}</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">₹{p.price}</td>
                            <td className="px-6 py-4 text-gray-600">{p.stock}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${p.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                {p.status === "Approved" ? <CheckCircle size={12}/> : <Clock size={12}/>}
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-lg"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-100 rounded-lg"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* REVIEWS */}
              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                  <Star className="text-yellow-500" fill="currentColor"/> Recent Reviews
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {dummyReviews.map((r) => (
                    <div key={r.id} className="bg-white/60 p-5 rounded-2xl shadow-sm border border-white">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800">{r.product}</h3>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm font-bold flex items-center gap-1">
                          {r.rating} <Star size={12} fill="currentColor"/>
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN - FORM */}
         <div className="lg:col-span-1">
  <div className="sticky top-24">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
      {editingId ? <Edit size={24}/> : <Plus size={24}/>}
      {editingId ? "Edit Details" : "Add Product"}
    </h2>
    <form onSubmit={handleSubmit} className="bg-white/90 p-6 rounded-2xl shadow-xl border border-white space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
      
      {/* 1. BASIC INFO */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Basic Information</h3>
        <div>
          <label className="text-sm font-medium text-gray-600">Product Name</label>
          <input type="text" name="name" placeholder="e.g. Modern Wooden Sofa" value={formData.name} onChange={handleInputChange} className="w-full border px-4 py-2 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-900" required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border px-4 py-2 rounded-xl bg-gray-50 outline-none text-gray-900" required>
            <option value="">Select Category</option>
            <option value="Living Room">Living Room</option>
            <option value="Dining">Dining</option>
            <option value="Office">Office</option>
            <option value="Bedroom">Bedroom</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Short Description</label>
          <textarea name="description" rows="3" placeholder="Crafted with premium solid wood..." value={formData.description} onChange={handleInputChange} className="w-full border px-4 py-2 rounded-xl bg-gray-50 outline-none placeholder:text-gray-400 text-gray-900" />
        </div>
      </div>

      {/* 2. PRICING & STOCK */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Pricing & Stock</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600">Sale Price (₹)</label>
            <input type="number" name="price" placeholder="59999" value={formData.price} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 outline-none placeholder:text-gray-400 text-gray-900" required />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">MRP (₹)</label>
            <input type="number" name="originalPrice" placeholder="79999" value={formData.originalPrice} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 outline-none placeholder:text-gray-400 text-gray-900" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Stock Count</label>
            <input type="number" name="stock" placeholder="10" value={formData.stock} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 outline-none placeholder:text-gray-400 text-gray-900" required />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Offer Tag</label>
            <input type="text" name="offer" placeholder="25% OFF" value={formData.offer} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 outline-none placeholder:text-gray-400 text-gray-900" />
          </div>
        </div>
      </div>

      {/* 3. LUXURY SPECIFICATIONS (For Detailed Page) */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Luxury Details</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600">Material</label>
            <input type="text" name="material" placeholder="Teak Wood" value={formData.material} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Finish</label>
            <input type="text" name="finish" placeholder="Matte Walnut" value={formData.finish} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600">Dimensions (W x D x H)</label>
            <input type="text" name="dimensions" placeholder="84” W × 34” D × 30” H" value={formData.dimensions} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600">Colors (Hex Codes, separated by comma)</label>
            <input type="text" name="colors" placeholder="#B68C5A, #1F2937" value={formData.colors} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600">Features (separated by comma)</label>
            <textarea name="features" placeholder="High-density foam, Solid wood, Ergonomic" value={formData.features} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600">Warranty Info</label>
            <input type="text" name="warranty" placeholder="1 Year manufacturing warranty" value={formData.warranty} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-gray-900" />
          </div>
        </div>
      </div>

      {/* 4. IMAGE UPLOAD */}
      <div className="pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-600 block mb-2">Primary Product Image</label>
        <div className="relative group border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-blue-50 transition-colors">
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="h-32 w-full object-cover rounded-lg" />
          ) : (
            <div className="flex flex-col items-center py-4 text-center">
              <Upload className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 font-medium">Click to upload high-res image</span>
            </div>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTONS */}
      <div className="pt-6 space-y-3">
        <button type="submit" className={`w-full text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl ${editingId ? 'bg-gradient-to-r from-teal-600 to-emerald-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
          {editingId ? <Save size={20} /> : <Plus size={20} />}
          {editingId ? "Update Luxury Product" : "Launch Product"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            <X size={20} /> Cancel Editing
          </button>
        )}
      </div>
    </form>
  </div>
</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VendorDashboard;