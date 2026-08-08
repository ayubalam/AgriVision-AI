import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-white text-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 text-white">
            <Leaf className="w-4 h-4" />
          </div>
          <span>AgriVision AI</span>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} AgriVision AI. Early Plant Disease Detection System.
        </p>
      </div>
    </footer>
  )
}