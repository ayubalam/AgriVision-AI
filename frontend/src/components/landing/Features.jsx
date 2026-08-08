import { Cpu, Layers, Zap, Stethoscope, History, Shield } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AI Disease Detection',
    description: 'High-accuracy transfer learning computer vision model built for deep leaf leaf-pathology classification.'
  },
  {
    icon: Layers,
    title: 'Multi-Crop Support',
    description: 'Supports key staple crops including Tomato, Potato, Maize, Wheat, Grape, Apple, and Pepper.'
  },
  {
    icon: Zap,
    title: 'Instant Inference',
    description: 'Get classification results, confidence scores, and disease metrics in seconds.'
  },
  {
    icon: Stethoscope,
    title: 'Treatment Recommendations',
    description: 'Receive tailored biological, chemical, and cultural management advice.'
  },
  {
    icon: History,
    title: 'Prediction History',
    description: 'Securely track, filter, review, and manage previous diagnosis records anytime.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise JWT authentication, input sanitization, and secure cloud MongoDB persistence.'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Core Capabilities</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Everything You Need for Smarter Crop Care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-lg hover:shadow-emerald-900/5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}