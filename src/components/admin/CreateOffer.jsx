import React, { useState, useRef } from 'react';
import { 
  FiTag, FiPlus, FiTrash2, FiEdit, FiZap, 
  FiClock, FiImage, FiUpload, FiLink 
} from 'react-icons/fi';

const CreateOffer = () => {
  const [offers, setOffers] = useState([
    { 
      id: 1, 
      title: "Flat 50% Mega Sale", 
      type: "Main Banner", 
      discount: "50%", 
      status: "Active", 
      expiry: "24 Hours",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=200"
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    title: "", type: "Main Banner", discount: "", status: "Active", expiry: "", image: ""
  });

  const fileInputRef = useRef(null);
  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-4 outline-none focus:border-[#c7a17a] text-white transition-all";

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewOffer({ ...newOffer, image: reader.result }); // Base64 string for local preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if(!newOffer.title || !newOffer.discount) return alert("Fill essential details");
    setOffers([{ ...newOffer, id: Date.now() }, ...offers]);
    setNewOffer({ title: "", type: "Main Banner", discount: "", status: "Active", expiry: "", image: "" });
  };

  const deleteOffer = (id) => {
    if(window.confirm("Delete this offer?")) {
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 p-6">
      <header className="border-b border-[#c7a17a]/20 pb-8">
        <h2 className="text-4xl font-serif font-bold italic text-white tracking-wide">Promotions & Offers</h2>
        <p className="text-[#c7a17a] text-sm mt-1 uppercase tracking-widest font-bold">Manage Nilantra Luxury Campaigns</p>
      </header>

     
      <section className="bg-[#001f3f] rounded-[2rem] p-10 border border-[#c7a17a]/10 shadow-2xl">
        <h3 className="text-[#c7a17a] font-bold uppercase text-xs tracking-[0.3em] flex items-center gap-2 mb-8">
          <FiZap /> Launch New Campaign
        </h3>
        
        <form onSubmit={handleAddOffer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Offer Title</label>
            <input 
              value={newOffer.title} 
              onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
              placeholder="e.g. Premium Sofa Collection" className={inputStyle} 
            />
          </div>

     
          <div className="space-y-4">
            <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Offer Image (URL or Local)</label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7a17a]/50" />
                    <input 
                        value={newOffer.image.startsWith('data:') ? "Local Image Selected" : newOffer.image} 
                        onChange={(e) => setNewOffer({...newOffer, image: e.target.value})}
                        placeholder="Paste Image URL" 
                        className={`${inputStyle} pl-12`} 
                    />
                </div>
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                />
                <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-[#c7a17a]/10 border border-[#c7a17a]/30 text-[#c7a17a] px-6 rounded-xl hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all flex items-center gap-2"
                >
                    <FiUpload /> <span className="text-xs font-bold uppercase">Browse</span>
                </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Offer Type</label>
            <select 
              value={newOffer.type} 
              onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
              className={inputStyle}
            >
              <option value="Main Banner">Main Banner</option>
              <option value="Flash Deal">Flash Deal</option>
              <option value="Season Sale">Season Sale</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
                <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Discount</label>
                <input 
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                    placeholder="e.g. 25% OFF" className={inputStyle} 
                />
            </div>
            <div className="space-y-4">
                <label className="text-[10px] text-gray-500 uppercase font-bold ml-1">Expiry</label>
                <input 
                    value={newOffer.expiry}
                    onChange={(e) => setNewOffer({...newOffer, expiry: e.target.value})}
                    placeholder="e.g. 3 Days" className={inputStyle} 
                />
            </div>
          </div>

          
          {newOffer.image && (
            <div className="md:col-span-2 flex items-center gap-4 bg-[#000e1a] p-4 rounded-2xl border border-[#c7a17a]/20">
                <img src={newOffer.image} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-[#c7a17a]/30" />
                <div>
                    <p className="text-[#c7a17a] text-[10px] font-bold uppercase tracking-widest">Image Preview</p>
                    <button onClick={() => setNewOffer({...newOffer, image: ""})} className="text-red-400 text-[10px] font-bold uppercase mt-1">Remove Image</button>
                </div>
            </div>
          )}

          <button type="submit" className="md:col-span-2 bg-[#c7a17a] text-[#001f3f] font-black tracking-widest py-5 rounded-2xl hover:bg-white transition-all uppercase text-xs shadow-xl flex items-center justify-center gap-2">
            <FiPlus /> Add New Promotion
          </button>
        </form>
      </section>

      
      <section className="bg-[#000e1a] rounded-[2rem] p-8 border border-[#c7a17a]/10 shadow-2xl">
        <h3 className="text-white font-bold mb-8 italic text-xl">Active Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-[#c7a17a] uppercase text-[10px] tracking-widest border-b border-[#c7a17a]/20">
              <tr>
                <th className="pb-4 px-4">Banner</th>
                <th className="pb-4 px-4">Title & Details</th>
                <th className="pb-4 px-4">Type</th>
                <th className="pb-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4">
                    <div className="w-20 h-12 rounded-lg overflow-hidden border border-[#c7a17a]/20 bg-[#001f3f]">
                      {offer.image ? (
                        <img src={offer.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#c7a17a]/20"><FiImage /></div>
                      )}
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="font-bold text-white uppercase tracking-tight">{offer.title}</div>
                    <div className="flex items-center gap-2 text-[10px] mt-1 opacity-70">
                        <span className="text-[#c7a17a]">{offer.discount}</span> • <span>{offer.expiry}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className="bg-[#03396C] text-[9px] px-2 py-1 rounded border border-[#c7a17a]/20 font-bold uppercase">
                      {offer.type}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex gap-2 justify-center">
                      <button className="p-3 bg-red-600/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all" onClick={() => deleteOffer(offer.id)}>
                        <FiTrash2 size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CreateOffer;