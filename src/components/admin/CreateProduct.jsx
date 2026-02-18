import React, { useState, useEffect } from 'react';
import { FiPlus, FiUpload, FiX } from "react-icons/fi";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const FURNITURE_DATA = {
  "Living Room": { 
    subcategories: ["Sofa", "Diwan Bed", "Chair", "Coffee Table", "Media Unit", "Storage", "Recliner", "Indoor Swing"], 
    needsSeat: ["Sofa", "Chair", "Recliner"] 
  },
  "Dining": { 
    subcategories: ["Dining Table", "Dining Chair", "Crockery Unit", "Bar Cabinet"], 
    needsSeat: ["Dining Table", "Dining Chair"] 
  },
  "Bedroom": { 
    subcategories: ["Bed", "Wardrobe", "Side Table", "Dresser"], 
    needsSize: ["Bed"] 
  }
};

const SEATING_OPTIONS = [1, 2, 3, 4, 5, 6, 8];
const BED_SIZES = ["Single Cot", "Double Cot", "Queen Size", "King Size", "Family Cot"];

const CreateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [uploadMode, setUploadMode] = useState("file");
  const [previews, setPreviews] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [hexColor, setHexColor] = useState("#c7a17a");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    name: "", slug: "", description: "", mainCategory: "", subCategory: "",
    price: 0, offerPrice: 0, material: "", dimensions: { length: "", width: "", height: "" },
    colors: [], images: [], seat: [], stock: 0, isFeatured: false,
    isBestSeller: false, isActive: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-3 md:py-4 outline-none focus:border-[#c7a17a] text-white transition-all text-sm";


  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/products/${id}`);
          if (res.data) {
            setFormData(res.data);
            setPreviews(res.data.images || []);
          }
        } catch (error) {
          toast.error("Error fetching product details");
          console.error(error);
        }
      };
      fetchProduct();
    } else {
      setIsEditing(false);
      setFormData(initialFormState);
      setPreviews([]);
    }
  }, [id]);

  const addColor = (val) => {
    const color = val || colorInput.trim();
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, color] }));
      setColorInput("");
    }
  };

  const removeColor = (colorToRemove) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== colorToRemove) }));
  };

  const toggleSeat = (num) => {
    setFormData(prev => ({
      ...prev,
      seat: prev.seat.includes(num) ? prev.seat.filter(s => s !== num) : [...prev.seat, num]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("dim_")) {
      const dimKey = name.split("_")[1];
      setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, [dimKey]: value } }));
    } else if (name === "name") {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() !== "") {
      setPreviews(prev => [...prev, imageUrlInput.trim()]);
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrlInput.trim()] }));
      setImageUrlInput("");
    }
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("Authorization failed! Please login again.");
    setLoading(false);
    return;
  }

  // ലോഡിംഗ് കാണിക്കാൻ ഒരു ഐഡി സെറ്റ് ചെയ്യുന്നു
  const loadToast = toast.loading(isEditing ? "Updating Product..." : "Publishing Product...");

  try {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'dimensions') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'images') {
        formData.images.forEach(img => data.append('images', img));
      } else {
        data.append(key, formData[key]);
      }
    });

    const API_URL = isEditing 
      ? `http://localhost:3000/api/products/${id}` 
      : "http://localhost:3000/api/products";
    
    const response = await axios({
      method: isEditing ? 'put' : 'post',
      url: API_URL,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data" 
      },
      withCredentials: true 
    });

    if (response.status === 200 || response.status === 201) {
      // സക്സസ് മെസ്സേജ് കാണിക്കുന്നു (ലോഡിംഗ് ടോസ്റ്റിനെ റീപ്ലേസ് ചെയ്യുന്നു)
      toast.success(isEditing ? "Product updated successfully! ✅" : "Product added successfully! 🚀", { id: loadToast });
      
      if (!isEditing) {
          setFormData(initialFormState);
          setPreviews([]);
      } else {
          setTimeout(() => navigate('/admin/inventory'), 2000);
      }
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Operation failed";
    // എറർ മെസ്സേജ് കാണിക്കുന്നു
    toast.error("Error: " + msg, { id: loadToast });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 md:p-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c7a17a]/20 pb-6 md:pb-8 mb-6 md:mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-wide">
            {isEditing ? "Update Product" : "Create Product"}
          </h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">
            {isEditing ? `Editing: ${formData.name}` : "New Inventory Entry"}
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="bg-[#001f3f] rounded-2xl md:rounded-[2rem] p-6 md:p-10 space-y-8 md:space-y-10 shadow-2xl border border-[#c7a17a]/10">


        <div className="space-y-4">
          <div className="flex justify-between items-center text-white">
            <label className="text-[10px] md:text-xs text-[#c7a17a] font-bold uppercase tracking-widest ml-1">Images Array</label>
            <div className="flex bg-[#000e1a] rounded-full p-1 border border-[#c7a17a]/20">
              <button type="button" onClick={() => setUploadMode("file")} className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${uploadMode === 'file' ? 'bg-[#c7a17a] text-[#001f3f]' : 'text-gray-500'}`}>LOCAL</button>
              <button type="button" onClick={() => setUploadMode("url")} className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${uploadMode === 'url' ? 'bg-[#c7a17a] text-[#001f3f]' : 'text-gray-500'}`}>URL</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {uploadMode === 'file' ? (
              <label className="aspect-square border-2 border-dashed border-[#c7a17a]/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#c7a17a]/5 transition-all">
                <FiUpload className="text-xl md:text-2xl text-[#c7a17a] mb-1" />
                <span className="text-[9px] font-bold text-[#c7a17a]/50 uppercase">Browse</span>
                <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="col-span-full flex gap-2">
                <input value={imageUrlInput} placeholder="Paste direct link" onChange={(e) => setImageUrlInput(e.target.value)} className={inputStyle} />
                <button type="button" onClick={addImageUrl} className="bg-[#c7a17a] text-[#001f3f] px-4 rounded-xl"><FiPlus size={20} /></button>
              </div>
            )}
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[#c7a17a]/20 group">
                <img src={src} className="w-full h-full object-cover" alt="preview" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white md:opacity-0 group-hover:opacity-100 transition-opacity"><FiX size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-2 block tracking-widest">Name & Slug</label>
              <input name="name" value={formData.name} placeholder="e.g. Royal Bed" onChange={handleInputChange} className={inputStyle} required />
              <div className="text-[9px] text-[#c7a17a] mt-2 ml-1 italic truncate opacity-60">Path: /product/{formData.slug}</div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] md:text-xs text-[#c7a17a] font-bold uppercase tracking-widest">Colors Array</label>
              <div className="flex gap-2">
                <div className="w-12 h-12 md:w-16 md:h-[58px] rounded-xl border border-[#c7a17a]/30 overflow-hidden relative shrink-0">
                  <input type="color" value={hexColor} onChange={(e) => setHexColor(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] cursor-pointer -translate-x-1/4 -translate-y-1/4" />
                </div>
                <input value={colorInput} placeholder="Color Name" onChange={(e) => setColorInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())} className={inputStyle} />
                <button type="button" onClick={() => addColor(colorInput || hexColor)} className="bg-[#c7a17a] text-[#001f3f] px-3 md:px-4 rounded-xl shrink-0"><FiPlus size={20} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.colors.map((c, i) => (
                  <span key={i} className="bg-[#c7a17a]/10 border border-[#c7a17a]/30 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] flex items-center gap-2 uppercase tracking-tighter">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.startsWith('#') ? c : '#fff' }}></div>
                    {c} <FiX className="cursor-pointer hover:text-red-500" onClick={() => removeColor(c)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="price" value={formData.price} placeholder="Base ₹" onChange={handleInputChange} className={inputStyle} required />
              <input type="number" name="offerPrice" value={formData.offerPrice} placeholder="Sale ₹" onChange={handleInputChange} className={inputStyle} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select name="mainCategory" value={formData.mainCategory} onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value, subCategory: "", seat: [] })} className={inputStyle} required>
                <option value="">Main Category</option>
                {Object.keys(FURNITURE_DATA).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select name="subCategory" value={formData.subCategory} disabled={!formData.mainCategory} onChange={handleInputChange} className={`${inputStyle} disabled:opacity-30 text-white`} required>
                <option value="">Sub Category</option>
                {formData.mainCategory && FURNITURE_DATA[formData.mainCategory].subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <input name="material" value={formData.material} placeholder="Material (e.g. Teak, Oak)" onChange={handleInputChange} className={inputStyle} />
            <textarea name="description" value={formData.description} placeholder="Handcrafted details..." onChange={handleInputChange} className={`${inputStyle} h-24 resize-none`} required />
          </div>
        </div>


        {(formData.mainCategory && (FURNITURE_DATA[formData.mainCategory]?.needsSeat?.includes(formData.subCategory) || FURNITURE_DATA[formData.mainCategory]?.needsSize?.includes(formData.subCategory))) && (
          <div className="p-5 md:p-8 bg-black/30 rounded-2xl md:rounded-[2rem] border border-[#c7a17a]/20 animate-in fade-in slide-in-from-top-4 duration-500 text-white">
            {FURNITURE_DATA[formData.mainCategory]?.needsSeat?.includes(formData.subCategory) && (
              <div className="space-y-4">
                <label className="text-[10px] md:text-xs text-[#c7a17a] font-bold uppercase tracking-[0.2em]">Seating Array (Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {SEATING_OPTIONS.map(num => (
                    <button key={num} type="button" onClick={() => toggleSeat(num)} className={`px-4 py-2 rounded-xl border-2 transition-all text-[10px] font-black ${formData.seat.includes(num) ? 'bg-[#c7a17a] text-[#001f3f] border-[#c7a17a]' : 'border-[#c7a17a]/10 text-gray-500'}`}>
                      {num} Seater
                    </button>
                  ))}
                </div>
              </div>
            )}
            {FURNITURE_DATA[formData.mainCategory]?.needsSize?.includes(formData.subCategory) && (
              <div className="space-y-4">
                <label className="text-[10px] md:text-xs text-[#c7a17a] font-bold uppercase tracking-[0.2em]">Bed Size</label>
                <div className="flex flex-wrap gap-2">
                  {BED_SIZES.map(size => (
                    <button key={size} type="button" onClick={() => setFormData({ ...formData, material: size })} className={`px-4 py-2 rounded-xl border-2 transition-all text-[10px] font-black ${formData.material === size ? 'bg-[#c7a17a] text-[#001f3f] border-[#c7a17a]' : 'border-[#c7a17a]/10 text-gray-500'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 text-white">
          <div className="lg:col-span-1 p-6 md:p-8 bg-[#00152b] rounded-2xl md:rounded-[2rem] border border-[#c7a17a]/20">
            <label className="text-[10px] text-[#c7a17a] uppercase font-bold block text-center mb-6 tracking-widest">Dimensions</label>
            <div className="space-y-4">
              {['length', 'width', 'height'].map(dim => (
                <div key={dim} className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 w-8 uppercase">{dim.slice(0, 3)}</span>
                  <input name={`dim_${dim}`} placeholder="00" value={formData.dimensions[dim]} onChange={handleInputChange} className="w-full bg-[#001224] border border-[#c7a17a]/20 rounded-xl px-4 py-2 text-center text-sm text-white focus:border-[#c7a17a]" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest">Stock Status</label>
                <input type="number" name="stock" value={formData.stock} placeholder="Inventory Count" onChange={handleInputChange} className={inputStyle} />
              </div>
              <div className="flex gap-2 items-end">
                {[{ id: "isFeatured", l: "Exclusive" }, { id: "isBestSeller", l: "Best Seller" }, { id: "isActive", l: "Public" }].map(t => (
                  <label key={t.id} className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${formData[t.id] ? 'bg-[#c7a17a]/10 border-[#c7a17a]' : 'bg-black/20 border-white/5'}`}>
                    <input type="checkbox" name={t.id} checked={formData[t.id]} onChange={handleInputChange} className="w-3 h-3 accent-[#c7a17a]" />
                    <span className="text-[8px] font-black uppercase tracking-tighter text-center">{t.l}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c7a17a] text-[#001f3f] font-black tracking-[0.2em] md:tracking-[0.4em] py-5 md:py-7 rounded-2xl hover:bg-[#b8916a] transition-all uppercase text-lg md:text-xl shadow-2xl mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Processing..." : isEditing ? "Update Product" : "Publish Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;