import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../../store/useSettings';

interface NavbarProps {
  totalItems: number;
}

export default function Navbar({ totalItems }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { settings } = useSettings();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-70">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Amora Studio" className="h-8 w-auto object-contain" />
            ) : (
              <span className="text-xl font-bold tracking-tighter uppercase">Amora Studio</span>
            )}
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
            <Link to="/shop" className="hover:text-black/50 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-black/50 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-black/50 transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <Link to="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-black/5 px-4 pb-4 flex flex-col gap-4 text-sm font-medium uppercase tracking-wider"
          >
            <Link to="/shop" onClick={() => setIsOpen(false)} className="py-2">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="py-2">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="py-2">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
