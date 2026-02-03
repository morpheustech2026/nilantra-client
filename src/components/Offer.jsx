import React from 'react';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Offer = () => {
  const navigate = useNavigate();

  const goToOffers = () => {
    navigate('/offers'); // 🔥 Offer detail page route
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

        {/* --- BIG OFFER CARD --- */}
        <div
          onClick={goToOffers}
          className="col-span-1 lg:col-span-7 relative group overflow-hidden rounded-[2rem] shadow-sm cursor-pointer h-[500px] lg:h-full"
        >
          <img
            src="https://t4.ftcdn.net/jpg/04/96/64/77/360_F_496647702_KKitPWVXrmM7GTLct8CURFpvHHdshxE9.jpg"
            alt="Living Room Offer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03396C]/90 via-[#03396C]/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="bg-[#d29a23] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-2">
              <Clock size={14} /> LIMITED TIME DEAL
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
              Flat <span className="text-[#d29a23]">50% OFF</span> <br />
              on Italian Sofas
            </h2>

            <p className="text-gray-200 text-lg mb-8 max-w-md hidden md:block">
              Experience the epitome of luxury with our hand-crafted Italian collection.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToOffers();
              }}
              className="flex items-center gap-2 bg-white text-[#03396C] px-8 py-3 rounded-full font-bold hover:bg-[#d29a23] hover:text-white transition-all"
            >
              Shop The Sale <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 h-full">

          {/* TOP RIGHT */}
          <div
            onClick={goToOffers}
            className="flex-1 relative group overflow-hidden rounded-[2rem] shadow-sm cursor-pointer min-h-[250px]"
          >
            <img
              src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c"
              alt="Chair Offer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
              <span className="text-white/80 uppercase tracking-widest text-xs font-bold mb-2">
                New Arrivals
              </span>

              <h3 className="text-3xl font-serif text-white mb-4">
                Modern <br />
                <span className="italic text-[#d29a23]">Dining Chairs</span>
              </h3>

              <div className="flex items-center gap-2 text-white font-medium border-b border-white pb-1 group-hover:text-[#d29a23] group-hover:border-[#d29a23] transition-all">
                Explore Collection <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT */}
          <div
            onClick={goToOffers}
            className="flex-1 relative group overflow-hidden rounded-[2rem] bg-[#f5f3ef] cursor-pointer min-h-[250px] flex items-center"
          >
            <div className="w-1/2 p-8 z-10">
              <div className="flex items-center gap-2 text-[#03396C] mb-2">
                <Tag size={16} />
                <span className="font-bold text-xs uppercase">Special Offer</span>
              </div>

              <h3 className="text-2xl font-serif text-[#03396C] mb-2 leading-tight">
                Buy 2 Get <br />
                <span className="text-[#d29a23] font-bold">1 FREE</span>
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                On all decor items
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToOffers();
                }}
                className="bg-[#03396C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d29a23] transition-colors"
              >
                Grab Deal
              </button>
            </div>

            <div className="absolute right-0 top-0 w-3/5 h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f3ef] to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
                alt="Decor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offer;
