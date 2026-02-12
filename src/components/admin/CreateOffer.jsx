import React, { useState, useRef } from 'react';
import { 
  FiTag, FiPlus, FiTrash2, FiZap, 
  FiClock, FiImage, FiUpload, FiLink, FiX 
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
  
  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-3 md:py-4 outline-none focus:border-[#c7a17a] text-white transition-all placeholder:text-gray-600 text-sm";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewOffer({ ...newOffer, image: reader.result });
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
    <div className="p-4 md:p-0 space-y-8 md:space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c7a17a]/20 pb-6 md:pb-8 mb-6 md:mb-10 gap-4">
        <div>
           <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-wide">Promotions</h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">Manage Nilantra Luxury Campaigns</p>
        </div>
      </header>

     
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2rem] p-6 md:p-10 space-y-6 md:space-y-10 shadow-2xl border border-[#c7a17a]/10">
        <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-2 mb-2">
          <FiZap /> Launch New Campaign
        </h3>
        
        <form onSubmit={handleAddOffer} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest">Offer Title</label>
                <input 
                  value={newOffer.title} 
                  onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                  placeholder="e.g. Premium Sofa Collection" 
                  className={inputStyle} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest">Offer Type</label>
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
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest">Discount</label>
                  <input 
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                    placeholder="e.g. 25% OFF" 
                    className={inputStyle} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest">Campaign Expiry</label>
                <input 
                  value={newOffer.expiry}
                  onChange={(e) => setNewOffer({...newOffer, expiry: e.target.value})}
                  placeholder="e.g. 3 Days" 
                  className={inputStyle} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest">Offer Visual</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7a17a]/50" />
                    <input 
                      value={newOffer.image.startsWith('data:') ? "Local Image Selected" : newOffer.image} 
                      onChange={(e) => setNewOffer({...newOffer, image: e.target.value})}
                      placeholder="Paste Image URL" 
                      className={`${inputStyle} pl-12`} 
                    />
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-[#c7a17a]/10 border border-[#c7a17a]/30 text-[#c7a17a] py-3 md:py-0 px-6 rounded-xl hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all flex items-center justify-center gap-2"
                  >
                    <FiUpload /> <span className="text-[10px] font-bold uppercase">Browse</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {newOffer.image && (
            <div className="p-4 bg-[#00152b] rounded-2xl border border-[#c7a17a]/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={newOffer.image} alt="Preview" className="w-20 h-14 md:w-24 md:h-16 object-cover rounded-lg border border-[#c7a17a]/30" />
                <div>
                  <p className="text-[#c7a17a] text-[10px] font-bold uppercase tracking-widest">Visual Preview</p>
                  <p className="text-gray-500 text-[9px] mt-1 italic">Ready for upload</p>
                </div>
              </div>
              <button onClick={() => setNewOffer({...newOffer, image: ""})} className="text-red-400 p-2 hover:bg-red-400/10 rounded-full transition-all self-end sm:self-center">
                <FiX size={20} />
              </button>
            </div>
          )}

          <button type="submit" className="w-full bg-[#c7a17a] text-[#001f3f] font-black tracking-[0.2em] md:tracking-[0.4em] py-4 md:py-6 rounded-2xl hover:bg-[#b8916a] transition-all uppercase text-xs md:text-sm shadow-2xl flex items-center justify-center gap-3">
            <FiPlus size={20} /> Launch Campaign
          </button>
        </form>
      </section>

      
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl border border-[#c7a17a]/10">
        <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-2 mb-6 md:mb-8 italic">
          <FiTag /> Active Campaigns
        </h3>
        
        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-[#c7a17a] uppercase text-[10px] tracking-widest border-b border-[#c7a17a]/20">
              <tr>
                <th className="pb-4 px-4 font-black">Banner</th>
                <th className="pb-4 px-4 font-black">Title & Details</th>
                <th className="pb-4 px-4 font-black">Type</th>
                <th className="pb-4 px-4 text-center font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-6 px-4">
                    <div className="w-24 h-14 rounded-lg overflow-hidden border border-[#c7a17a]/20 bg-[#00152b]">
                      {offer.image ? (
                        <img src={offer.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#c7a17a]/20"><FiImage size={20} /></div>
                      )}
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="font-bold text-white uppercase tracking-tight">{offer.title}</div>
                    <div className="flex items-center gap-2 text-[10px] mt-1 opacity-70">
                        <span className="text-[#c7a17a] font-black">{offer.discount}</span> 
                        <span className="text-gray-600">•</span>
                        <span className="flex items-center gap-1 font-bold italic"><FiClock size={10}/> {offer.expiry}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className="bg-[#00152b] text-[#c7a17a] text-[9px] px-3 py-1 rounded-full border border-[#c7a17a]/20 font-black uppercase tracking-tighter">
                      {offer.type}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <button 
                      className="p-3 bg-red-600/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all" 
                      onClick={() => deleteOffer(offer.id)}
                    >
                      <FiTrash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="md:hidden space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-[#00152b] p-4 rounded-xl border border-[#c7a17a]/10 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-24 h-16 rounded-lg overflow-hidden border border-[#c7a17a]/20 flex-shrink-0">
                  {offer.image ? (
                    <img src={offer.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#c7a17a]/20"><FiImage size={16} /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white uppercase text-xs truncate">{offer.title}</div>
                  <div className="text-[#c7a17a] text-[10px] font-black mt-1">{offer.discount}</div>
                  <div className="text-gray-500 text-[10px] mt-1 flex items-center gap-1 italic">
                    <FiClock size={10}/> {offer.expiry}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#c7a17a]/5">
                <span className="text-[9px] text-[#c7a17a] font-black uppercase tracking-widest">{offer.type}</span>
                <button 
                  className="p-2 bg-red-600/10 text-red-400 rounded-lg" 
                  onClick={() => deleteOffer(offer.id)}
                >
                  <FiTrash2 size={14}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="py-16 md:py-20 text-center text-[#c7a17a]/30 uppercase text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] font-black">
            No Active Campaigns Found
          </div>
        )}
      </section>
    </div>
  );
};

export default CreateOffer;