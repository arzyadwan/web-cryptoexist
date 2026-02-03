import { Mail, FileText, BarChart3, Send, Shield } from 'lucide-react';

export const metadata = {
  title: "Contact Node | Hubungi Redaksi & Partnership",
  description: "Terminal komunikasi untuk intelijen berita dan inquiry periklanan.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Kolom Kiri: Info & Channels (Grid 5) */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.3em]">
               Channel Open
            </div>
            <h1 className="text-5xl md:text-7xl font-[1000] text-black uppercase tracking-tighter leading-none italic">
              Get In <br /> <span className="text-zinc-300">Touch.</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest leading-relaxed max-w-sm">
              Gunakan jalur komunikasi yang tepat untuk respon lebih cepat. Tim kami aktif 24/7 di pasar global.
            </p>
          </div>

          <div className="space-y-4">
            {/* Advertising Card */}
            <div className="group p-8 border-2 border-zinc-900 rounded-[2rem] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
              <div className="bg-zinc-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                <BarChart3 size={24} className="text-black" />
              </div>
              <h3 className="font-[1000] text-xl mb-2 uppercase tracking-tighter">Advertise / Media Partner</h3>
              <p className="text-zinc-500 text-sm font-medium mb-4 italic">
                Akses audiens investor kripto berkualitas tinggi.
              </p>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black group-hover:text-yellow-600 transition-colors">
                Download Media Kit <Send size={12} />
              </span>
            </div>

            {/* PR Card */}
            <div className="group p-8 border-2 border-zinc-100 rounded-[2rem] bg-zinc-50 hover:bg-white hover:border-zinc-900 hover:shadow-[8px_8px_0px_0px_rgba(247,147,26,1)] transition-all cursor-pointer">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-zinc-200 group-hover:bg-black group-hover:text-yellow-400 transition-all">
                <FileText size={24} />
              </div>
              <h3 className="font-[1000] text-xl mb-2 uppercase tracking-tighter">Submit Press Release</h3>
              <p className="text-zinc-500 text-sm font-medium mb-4">
                Punya data atau berita penting? Kirimkan ke meja redaksi.
              </p>
              <span className="text-[11px] font-black uppercase tracking-widest text-black underline decoration-yellow-400 decoration-2 underline-offset-4">
                pr@cryptomedia.com
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form (Grid 7) */}
        <div className="lg:col-span-7 bg-zinc-900 p-8 md:p-12 rounded-[3rem] border-2 border-black shadow-2xl relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Send size={120} strokeWidth={3} className="text-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-10 w-2 bg-yellow-400"></div>
              <h3 className="text-3xl font-[1000] text-white uppercase tracking-tighter">Secure Message</h3>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Nama Lengkap</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-800 border-2 border-zinc-700 text-white px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="ENTER NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">System Email</label>
                  <input
                    type="email"
                    className="w-full bg-zinc-800 border-2 border-zinc-700 text-white px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="USER@DOMAIN.COM"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Kebutuhan / Subject</label>
                <select className="w-full bg-zinc-800 border-2 border-zinc-700 text-white px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] focus:border-yellow-400 focus:outline-none appearance-none cursor-pointer">
                  <option>Advertising / Sponsorship</option>
                  <option>Editorial Inquiry</option>
                  <option>Report Node Error (Bug)</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Intelligence Report (Pesan)</label>
                <textarea
                  rows={5}
                  className="w-full bg-zinc-800 border-2 border-zinc-700 text-white px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Shield size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encryption Enabled</span>
                </div>
                <button className="w-full md:w-auto bg-yellow-400 text-black px-12 py-5 rounded-2xl font-[1000] uppercase text-xs tracking-[0.3em] shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:bg-white transition-all active:scale-95">
                  Send Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}