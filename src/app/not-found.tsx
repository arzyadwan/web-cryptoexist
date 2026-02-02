import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
      <FileQuestion className="w-24 h-24 text-gray-300 mb-6" />
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Artikel atau halaman yang Anda cari mungkin sudah dihapus, dipindahkan, atau link yang Anda tuju salah.
      </p>
      
      <Link 
        href="/"
        className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}