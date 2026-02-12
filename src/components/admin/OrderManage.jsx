import React, { useState } from 'react';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, 
  FiEye, FiClock, FiMapPin, FiCreditCard, FiChevronDown 
} from 'react-icons/fi';

const OrderManager = () => {
  
  const [orders, setOrders] = useState([
    {
      id: "ORD-9910",
      user: { name: "Rahul Das", email: "rahul@example.com" },
      items: [{ name: "Royal King Bed", quantity: 1, price: 45000 }],
      totalAmount: 45000,
      shippingAddress: "House No 24, MG Road, Kochi, Kerala",
      paymentStatus: "Completed",
      orderStatus: "Processing",
      transactionId: "TXN_772100",
      createdAt: "2026-02-08"
    },
    {
      id: "ORD-9911",
      user: { name: "Sneha Nair", email: "sneha@example.com" },
      items: [{ name: "Velvet Sofa", quantity: 2, price: 30000 }],
      totalAmount: 60000,
      shippingAddress: "Skyline Apt, Calicut, Kerala",
      paymentStatus: "Pending",
      orderStatus: "Shipped",
      transactionId: "TXN_772101",
      createdAt: "2026-02-09"
    }
  ]);

  const statusStyles = {
    Processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Shipped: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
    alert(`Order ${orderId} updated to ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-0 space-y-8 md:space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c7a17a]/20 pb-6 md:pb-8 mb-6 md:mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-wide">Order Management</h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">Track & Fulfill Requests</p>
        </div>
      </header>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {[
          { label: "Total Orders", val: "128", icon: <FiPackage />, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Out for Delivery", val: "12", icon: <FiTruck />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Completed", val: "94", icon: <FiCheckCircle />, color: "text-green-400", bg: "bg-green-500/10" }
        ].map((stat, i) => (
          <div key={i} className="bg-[#001f3f] p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-[#c7a17a]/10 flex items-center gap-4 md:gap-6 shadow-2xl transition-transform hover:scale-105 duration-300">
            <div className={`${stat.bg} ${stat.color} p-4 md:p-5 rounded-xl md:rounded-2xl text-xl md:text-2xl shadow-inner shrink-0`}>{stat.icon}</div>
            <div>
              <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</p>
              <h4 className="text-2xl md:text-3xl font-black text-white mt-0.5 md:mt-1">{stat.val}</h4>
            </div>
          </div>
        ))}
      </div>

   
      <section className="bg-[#001f3f] rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl border border-[#c7a17a]/10">
        <h3 className="text-[#c7a17a] font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center gap-2 mb-6 md:mb-8 italic">
          <FiClock /> Active Order Queue
        </h3>
        
        
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-[#c7a17a] uppercase text-[10px] tracking-widest border-b border-[#c7a17a]/20">
              <tr>
                <th className="pb-6 px-4 font-black">Order Details</th>
                <th className="pb-6 px-4 font-black">Customer Info</th>
                <th className="pb-6 px-4 font-black text-center">Payment Status</th>
                <th className="pb-6 px-4 font-black">Status Hub</th>
                <th className="pb-6 px-4 text-center font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-8 px-4">
                    <div className="text-white font-black text-lg tracking-tighter mb-1">{order.id}</div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
                      <FiClock className="text-[#c7a17a]" /> {order.createdAt}
                    </div>
                  </td>
                  <td className="py-8 px-4">
                    <div className="text-white font-bold text-base">{order.user.name}</div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1 italic">
                      <FiMapPin size={12} className="text-[#c7a17a]" /> {order.shippingAddress.substring(0, 25)}...
                    </div>
                  </td>
                  <td className="py-8 px-4 text-center">
                    <div className="font-black text-white text-lg italic">₹{order.totalAmount.toLocaleString()}</div>
                    <div className={`text-[9px] font-black uppercase tracking-widest mt-1 px-3 py-1 rounded-full inline-block border ${order.paymentStatus === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="py-8 px-4">
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-lg ${statusStyles[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-8 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative">
                        <select 
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="appearance-none bg-[#00152b] border border-[#c7a17a]/30 text-[10px] font-black uppercase tracking-widest rounded-xl pl-4 pr-10 py-3 outline-none focus:border-[#c7a17a] text-white cursor-pointer transition-all"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c7a17a] pointer-events-none" />
                      </div>
                      <button className="p-3 bg-[#c7a17a]/10 text-[#c7a17a] rounded-xl hover:bg-[#c7a17a] hover:text-[#001f3f] transition-all border border-[#c7a17a]/20 shadow-lg" title="View Full Manifest">
                        <FiEye size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        <div className="lg:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#00152b] p-5 rounded-2xl border border-[#c7a17a]/10 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-white font-black text-lg tracking-tighter">{order.id}</div>
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold uppercase mt-1">
                    <FiClock className="text-[#c7a17a]" /> {order.createdAt}
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusStyles[order.orderStatus]}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="space-y-3 py-4 border-y border-[#c7a17a]/5">
                <div className="flex items-center justify-between">
                  <div className="text-white font-bold text-sm">{order.user.name}</div>
                  <div className="text-[#c7a17a] font-black text-base italic">₹{order.totalAmount.toLocaleString()}</div>
                </div>
                <div className="flex items-start gap-2 text-[10px] text-gray-500 italic">
                  <FiMapPin size={14} className="text-[#c7a17a] shrink-0" />
                  <span className="line-clamp-1">{order.shippingAddress}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="relative flex-1">
                  <select 
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="w-full appearance-none bg-[#001f3f] border border-[#c7a17a]/20 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-4 outline-none text-white transition-all"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c7a17a] pointer-events-none" />
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#c7a17a] text-[#001f3f] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">
                  <FiEye size={16}/> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-white/20 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
          Nilantra Global Logistics Protocol © 2026
      </footer>
    </div>
  );
};

export default OrderManager;