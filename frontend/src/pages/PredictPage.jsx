import { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Upload, Leaf, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, Droplets, Sprout, ShieldAlert } from 'lucide-react'
import { predictAPI } from '../services/api'
import ChatAssistant from '../components/ChatAssistant'
import ReportButton from '../components/ReportButton'

export default function PredictPage() {
  const location = useLocation()
  const fileInputRef = useRef(null)
  const reportRef = useRef(null)

  const initialScan = location.state?.scan || null
  const initialPreview = initialScan?.imageUrl
    ? initialScan.imageUrl.startsWith('http')
      ? initialScan.imageUrl
      : `http://localhost:8000${initialScan.imageUrl}`
    : ''

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(initialPreview)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(initialScan)

  const handleFileSelect = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).')
      return
    }

    setError('')
    setResult(null)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleScan = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await predictAPI.scanLeaf(formData)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze the leaf image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setResult(null)
    setError('')
  }

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Computer Vision Diagnostic Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Leaf Disease Scanner
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Upload a clear photograph of an infected leaf to receive disease identification and tailored treatment plans.
        </p>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={result ? "lg:col-span-5" : "w-full max-w-2xl mx-auto lg:col-span-12"}>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            {!previewUrl ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 rounded-xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[280px]"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Click to upload or drag & drop leaf photo
                </p>
                <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-slate-900 max-h-[380px] flex items-center justify-center">
                  <img src={previewUrl} alt="Leaf Preview" className="w-full object-cover max-h-[380px]" />
                  {loading && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                      <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
                      <p className="font-semibold text-sm">Analyzing Leaf Tissue...</p>
                      <p className="text-xs text-slate-300 mt-1">Running deep learning classification model</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {!result ? (
                    <button
                      onClick={handleScan}
                      disabled={loading}
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Leaf className="w-4 h-4" />
                      <span>Diagnose Crop Health</span>
                    </button>
                  ) : null}

                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>New Scan</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-end">
              <ReportButton scan={result} reportRef={reportRef} />
            </div>

            <div ref={reportRef} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Crop</span>
                  <h2 className="text-2xl font-bold text-slate-900">{result.crop}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      result.isHealthy
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {result.isHealthy ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    <span>{result.isHealthy ? 'Healthy Plant' : 'Infection Detected'}</span>
                  </div>

                  <div className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
                    Confidence: {result.confidence}%
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 mb-1">Diagnosis</h3>
                <p className="text-xl font-bold text-slate-800">{result.disease}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{result.description}</p>
              </div>

              {result.treatment && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Recommended Treatment Protocol</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.treatment.chemical && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                        <div className="flex items-center gap-2 text-rose-700 text-xs font-bold mb-2">
                          <Droplets className="w-4 h-4" />
                          <span>Chemical Controls</span>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                          {result.treatment.chemical.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.treatment.organic && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mb-2">
                          <Sprout className="w-4 h-4" />
                          <span>Organic Solutions</span>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                          {result.treatment.organic.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.treatment.prevention && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                        <div className="flex items-center gap-2 text-sky-700 text-xs font-bold mb-2">
                          <ShieldAlert className="w-4 h-4" />
                          <span>Prevention Strategy</span>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                          {result.treatment.prevention.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ChatAssistant crop={result.crop} disease={result.disease} />
          </div>
        )}
      </div>
    </div>
  )
}