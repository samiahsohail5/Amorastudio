import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProducts } from '../../store/useProducts';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../types';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, getProduct } = useProducts();
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    images: [''],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Oversized',
    isBestSeller: false,
    stockCount: 10,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('amora_admin_auth');
    if (!auth) navigate('/admin/login');

    if (id && id !== 'new') {
      const existing = getProduct(id);
      if (existing) setFormData(existing);
    }
  }, [id, navigate, getProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      id: id && id !== 'new' ? id : Math.random().toString(36).substr(2, 9),
    } as Product;

    if (id && id !== 'new') {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    navigate('/admin/dashboard');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, images: [reader.result as string] });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-black/40 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-black/5 rounded-sm shadow-sm">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">
            {id === 'new' ? 'Add New Product' : 'Edit Product'}
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Col: Basics */}
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest">Product Name</label>
                <input
                  required
                  type="text"
                  className="w-full border-b border-black/10 py-3 text-sm outline-none focus:border-black"
                  placeholder="E.G. AESTHETIC OVERSIZED TEE"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest">Price (PKR)</label>
                  <input
                    required
                    type="number"
                    className="w-full border-b border-black/10 py-3 text-sm outline-none focus:border-black"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest">Stock Count</label>
                  <input
                    required
                    type="number"
                    className="w-full border-b border-black/10 py-3 text-sm outline-none focus:border-black"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest">Category</label>
                <select
                  className="w-full border-b border-black/10 py-3 text-sm uppercase tracking-widest outline-none focus:border-black appearance-none bg-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Oversized">Oversized</option>
                  <option value="Graphic">Graphic</option>
                  <option value="Essentials">Essentials</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Branded">Branded</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest block mb-4">Description</label>
                <textarea
                  rows={4}
                  className="w-full border border-black/10 p-4 text-xs outline-none focus:border-black"
                  placeholder="Describe the product..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bestseller"
                  className="w-4 h-4 border-black/10 rounded-sm"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                />
                <label htmlFor="bestseller" className="text-[10px] uppercase font-black tracking-widest cursor-pointer">
                  Mark as Best Seller
                </label>
              </div>
            </div>

            {/* Right Col: Images */}
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black tracking-widest">Product Image</label>
                <div className="aspect-[3/4] bg-neutral-100 rounded-sm border-2 border-dashed border-black/5 flex flex-col items-center justify-center p-4">
                  {formData.images?.[0] ? (
                    <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-black/20 text-center">
                      <ImageIcon size={48} strokeWidth={1} className="mx-auto mb-4" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">No Image Selected</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <label className="flex-1 bg-black text-white hover:bg-black/80 text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded-sm text-center cursor-pointer transition-all block">
                    Upload New Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  <input
                    type="text"
                    placeholder="OR ENTER IMAGE URL"
                    className="w-full border-b border-black/10 py-3 text-xs outline-none focus:border-black"
                    value={formData.images?.[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-5 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} /> {id === 'new' ? 'Add Product' : 'Save Changes'}
            </button>
            <Link
              to="/admin/dashboard"
              className="px-10 py-5 border border-black text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
