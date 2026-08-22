import { useRef, useState, useEffect } from 'react'
import { Camera, RefreshCw, X, Check } from 'lucide-react'

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [hasStream, setHasStream] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [cameraError, setCameraError] = useState('')

  useEffect(() => {
    let isMounted = true

    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        })

        if (!isMounted) {
          mediaStream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = mediaStream
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        setHasStream(true)
      } catch (err) {
        if (isMounted) {
          console.error('Camera access error:', err)
          setCameraError('Unable to access camera. Please check camera permissions.')
        }
      }
    }

    initCamera()

    return () => {
      isMounted = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setHasStream(false)
    }
  }

  const restartCamera = async () => {
    stopCamera()
    setCameraError('')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = mediaStream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setHasStream(true)
    } catch (err) {
      console.error('Camera access error:', err)
      setCameraError('Unable to access camera. Please check camera permissions.')
    }
  }

  const takeSnapshot = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const context = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setCapturedImage(imageDataUrl)
  }

  const retake = () => {
    setCapturedImage(null)
    restartCamera()
  }

  const confirmCapture = () => {
    if (!capturedImage) return

    fetch(capturedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `live_scan_${Date.now()}.jpg`, { type: 'image/jpeg' })
        stopCamera()
        onCapture(file, capturedImage)
      })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Live Leaf Scanner</h3>
          </div>
          <button
            onClick={() => {
              stopCamera()
              onClose()
            }}
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-950 flex justify-center items-center relative min-h-[300px]">
          {cameraError ? (
            <p className="text-rose-400 text-xs text-center p-6">{cameraError}</p>
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured leaf" className="max-h-[350px] w-full object-contain rounded-lg" />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="max-h-[350px] w-full object-cover rounded-lg"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="p-4 bg-slate-50 flex items-center justify-center gap-3">
          {capturedImage ? (
            <>
              <button
                onClick={retake}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={confirmCapture}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Use Photo
              </button>
            </>
          ) : (
            <button
              onClick={takeSnapshot}
              disabled={!!cameraError || !hasStream}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}