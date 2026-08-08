import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h1>
      <p className="text-slate-600 text-sm max-w-sm mb-6">
        The requested page does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
      >
        <Home className="w-4 h-4" /> Return to Home
      </Link>
    </div>
  )
}