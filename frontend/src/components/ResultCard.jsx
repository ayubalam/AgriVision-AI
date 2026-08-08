import { ShieldAlert } from 'lucide-react';

export default function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg text-center mt-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-3"></div>
        <p className="text-slate-600 text-sm font-medium">Analyzing leaf image with AI model...</p>
      </div>
    );
  }

  if (!result) return null;

  const { class_name, confidence, severity, description, treatment } = result;

  const severityColors = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-amber-100 text-amber-700 border-amber-300',
    None: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mt-6 space-y-4">
      <div className="flex items-start justify-between border-b pb-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{class_name}</h3>
          <p className="text-xs text-slate-500 mt-1">
            Confidence: <span className="font-semibold text-emerald-600">{(confidence * 100).toFixed(1)}%</span>
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${severityColors[severity] || severityColors.None}`}>
          {severity} Severity
        </span>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <ShieldAlert size={16} className="text-emerald-600" /> Recommended Actions:
        </h4>
        <ul className="space-y-1.5 pl-2">
          {treatment.map((step, idx) => (
            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}