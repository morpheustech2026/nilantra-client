import React, { useState } from 'react';
import { 
  ArrowRight, ShoppingCart, Percent, Truck, ShieldCheck, 
  Clock, Tag, Star, Heart, Filter, Zap, Gift, ChevronRight,
  Package, Sparkles, Trophy, Users, BadgeCheck, Coins, RefreshCw
} from 'lucide-react';

// --- IMPORTANT: COMPONENT IMPORTS ---
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const OfferPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const offerProducts = [
    { id: 1, name: 'Premium Italian Leather Sofa', price: '₹45,999', oldPrice: '₹89,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', category: 'Living Room' },
    { id: 2, name: 'Velvet Wingback Chair', price: '₹12,499', oldPrice: '₹24,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c', category: 'Dining Room' },
    { id: 3, name: 'Scandinavian Dining Set', price: '₹34,999', oldPrice: '₹69,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1530018607912-eff2df114f11', category: 'Dining Room' },
    { id: 4, name: 'Modern Geometric Rug', price: '₹4,999', oldPrice: '₹9,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', category: 'Home Decor' },
    { id: 5, name: 'Solid Oak Bed Frame', price: '₹28,999', oldPrice: '₹57,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1505693419148-5c974964c62d', category: 'Bedroom' },
    { id: 6, name: 'Minimalist Coffee Table', price: '₹8,499', oldPrice: '₹16,999', discount: '50% OFF', img: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d', category: 'Living Room' },
  ];

  return (
    <div className="bg-[#fdfcf7] min-h-screen font-sans selection:bg-[#d29a23]/30">
      
      {/* --- NAVBAR ADDED HERE --- */}
      <Navbar />

      {/* 1. HERO BANNER - pt-24 is added to give space for fixed Navbar */}
      <section className="relative h-[600px] bg-[#03396C] overflow-hidden flex items-center pt-24">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6" 
            className="w-full h-full object-cover" 
            alt="Banner" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03396C] via-[#03396C]/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-white w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex items-center gap-2 bg-[#d29a23] text-white text-[10px] font-black px-4 py-2 rounded-full w-fit mb-6 tracking-widest uppercase">
                <Zap size={14} fill="white" /> LIMITED TIME MEGA SALE
              </div>
              <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] mb-6 tracking-tighter">
                FLAT <span className="text-[#d29a23]">50%</span> <br/> <span className="text-5xl md:text-7xl">OFFER</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-lg font-medium opacity-90 mb-8">
                Upgrade your home with handcrafted luxury. Our premium collections are now at half the price for the next 24 hours.
              </p>
              <button className="bg-white text-[#03396C] px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-[#d29a23] hover:text-white transition-all flex items-center gap-3 shadow-2xl">
                Shop the Sale <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 text-center min-w-[320px] shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-white/70">Offer Closes In</p>
              <div className="flex justify-center gap-6">
                {['08', '42', '15'].map((unit, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-5xl font-black text-white">{unit}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#d29a23] mt-2">{['Hrs', 'Min', 'Sec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANK OFFERS TICKER - sticky top-20 to stay below Navbar */}
      <div className="bg-white border-b border-[#03396C]/10 py-4 overflow-x-auto no-scrollbar sticky top-[72px] md:top-[80px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8 whitespace-nowrap">
          <div className="flex items-center gap-3 text-[11px] font-bold text-[#03396C] uppercase tracking-tighter">
            <Percent size={16} className="text-[#d29a23]" /> Extra 10% Off on Axis Bank Cards
          </div>
          <div className="h-4 w-[1px] bg-[#03396C]/10"></div>
          <div className="flex items-center gap-3 text-[11px] font-bold text-[#03396C] uppercase tracking-tighter">
            <Gift size={16} className="text-[#d29a23]" /> Free Cushion Set on orders above ₹50k
          </div>
          <div className="h-4 w-[1px] bg-[#03396C]/10"></div>
          <div className="flex items-center gap-3 text-[11px] font-bold text-[#03396C] uppercase tracking-tighter">
            <Truck size={16} className="text-[#d29a23]" /> Zero Cost Installation
          </div>
        </div>
      </div>

      {/* 3. TIERED REWARDS */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { spend: '₹1 Lakh', save: '₹5,000', icon: <Sparkles className="text-[#d29a23]"/> },
            { spend: '₹2 Lakhs', save: '₹12,000', icon: <Trophy className="text-[#d29a23]"/> },
            { spend: '₹5 Lakhs', save: '₹35,000', icon: <Gift className="text-[#d29a23]"/> }
          ].map((tier, idx) => (
            <div key={idx} className="bg-white border border-[#03396C]/10 p-8 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#fdfcf7] p-4 rounded-2xl">{tier.icon}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spend {tier.spend}</p>
                <h4 className="text-xl font-serif font-bold text-[#03396C]">Save Extra {tier.save}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLASH DEALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-10">
        <div className="bg-[#03396C] rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4 italic">Deal of the Day!</h2>
            <p className="text-blue-100 mb-8 max-w-sm">Get our best-selling Scandinavian Sofa Set at an unbeatable price. Only 4 units left!</p>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-black text-[#d29a23]">₹18,999</span>
              <span className="text-xl line-through opacity-50 font-bold">₹38,000</span>
            </div>
            <button className="bg-[#d29a23] px-10 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:scale-105 transition-transform">
              Claim Deal Now
            </button>
          </div>
          <div className="mt-10 md:mt-0 relative group">
            <div className="absolute inset-0 bg-[#d29a23] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1550254478-ead40cc54513" 
              className="w-80 h-80 object-cover rounded-2xl relative z-10 shadow-2xl" 
              alt="Flash Deal"
            />
          </div>
        </div>
      </section>

      {/* 5. MAIN PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-[2px] bg-[#d29a23]"></div>
                <p className="text-[#d29a23] text-xs font-black uppercase tracking-widest">Limited Stock</p>
            </div>
            <h2 className="text-5xl font-serif font-bold text-[#03396C] tracking-tighter">Bestselling <span className="italic">Offers</span></h2>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full">
             {['All', 'Living', 'Dining', 'Bedroom'].map(tab => (
               <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#03396C] shadow-md' : 'text-[#03396C]/50 hover:text-[#03396C]'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {offerProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#03396C]/5 group">
              <div className="relative h-[350px] overflow-hidden">
                <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={product.name} />
                <div className="absolute top-6 left-6 bg-[#03396C] text-white text-[11px] font-black px-4 py-2 rounded-full shadow-lg">
                  {product.discount}
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white text-[#03396C] rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all">
                  <Heart size={18} />
                </button>
              </div>
              <div className="p-10">
                <p className="text-[10px] text-[#d29a23] font-black uppercase tracking-widest mb-2">{product.category}</p>
                <h3 className="text-2xl font-serif font-bold text-[#03396C] mb-6 leading-tight group-hover:text-[#d29a23] transition-colors">{product.name}</h3>
                <div className="flex items-end gap-3 mb-8">
                  <span className="text-3xl font-black text-[#03396C]">{product.price}</span>
                  <span className="text-sm text-slate-300 line-through font-bold mb-1">{product.oldPrice}</span>
                </div>
                <button className="w-full bg-[#03396C] text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:bg-[#d29a23] transition-all">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER ADDED HERE --- */}
      <Footer />

    </div>
  );
};

export default OfferPage;