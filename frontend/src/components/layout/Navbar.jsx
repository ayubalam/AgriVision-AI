import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Disease Detection', path: '/predict' },
    { name: 'Diseases Library', path: '/diseases' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Leaf className="w-5 h-5" />
            </div>
            <span>AgriVision <span className="text-emerald-600">AI</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-emerald-600 ${
                    isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/predict"
              className="inline-flex items-center gap-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-emerald-600 py-1"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center text-sm font-medium text-slate-700 py-2 border border-slate-200 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              to="/predict"
              onClick={() => setIsOpen(false)}
              className="text-center text-sm font-medium bg-emerald-600 text-white py-2 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}