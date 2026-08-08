import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);

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

        <ImageUploader onImageSelect={setSelectedFile} />

        {selectedFile && (
          <p className="text-center text-xs text-slate-500 mt-4">
            Ready to analyze: {selectedFile.name}
          </p>
        )}
      </main>
    </div>
  );
}