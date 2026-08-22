import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { RotateCw, Check, X, Crop } from 'lucide-react'

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => { image.onload = resolve })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-safeArea / 2, -safeArea / 2)

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )

  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], `cropped_leaf_${Date.now()}.jpg`, { type: 'image/jpeg' })
      const previewUrl = URL.createObjectURL(blob)
      resolve({ file, previewUrl })
    }, 'image/jpeg', 0.95)
  })
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropChange = (newCrop) => setCrop(newCrop)
  const onZoomChange = (newZoom) => setZoom(newZoom)

  const onCropCompleteHandler = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleSave = async () => {
    if (!croppedAreaPixels) return
    const { file, previewUrl } = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
    onCropComplete(file, previewUrl)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Crop & Adjust Leaf Photo</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full h-72 bg-slate-950">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="p-4 bg-slate-50 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 w-12">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Rotate 90°
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}