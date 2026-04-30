import { useEffect, useState } from 'react';
import { useProducts } from '../store/useProducts';
import ProductCard from '../components/shop/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function Shop() {
  const { products: allProducts } = useProducts();
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Oversized', 'Graphic', 'Essentials', 'Vintage', 'Branded', 'Technical'];
  
  const filteredProducts = filter === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === filter);

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 pb-24">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Shop All</h1>
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-black/40">Premium Aesthetic Streetwear</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Filters */}
        <div className="md:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest mb-6 border-b border-black pb-2">
              <SlidersHorizontal size={14} /> Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] uppercase font-bold tracking-widest text-black/50 mb-4">Categories</h3>
                <div className="flex flex-wrap md:flex-col gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`text-xs uppercase font-bold tracking-widest text-left py-1 hover:text-black transition-colors ${
                        filter === cat ? 'text-black underline underline-offset-4' : 'text-black/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] uppercase font-bold tracking-widest text-black/50 mb-4">Sort By</h3>
                <button className="flex items-center justify-between w-full text-xs uppercase font-bold tracking-widest border border-black/10 p-3">
                  Newest <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-24 text-center ">
              <p className="text-xs uppercase font-bold tracking-widest text-black/40">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
