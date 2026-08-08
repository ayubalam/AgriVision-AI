import { useState } from 'react';
import { Leaf, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-300" />
            <span className="font-bold text-xl tracking-tight">AgriVision-AI</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 font-medium">
            <a href="#home" className="hover:text-emerald-200 transition">Home</a>
            <a href="#detect" className="hover:text-emerald-200 transition">Analyze Leaf</a>
            <a href="#history" className="hover:text-emerald-200 transition">History</a>
            <button className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-lg text-sm transition">
              <User size={16} /> Login
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-emerald-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-emerald-800 px-4 pt-2 pb-4 space-y-2">
          <a href="#home" className="block py-2 hover:text-emerald-200">Home</a>
          <a href="#detect" className="block py-2 hover:text-emerald-200">Analyze Leaf</a>
          <a href="#history" className="block py-2 hover:text-emerald-200">History</a>
          <button className="w-full text-left py-2 hover:text-emerald-200">Login</button>
        </div>
      )}
    </nav>
  );
}