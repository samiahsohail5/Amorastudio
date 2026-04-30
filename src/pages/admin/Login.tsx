import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../store/useSettings';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === settings.adminPassword) {
      sessionStorage.setItem('amora_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-sm border border-black/5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Access</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-black/40 mt-2">Amora Studio Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase font-black tracking-widest block mb-2">Password</label>
            <input
              autoFocus
              type="password"
              className="w-full border border-black/10 px-4 py-3 text-xs outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && <p className="text-red-500 text-[10px] uppercase font-bold mt-2">{error}</p>}
          </div>

          <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-black/80 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
