import React, { useState } from 'react';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, 
  FiEye, FiClock, FiMapPin, FiCreditCard 
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="border-b border-[#c7a17a]/20 pb-6">
        <h2 className="text-4xl font-serif font-bold italic text-white">Order Management</h2>
        <p className="text-[#c7a17a] text-sm mt-1 uppercase tracking-widest font-bold">Track & Fulfill Customer Requests</p>
      </header>

     
      <div className="bg-[#000e1a] rounded-[2rem] border border-[#c7a17a]/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#001f3f] text-[#c7a17a] uppercase text-[10px] tracking-[0.2em] border-b border-[#c7a17a]/10">
              <tr>
                <th className="py-6 px-6">Order ID & Date</th>
                <th className="py-6 px-6">Customer Details</th>
                <th className="py-6 px-6">Payment</th>
                <th className="py-6 px-6">Status</th>
                <th className="py-6 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7a17a]/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  
                  <td className="py-6 px-6">
                    <div className="font-bold text-white mb-1">{order.id}</div>
                    <div className="flex items-center gap-1 text-[10px] opacity-50">
                      <FiClock /> {order.createdAt}
                    </div>
                  </td>

                  
                  <td className="py-6 px-6">
                    <div className="text-white font-medium">{order.user.name}</div>
                    <div className="text-[11px] opacity-60 flex items-center gap-1 mt-1">
                      <FiMapPin size={10}/> {order.shippingAddress.substring(0, 20)}...
                    </div>
                  </td>

                  <td className="py-6 px-6">
                    <div className="font-bold text-[#c7a17a]">₹{order.totalAmount.toLocaleString()}</div>
                    <div className={`text-[9px] uppercase font-black mt-1 ${order.paymentStatus === 'Completed' ? 'text-green-400' : 'text-yellow-500'}`}>
                      {order.paymentStatus}
                    </div>
                  </td>

                 
                  <td className="py-6 px-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${statusStyles[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                  </td>

                  
                  <td className="py-6 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <select 
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-[#001f3f] border border-[#c7a17a]/30 text-[10px] rounded-lg px-2 py-1 outline-none focus:border-[#c7a17a] text-white cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      
                      <button className="p-2 hover:bg-[#c7a17a] hover:text-[#001f3f] rounded-lg transition-all border border-[#c7a17a]/20" title="View Details">
                        <FiEye size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#001f3f] p-6 rounded-3xl border border-[#c7a17a]/10 flex items-center gap-4">
          <div className="bg-blue-500/20 p-4 rounded-2xl text-blue-400"><FiPackage size={24}/></div>
          <div><p className="text-xs opacity-50 uppercase">Total Orders</p><h4 className="text-2xl font-bold">128</h4></div>
        </div>
        <div className="bg-[#001f3f] p-6 rounded-3xl border border-[#c7a17a]/10 flex items-center gap-4">
          <div className="bg-yellow-500/20 p-4 rounded-2xl text-yellow-400"><FiTruck size={24}/></div>
          <div><p className="text-xs opacity-50 uppercase">Out for Delivery</p><h4 className="text-2xl font-bold">12</h4></div>
        </div>
        <div className="bg-[#001f3f] p-6 rounded-3xl border border-[#c7a17a]/10 flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-2xl text-green-400"><FiCheckCircle size={24}/></div>
          <div><p className="text-xs opacity-50 uppercase">Completed</p><h4 className="text-2xl font-bold">94</h4></div>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;