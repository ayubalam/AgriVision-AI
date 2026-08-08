import { Link } from 'react-router-dom'
import { ShieldCheck, Cpu, ArrowRight, Zap, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-[85vh] bg-slate-50">
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Next-Gen Precision Agriculture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Early Plant Disease Detection Powered by <span className="text-emerald-600">AI</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload leaf photographs to diagnose crop infections instantaneously, receive actionable treatment plans, and protect your agricultural yields.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
          >
            <span>Launch AI Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/diseases"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all shadow-sm"
          >
            <span>Browse Crop Library</span>
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Deep Learning Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Powered by deep learning vision models trained to classify crop health and pathogen types.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Instant Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive diagnostic classification confidence scores and disease details in real time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Actionable Treatment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get organic, chemical, and preventive protocols tailored to the detected infection.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}