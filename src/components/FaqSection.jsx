import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { question: "What is Nilantra?", answer: "Nilantra is a premium furniture brand dedicated to crafting high-quality home comfort solutions. We offer a range of premium mattresses, sofas, recliners, beds, and other home furnishing items designed to enhance your well-being and provide you with the utmost comfort and style." },
    { question: "Is Nilantra an Indian brand?", answer: "Yes, Nilantra is proudly an Indian brand committed to offering high-quality home comfort solutions to our customers." },
    { question: "Are Nilantra furniture prices worth it?", answer: "Absolutely! Our furniture is thoughtfully designed with quality materials to ensure a comfortable and rejuvenating experience. We believe that investing in good furniture is an investment in your home's aesthetics and your personal comfort." },
    { question: "How are Nilantra products made?", answer: "Our products are expertly crafted using innovative technology and premium materials to provide exceptional comfort and support. They are designed to promote better sleep and overall well-being." },
    { question: "Do you offer custom furniture designs?", answer: "Yes, we provide customization options for specific furniture pieces to match your unique interior needs and preferences." },
    { question: "What materials are used for Nilantra wooden furniture?", answer: "We use high-quality, sustainably sourced hardwoods like Teak, Mahogany, and Rosewood to ensure durability and a premium finish." },
    { question: "Does Nilantra offer a warranty on its products?", answer: "Yes, most of our furniture comes with a comprehensive warranty against manufacturing defects. The duration varies depending on the product category." },
    { question: "How do I care for my Nilantra wooden furniture?", answer: "Avoid direct sunlight and moisture. Dust regularly with a soft, dry cloth and use wood-safe polish periodically to maintain the shine." },
    { question: "Do you provide home delivery services?", answer: "Yes, we offer safe and professional home delivery services across major locations. Our team ensures the furniture is handled with care." },
    { question: "Is assembly included in the delivery?", answer: "For products that require assembly, our professional installation team will set it up at your home at the time of delivery." },
    { question: "Can I return a product if I'm not satisfied?", answer: "We have a transparent return policy for products with manufacturing defects or damages. Please refer to our Returns page for detailed terms." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards, Net Banking, UPI (Google Pay, PhonePe), and EMI options for eligible purchases." },
    { question: "How can I track my order?", answer: "Once your order is shipped, we will send you a tracking link via email and SMS to monitor the delivery status in real-time." },
    { question: "Does Nilantra have a physical showroom?", answer: "Yes, you can visit our experience center to see and feel our products. Our address is Nilantra, Manassery, Rameshwaram, Kochi." },
    { question: "Are your mattresses orthopaedic?", answer: "Yes, we offer a specialized range of orthopaedic mattresses designed to provide spinal alignment and back support." },
    { question: "Do you offer bulk orders for offices or hotels?", answer: "Yes, we specialize in bulk orders and commercial projects. You can contact our sales team for customized quotes." },
    { question: "How long does it take to deliver custom orders?", answer: "Custom orders typically take 3-5 weeks depending on the complexity of the design and material availability." },
    { question: "Are the fabrics used for sofas stain-resistant?", answer: "We offer a variety of premium fabric options, including high-performance, stain-resistant fabrics that are easy to clean." },
    { question: "Can I exchange my old furniture for new Nilantra pieces?", answer: "Currently, we do not have an exchange program, but we offer seasonal discounts and loyalty rewards for our customers." },
    { question: "How can I contact Nilantra customer support?", answer: "You can reach us at support@nilantra.com or call our helpline mentioned on the contact page for any assistance." }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#011f4b] mb-4">Frequently Asked Questions</h1>
          <div className="h-1 w-24 bg-[#c9a24d] mx-auto rounded-full"></div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.05 }}
              className={`border transition-all duration-300 rounded-2xl overflow-hidden bg-white ${
                activeIndex === index ? 'border-[#c9a24d] shadow-md' : 'border-gray-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Question */}
                    <span className={`text-lg md:text-xl font-bold transition-colors ${
                      activeIndex === index ? 'text-[#c9a24d]' : 'text-[#011f4b]'
                    }`}>
                      {faq.question}
                    </span>
                    
                    {/* Answer Preview (Hidden when active) */}
                    {!activeIndex === index || activeIndex !== index ? (
                      <span className="text-sm text-gray-400 line-clamp-1 italic">
                        {faq.answer.substring(0, 65)}...
                      </span>
                    ) : null}
                  </div>

                  {/* Animated Icon */}
                  <motion.div 
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    className={`mt-1 p-1 rounded-full ${activeIndex === index ? 'bg-[#c9a24d]/10' : 'bg-gray-100'}`}
                  >
                    <ChevronDown size={20} className={activeIndex === index ? 'text-[#c9a24d]' : 'text-gray-500'} />
                  </motion.div>
                </div>
              </button>

              {/* Full Answer with Animation */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 text-base md:text-lg leading-relaxed border-t border-gray-50 pt-5 bg-white">
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;