import { useState, useEffect } from 'react'
import { Clock, Leaf, AlertTriangle, CheckCircle2, RefreshCw, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { predictAPI } from '../services/api'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadHistory = async () => {
      try {
        const res = await predictAPI.getHistory()
        if (isMounted) {
          setHistory(res.data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.detail || 'Failed to load scan history.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadHistory()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 max-w-2xl mx-auto text-center">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Diagnostic Records</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Scan History
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Review your past leaf scans, diagnostic outcomes, and confidence scores.
          </p>
        </div>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-xl mx-auto">
          <Leaf className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Scans Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            You haven't performed any leaf scans yet.
          </p>
          <button
            onClick={() => navigate('/predict')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Start First Scan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, index) => {
            const dateValue = item.createdAt || item.created_at
            const fullImageUrl = item.imageUrl
              ? item.imageUrl.startsWith('http')
                ? item.imageUrl
                : `http://localhost:8000${item.imageUrl}`
              : null

            return (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {fullImageUrl && (
                    <img
                      src={fullImageUrl}
                      alt={item.disease}
                      className="w-full h-40 object-cover rounded-xl mb-4 border border-slate-100"
                    />
                  )}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      {item.crop || 'Unknown Crop'}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {dateValue ? new Date(dateValue).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      {item.isHealthy ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <h3 className="text-base font-bold text-slate-900">{item.disease}</h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between py-2 border-t border-slate-100 text-xs mb-3">
                    <span className="text-slate-500 font-medium">Confidence</span>
                    <span className="font-bold text-slate-800">{item.confidence}%</span>
                  </div>

                  <button
                    onClick={() => navigate('/predict', { state: { scan: item } })}
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>View & Chat Assistant</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}