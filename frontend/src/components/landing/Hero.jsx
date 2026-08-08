import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, Scan, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Advanced Computer Vision Platform
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Intelligent Crop Health Starts With a <span className="text-emerald-600">Leaf.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Detect multi-crop plant diseases instantly using accurate deep learning vision models. Get actionable treatment recommendations, symptom insights, and preventive measures.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/predict"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Detect Disease Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              >
                Explore Platform
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Crop Coverage
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Diagnosis
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Treatment Insights
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xl shadow-emerald-900/10">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-4/3 flex items-center justify-center border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb16113?auto=format&fit=crop&w=800&q=80"
                  alt="Crop Leaf Analysis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-md">Tomato Late Blight</span>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">94.27% Confidence</span>
                  </div>
                  <p className="text-xs text-slate-200">Fungal organism detected on leaf surface.</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-3">
                  <Scan className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Fast Scan</p>
                    <p className="text-[11px] text-slate-500">Under 2 seconds</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Confidence Threshold</p>
                    <p className="text-[11px] text-slate-500">Filtered Predictions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}