import { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, RefreshCw } from 'lucide-react';

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
        Upload Plant Image
      </h2>

      {!preview ? (
        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[200px]"
          >
            <UploadCloud className="h-12 w-12 text-emerald-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click or drag image here to upload</p>
            <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <ImageIcon size={18} /> Choose Gallery
            </button>
            <button
              onClick={() => cameraInputRef.current.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
            >
              <Camera size={18} /> Open Camera
            </button>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <input 
            type="file" 
            ref={cameraInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden max-h-64 bg-slate-900">
            <img src={preview} alt="Selected Leaf" className="w-full h-full object-contain mx-auto" />
          </div>
          <button
            onClick={clearSelection}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition"
          >
            <RefreshCw size={16} /> Choose Different Image
          </button>
        </div>
      )}
    </div>
  );
}