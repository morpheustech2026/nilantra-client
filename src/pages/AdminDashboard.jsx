import React, { useState } from 'react';
import { FiBox, FiUsers, FiTag, FiLayers, FiLogOut, FiMessageSquare } from "react-icons/fi"; 
import CreateProduct from '../components/admin/CreateProduct';
import CreateVendor from '../components/admin/CreateVendor';
import OrderManager from '../components/admin/OrderManage';
import CreateOffer from '../components/admin/CreateOffer';
import ReviewManager from '../components/admin/ReviewManager'; 

function AdminDashboard() {

  const [activeSection, setActiveSection] = useState("products");

  const menuItems = [
    { id: "products", label: "Products", icon: <FiBox /> },
    { id: "vendors", label: "Vendors", icon: <FiUsers /> },
    { id: "orders", label: "Orders", icon: <FiLayers /> },
    { id: "offers", label: "Offers", icon: <FiTag /> },
    { id: "reviews", label: "Reviews", icon: <FiMessageSquare /> }, 
  ];

  return (
    <div className="flex min-h-screen bg-[#001224] text-white">

     
      <aside className="w-64 bg-[#000e1a] border-r border-[#c7a17a]/10 fixed h-full flex flex-col shadow-2xl z-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Nilantra</h1>
          <p className="text-[10px] text-[#c7a17a] uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${activeSection === item.id
                ? "bg-[#c7a17a] text-[#001f3f] font-bold shadow-lg shadow-[#c7a17a]/20"
                : "text-gray-400 hover:bg-[#c7a17a]/10 hover:text-white"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="tracking-wide text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-[#c7a17a]/5">
          <button className="flex items-center gap-4 px-6 py-3 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-all">
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </aside>


      <main className="flex-1 ml-64 p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto animate-in fade-in duration-700">

          {/* PRODUCT */}
          {activeSection === "products" && (
            <div className="space-y-6">
              <CreateProduct />
            </div>
          )}

          {/* VENDOR */}
          {activeSection === "vendors" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CreateVendor />
            </div>
          )}

          {/* ORDER */}
          {activeSection === "orders" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <OrderManager />
            </div>
          )}

          {/* OFFER */}
          {activeSection === "offers" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CreateOffer />
            </div>
          )}

          {/* REVIEW */}
          {activeSection === "reviews" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ReviewManager />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;