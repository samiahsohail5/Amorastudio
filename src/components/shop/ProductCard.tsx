import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
            Best Seller
          </div>
        )}
        {product.stockCount < 5 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
            Only {product.stockCount} Left
          </div>
        )}
      </Link>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-tight">
            <Link to={`/product/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-black/50 mt-1 uppercase">{product.category}</p>
        </div>
        <p className="text-sm font-bold">Rs. {product.price.toLocaleString()}</p>
      </div>

      <Link 
        to={`/product/${product.id}`}
        className="mt-4 w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 block text-center"
      >
        Quick View
      </Link>
    </motion.div>
  );
}
