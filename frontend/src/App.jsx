import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Cpu, ArrowRight } from 'lucide-react'

export default function App() {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white border border-emerald-100 rounded-2xl p-8 shadow-xl shadow-emerald-900/5 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white mb-6 shadow-lg shadow-emerald-500/30">
          <Leaf className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          AgriVision <span className="text-emerald-600">AI</span>
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Phase 1 & Phase 2 Environment Setup Complete.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
            <Cpu className="w-4 h-4 text-emerald-600" /> Vite + React
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Tailwind v4
          </div>
        </div>

        <button className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer">
          Ready for Phase 3 <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}