import { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import CameraModal from './CameraModal';

export default function ImageUploader({ onImageSelected, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    setPreview(URL.createObjectURL(file));
    onImageSelected(file);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="space-y-4">
          <img src={preview} alt="Selected Leaf" className="max-h-64 mx-auto rounded-xl object-cover shadow-sm" />
          <div className="flex justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200"
            >
              Upload Different Image
            </button>
            <button
              onClick={() => setIsCameraOpen(true)}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              Use Camera
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 py-6">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-5 py-3 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Upload Image File
            </button>
            <button
              onClick={() => setIsCameraOpen(true)}
              disabled={isLoading}
              className="px-5 py-3 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <Camera className="w-4 h-4" />
              Take Live Photo
            </button>
          </div>
          <p className="text-slate-400 text-xs">Supports JPG, PNG up to 10MB</p>
        </div>
      )}

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={processFile}
      />
    </div>
  );
}