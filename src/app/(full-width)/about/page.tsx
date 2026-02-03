import { ShieldCheck, Zap, Fingerprint, Users, EyeOff } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'Agency Profile | Visi & Standar Editorial',
  description: 'Mengenal standar jurnalisme tanpa kompromi dan tim analis CryptoMedia.',
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      {/* 1. Hero Section - The Manifesto Header */}
      <section className="bg-zinc-900 py-24 md:py-32 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-md text-[10px] font-[1000] uppercase tracking-[0.4em] shadow-xl">
             Intelligence Integrity
          </div>
          <h1 className="text-5xl md:text-8xl font-[1000] text-white leading-[0.9] tracking-tighter uppercase italic">
            DATA-DRIVEN.<br />
            <span className="text-yellow-400">NO HYPE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-bold leading-relaxed uppercase tracking-tight">
            CryptoMedia hadir untuk menghancurkan kebisingan spekulatif dengan jurnalisme berbasis data dan transparansi radikal.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 space-y-24">
        
        {/* 2. Pillars of Operation - Grid Values */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            { 
                title: "Verifikasi Berlapis", 
                desc: "Setiap laporan intelijen melewati 2 lapis pengecekan editor senior sebelum dipublikasikan.",
                icon: <Fingerprint className="text-yellow-500" size={24} />
            },
            { 
                title: "Independensi Total", 
                desc: "Kami menolak 100% bayaran untuk liputan berita organik. Otoritas kami tidak bisa dibeli.",
                icon: <EyeOff className="text-yellow-400" size={24} />
            },
            { 
                title: "Technical Focus", 
                desc: "Kami membedah kode dan ekonomi di balik proyek, bukan hanya mengikuti grafik harga.",
                icon: <Zap className="text-yellow-500" size={24} fill="currentColor" />
            }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2rem] border-2 border-zinc-100 bg-white hover:border-black hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
              <div className="mb-6">{item.icon}</div>
              <h3 className="font-[1000] text-xl mb-3 uppercase tracking-tighter text-black">{item.title}</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 3. Editorial Board - High Profile Grid */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b-4 border-black pb-6">
            <Users size={28} />
            <h2 className="text-4xl font-[1000] uppercase tracking-tighter text-black">Dewan <span className="text-zinc-300">Redaksi</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Adrian Zed", role: "Editor In Chief", exp: "Ex-Bloomberg Tech, 12Y Experience" },
              { name: "Sarah Volkov", role: "Lead On-Chain Analyst", exp: "PhD Economics, Blockchain Specialist" }
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-colors">
                <div className="relative w-24 h-24 flex-shrink-0 bg-zinc-300 rounded-2xl overflow-hidden border-2 border-black rotate-3 group-hover:rotate-0 transition-transform">
                    {/* Placeholder for images */}
                    <div className="flex items-center justify-center h-full text-zinc-400 font-black text-2xl">
                        {member.name.charAt(0)}
                    </div>
                </div>
                <div>
                  <h4 className="font-black text-xl text-black uppercase tracking-tight">{member.name}</h4>
                  <p className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-2">{member.role}</p>
                  <p className="text-xs text-zinc-500 font-bold uppercase">{member.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Radical Disclosure - Pro Disclaimer */}
        <section className="relative group">
          <div className="absolute -inset-2 bg-yellow-400 rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-zinc-900 p-10 md:p-16 rounded-[2.5rem] border-2 border-black text-zinc-400">
            <div className="flex items-center gap-3 mb-6 text-white">
              <ShieldCheck size={28} className="text-yellow-400" />
              <h4 className="font-[1000] text-2xl uppercase tracking-tighter italic">Transparency Disclosure</h4>
            </div>
            <div className="space-y-4 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Penulis dan editor CryptoMedia tunduk pada protokol kepatuhan aset yang ketat. Anggota tim kami wajib melaporkan kepemilikan aset kripto dan dilarang melakukan trading berdasarkan informasi "embargo" sebelum dipublikasikan.
              </p>
              <p className="text-white font-bold italic">
                Peringatan: Seluruh konten di platform ini disediakan murni sebagai intelijen pasar dan bukan merupakan nasihat keuangan (Financial Advice).
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
               <span>Verified Agency</span>
               <span className="text-yellow-400">Last Audit: 2026</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}