import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Kolom 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Crypto News</h3>
            <p className="text-sm text-slate-400">
              Portal berita crypto terdepan dengan data pasar real-time dan jurnalisme berkelas.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="text-white font-bold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/news" className="hover:text-white transition">Berita Terbaru</Link></li>
              <li><Link href="/market" className="hover:text-white transition">Data Pasar</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Perusahaan */}
          <div>
            <h4 className="text-white font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Kontak</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Social (Placeholder) */}
          <div>
            <h4 className="text-white font-bold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              {/* Icon placeholder */}
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">X</div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">IG</div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">YT</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          © {currentYear} Crypto News Portal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}