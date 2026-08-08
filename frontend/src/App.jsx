import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import HistoryTable from './components/HistoryTable';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext';
import API from './api/client';
import { LayoutDashboard, Scan } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('scan');
  const { user } = useAuth();

  const handleImageSelected = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await API.post('/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        {user && (
          <div className="flex justify-center border-b border-slate-200">
            <button
              onClick={() => setActiveTab('scan')}
              className={`pb-3 px-6 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'scan'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Scan className="w-4 h-4" />
              Disease Scanner
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-3 px-6 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Analytics Dashboard
            </button>
          </div>
        )}

        {activeTab === 'scan' ? (
          <>
            <section className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                AI-Powered Plant Disease Detection
              </h1>
              <p className="text-slate-600 text-sm max-w-lg mx-auto">
                Upload a plant leaf photo or use live camera capture to instantly identify plant health issues.
              </p>
            </section>

            <ImageUploader onImageSelected={handleImageSelected} isLoading={loading} />

            {error && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            <ResultCard result={result} />

            {user && <HistoryTable />}
          </>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}