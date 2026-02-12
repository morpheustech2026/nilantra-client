import React, { useState } from "react";
import { 
  LayoutDashboard, Upload, Plus, Edit, Trash2, Check, X 
} from "lucide-react";

const FURNITURE_DATA = {
  "Living Room": { subcategories: ["Sofa", "Chair", "Coffee Table", "TV Unit"], needsSeat: ["Sofa", "Chair"] },
  "Bedroom": { subcategories: ["Bed", "Wardrobe", "Dressing Table"], needsSize: ["Bed"] },
  "Dining": { subcategories: ["Dining Table", "Dining Chair"], needsSeat: ["Dining Table", "Dining Chair"] }
};

const SEATING_OPTIONS = [1, 2, 3, 4, 5, 6, 8];
const BED_SIZES = ["Single Cot", "Double Cot", "Queen Size", "King Size", "Family Cot"];

function VendorDashboard() {
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Royal Teak Sofa",
      slug: "royal-teak-sofa",
      mainCategory: "Living Room",
      subCategory: "Sofa",
      price: 85000,
      offerPrice: 72000,
      status: "Approved",
      displayImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300",
      colors: ["Natural Wood (#8B4513)"],
      seat: [3],
      stock: 5
    },
    {
      id: 2,
      name: "King Size Imperial Bed",
      slug: "king-size-imperial-bed",
      mainCategory: "Bedroom",
      subCategory: "Bed",
      price: 120000,
      offerPrice: 95000,
      status: "Pending",
      displayImage: "https://images.unsplash.com/photo-1505693419148-403bb09938a1?auto=format&fit=crop&q=80&w=300",
      material: "King Size",
      stock: 2
    },
    {
      id: 3,
      name: "Velvet Dining Set",
      slug: "velvet-dining-set",
      mainCategory: "Dining",
      subCategory: "Dining Table",
      price: 55000,
      offerPrice: 48000,
      status: "Approved",
      displayImage: "https://images.unsplash.com/photo-1617806118233-18e1db208fa0?auto=format&fit=crop&q=80&w=300",
      seat: [6],
      stock: 8
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedHex, setSelectedHex] = useState("#C7A17A");
  const [colorName, setColorName] = useState("");

  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", mainCategory: "", subCategory: "",
    price: "", offerPrice: "", material: "", dimensions: { length: "", width: "", height: "" },
    colors: [], images: [], seat: [], stock: "", isFeatured: false, isBestSeller: false, isActive: true,
    vendor: "65a1234567890abcdef12345" 
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "images") {
      const selectedFiles = Array.from(files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...selectedFiles] }));
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    } else if (name.startsWith("dim_")) {
      const dimKey = name.split("_")[1];
      setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions, [dimKey]: value } }));
    } else if (name === "name") {
      const generatedSlug = value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, name: value, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const addColorToSchema = () => {
    const finalColor = colorName.trim() ? `${colorName} (${selectedHex})` : selectedHex;
    if (!formData.colors.includes(finalColor)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, finalColor] }));
      setColorName("");
    }
  };

  const toggleSeat = (num) => {
    setFormData(prev => ({
      ...prev,
      seat: prev.seat.includes(num) ? prev.seat.filter(s => s !== num) : [...prev.seat, num]
    }));
  };

  const selectBedSize = (size) => {
    setFormData(prev => ({ ...prev, material: size }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { 
        ...formData, 
        price: Number(formData.price), 
        offerPrice: formData.offerPrice ? Number(formData.offerPrice) : null,
        stock: Number(formData.stock), 
        id: editingId || Date.now(), 
        status: editingId ? products.find(p => p.id === editingId).status : "Pending",
        displayImage: imagePreviews[0] || "https://via.placeholder.com/300"
    };

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? finalData : p));
    } else {
      setProducts(prev => [finalData, ...prev]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this masterpiece?")) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setEditingId(null); setImagePreviews([]);
    setFormData({ name: "", slug: "", description: "", mainCategory: "", subCategory: "", price: "", offerPrice: "", material: "", dimensions: { length: "", width: "", height: "" }, colors: [], images: [], seat: [], stock: "", isFeatured: false, isBestSeller: false, isActive: true, vendor: "65a1234567890abcdef12345" });
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#F8F9FA]"> 
      <div className="relative z-10 p-6 pt-40 text-[#001B3D]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
         
          <div className="lg:col-span-5 space-y-6">
            <header className="flex items-center gap-3">
                <LayoutDashboard size={24} className="text-[#C7A17A]" />
                <h2 className="text-2xl font-bold tracking-tight uppercase italic">Your Gallery</h2>
            </header>

            <div className="bg-[#001B3D] rounded-[2rem] p-6 border border-[#C7A17A]/30 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[#F8F9FA]">
                  <thead className="text-[#C7A17A] uppercase text-[10px] font-black tracking-widest border-b border-[#C7A17A]/20">
                    <tr>
                      <th className="pb-4 px-2">Masterpiece</th>
                      <th className="pb-4 text-center">Value</th>
                      <th className="pb-4 text-right">Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                          <td className="py-5 px-2 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#002651] border border-[#C7A17A]/30 overflow-hidden flex-shrink-0">
                              <img src={p.displayImage} className="w-full h-full object-cover" alt=""/>
                            </div>
                            <div className="max-w-[140px]">
                                <div className="font-bold text-xs truncate text-white">{p.name}</div>
                                <div className="text-[8px] text-[#C7A17A] uppercase font-black">STK: {p.stock} • {p.subCategory}</div>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="font-black text-xs text-[#C7A17A]">₹{p.offerPrice || p.price}</div>
                            <div className={`text-[7px] px-1.5 py-0.5 rounded-full border mt-1 uppercase font-bold ${p.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>{p.status}</div>
                          </td>
                          <td className="text-right">
                            <div className="flex gap-1 justify-end">
                             <button onClick={() => { setEditingId(p.id); setFormData(p); setImagePreviews([p.displayImage]) }} className="text-[#C7A17A] p-2 hover:bg-white/10 rounded-lg transition-all"><Edit size={16}/></button>
                             <button onClick={() => handleDelete(p.id)} className="text-rose-400 p-2 hover:bg-rose-500/10 rounded-lg transition-all"><Trash2 size={16}/></button>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-[#001B3D] rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-t-8 border-[#C7A17A] sticky top-40 space-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{editingId ? "Refine Item" : "New Creation"}</h2>
                  <div className="h-2 w-24 bg-[#C7A17A] mt-3 rounded-full"></div>
                </div>
                <p className="text-[11px] text-[#C7A17A] font-black uppercase tracking-[0.4em] mb-1">Authentic Nilantra</p>
              </div>

             
              <div className="space-y-4">
                <label className="text-[13px] font-black uppercase text-[#C7A17A] tracking-widest">Visual Portfolio</label>
                <div className="grid grid-cols-5 gap-5">
                  <label className="aspect-square border-2 border-dashed border-[#C7A17A]/40 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all text-[#C7A17A] gap-2">
                    <Upload size={32} />
                    <span className="text-[10px] font-black">UPLOAD</span>
                    <input type="file" name="images" multiple onChange={handleInputChange} className="hidden" />
                  </label>
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="aspect-square rounded-3xl overflow-hidden border-2 border-[#C7A17A]/30 shadow-xl"><img src={src} className="w-full h-full object-cover" alt=""/></div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
               
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase text-[#C7A17A]">Title of Masterpiece</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b-4 border-white/10 py-5 px-2 outline-none focus:border-[#C7A17A] text-3xl text-white font-bold placeholder:text-white/10" placeholder="e.g. Imperial Teak Wardrobe" required />
                  <div className="text-[11px] text-[#C7A17A]/60 font-black mt-2 ml-2 tracking-widest">URL PATH: /product/{formData.slug || '...'}</div>
                </div>

               
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase text-[#C7A17A]">Category</label>
                    <select name="mainCategory" value={formData.mainCategory} onChange={(e) => setFormData({...formData, mainCategory: e.target.value, subCategory: "", seat: [], material: ""})} className="w-full bg-[#002651] border-b-4 border-white/10 py-5 px-5 text-lg font-bold text-white outline-none focus:border-[#C7A17A] rounded-t-2xl">
                      <option value="">Select Main</option>
                      {Object.keys(FURNITURE_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase text-[#C7A17A]">Specific Type</label>
                    <select name="subCategory" value={formData.subCategory} disabled={!formData.mainCategory} onChange={handleInputChange} className="w-full bg-[#002651] border-b-4 border-white/10 py-5 px-5 text-lg font-bold text-white outline-none focus:border-[#C7A17A] rounded-t-2xl disabled:opacity-20">
                      <option value="">Select Sub</option>
                      {formData.mainCategory && FURNITURE_DATA[formData.mainCategory].subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                
                {formData.subCategory === "Bed" && (
                  <div className="space-y-5 p-8 bg-white/5 rounded-[2.5rem] border border-[#C7A17A]/20 text-center shadow-inner">
                    <label className="text-[14px] font-black uppercase text-[#C7A17A] tracking-[0.3em]">Select Cot Size</label>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {BED_SIZES.map(size => (
                        <button key={size} type="button" onClick={() => selectBedSize(size)} className={`px-8 py-4 rounded-2xl text-[12px] font-black border-2 transition-all shadow-xl ${formData.material === size ? 'bg-[#C7A17A] text-[#001B3D] border-[#C7A17A]' : 'text-white/40 border-white/10 hover:border-[#C7A17A]'}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {formData.mainCategory && FURNITURE_DATA[formData.mainCategory]?.needsSeat?.includes(formData.subCategory) && (
                  <div className="space-y-5 p-8 bg-white/5 rounded-[2.5rem] border border-[#C7A17A]/20 text-center shadow-inner">
                    <label className="text-[14px] font-black uppercase text-[#C7A17A] tracking-[0.3em]">Seating Capacity</label>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {SEATING_OPTIONS.map(num => (
                        <button key={num} type="button" onClick={() => toggleSeat(num)} className={`px-10 py-4 rounded-2xl text-[12px] font-black border-2 transition-all shadow-xl ${formData.seat.includes(num) ? 'bg-[#C7A17A] text-[#001B3D] border-[#C7A17A]' : 'text-white/40 border-white/10 hover:border-[#C7A17A]'}`}>
                          {num} SEATER
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase text-[#C7A17A]">Base Rate (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-[#002651] border-b-4 border-white/10 py-5 px-6 rounded-t-2xl text-2xl font-black text-white outline-none focus:border-[#C7A17A]" required placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase text-[#C7A17A]">Offer Price (₹)</label>
                    <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleInputChange} className="w-full bg-[#002651] border-b-4 border-white/10 py-5 px-6 rounded-t-2xl text-2xl font-black text-[#C7A17A] outline-none" placeholder="Optional" />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[13px] font-black uppercase text-[#C7A17A]">Inventory Quantity</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-[#002651] border-b-4 border-white/10 py-5 px-6 rounded-t-2xl text-xl font-black text-white outline-none focus:border-[#C7A17A]" required placeholder="Units in Stock" />
                </div>

               
                <div className="space-y-5 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                  <label className="text-[13px] font-black uppercase text-[#C7A17A] tracking-widest block">Premium Finish & Texture</label>
                  <div className="flex gap-5">
                    <div className="w-20 h-20 rounded-3xl border-2 border-[#C7A17A]/30 overflow-hidden relative shrink-0 shadow-2xl">
                      <input type="color" value={selectedHex} onChange={(e) => setSelectedHex(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] cursor-pointer -translate-x-1/4 -translate-y-1/4" />
                    </div>
                    <input value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Finish Name (e.g. Ebony Black)" className="flex-1 bg-transparent border-b-2 border-white/10 px-4 text-lg outline-none focus:border-[#C7A17A] text-white font-bold" />
                    <button type="button" onClick={addColorToSchema} className="bg-[#C7A17A] text-[#001B3D] px-8 rounded-2xl hover:bg-white transition-all shadow-xl font-black">ADD</button>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    {formData.colors.map(c => (
                      <span key={c} className="bg-white/10 border border-[#C7A17A]/30 px-6 py-3 rounded-full text-[11px] font-black text-white uppercase flex items-center gap-4 shadow-lg">
                        <div className="w-4 h-4 rounded-full shadow-inner" style={{backgroundColor: c.includes('(') ? c.split('(')[1].replace(')', '') : c}}></div>
                        {c}
                        <X size={14} className="cursor-pointer text-rose-400 hover:text-white" onClick={() => setFormData(p => ({...p, colors: p.colors.filter(x => x !== c)}))}/>
                      </span>
                    ))}
                  </div>
                </div>

               
                <div className="bg-gradient-to-br from-[#002651] to-[#001B3D] p-10 rounded-[3rem] border border-[#C7A17A]/20 shadow-2xl">
                  <label className="text-[12px] font-black uppercase text-[#C7A17A] block mb-8 tracking-[0.5em] text-center">Structural Mapping (CM)</label>
                  <div className="grid grid-cols-3 gap-10">
                    {['length', 'width', 'height'].map(dim => (
                      <div key={dim} className="space-y-3 text-center">
                        <span className="text-[10px] text-[#C7A17A]/60 uppercase font-black italic tracking-widest">{dim}</span>
                        <input name={`dim_${dim}`} placeholder="00" value={formData.dimensions[dim]} onChange={handleInputChange} className="w-full bg-[#001B3D] border-2 border-white/5 rounded-2xl py-6 text-center text-2xl font-black text-white outline-none focus:border-[#C7A17A] transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                
                <div className="grid grid-cols-3 gap-5">
                  {[{id:'isFeatured', label:'EXCLUSIVE'}, {id:'isBestSeller', label:'BEST SELLER'}, {id:'isActive', label:'PUBLIC'}].map(flag => (
                    <label key={flag.id} className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 cursor-pointer transition-all shadow-xl ${formData[flag.id] ? 'bg-[#C7A17A] border-[#C7A17A] text-[#001B3D]' : 'bg-transparent border-white/10 text-[#C7A17A]/20 hover:border-[#C7A17A]/30'}`}>
                      <input type="checkbox" name={flag.id} checked={formData[flag.id]} onChange={handleInputChange} className="hidden" />
                      <Check size={28} className={formData[flag.id] ? 'opacity-100' : 'opacity-0'} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{flag.label}</span>
                    </label>
                  ))}
                </div>

                <textarea name="description" placeholder="Narrate the story and craftsmanship of this piece..." value={formData.description} onChange={handleInputChange} className="w-full border-b-4 border-white/10 py-8 px-4 text-lg font-bold text-white h-48 bg-transparent outline-none focus:border-[#C7A17A] resize-none transition-all" required />
                
                <button type="submit" className="w-full bg-[#C7A17A] text-[#001B3D] py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-xl active:scale-[0.98]">
                  {editingId ? "Refine Creation" : "Publish to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;