import React, { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; 

const CartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Velvet Accent Armchair",
      category: "Living Room",
      price: 34999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Minimalist Wooden Lamp",
      category: "Lighting",
      price: 4500,
      quantity: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJRt0YC6N1RtbJ1rdj_qAQykIRYUO2STIhQ&s",
    },
    {
      id: 3,
      name: "Ceramic Flower Vase",
      category: "Decor",
      price: 2200,
      quantity: 1,
      image: "https://media.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000013874143-1000013874142_04-2100.jpg",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id, type) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0; 
  const total = subtotal + shipping;

  const formatCurrency = (amount) => {
    return "₹" + amount.toLocaleString('en-IN');
  };

  if (isLoading) return <Loader />;

  return (
    <div 
      className="min-h-screen font-sans bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('https://wallpapers.com/images/hd/armchair-furniture-on-spacey-living-room-23mx8kxyn2yo3a9v.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/30"></div>

      {/* 🔹 Container - Added pt-32 for Navbar gap */}
      <div className="max-w-6xl mx-auto relative z-10 px-4 md:px-10 pt-32 pb-12">
        
        {/* 🔹 Header Section */}
        <header className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#052659] tracking-tight drop-shadow-md">
              Shopping Cart
            </h1>
            <div className="h-1.5 w-32 bg-blue-500 rounded-full"></div>
          </div>
          <span className="bg-[#052659] text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20">
            {cartItems.length} Items Added
          </span>
        </header>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            
            {/* LEFT SECTION: CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#052659] text-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 rounded-2xl object-cover shadow-lg border-2 border-white/20"
                      />
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-blue-200 font-medium mb-4">{item.category}</p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1.5 text-sm font-bold transition-colors"
                        >
                          <Trash2 size={16} /> Remove Item
                        </button>
                      </div>

                      <div className="flex flex-col items-center sm:items-end gap-3">
                        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-1 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="p-1.5 hover:bg-white hover:text-[#052659] rounded-lg transition-all text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-5 font-bold text-white text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="p-1.5 hover:bg-white hover:text-[#052659] rounded-lg transition-all text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-2xl font-black text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-[#052659] bg-white/90 px-6 py-3 rounded-xl hover:bg-white font-bold shadow-lg transition-all group border border-[#052659]/10"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                Continue Shopping
              </button>
            </div>

            {/* RIGHT SECTION: ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-[#052659] text-white rounded-3xl p-8 shadow-2xl sticky top-32 overflow-hidden border border-white/10">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                
                <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Order Summary</h3>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between text-blue-100">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-white">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="h-px bg-white/20 my-5" />
                  <div className="flex justify-between items-center text-2xl font-black">
                    <span>Grand Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-8 w-full bg-white text-[#052659] hover:bg-blue-50 py-4 rounded-xl font-black text-lg shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* EMPTY CART STATE */
          <div className="text-center mt-10 py-24 bg-[#052659] text-white rounded-3xl shadow-2xl border border-white/10 relative z-10">
            <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-blue-100 mb-10 text-lg font-medium">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-[#052659] px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;