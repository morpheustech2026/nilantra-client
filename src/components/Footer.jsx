import React from 'react';
import logo from "../../src/assets/nilantra-logo.png"

function Footer() {
  return (
    
    <footer id="contact" className="bg-[#050505] text-gray-300 border-t border-white/10 relative z-50">

      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

       
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={logo}
              alt="Nilantra"
             
              className="h-25 w-25 object-contain "
            />
           
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Handcrafted premium wooden furniture designed for refined modern living.
          </p>
        </div>

       
        <div>
          <h4 className="font-medium mb-4 text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Living Room</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Bedroom</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Dining</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Home Office</li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-medium mb-4 text-white">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Shipping & Delivery</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Returns</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-[#c9a24d] cursor-pointer transition">Terms & Conditions</li>
          </ul>
        </div>

       
        <div className="flex flex-col h-full">
          <h4 className="font-medium mb-4 text-white">Contact & Visit</h4>
          <p className="text-sm text-gray-400 mb-1">support@nilantra.com</p>
          
        
          <a 
            href="https://www.google.com/maps/place/?q=place_id:ChIJZ8J7l39tCDsRloPBtsNNLjw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 mb-4 hover:text-[#c9a24d] transition-colors block"
          >
            Nilantra, Manassery ,Rameshwaram,<br/>Kochi, Ernakulam , Kerala 682507
          </a>

         
         <div className="flex gap-4 mb-6">
  {["facebook", "instagram", "youtube", "linkedin", "twitter"].map(
    (icon) => (
      <img
        key={icon}
        src={`/assets/${icon}.png`}
        alt={icon}
        
        className="h-8 w-8 hover:scale-110 cursor-pointer transition duration-300"
      />
    )
  )}
</div>

        
          <div className="relative w-full h-72 rounded-xl overflow-hidden border border-white/10 shadow-sm mt-auto group">
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.563643763784!2d76.25725307585093!3d9.97022877354406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08727e977f0267%3A0x8d2e03b6c3c1b096!2sNilantra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              
              className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
              title="Nilantra Location"
            ></iframe>

            
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJZ8J7l39tCDsRloPBtsNNLjw"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group-hover:opacity-100"
              title="Open in Google Maps"
            >
              <span className="opacity-0 group-hover:opacity-100 bg-[#c9a24d] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Open in Google Maps
              </span>
            </a>

          </div>
        </div>

      </div>

    
      <div className="border-t border-white/10 py-6 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500">
            Secure Payments Accepted
          </span>

         <div className="flex gap-6 items-center">


  <img
    src="/assets/visa.png"
    alt="Visa"
   
    className="h-12 object-contain hover:scale-105 transition duration-300"
  />

  <img
    src="/assets/card.png"
    alt="Card"
    className="h-12 object-contain hover:scale-105 transition duration-300"
  />

  <img
    src="/assets/google-pay.png"
    alt="Google Pay"
    className="h-12 object-contain hover:scale-105 transition duration-300"
  />
</div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Nilantra</span>
          <span>Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;