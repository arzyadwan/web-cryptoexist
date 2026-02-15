import Link from 'next/link'
import { Twitter, Instagram, Youtube, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-16 mt-20 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Kolom 1: Brand & Newsletter (4 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div>
               <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-8 bg-yellow-400 block"></span>
                  Crypto News
               </h3>
               <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                 Portal berita crypto terdepan dengan data pasar real-time dan jurnalisme berkelas. Data Driven. No Hype.
               </p>
            </div>
            
            {/* Embedded Footer Newsletter */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
               <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Subscribe Newsletter</h4>
               <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-black border border-gray-700 text-white px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-yellow-400"
                  />
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                     <Send size={18} />
                  </button>
               </div>
            </div>
          </div>

          {/* Kolom 2: Navigasi (2 cols) */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-yellow-400">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link href="/news" className="hover:text-yellow-400 transition-colors">Latest News</Link></li>
              <li><Link href="/market" className="hover:text-yellow-400 transition-colors">Market Data</Link></li>
              <li><Link href="/events" className="hover:text-yellow-400 transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Perusahaan (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-yellow-400">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Social (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-yellow-400">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition-all">
                <Youtube size={18} />
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-500">
               Follow us for real-time updates and community discussions.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {currentYear} Crypto News Portal. All rights reserved.</p>
          <div className="flex gap-6">
             <span>Jakarta, Indonesia</span>
             <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}