import React from 'react';

// 1. ICONS DEFINED HERE 👇
const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const IconBigTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a24d]"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);

function Services() {
  return (
    <div>
      <section className="bg-white py-20 border-t border-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* Feature 1: Home Delivery */}
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconBigTruck />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">Home Delivery</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Enjoy fast and safe home delivery on all premium orders directly to your doorstep.
              </p>
            </div>

            {/* Feature 2: Replacement */}
            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconRefresh />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">10-Day Replacement</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Hassle-free 10-day replacement policy on all items for your complete peace of mind.
              </p>
            </div>

            {/* Feature 3: Warranty */}
            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconShield />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">5-Year Service Warranty</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Built to last a lifetime, backed by a comprehensive 5-year service warranty.
              </p>
            </div>

            {/* Feature 4: Support */}
            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 p-3 bg-[#f5f3ef] rounded-full text-[#c9a24d]">
                <IconPhone />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1b1b1b] mb-2">24/7 Call Support</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                We’re here for you, anytime. <br />
                <span className="font-semibold text-[#c9a24d]">+918129013942</span>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;