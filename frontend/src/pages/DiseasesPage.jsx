import { useState } from 'react'
import { Search, Filter, Droplets, Sprout, ShieldAlert, Sparkles, BookOpen } from 'lucide-react'

const DISEASE_CATALOG = [
  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    name: 'Early Blight (Alternaria solani)',
    category: 'Fungal',
    description: 'Fungal infection causing dark, target-like concentric spots on lower mature leaves, leading to leaf drop and fruit damage.',
    symptoms: ['Concentric ring dark spots', 'Yellowing surrounding spots', 'Premature leaf drop'],
    treatment: {
      chemical: ['Copper-based fungicides', 'Mancozeb 75% WP'],
      organic: ['Neem oil spray (0.5%)', 'Bio-fungicide (Trichoderma viride)'],
      prevention: ['Rotate crops every 2-3 years', 'Avoid overhead watering', 'Mulch soil surface']
    }
  },
  {
    id: 'potato-late-blight',
    crop: 'Potato',
    name: 'Late Blight (Phytophthora infestans)',
    category: 'Oomycete',
    description: 'Destructive water-mold disease causing dark water-soaked spots on leaf tips and white mold beneath affected leaves.',
    symptoms: ['Irregular pale green/dark spots', 'White fuzzy growth under leaves', 'Tuber rot'],
    treatment: {
      chemical: ['Metalaxyl + Mancozeb', 'Chlorothalonil'],
      organic: ['Bordeaux mixture spray', 'Copper soap liquid spray'],
      prevention: ['Use certified disease-free seeds', 'Ensure high ridge field drainage']
    }
  },
  {
    id: 'apple-cedar-rust',
    crop: 'Apple',
    name: 'Cedar Apple Rust (Gymnosporangium juniperi-virginianae)',
    category: 'Fungal',
    description: 'Fungal disease creating bright orange-yellow spots on upper leaf surfaces and tubelike structures under leaves.',
    symptoms: ['Bright orange spots on foliage', 'Tubelike orange fruiting bodies', 'Early defoliation'],
    treatment: {
      chemical: ['Myclobutanil', 'Propiconazole'],
      organic: ['Sulfur-based fungicide spray'],
      prevention: ['Remove nearby Eastern Red Cedar trees', 'Plant rust-resistant apple cultivars']
    }
  },
  {
    id: 'corn-common-rust',
    crop: 'Corn',
    name: 'Common Rust (Puccinia sorghi)',
    category: 'Fungal',
    description: 'Fungal spores forming powdery cinnamon-brown pustules on both upper and lower surfaces of corn leaves.',
    symptoms: ['Elongated brown pustules', 'Powdery brown spores', 'Leaf necrosis under severe attack'],
    treatment: {
      chemical: ['Azoxystrobin + Difenoconazole', 'Pyraclostrobin'],
      organic: ['Potassium bicarbonate spray', 'Garlic extract formulation'],
      prevention: ['Plant rust-resistant hybrids', 'Sow seeds early in the planting window']
    }
  }
]

export default function DiseasesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('All')

  const crops = ['All', 'Tomato', 'Potato', 'Apple', 'Corn']

  const filteredDiseases = DISEASE_CATALOG.filter((item) => {
    const matchesCrop = selectedCrop === 'All' || item.crop === selectedCrop
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCrop && matchesSearch
  })

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Agricultural Knowledge Repository</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Crop Disease & Treatment Library
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Explore symptoms, causative agents, and management protocols across common agricultural crops.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop or disease name..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0">Crop Filter:</span>
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDiseases.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {item.crop}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Symptoms</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.symptoms.map((symptom, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium">
                    • {symptom}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Chemical</span>
                </div>
                <p className="text-slate-600 text-[11px]">{item.treatment.chemical.join(', ')}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Organic</span>
                </div>
                <p className="text-slate-600 text-[11px]">{item.treatment.organic.join(', ')}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 text-sky-700 font-bold mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Prevention</span>
                </div>
                <p className="text-slate-600 text-[11px]">{item.treatment.prevention[0]}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredDiseases.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No matching diseases found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or crop filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}