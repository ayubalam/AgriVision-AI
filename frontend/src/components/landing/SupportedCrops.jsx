const crops = [
  { name: 'Tomato', count: '10 Disease Classes', image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16113?auto=format&fit=crop&w=400&q=80' },
  { name: 'Potato', count: '3 Disease Classes', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80' },
  { name: 'Corn / Maize', count: '4 Disease Classes', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80' },
  { name: 'Apple', count: '4 Disease Classes', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80' },
  { name: 'Grape', count: '4 Disease Classes', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Pepper', count: '2 Disease Classes', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80' },
]

export default function SupportedCrops() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Supported Species</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Multi-Crop Pathology Detection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {crops.map((crop, idx) => (
            <div key={idx} className="group overflow-hidden rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all">
              <div className="h-28 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-bold text-slate-900 text-sm">{crop.name}</h3>
                <p className="text-[11px] text-slate-500 font-medium">{crop.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}