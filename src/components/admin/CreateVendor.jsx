import React, { useState } from "react";
import { 
  FiUser, FiPlus, FiCheck, FiX, FiMail, FiMapPin, 
  FiBriefcase, FiCreditCard, FiFileText, FiPhone, FiBox, FiTruck, FiImage, FiInfo, FiChevronRight, FiChevronLeft 
} from "react-icons/fi";

const CreateVendor = () => {
  const [step, setStep] = useState(1);
  const [vendorForm, setVendorForm] = useState({
    name: "", brandName: "", email: "", phone: "", specialization: "",
    gstNumber: "", panNumber: "", tradeLicense: "",
    accountHolder: "", accountNumber: "", ifsc: "", location: "", pickupAddress: ""
  });

  const [vendors, setVendors] = useState([
    { id: 1, brandName: "Nilambur Teak", name: "John Doe", email: "john@teak.com", phone: "9876543210", status: "Approved", location: "Malappuram" },
    { id: 2, brandName: "Ernakulam Arts", name: "Sreejith", email: "sree@arts.com", phone: "9000011122", status: "Pending", location: "Kochi" }
  ]);

  const [productRequests, setProductRequests] = useState([
    { 
      id: 501, 
      vendorName: "Nilambur Teak", 
      productName: "Premium Teak Sofa", 
      category: "Living Room", 
      price: "₹42,000", 
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300", 
      description: "Solid teak wood with premium fabric upholstery and 5-year warranty.",
      status: "Pending" 
    }
  ]);

  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-3 md:py-4 outline-none focus:border-[#c7a17a] text-white transition-all text-sm placeholder:text-gray-600";
  const labelStyle = "text-[10px] text-gray-500 uppercase font-bold ml-1 mb-2 block tracking-widest";

  const handleInputChange = (e) => setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    const newVendor = { ...vendorForm, id: Date.now(), status: "Pending" };
    setVendors([newVendor, ...vendors]);
    alert("Vendor Registered!");
    setStep(1);
  };

  const handleProductAction = (id, newStatus) => {
    setProductRequests(productRequests.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const updateVendorStatus = (id, newStatus) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  return (
    <div className="w-full animate-in fade-in duration-700 space-y-8 md:space-y-12 px-4 md:px-0">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c7a17a]/20 pb-6 md:pb-8 mb-6 md:mb-10 gap-4">
        <div>
           <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-wide">Vendors</h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">Manage Artisan Network</p>
        </div>
      </header>

     
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 space-y-8 md:space-y-10 shadow-2xl border border-[#c7a17a]/10">
        <div className="flex justify-between items-center">
          <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2">
            <FiPlus /> New Partner
          </h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`h-1.5 transition-all duration-500 rounded-full ${step === num ? 'w-6 md:w-8 bg-[#c7a17a]' : 'w-1.5 md:w-2 bg-gray-800'}`} />
            ))}
          </div>
        </div>
        
        <form onSubmit={handleVendorSubmit} className="space-y-6 md:space-y-8">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-in slide-in-from-right-5 duration-500">
              <div className="space-y-1"><label className={labelStyle}>Owner Name</label><input name="name" type="text" value={vendorForm.name} onChange={handleInputChange} className={inputStyle} placeholder="Full Name" /></div>
              <div className="space-y-1"><label className={labelStyle}>Brand Name</label><input name="brandName" type="text" value={vendorForm.brandName} onChange={handleInputChange} className={inputStyle} placeholder="Brand Name" /></div>
              <div className="space-y-1"><label className={labelStyle}>Email</label><input name="email" type="email" value={vendorForm.email} onChange={handleInputChange} className={inputStyle} placeholder="vendor@email.com" /></div>
              <div className="space-y-1"><label className={labelStyle}>Phone</label><input name="phone" type="tel" value={vendorForm.phone} onChange={handleInputChange} className={inputStyle} placeholder="+91 ..." /></div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-in slide-in-from-right-5 duration-500">
              <div className="space-y-1"><label className={labelStyle}>GST Number</label><input name="gstNumber" type="text" value={vendorForm.gstNumber} onChange={handleInputChange} className={inputStyle} placeholder="GSTIN" /></div>
              <div className="space-y-1"><label className={labelStyle}>PAN Number</label><input name="panNumber" type="text" value={vendorForm.panNumber} onChange={handleInputChange} className={inputStyle} placeholder="ABCDE1234F" /></div>
              <div className="md:col-span-2 space-y-1"><label className={labelStyle}>Trade License</label><input name="tradeLicense" type="text" value={vendorForm.tradeLicense} onChange={handleInputChange} className={inputStyle} placeholder="License No." /></div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-in slide-in-from-right-5 duration-500">
              <div className="space-y-1"><label className={labelStyle}>Bank Account</label><input name="accountNumber" type="text" value={vendorForm.accountNumber} onChange={handleInputChange} className={inputStyle} placeholder="Account No" /></div>
              <div className="space-y-1"><label className={labelStyle}>IFSC Code</label><input name="ifsc" type="text" value={vendorForm.ifsc} onChange={handleInputChange} className={inputStyle} placeholder="IFSC" /></div>
              <div className="md:col-span-2 space-y-1"><label className={labelStyle}>Pickup Address</label><textarea name="pickupAddress" value={vendorForm.pickupAddress} onChange={handleInputChange} className={`${inputStyle} h-24 md:h-32 resize-none`} placeholder="Address..." /></div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="flex-1 border border-[#c7a17a]/30 text-[#c7a17a] py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2 order-2 sm:order-1">
                <FiChevronLeft /> Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="flex-1 bg-[#c7a17a] text-[#001f3f] py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 order-1 sm:order-2">
                Next Step <FiChevronRight />
              </button>
            ) : (
              <button type="submit" className="flex-1 bg-[#c7a17a] text-[#001f3f] py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all shadow-xl order-1 sm:order-2">
                Register Partner
              </button>
            )}
          </div>
        </form>
      </section>

    
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-[#c7a17a]/10">
        <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-2 mb-6 md:mb-8 italic">
          <FiBox /> Listing Requests
        </h3>
        
        <div className="space-y-6">
          {productRequests.map((prod) => (
            <div key={prod.id} className="bg-[#00152b] rounded-2xl md:rounded-[2rem] p-4 md:p-6 border border-[#c7a17a]/10 flex flex-col lg:flex-row gap-6 items-center lg:items-start shadow-inner group">
              <div className="w-full sm:w-44 h-44 overflow-hidden rounded-2xl border border-[#c7a17a]/20 shrink-0">
                <img src={prod.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 w-full space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <span className="text-[8px] text-[#c7a17a] font-black uppercase tracking-widest">{prod.category}</span>
                    <h4 className="text-white text-xl font-bold tracking-tight">{prod.productName}</h4>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-[#c7a17a] font-black text-xl">{prod.price}</div>
                    <div className="text-gray-600 text-[8px] font-bold uppercase">Artisan: <span className="text-white">{prod.vendorName}</span></div>
                  </div>
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed italic line-clamp-2">"{prod.description}"</p>

                <div className="pt-4 flex flex-wrap gap-2">
                  {prod.status === "Pending" ? (
                    <>
                      <button onClick={() => handleProductAction(prod.id, "Approved")} className="flex-1 bg-green-600/10 text-green-400 py-3 rounded-xl border border-green-600/20 text-[9px] font-black uppercase flex items-center justify-center gap-2">
                        <FiCheck /> Approve
                      </button>
                      <button onClick={() => handleProductAction(prod.id, "Rejected")} className="flex-1 bg-red-600/10 text-red-400 py-3 rounded-xl border border-red-600/20 text-[9px] font-black uppercase flex items-center justify-center gap-2">
                        <FiX /> Reject
                      </button>
                    </>
                  ) : (
                    <div className={`w-full py-3 rounded-xl text-center text-[9px] font-black uppercase border ${prod.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {prod.status} Listing
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-[#c7a17a]/10">
        <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-2 mb-6 md:mb-8 italic">
          <FiTruck /> Artisan Network
        </h3>

        
        <div className="md:hidden space-y-4">
          {vendors.map((v) => (
            <div key={v.id} className="bg-[#00152b] p-4 rounded-xl border border-[#c7a17a]/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-bold uppercase text-sm">{v.brandName}</div>
                  <div className="text-[9px] text-gray-500 uppercase font-bold">{v.name} • {v.location}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase border ${v.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {v.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <div className="text-[9px] text-gray-500">{v.email}</div>
                <div className="flex gap-2">
                  <button onClick={() => updateVendorStatus(v.id, "Approved")} className="p-2 bg-green-600/10 text-green-400 rounded-lg"><FiCheck size={14}/></button>
                  <button onClick={() => updateVendorStatus(v.id, "Rejected")} className="p-2 bg-red-600/10 text-red-400 rounded-lg"><FiX size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-[#c7a17a] uppercase text-[10px] tracking-widest border-b border-[#c7a17a]/20">
              <tr>
                <th className="pb-6 px-4">Brand & Owner</th>
                <th className="pb-6 px-4">Contact</th>
                <th className="pb-6 px-4">Status</th>
                <th className="pb-6 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-6 px-4">
                    <div className="text-white font-bold text-base group-hover:text-[#c7a17a] uppercase tracking-tight">{v.brandName}</div>
                    <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">Lead: {v.name} • {v.location}</div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="text-[11px] text-gray-400 mb-1">{v.email}</div>
                    <div className="text-[11px] text-gray-500">{v.phone}</div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${v.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => updateVendorStatus(v.id, "Approved")} className="p-3 bg-green-600/10 text-green-400 rounded-xl hover:bg-green-600 hover:text-white transition-all border border-green-600/10"><FiCheck size={14}/></button>
                      <button onClick={() => updateVendorStatus(v.id, "Rejected")} className="p-3 bg-red-600/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-600/10"><FiX size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="py-10 text-center text-white/20 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
          Nilantra artisan verification protocol © 2026
      </footer>
    </div>
  );
};

export default CreateVendor;