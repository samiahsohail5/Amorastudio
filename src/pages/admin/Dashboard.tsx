import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../store/useProducts';
import { useSettings } from '../../store/useSettings';
import { Plus, Trash2, Edit, LogOut, Image, LayoutDashboard, Package, Settings as SettingsIcon } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const auth = sessionStorage.getItem('amora_admin_auth');
    if (!auth) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('amora_admin_auth');
    navigate('/');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 hidden lg:flex flex-col">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-12">Studio Admin</h2>
        <nav className="flex-1 space-y-6">
          <Link to="/admin/dashboard" className="flex items-center gap-3 text-xs uppercase font-bold tracking-widest hover:text-white/70 transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/product/new" className="flex items-center gap-3 text-xs uppercase font-bold tracking-widest hover:text-white/70 transition-colors">
            <Plus size={18} /> Add Product
          </Link>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-xs uppercase font-bold tracking-widest text-red-400 hover:text-red-300 transition-colors mt-auto"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Dashboard</h1>
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="px-6 py-3 border border-black/10 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2"
            >
              View Site
            </Link>
            <button 
              onClick={handleLogout}
              className="lg:hidden px-6 py-3 bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Section */}
          <section className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 border border-black/5 rounded-sm">
              <h3 className="text-xs uppercase font-black tracking-widest mb-6 flex items-center gap-2">
                <SettingsIcon size={16} /> Site Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest block mb-4 text-black/40">Brand Logo</label>
                  <div className="flex flex-col gap-4">
                    {settings.logoUrl && (
                      <div className="p-4 bg-neutral-100 rounded-sm">
                        <img src={settings.logoUrl} alt="Preview" className="h-12 w-auto object-contain mx-auto" />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <label className="flex-1 bg-black text-white hover:bg-black/80 text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded-sm text-center cursor-pointer transition-all">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                      </label>
                      {settings.logoUrl && (
                        <button 
                          onClick={() => updateSettings({ logoUrl: '' })}
                          className="bg-red-500 text-white p-3 rounded-sm hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <input 
                      type="text" 
                      placeholder="OR IMAGE URL" 
                      className="w-full border border-black/10 px-4 py-3 text-[10px] outline-none focus:border-black"
                      value={settings.logoUrl}
                      onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-black/5 rounded-sm">
              <h3 className="text-xs uppercase font-black tracking-widest mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-4 rounded-sm">
                  <p className="text-[10px] uppercase font-bold text-black/40 mb-1">Total Items</p>
                  <p className="text-2xl font-black">{products.length}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-sm">
                  <p className="text-[10px] uppercase font-bold text-black/40 mb-1">Best Sellers</p>
                  <p className="text-2xl font-black">{products.filter(p => p.isBestSeller).length}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Table */}
          <section className="lg:col-span-2">
            <div className="bg-white border border-black/5 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="text-xs uppercase font-black tracking-widest flex items-center gap-2">
                  <Package size={16} /> Manage Products
                </h3>
                <Link to="/admin/product/new" className="bg-black text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-black/80 transition-all">
                  <Plus size={14} /> New
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50 text-[10px] uppercase font-bold tracking-widest text-black/40">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded-sm bg-neutral-100" />
                            <div>
                              <p className="text-xs font-bold uppercase tracking-tight">{product.name}</p>
                              <p className="text-[10px] text-black/40 uppercase">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">Rs. {product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                            product.stockCount < 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {product.stockCount} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link 
                              to={`/admin/product/${product.id}`}
                              className="p-2 hover:bg-black hover:text-white rounded-sm transition-all"
                            >
                              <Edit size={14} />
                            </Link>
                            <button 
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this product?')) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-2 hover:bg-red-500 hover:text-white rounded-sm transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
