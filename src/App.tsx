/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useCart } from './store/useCart';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProductForm from './pages/admin/ProductForm';
import OfferPopup from './components/ui/OfferPopup';

function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Amora Studio</h2>
          <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-8">
            Premium aesthetic streetwear for the Gen-Z soul. oversized fits, minimal designs, and curated vibes. Born in Karachi, inspired by the world.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs uppercase font-bold tracking-widest hover:text-white/70 transition-colors">Instagram</a>
            <a href="#" className="text-xs uppercase font-bold tracking-widest hover:text-white/70 transition-colors">TikTok</a>
            <a href="#" className="text-xs uppercase font-bold tracking-widest hover:text-white/70 transition-colors">Facebook</a>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Explore</h3>
          <ul className="space-y-4 text-xs uppercase tracking-widest font-medium text-white/50">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Assistance</h3>
          <ul className="space-y-4 text-xs uppercase tracking-widest font-medium text-white/50">
            <li><Link to="/contact" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Exchange & Returns</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-2">Admin Panel <Shield size={10}/></Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">
          © 2026 Amora Studio. All Rights Reserved.
        </p>
        <div className="flex gap-4 opacity-30 grayscale invert">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Easypaisa_Logo.png" alt="Easypaisa" className="h-4 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/JazzCash_Logo.png" alt="JazzCash" className="h-4 object-contain" />
          <p className="text-[10px] uppercase font-bold">COD</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { totalItems } = useCart();

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Navbar totalItems={totalItems} />} />
        </Routes>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/new" element={<ProductForm />} />
            <Route path="/admin/product/:id" element={<ProductForm />} />
          </Routes>
        </main>

        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>

        <OfferPopup />
      </div>
    </Router>
  );
}
