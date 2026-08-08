import { Download, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import jsPDF from 'jspdf';

export default function ResultCard({ result }) {
  if (!result) return null;

  const { class_name, confidence, severity, recommendation } = result;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header / Title Banner
    doc.setFillColor(16, 185, 129); // Emerald color
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AgriVision AI Diagnostic Report', 14, 20);

    // Metadata
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 40);

    // Disease Name Section
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Detected Condition:', 14, 52);
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129);
    doc.text(class_name, 14, 62);

    // Analysis Metrics
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text('Analysis Summary:', 14, 78);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`* Confidence Score: ${(confidence * 100).toFixed(1)}%`, 20, 88);
    doc.text(`* Severity Level: ${severity}`, 20, 96);

    // Treatment Recommendations
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Recommended Action Plan:', 14, 112);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    
    // Wrap recommendation text to fit page width
    const splitText = doc.splitTextToSize(recommendation, 180);
    doc.text(splitText, 14, 122);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('AgriVision AI - Automated Plant Health Analysis System', 14, 280);

    // Trigger Download
    doc.save(`AgriVision_Report_${class_name.replace(/\s+/g, '_')}.pdf`);
  };

  const getSeverityBadge = () => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" /> High Severity
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            <AlertCircle className="w-3.5 h-3.5" /> Medium Severity
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Low Severity
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Diagnosis</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">{class_name}</h2>
        </div>
        {getSeverityBadge()}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-50 p-3 rounded-xl">
          <p className="text-xs text-slate-400 font-medium">Confidence</p>
          <p className="text-lg font-extrabold text-slate-800">{(confidence * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl">
          <p className="text-xs text-slate-400 font-medium">Severity</p>
          <p className="text-lg font-extrabold text-slate-800">{severity}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recommended Treatment</h4>
        <p className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl leading-relaxed">
          {recommendation}
        </p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
      >
        <Download className="w-4 h-4" />
        Export PDF Scan Report
      </button>
    </div>
  );
}