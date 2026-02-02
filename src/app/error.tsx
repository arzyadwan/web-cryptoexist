'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Di production, Anda bisa kirim error ini ke Sentry/LogRocket
    console.error('Runtime Error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Terjadi Kesalahan Sistem</h2>
      
      <p className="text-gray-600 max-w-md mb-8">
        Maaf, kami mengalami kendala saat memuat halaman ini. Tim teknis kami mungkin sudah mengetahuinya.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Kembali ke Home
        </button>
        
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Coba Muat Ulang
        </button>
      </div>
    </div>
  )
}