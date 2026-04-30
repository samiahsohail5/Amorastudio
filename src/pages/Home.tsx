import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, BadgePercent } from 'lucide-react';
import { motion } from 'motion/react';
import { useProducts } from '../store/useProducts';
import ProductCard from '../components/shop/ProductCard';

export default function Home() {
  const { products } = useProducts();
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/amora-hero/1920/1080" 
            alt="Amora Hero" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] font-bold mb-4"
          >
            Amora Studio — Premium Streetwear
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            Wear Your <br /> Vibe.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all duration-300"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-neutral-100 py-10 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Truck size={24} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider">Nationwide Delivery</p>
              <p className="text-[10px] text-black/50">3-5 Working Days</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <BadgePercent size={24} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider">COD in Karachi</p>
              <p className="text-[10px] text-black/50">Cash on Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <ShieldCheck size={24} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider">Secure Payment</p>
              <p className="text-[10px] text-black/50">Easypaisa & JazzCash</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <RefreshCw size={24} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider">7-Day Exchange</p>
              <p className="text-[10px] text-black/50">Easy Returns Policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-orange-500 mb-2">Editor's Choice</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-black text-white py-20 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8 opacity-20">
              Limited Stock Available 🔥 Selling Fast 🔥
            </span>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-neutral-100 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/amora-fabric/1000/1000" 
              alt="Fabric Quality" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Why Amora?</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Premium Cotton Fabric</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  We use only the finest, heavy-weight cotton for our oversized fits, ensuring durability and ultimate comfort for every vibe.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Trendy Streetwear Designs</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Our designs are inspired by global street culture while staying rooted in our local aesthetic. minimal, bold, and always on trend.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Fast Nationwide Delivery</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Get your fit in 3-5 days. With COD available in Karachi and secure online payments for others, we make it easy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-100 py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Join the Studio</h2>
          <p className="text-sm text-black/60 mb-8 uppercase tracking-widest font-medium">Get 10% OFF your first order & exclusive drops.</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-1 bg-white border border-black/10 px-4 py-3 text-xs uppercase tracking-widest outline-none focus:border-black"
            />
            <button className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-bold">Join</button>
          </form>
        </div>
      </section>
    </div>
  );
}
