import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useProducts } from '../store/useProducts';
import { useCart } from '../store/useCart';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState('');

  if (!product) return <div className="pt-24 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 pb-24">
      <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-black/40 mb-8">
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-100">
                <img 
                  src={`https://picsum.photos/seed/tee-${i}/400/400`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-widest font-bold text-orange-500 mb-2">{product.category}</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-8">Rs. {product.price.toLocaleString()}</p>
          
          <p className="text-sm text-black/60 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase font-bold tracking-widest">Select Size</span>
              <button className="text-[10px] uppercase font-bold tracking-widest underline">Size Guide</button>
            </div>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setError('');
                  }}
                  className={`w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-black/10 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase font-bold mt-2">{error}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <span className="text-xs uppercase font-bold tracking-widest block mb-4">Quantity</span>
            <div className="flex items-center border border-black/10 w-fit">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-black/5"
              >-</button>
              <span className="w-10 h-10 flex items-center justify-center font-bold text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-black/5"
              >+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-colors"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button className="w-full border border-black py-5 text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
              Buy It Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="border-t border-black/5 pt-8 space-y-4">
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider">
              <Truck size={18} strokeWidth={1.5} /> COD Available in Karachi
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider">
              <ShieldCheck size={18} strokeWidth={1.5} /> Secure Online Payments Nationwide
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider">
              <RotateCcw size={18} strokeWidth={1.5} /> 7-Day Hassle-Free Exchange
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
