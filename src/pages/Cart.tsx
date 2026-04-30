import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../store/useCart';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-neutral-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Your bag is empty</h1>
          <p className="text-sm text-black/50 mb-8 uppercase tracking-wider font-medium">Looks like you haven't added anything to your collective yet.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="w-full bg-black text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 pb-24">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your Bag ({totalItems})</h1>
        <Link to="/shop" className="text-xs uppercase font-bold border-b border-black pb-1">Continue Shopping</Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 pb-8 border-b border-black/5 group">
              <div className="w-32 h-40 bg-neutral-100 overflow-hidden">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-xs text-black/50 uppercase mt-1">Size: {item.selectedSize}</p>
                  </div>
                  <p className="text-sm font-bold">Rs. {item.price.toLocaleString()}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-black/10 w-fit">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-neutral-50 p-8 rounded-sm">
            <h2 className="text-xs uppercase tracking-widest font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs uppercase font-bold tracking-widest text-black/60">
                <span>Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs uppercase font-bold tracking-widest text-black/60">
                <span>Shipping</span>
                <span className="text-green-600">Calculated at checkout</span>
              </div>
              <div className="pt-4 border-t border-black/10 flex justify-between text-lg font-black uppercase tracking-tighter">
                <span>Estimated Total</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-black/80 transition-all group"
            >
              Checkout <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-center uppercase font-bold tracking-widest text-black/40">Secure Payments via Easypaisa, JazzCash, & COD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
