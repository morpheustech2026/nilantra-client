import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiUsers, FiTag, FiLayers, FiLogOut, FiMessageSquare, FiChevronRight, FiMenu, FiX, FiList } from "react-icons/fi"; 
import CreateProduct from '../components/admin/CreateProduct';
import ProductList from '../components/admin/ProductList'; 
import CreateVendor from '../components/admin/CreateVendor';
import OrderManager from '../components/admin/OrderManage';
import CreateOffer from '../components/admin/CreateOffer';
import ReviewManager from '../components/admin/ReviewManager'; 
import UserList from '../components/admin/UserList'; 
import Navbar from '../components/Navbar';
import Loader from '../components/Loader'; 

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (!userInfo || userInfo.role !== 'admin') {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const menuItems = [
    { id: "products", label: "Add Product", icon: <FiBox /> },
    { id: "inventory", label: "Inventory List", icon: <FiList /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "vendors", label: "Vendors", icon: <FiUsers /> },
    { id: "orders", label: "Orders", icon: <FiLayers /> },
    { id: "offers", label: "Offers", icon: <FiTag /> },
    { id: "reviews", label: "Reviews", icon: <FiMessageSquare /> }, 
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-[#001B3D] text-white overflow-x-hidden">
      <Navbar/>
      
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-[#C7A17A] p-4 rounded-full shadow-2xl text-[#001B3D]"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      
      <aside className={`
        w-72 bg-white fixed z-50 transition-all duration-300 flex flex-col shadow-2xl overflow-hidden
        lg:left-6 lg:top-40 lg:bottom-6 lg:rounded-[2.5rem]
        ${isSidebarOpen ? "left-0 top-0 bottom-0" : "-left-full top-0 bottom-0 lg:left-6"}
      `}>
        <div className="px-8 py-10">
          <h1 className="text-2xl font-black tracking-tighter text-[#001B3D] italic uppercase">Nilantra</h1>
          <div className="h-1 w-10 bg-[#C7A17A] mt-1 rounded-full"></div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Administrative Hub</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false); 
              }}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === item.id
                ? "bg-[#001B3D] text-white shadow-xl scale-[1.02]"
                : "text-gray-500 hover:bg-gray-50 hover:text-[#001B3D]"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl ${activeSection === item.id ? "text-[#C7A17A]" : "group-hover:text-[#C7A17A]"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </div>
              {activeSection === item.id && <FiChevronRight className="text-[#C7A17A]" />}
            </button>
          ))}
        </nav>

        <div className="p-6">
            <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 w-full text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
                <FiLogOut /> Logout
            </button>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 flex flex-col min-h-screen mt-32 md:mt-40 lg:ml-[21rem] lg:mr-6 lg:pb-6 px-4 md:px-6`}>
        <div className="bg-white rounded-t-[2.5rem] lg:rounded-[2.5rem] flex-1 shadow-2xl overflow-hidden flex flex-col">
          <div className="px-6 md:px-10 py-6 md:py-8 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h2 className="text-lg md:text-2xl font-black uppercase text-[#001B3D] tracking-tight">
                    {menuItems.find(i => i.id === activeSection)?.label} <span className="hidden xs:inline">Management</span>
                </h2>
                <p className="text-[8px] md:text-[10px] text-[#C7A17A] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Nilantra Premium Dashboard</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar text-[#001B3D]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeSection === "products" && <CreateProduct />}
                {activeSection === "inventory" && <ProductList />} 
                {activeSection === "users" && <UserList />} 
                {activeSection === "vendors" && <CreateVendor />}
                {activeSection === "orders" && <OrderManager />}
                {activeSection === "offers" && <CreateOffer />}
                {activeSection === "reviews" && <ReviewManager />}
            </div>
          </div>
          <footer className="p-6 border-t border-gray-50 text-center text-gray-300 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em]">Nilantra © 2026</footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;