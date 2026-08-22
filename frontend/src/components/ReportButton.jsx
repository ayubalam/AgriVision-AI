import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

const ReportButton = ({ scan, reportRef }) => {
  const [downloading, setDownloading] = useState(false);

  const generatePDF = async () => {
    if (!reportRef.current || downloading) return;
    setDownloading(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${scan.crop}_${scan.disease}_Report.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF report:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={downloading}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
    >
      <Download className="w-4 h-4" />
      <span>{downloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
    </button>
  );
};

export default ReportButton;