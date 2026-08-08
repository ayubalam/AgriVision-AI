import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import API from './api/client';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageAnalyze = async (file) => {
    if (!file) {
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await API.post('/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze image. Please ensure Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            AI-Powered Crop Health Analysis
          </h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Upload a leaf photo to detect plant diseases instantly with organic and chemical treatment advice.
          </p>
        </header>

        <ImageUploader onImageSelect={handleImageAnalyze} />

        {error && (
          <div className="w-full max-w-lg mx-auto mt-4 p-3 bg-red-50 text-red-600 text-xs text-center rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <ResultCard result={result} loading={loading} />
      </main>
    </div>
  );
}