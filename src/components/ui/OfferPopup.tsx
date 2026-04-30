import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('amora_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('amora_popup_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg relative overflow-hidden"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-black/5 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 bg-black text-white p-12 flex flex-col justify-center items-center text-center">
                <Gift size={48} className="mb-6 opacity-50" />
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Welcome to <br /> the Studio</h3>
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
                <p className="text-xs uppercase tracking-widest font-bold text-orange-500 mb-2">Exclusive Offer</p>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">Get 10% OFF your first order</h4>
                <p className="text-xs text-black/50 leading-relaxed mb-8 uppercase tracking-wider">
                  Join our collective and be the first to know about new drops and secret sales.
                </p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    closePopup();
                  }}
                  className="space-y-3"
                >
                  <input 
                    required
                    type="email" 
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full border-b border-black/10 py-3 text-[10px] uppercase tracking-widest outline-none focus:border-black"
                  />
                  <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black/80 transition-colors">
                    Claim Discount
                  </button>
                  <button 
                    type="button"
                    onClick={closePopup}
                    className="w-full text-[9px] uppercase font-bold tracking-widest text-black/40 hover:text-black mt-2"
                  >
                    No thanks, I'll pay full price.
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
