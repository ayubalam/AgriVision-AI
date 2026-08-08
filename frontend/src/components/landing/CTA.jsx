import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-400 mb-2">
          <Leaf className="w-6 h-6" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Protect Your Crops With AI Precision
        </h2>
        <p className="text-emerald-200 text-sm sm:text-base max-w-xl mx-auto">
          Start diagnosing crop health issues early to improve yields and implement sustainable treatment remedies.
        </p>
        <div>
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/40"
          >
            Start Free Leaf Analysis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}