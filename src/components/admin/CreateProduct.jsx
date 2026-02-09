import React, { useState } from 'react';
import { FiPlus, FiUpload, FiX } from "react-icons/fi";


const FURNITURE_DATA = {
  "Living Room": { subcategories: ["Sofa", "Chair", "Coffee Table", "TV Unit"], needsSeat: ["Sofa", "Chair"] },
  "Bedroom": { subcategories: ["Bed", "Wardrobe", "Dressing Table"], needsSize: ["Bed"] },
  "Dining": { subcategories: ["Dining Table", "Dining Chair"], needsSeat: ["Dining Table", "Dining Chair"] }
};

const SEATING_OPTIONS = [1, 2, 3, 4, 5, 6, 8];
const BED_SIZES = ["Single Cot", "Double Cot", "Queen Size", "King Size", "Family Cot"];

const CreateProduct = () => {
 
  const [uploadMode, setUploadMode] = useState("file");
  const [previews, setPreviews] = useState([]);
  const [colorInput, setColorInput] = useState(""); 
  const [hexColor, setHexColor] = useState("#c7a17a");
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    price: 0,
    offerPrice: 0,
    material: "",
    dimensions: { length: "", width: "", height: "" },
    colors: [],
    images: [], 
    seat: [], 
    stock: 0, 
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
    vendor: "65a1234567890abcdef12345" 
  });

  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-4 outline-none focus:border-[#c7a17a] text-white transition-all";

 
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL DATA FOR MONGODB:", formData);
    alert("Product details captured!");
  };

  
  return (
    <>
      <header className="flex justify-between items-center border-b border-[#c7a17a]/20 pb-8 mb-10">
        <div>
          <h2 className="text-4xl font-serif font-bold italic tracking-wide">Create Masterpiece</h2>
          <p className="text-[#c7a17a] text-sm mt-1 uppercase tracking-widest font-bold">New Inventory Entry</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="bg-[#001f3f] rounded-[2rem] p-10 space-y-10 shadow-2xl border border-[#c7a17a]/10">
        
       
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-xs text-[#c7a17a] font-bold uppercase tracking-widest ml-1">Images Array</label>
            <div className="flex bg-[#000e1a] rounded-full p-1 border border-[#c7a17a]/20">
              <button type="button" onClick={() => setUploadMode("file")} className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${uploadMode === 'file' ? 'bg-[#c7a17a] text-[#001f3f]' : 'text-gray-500'}`}>LOCAL</button>
              <button type="button" onClick={() => setUploadMode("url")} className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${uploadMode === 'url' ? 'bg-[#c7a17a] text-[#001f3f]' : 'text-gray-500'}`}>URL</button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {uploadMode === 'file' ? (
              <label className="aspect-square border-2 border-dashed border-[#c7a17a]/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#c7a17a]/5 transition-all">
                <FiUpload className="text-2xl text-[#c7a17a] mb-2" />
                <span className="text-[10px] font-bold text-[#c7a17a]/50">BROWSE</span>
                <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="col-span-2 flex gap-2">
                <input value={imageUrlInput} placeholder="Paste direct link" onChange={(e) => setImageUrlInput(e.target.value)} className={inputStyle} />
                <button type="button" onClick={addImageUrl} className="bg-[#c7a17a] text-[#001f3f] px-4 rounded-xl"><FiPlus size={20}/></button>
              </div>
            )}
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[#c7a17a]/20 group">
                <img src={src} className="w-full h-full object-cover" alt="preview" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><FiX size={12}/></button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
               <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 mb-2 block tracking-widest">Name & Slug</label>
               <input name="name" placeholder="e.g. Royal Teakwood Bed" onChange={handleInputChange} className={inputStyle} required />
               <div className="text-[10px] text-[#c7a17a] mt-2 ml-1 italic truncate opacity-60">Path: /product/{formData.slug}</div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-[#c7a17a] font-bold uppercase tracking-widest">Colors Array</label>
              <div className="flex gap-3">
                <div className="w-16 h-[58px] rounded-xl border border-[#c7a17a]/30 overflow-hidden relative shrink-0">
                  <input type="color" value={hexColor} onChange={(e) => setHexColor(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] cursor-pointer -translate-x-1/4 -translate-y-1/4" />
                </div>
                <input value={colorInput} placeholder="Texture/Color Name" onChange={(e) => setColorInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())} className={inputStyle} />
                <button type="button" onClick={() => addColor(colorInput || hexColor)} className="bg-[#c7a17a] text-[#001f3f] px-4 rounded-xl shrink-0"><FiPlus size={20}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.colors.map((c, i) => (
                  <span key={i} className="bg-[#c7a17a]/10 border border-[#c7a17a]/30 px-3 py-1.5 rounded-full text-[10px] flex items-center gap-2 uppercase tracking-tighter">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: c.startsWith('#') ? c : '#fff'}}></div>
                    {c} <FiX className="cursor-pointer hover:text-red-500" onClick={() => removeColor(c)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="price" placeholder="Base Price (₹)" onChange={handleInputChange} className={inputStyle} required />
              <input type="number" name="offerPrice" placeholder="Sale Price (₹)" onChange={handleInputChange} className={inputStyle} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select name="mainCategory" value={formData.mainCategory} onChange={(e) => setFormData({...formData, mainCategory: e.target.value, subCategory: "", seat: []})} className={inputStyle} required>
                <option value="">Main Category</option>
                {Object.keys(FURNITURE_DATA).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select name="subCategory" value={formData.subCategory} disabled={!formData.mainCategory} onChange={handleInputChange} className={`${inputStyle} disabled:opacity-30`} required>
                <option value="">Sub Category</option>
                {formData.mainCategory && FURNITURE_DATA[formData.mainCategory].subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <input name="material" value={formData.material} placeholder="Material (e.g. Teak, Oak, Leather)" onChange={handleInputChange} className={inputStyle} />
            <textarea name="description" placeholder="Handcrafted details..." onChange={handleInputChange} className={`${inputStyle} h-24 resize-none`} required />
          </div>
        </div>

        
        {(formData.mainCategory && (FURNITURE_DATA[formData.mainCategory]?.needsSeat?.includes(formData.subCategory) || FURNITURE_DATA[formData.mainCategory]?.needsSize?.includes(formData.subCategory))) && (
          <div className="p-8 bg-black/30 rounded-[2rem] border border-[#c7a17a]/20 animate-in fade-in slide-in-from-top-4 duration-500">
            {FURNITURE_DATA[formData.mainCategory]?.needsSeat?.includes(formData.subCategory) && (
              <div className="space-y-4">
                <label className="text-xs text-[#c7a17a] font-bold uppercase tracking-widest tracking-[0.2em]">Seating Array (Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {SEATING_OPTIONS.map(num => (
                    <button key={num} type="button" onClick={() => toggleSeat(num)} className={`px-5 py-2.5 rounded-xl border-2 transition-all text-xs font-black ${formData.seat.includes(num) ? 'bg-[#c7a17a] text-[#001f3f] border-[#c7a17a]' : 'border-[#c7a17a]/10 text-gray-500'}`}>
                      {num} Seater
                    </button>
                  ))}
                </div>
              </div>
            )}
            {FURNITURE_DATA[formData.mainCategory]?.needsSize?.includes(formData.subCategory) && (
               <div className="space-y-4">
                <label className="text-xs text-[#c7a17a] font-bold uppercase tracking-widest tracking-[0.2em]">Bed Size (Material Mapping)</label>
                <div className="flex flex-wrap gap-2">
                  {BED_SIZES.map(size => (
                    <button key={size} type="button" onClick={() => setFormData({...formData, material: size})} className={`px-5 py-2.5 rounded-xl border-2 transition-all text-xs font-black ${formData.material === size ? 'bg-[#c7a17a] text-[#001f3f] border-[#c7a17a]' : 'border-[#c7a17a]/10 text-gray-500'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 p-8 bg-[#00152b] rounded-[2rem] border border-[#c7a17a]/20">
            <label className="text-[10px] text-[#c7a17a] uppercase font-bold block text-center mb-6 tracking-widest">Dimensions Object</label>
            <div className="space-y-4">
              {['length', 'width', 'height'].map(dim => (
                <div key={dim} className="flex items-center gap-3">
                   <span className="text-[10px] text-gray-500 w-8 uppercase">{dim.slice(0,3)}</span>
                   <input name={`dim_${dim}`} placeholder="00" value={formData.dimensions[dim]} onChange={handleInputChange} className="w-full bg-[#001224] border border-[#c7a17a]/20 rounded-xl px-4 py-2 text-center text-sm text-white focus:border-[#c7a17a]" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 space-y-6 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest">Stock Status</label>
                 <input type="number" name="stock" placeholder="Inventory Count" onChange={handleInputChange} className={inputStyle} />
               </div>
               <div className="flex gap-3 items-end pb-1">
                  {[{id:"isFeatured", l:"Exclusive"}, {id:"isBestSeller", l:"Best Seller"}, {id:"isActive", l:"Public"}].map(t => (
                     <label key={t.id} className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${formData[t.id] ? 'bg-[#c7a17a]/10 border-[#c7a17a]' : 'bg-black/20 border-white/5'}`}>
                        <input type="checkbox" name={t.id} checked={formData[t.id]} onChange={handleInputChange} className="w-3 h-3 accent-[#c7a17a]" />
                        <span className="text-[9px] font-black uppercase tracking-tighter">{t.l}</span>
                     </label>
                  ))}
               </div>
            </div>
            <button type="submit" className="w-full bg-[#c7a17a] text-[#001f3f] font-black tracking-[0.4em] py-7 rounded-2xl hover:bg-[#b8916a] transition-all uppercase text-xl shadow-2xl shadow-[#c7a17a]/10">
              Publish Product Collection
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;