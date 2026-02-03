import Link from 'next/link'
import { Twitter, Instagram, Youtube, ArrowUpRight, Zap } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-zinc-400 py-16 mt-20 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Brand & Mission - Dominasi Kolom */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-yellow-400 p-1.5 rounded-lg">
                <Zap size={24} fill="black" className="text-black" />
              </div>
              <span className="text-2xl font-[1000] uppercase tracking-tighter text-white">
                CRYPTO<span className="text-yellow-400">MEDIA</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-medium">
              Otoritas berita kripto global. Memberikan intelijen pasar, analisis teknis mendalam, dan jurnalisme tanpa kompromi untuk investor serius.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={18} />, label: 'X' },
                { icon: <Instagram size={18} />, label: 'IG' },
                { icon: <Youtube size={18} />, label: 'YT' }
              ].map((social) => (
                <Link 
                  key={social.label} 
                  href="#" 
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links - Grid Layout */}
          <div className="md:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Navigasi</h4>
            <ul className="space-y-4">
              {['Home', 'Latest Pulse', 'Market Data', 'Events'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold hover:text-yellow-400 transition-colors flex items-center gap-1 group">
                    {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Sektor</h4>
            <ul className="space-y-4">
              {['Bitcoin', 'Ethereum', 'DeFi', 'Regulation'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold hover:text-yellow-400 transition-colors uppercase tracking-tighter italic">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Terminal Status - Detail Teknis */}
          <div className="md:col-span-4 bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistem Status
            </h4>
            <div className="space-y-4 text-[11px] font-mono">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500 uppercase">Market Feed</span>
                <span className="text-emerald-500 font-bold">OPERATIONAL</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500 uppercase">Intelligence API</span>
                <span className="text-emerald-500 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Last Sync</span>
                <span className="text-white">JUST NOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <p>© {currentYear} CRYPTO MEDIA TERMINAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 text-zinc-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}