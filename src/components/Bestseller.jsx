import React, { useRef, useState, useEffect } from 'react'; 
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Bestseller = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://nilantra-server.onrender.com/api/products");
        
        const filtered = response.data.filter(product => product.isBestSeller === true);
        setBestsellerProducts(filtered);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null; 

  return (
    <section className="py-24 px-4 md:px-12 bg-[#ffffff] relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 px-2">
        <div>
          <span className="text-[#d29a23] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Exclusive Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#03396C]">
            Curated Bestsellers
          </h2>
        </div>
        
        <div className="hidden md:flex gap-3">
          <button onClick={() => scroll('left')} className="p-4 rounded-full border border-gray-100 bg-white text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all shadow-sm hover:shadow-md">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="p-4 rounded-full border border-gray-100 bg-white text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all shadow-sm hover:shadow-md">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative group/slider px-2">
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellerProducts.map((product) => (
            <div 
              key={product._id} 
              onClick={() => navigate(`/product-details/${product._id}`)}
              className="min-w-[300px] md:min-w-[340px] snap-center group cursor-pointer p-3 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:bg-[#f8f9fa]"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-5 bg-gray-100 shadow-sm">
                <img 
                  src={product.images && product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-5 right-5 translate-x-16 group-hover:translate-x-0 transition-transform duration-300 flex flex-col gap-3">
                  <button className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-sm hover:shadow-md text-[#03396C] hover:bg-[#d29a23] hover:text-white transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-sm hover:shadow-md text-[#03396C] hover:bg-[#03396C] hover:text-white transition-all delay-75">
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div className="px-2 pb-2">
                <span className="inline-block bg-[#03396C]/5 text-[#03396C] text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider font-bold mb-3">
                  {product.mainCategory}
                </span>
                <div className="flex justify-between items-end gap-4">
                  <h3 className="text-xl font-serif text-gray-900 group-hover:text-[#03396C] transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-[#03396C] whitespace-nowrap">₹{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;