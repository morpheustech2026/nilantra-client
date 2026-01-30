import React, { useRef } from 'react';
import { ShoppingCart, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Velvet Accent Chair",
    price: "₹12,499",
    category: "Living Room",
    image: "https://m.media-amazon.com/images/I/81FVBGBK+ZL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "Minimalist Coffee Table",
    price: "₹8,999",
    category: "Tables",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    name: "Modern Floor Lamp",
    price: "₹4,200",
    category: "Lighting",
    image: "https://whiteteak.com/media/catalog/product/f/l/fl54-10001_thumbnail.jpg",
  },
  {
    id: 4,
    name: "Leather Sofa Set",
    price: "₹45,000",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 5,
    name: "Nordic Dining Chair",
    price: "₹6,500",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 6,
    name: "Bookshelf Tower",
    price: "₹15,200",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 7,
    name: "Recliner Armchair",
    price: "₹22,999",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 8,
    name: "Bedside Lamp",
    price: "₹3,100",
    category: "Lighting",
    image: "https://m.media-amazon.com/images/I/81eOl1S+3+L._AC_UF1000,1000_QL80_.jpg",
  },
];

const Bestseller = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -360 : 360; // Slightly increased scroll amount to match new card width+gap
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-4 md:px-12 bg-[#ffffff] relative"> {/* Increased top/bottom padding slightly */}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 px-2">
        <div>
          <span className="text-[#d29a23] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Exclusive Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#03396C]">
            Curated Bestsellers
          </h2>
        </div>
        
        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => scroll('left')}
            className="p-4 rounded-full border border-gray-100 bg-white text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 rounded-full border border-gray-100 bg-white text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative group/slider px-2"> {/* Added padding-x to avoid cutting off shadows on the edge */}
        
        {/* Navigation Buttons (Floating for Mobile/Tablet) */}
        <button 
          onClick={() => scroll('left')}
          className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 p-3 rounded-full shadow-xl text-[#03396C] -ml-4 border border-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 p-3 rounded-full shadow-xl text-[#03396C] -mr-4 border border-gray-100"
        >
          <ChevronRight size={20} />
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x snap-mandatory" // Increased gap and added padding top/bottom for shadow space
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            // --- NEW CARD CONTAINER STYLING ---
            <div 
              key={product.id} 
              className="min-w-[300px] md:min-w-[340px] snap-center group cursor-pointer p-3 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:bg-[#f8f9fa]"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-5 bg-gray-100 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badges / Top Actions */}
                <div className="absolute top-5 right-5 translate-x-16 group-hover:translate-x-0 transition-transform duration-300 flex flex-col gap-3">
                  <button className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-sm hover:shadow-md text-[#03396C] hover:bg-[#d29a23] hover:text-white transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-sm hover:shadow-md text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all delay-75">
                    <Eye size={20} />
                  </button>
                </div>

                {/* Bottom Hover Action (Add to Cart) */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                  <button className="w-full bg-white/95 backdrop-blur-md text-[#03396C] font-bold py-4 rounded-2xl shadow-lg hover:bg-[#03396C] hover:text-white transition-all flex items-center justify-center gap-3 tracking-wide">
                    Add to Cart <ShoppingCart size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info - NEW STYLING */}
              <div className="px-2 pb-2">
                {/* Category Tag placed above title */}
                <span className="inline-block bg-[#03396C]/5 text-[#03396C] text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider font-bold mb-3">
                  {product.category}
                </span>
                <div className="flex justify-between items-end gap-4">
                  <h3 className="text-xl font-serif text-gray-900 group-hover:text-[#03396C] transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-[#03396C] whitespace-nowrap">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile View All Text */}
      <div className="text-center md:hidden mt-4">
         <button className="text-[#03396C] font-bold uppercase tracking-widest text-xs border-b-2 border-[#d29a23] pb-1">
          View All Collection
        </button>
      </div>
    </section>
  );
};

export default Bestseller;