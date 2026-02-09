import React, { useState } from "react";
import { 
  FiUser, FiPlus, FiCheck, FiX, FiMail, FiMapPin, 
  FiBriefcase, FiCreditCard, FiFileText, FiPhone, FiBox, FiTruck, FiImage, FiInfo 
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
    },
    { 
      id: 502, 
      vendorName: "Royal Furniture", 
      productName: "King Size Bed", 
      category: "Bedroom", 
      price: "₹55,000", 
      image: "https://images.unsplash.com/photo-1505693419148-403bb09938a1?w=300", 
      description: "Mahogany wood bed with storage and velvet headboard.",
      status: "Pending" 
    }
  ]);

  
  const inputStyle = "w-full bg-[#00152b] border border-[#c7a17a]/30 rounded-xl px-4 py-3 outline-none focus:border-[#c7a17a] text-white transition-all text-sm";
  const labelStyle = "text-[10px] text-gray-500 uppercase font-bold ml-1 mb-1.5 block";

  
  const handleInputChange = (e) => setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    const newVendor = { ...vendorForm, id: Date.now(), status: "Pending" };
    setVendors([newVendor, ...vendors]);
    alert("Vendor Registered Successfully!");
    setStep(1);
    setVendorForm({ name: "", brandName: "", email: "", phone: "", specialization: "", gstNumber: "", panNumber: "", tradeLicense: "", accountHolder: "", accountNumber: "", ifsc: "", location: "", pickupAddress: "" });
  };

  const handleProductAction = (id, newStatus) => {
    setProductRequests(productRequests.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const updateVendorStatus = (id, newStatus) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-20 bg-[#000810] min-h-screen text-gray-200 pb-20">
      
     
      <section>
        <div className="flex justify-center items-center gap-4 mb-10">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${step >= num ? 'bg-[#c7a17a] text-[#000e1a]' : 'bg-gray-800 text-gray-500'}`}>{num}</div>
              {num < 3 && <div className={`w-12 h-0.5 ${step > num ? 'bg-[#c7a17a]' : 'bg-gray-800'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#000e1a] rounded-[2.5rem] p-8 md:p-12 border border-[#c7a17a]/20 shadow-2xl relative overflow-hidden">
          <h2 className="text-[#c7a17a] text-2xl font-bold mb-8 flex items-center gap-3 italic">
            <FiPlus className="bg-[#c7a17a]/10 p-2 rounded-lg" size={40}/> Onboard New Partner
          </h2>
          
          <form onSubmit={handleVendorSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelStyle}>Owner Name</label><input name="name" type="text" value={vendorForm.name} onChange={handleInputChange} className={inputStyle} placeholder="Full Name" required /></div>
                  <div><label className={labelStyle}>Brand Name</label><input name="brandName" type="text" value={vendorForm.brandName} onChange={handleInputChange} className={inputStyle} placeholder="e.g. Nilantra Artistry" required /></div>
                  <div><label className={labelStyle}>Email</label><input name="email" type="email" value={vendorForm.email} onChange={handleInputChange} className={inputStyle} placeholder="vendor@email.com" required /></div>
                  <div><label className={labelStyle}>Phone</label><input name="phone" type="tel" value={vendorForm.phone} onChange={handleInputChange} className={inputStyle} placeholder="+91 ..." required /></div>
                </div>
                <button type="button" onClick={nextStep} className="bg-[#c7a17a] text-[#000e1a] px-10 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all">Next Step</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className={labelStyle}>GST Number</label><input name="gstNumber" type="text" value={vendorForm.gstNumber} onChange={handleInputChange} className={inputStyle} placeholder="GSTIN" /></div>
                  <div><label className={labelStyle}>PAN Number</label><input name="panNumber" type="text" value={vendorForm.panNumber} onChange={handleInputChange} className={inputStyle} placeholder="ABCDE1234F" /></div>
                  <div className="md:col-span-2"><label className={labelStyle}>Trade License</label><input name="tradeLicense" type="text" value={vendorForm.tradeLicense} onChange={handleInputChange} className={inputStyle} placeholder="License No." /></div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="border border-[#c7a17a]/30 text-[#c7a17a] px-8 py-3 rounded-xl font-bold uppercase text-xs">Back</button>
                  <button type="button" onClick={nextStep} className="bg-[#c7a17a] text-[#000e1a] px-10 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div className="col-span-2"><label className={labelStyle}>Bank Account</label><input name="accountNumber" type="text" value={vendorForm.accountNumber} onChange={handleInputChange} className={inputStyle} /></div>
                    <div><label className={labelStyle}>IFSC</label><input name="ifsc" type="text" value={vendorForm.ifsc} onChange={handleInputChange} className={inputStyle} /></div>
                  </div>
                  <div className="md:col-span-2"><label className={labelStyle}>Pickup Address</label><textarea name="pickupAddress" value={vendorForm.pickupAddress} onChange={handleInputChange} className={inputStyle} rows="2" /></div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="border border-[#c7a17a]/30 text-[#c7a17a] px-8 py-3 rounded-xl font-bold uppercase text-xs">Back</button>
                  <button type="submit" className="bg-green-600 text-white px-12 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg hover:scale-105 transition-all">Register Partner</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

     
      <section className="bg-[#000e1a] rounded-[2.5rem] p-8 border border-[#c7a17a]/20 shadow-2xl">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h3 className="text-white font-bold text-2xl italic flex items-center gap-3">
              <FiBox className="text-[#c7a17a]" /> Product Listing Requests
            </h3>
            <p className="text-gray-500 text-xs mt-2 italic">Verify products before they appear on the storefront.</p>
          </div>
          <div className="text-[#c7a17a] text-[10px] font-bold uppercase tracking-widest border-b border-[#c7a17a]/30 pb-1">
            {productRequests.filter(p => p.status === 'Pending').length} Action Required
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {productRequests.map((prod) => (
            <div key={prod.id} className="bg-[#00152b] rounded-3xl p-6 border border-[#c7a17a]/10 flex flex-col md:flex-row gap-8 items-center group hover:border-[#c7a17a]/40 transition-all">
              <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-2xl border border-[#c7a17a]/20">
                <img src={prod.image} alt={prod.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-[#000e1a]/80 text-[#c7a17a] px-2 py-1 rounded text-[10px] font-bold">ID: {prod.id}</div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-[#c7a17a] font-black uppercase tracking-widest">{prod.category}</span>
                    <h4 className="text-white text-xl font-bold">{prod.productName}</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-lg">{prod.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-xl">{prod.price}</div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase">Requested by: <span className="text-[#c7a17a]">{prod.vendorName}</span></div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  {prod.status === "Pending" ? (
                    <>
                      <button onClick={() => handleProductAction(prod.id, "Approved")} className="bg-green-600/10 text-green-400 px-6 py-2 rounded-xl border border-green-600/30 hover:bg-green-600 hover:text-white transition-all text-xs font-bold flex items-center gap-2">
                        <FiCheck /> Approve Listing
                      </button>
                      <button onClick={() => handleProductAction(prod.id, "Rejected")} className="bg-red-600/10 text-red-400 px-6 py-2 rounded-xl border border-red-600/30 hover:bg-red-600 hover:text-white transition-all text-xs font-bold flex items-center gap-2">
                        <FiX /> Reject
                      </button>
                    </>
                  ) : (
                    <div className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${prod.status === 'Approved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {prod.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#000e1a] rounded-[2.5rem] p-8 border border-[#c7a17a]/10 shadow-2xl overflow-hidden">
        <h3 className="text-white font-bold mb-8 italic flex items-center gap-3 text-2xl">
          <FiTruck className="text-[#c7a17a]" /> Existing Partners
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-[#c7a17a] uppercase text-[10px] tracking-widest border-b border-[#c7a17a]/20">
              <tr>
                <th className="pb-6 px-6">Brand Details</th>
                <th className="pb-6 px-6">Contact Info</th>
                <th className="pb-6 px-6">Location</th>
                <th className="pb-6 px-6">Status</th>
                <th className="pb-6 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-6 px-6">
                    <div className="text-white font-bold text-base group-hover:text-[#c7a17a] transition-colors">{v.brandName}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Owner: {v.name}</div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2 text-xs mb-1"><FiMail className="text-[#c7a17a]"/> {v.email}</div>
                    <div className="flex items-center gap-2 text-xs"><FiPhone className="text-[#c7a17a]"/> {v.phone}</div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2 text-xs"><FiMapPin className="text-gray-600"/> {v.location}</div>
                  </td>
                  <td className="py-6 px-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border ${v.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => updateVendorStatus(v.id, "Approved")} className="p-3 bg-green-600/20 text-green-400 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-lg"><FiCheck/></button>
                      <button onClick={() => updateVendorStatus(v.id, "Rejected")} className="p-3 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"><FiX/></button>
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

export default CreateVendor;