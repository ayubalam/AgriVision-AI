import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">404</h1>
        <p className="text-base font-semibold text-slate-800 mt-1">Page Not Found</p>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-emerald-600/20"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}