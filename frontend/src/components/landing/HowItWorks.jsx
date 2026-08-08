import { Upload, ScanLine, FileSearch, CheckCircle } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Leaf Image',
    description: 'Select or drag-and-drop a clean image of the affected plant leaf.'
  },
  {
    step: '02',
    icon: ScanLine,
    title: 'AI Analyzes Image',
    description: 'Our deep learning neural network evaluates pathology patterns and visual symptoms.'
  },
  {
    step: '03',
    icon: FileSearch,
    title: 'Disease Identified',
    description: 'View prediction confidence scores and crop identification diagnostics.'
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Get Actionable Advice',
    description: 'Access treatment solutions, cause analysis, and preventative strategies.'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Simple Process</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            How AgriVision AI Works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((stepItem, idx) => {
            const Icon = stepItem.icon
            return (
              <div key={idx} className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">{stepItem.step}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{stepItem.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{stepItem.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}