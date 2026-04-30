import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../store/useCart';
import { Truck, CreditCard, Landmark, Phone } from 'lucide-react';

const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 
  'Hyderabad', 'Peshawar', 'Quetta', 'Sialkot', 'Sargodha', 'Bahawalpur', 'Sukkur'
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Karachi',
  });

  const [paymentMethod, setPaymentMethod] = React.useState<'COD' | 'Easypaisa' | 'JazzCash' | 'BankTransfer'>('COD');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isKarachi = formData.city === 'Karachi';

  React.useEffect(() => {
    if (!isKarachi && paymentMethod === 'COD') {
      setPaymentMethod('Easypaisa');
    }
  }, [isKarachi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      alert('Order placed successfully! Order ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase());
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h1>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-bold"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 pb-24">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-16">
        {/* Left: Forms */}
        <div className="space-y-12">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
              Shipping Information
            </h2>
            <div className="grid gap-4">
              <input
                required
                type="text"
                placeholder="FULL NAME"
                className="w-full border-b border-black/10 py-3 text-sm uppercase tracking-widest outline-none focus:border-black transition-colors"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
              <input
                required
                type="tel"
                placeholder="PHONE NUMBER"
                className="w-full border-b border-black/10 py-3 text-sm uppercase tracking-widest outline-none focus:border-black transition-colors"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                required
                type="text"
                placeholder="SHIPPING ADDRESS"
                className="w-full border-b border-black/10 py-3 text-sm uppercase tracking-widest outline-none focus:border-black transition-colors"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
              <div className="relative">
                <select
                  required
                  className="w-full border-b border-black/10 py-3 text-sm uppercase tracking-widest outline-none focus:border-black transition-colors appearance-none bg-transparent"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                >
                  {PAKISTAN_CITIES.map(city => (
                    <option key={city} value={city}>{city.toUpperCase()}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Truck size={16} className="text-black/30" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">2</span>
              Payment Method
            </h2>

            <div className="bg-neutral-50 p-6 rounded-sm mb-6">
              {isKarachi ? (
                <div className="text-[10px] uppercase font-bold tracking-widest text-green-600 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                  Cash on Delivery available in Karachi
                </div>
              ) : (
                <div className="text-[10px] uppercase font-bold tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                  Advance payment required for orders outside Karachi
                </div>
              )}

              <div className="grid gap-3">
                {isKarachi && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center justify-between p-4 border text-left transition-all ${
                      paymentMethod === 'COD' ? 'border-black bg-black text-white' : 'border-black/5 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={20} />
                      <span className="text-xs uppercase font-bold tracking-widest">Cash on Delivery</span>
                    </div>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Easypaisa')}
                  className={`flex items-center justify-between p-4 border text-left transition-all ${
                    paymentMethod === 'Easypaisa' ? 'border-black bg-black text-white' : 'border-black/5 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone size={20} />
                    <span className="text-xs uppercase font-bold tracking-widest">Easypaisa</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('JazzCash')}
                  className={`flex items-center justify-between p-4 border text-left transition-all ${
                    paymentMethod === 'JazzCash' ? 'border-black bg-black text-white' : 'border-black/5 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} />
                    <span className="text-xs uppercase font-bold tracking-widest">JazzCash</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('BankTransfer')}
                  className={`flex items-center justify-between p-4 border text-left transition-all ${
                    paymentMethod === 'BankTransfer' ? 'border-black bg-black text-white' : 'border-black/5 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark size={20} />
                    <span className="text-xs uppercase font-bold tracking-widest">Bank Transfer</span>
                  </div>
                </button>
              </div>
            </div>

            {paymentMethod !== 'COD' && (
              <div className="p-6 border border-dashed border-black/10 text-center">
                <p className="text-[10px] uppercase font-bold tracking-wider mb-2">Our Payment Details</p>
                <div className="text-xs font-mono bg-black/5 p-4 rounded-sm">
                  {paymentMethod === 'Easypaisa' && '03XX-XXXXXXX (SAMIAH)'}
                  {paymentMethod === 'JazzCash' && '03XX-XXXXXXX (SAMIAH)'}
                  {paymentMethod === 'BankTransfer' && 'Meezan Bank: XXXX-XXXX-XXXX'}
                </div>
                <p className="text-[9px] text-black/50 mt-4 uppercase">Please send a screenshot of the receipt to our WhatsApp after payment.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="bg-neutral-50 p-8 rounded-sm sticky top-24">
            <h2 className="text-xs uppercase tracking-widest font-bold mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-auto pr-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-neutral-200 overflow-hidden shrink-0">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-tight line-clamp-1">{item.name}</p>
                    <p className="text-[9px] text-black/40 uppercase font-bold mt-1">Size: {item.selectedSize} × {item.quantity}</p>
                    <p className="text-xs font-bold mt-2">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/5 pt-6 space-y-4">
              <div className="flex justify-between text-xs uppercase font-bold tracking-widest">
                <span>Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs uppercase font-bold tracking-widest">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t border-black/10 pt-4 flex justify-between text-lg font-black uppercase tracking-tighter">
                <span>Total</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-widest font-bold mt-8 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>Place Order</>
              )}
            </button>
            <p className="text-[9px] text-center text-black/40 mt-4 uppercase">By placing an order, you agree to our Terms of Service.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
