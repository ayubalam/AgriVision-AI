import { useEffect, useState } from 'react';
import API from '../api/client';

export default function HistoryTable() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/scans')
      .then((res) => setScans(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-xs text-slate-500 py-4">Loading history...</p>;
  if (!scans.length) return <p className="text-center text-xs text-slate-400 py-4">No scan history available yet.</p>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-bold text-slate-800 text-sm">Recent Disease Scans</h3>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-slate-50 text-slate-500 font-semibold border-b">
          <tr>
            <th className="p-3">Disease Name</th>
            <th className="p-3">Severity</th>
            <th className="p-3">Confidence</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {scans.map((scan, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="p-3 font-medium">{scan.class_name}</td>
              <td className="p-3">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  scan.severity === 'High' ? 'bg-red-100 text-red-600' :
                  scan.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {scan.severity}
                </span>
              </td>
              <td className="p-3">{(scan.confidence * 100).toFixed(1)}%</td>
              <td className="p-3 text-slate-400">{new Date(scan.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}