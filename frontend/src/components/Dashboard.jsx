import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, PieChart } from 'lucide-react';
import API from '../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/scans/stats')
      .then((res) => setStats(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-xs text-slate-500 py-8">Loading analytics...</p>;
  if (!stats) return null;

  const total = stats.total_scans || 1;
  const highPct = Math.round((stats.high_severity / total) * 100);
  const medPct = Math.round((stats.medium_severity / total) * 100);
  const lowPct = Math.round((stats.low_severity / total) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Scans</p>
            <h4 className="text-2xl font-bold text-slate-800">{stats.total_scans}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">High Risk Alerts</p>
            <h4 className="text-2xl font-bold text-slate-800">{stats.high_severity}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Top Issue Identified</p>
            <h4 className="text-sm font-bold text-slate-800 truncate max-w-[140px]">{stats.top_disease}</h4>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-600" />
          Severity Breakdown
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1 font-medium">
              <span className="text-red-600">High Severity ({stats.high_severity})</span>
              <span className="text-slate-500">{highPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${highPct}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 font-medium">
              <span className="text-amber-600">Medium Severity ({stats.medium_severity})</span>
              <span className="text-slate-500">{medPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${medPct}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1 font-medium">
              <span className="text-emerald-600">Low Severity / Healthy ({stats.low_severity})</span>
              <span className="text-slate-500">{lowPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${lowPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}