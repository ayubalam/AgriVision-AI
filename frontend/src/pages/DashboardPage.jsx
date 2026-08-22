import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { predictAPI } from '../services/api'
import { LayoutDashboard, CheckCircle2, AlertTriangle, Scan, ArrowRight, ShieldCheck } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalScans: 0,
    healthyScans: 0,
    infectedScans: 0,
    topDiseases: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await predictAPI.getAnalytics()
        setStats(res.data)
      } catch (err) {
        console.error('Failed to fetch analytics:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 text-sm">
        Loading analytics dashboard...
      </div>
    )
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-500 text-xs mt-1">
            Real-time overview of diagnostic tasks and plant health metrics.
          </p>
        </div>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-xs w-fit"
        >
          <Scan className="w-4 h-4" />
          <span>New Leaf Scan</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Scans</span>
            <p className="text-2xl font-bold text-slate-900">{stats.totalScans}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Healthy Plants</span>
            <p className="text-2xl font-bold text-emerald-600">{stats.healthyScans}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Infections Detected</span>
            <p className="text-2xl font-bold text-amber-600">{stats.infectedScans}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Top Detected Diseases</h2>
          <Link to="/history" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.topDiseases.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-xs flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            <span>No infection data recorded yet. Upload a scan to start tracking.</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {stats.topDiseases.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">{item.disease}</span>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 font-bold rounded-full">
                  {item.count} {item.count === 1 ? 'case' : 'cases'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}