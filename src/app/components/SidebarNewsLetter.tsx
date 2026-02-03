import { Send, ShieldCheck } from 'lucide-react'

export default function SidebarNewsletter() {
  return (
    <div className="relative bg-yellow-400 p-8 rounded-[2.5rem] border-2 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden group">
      {/* Dekorasi Grid Halus khas Terminal */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', size: '20px 20px', backgroundSize: '12px 12px' }}>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex justify-center mb-4">
          <div className="bg-black text-yellow-400 p-3 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
            <Send size={24} strokeWidth={3} />
          </div>
        </div>

        <h3 className="font-[1000] text-black text-2xl uppercase mb-2 leading-[0.9] tracking-tighter text-center">
          Market <br /> <span className="text-3xl">Intelligence</span>
        </h3>
        
        <p className="text-[11px] text-black/70 font-black mb-6 text-center uppercase tracking-widest leading-relaxed">
          Dapatkan sinyal trading & berita <br /> insider langsung di inbox.
        </p>

        {/* Form Section */}
        <div className="space-y-3">
          <div className="relative">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="w-full bg-white/50 border-2 border-zinc-900 text-black px-4 py-3 rounded-2xl text-[11px] font-black placeholder:text-zinc-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/5 transition-all" 
            />
          </div>
          
          <button className="w-full bg-black hover:bg-zinc-800 text-yellow-400 font-[1000] py-4 rounded-2xl uppercase text-[12px] tracking-[0.2em] shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            JOIN DISPATCH
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-black text-black/40 uppercase tracking-tighter">
          <ShieldCheck size={12} strokeWidth={3} />
          <span>No Spam. High Signal Only.</span>
        </div>
      </div>

      {/* Efek Cahaya saat Hover */}
      <div className="absolute -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
    </div>
  )
}