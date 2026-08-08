import { useState } from 'react';
import { Sprout, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Sprout size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">AgriVision AI</span>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <User size={16} className="text-emerald-600" />
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 font-medium transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <LogIn size={16} /> Sign In
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}