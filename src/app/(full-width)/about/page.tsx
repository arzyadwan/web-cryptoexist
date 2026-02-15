import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Globe, 
  Users, 
  Mic, 
  TrendingUp, 
  Zap, 
  Handshake, 
  ShieldCheck 
} from "lucide-react";

export const metadata = {
  title: "About Us | CryptoMedia Intelligence",
  description: "Platform media crypto independen yang menjembatani informasi dan kecerdasan pasar.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      
      {/* 1️⃣ HERO SECTION: Dark Mode, High Impact */}
      <section className="relative bg-zinc-950 text-white py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Accents (Web3 Feel) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
            EST. 2024 • Jakarta, Indonesia
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            We Decode the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Future of Money.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            CryptoMedia adalah platform intelijen pasar independen. Kami bukan sekadar memberitakan harga, 
            tapi menyajikan konteks, analisis, dan ekosistem di balik revolusi Web3.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded transition-transform hover:-translate-y-1">
              Partner With Us
            </Link>
            <Link href="/news" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-wider rounded transition-colors">
              Read Our Insight
            </Link>
          </div>
        </div>
      </section>

      {/* 2️⃣ SOCIAL PROOF STRIP (Credibility) */}
      <section className="border-b border-gray-100 bg-white relative z-10 -mt-8 mx-4 md:mx-12 rounded-xl shadow-xl p-8 lg:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Monthly Readers", value: "50K+" },
          { label: "Community Members", value: "12K+" },
          { label: "Events Hosted", value: "25+" },
          { label: "Official Partners", value: "40+" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.value}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3️⃣ WHO WE ARE (Asymmetric Layout) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 uppercase">The Trusted Voice <br/> in a Noisy Market.</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Di tengah kebisingan informasi crypto yang seringkali bias dan spekulatif, 
                <span className="font-bold text-gray-900"> CryptoMedia </span> hadir sebagai filter. 
                Kami menggabungkan jurnalisme data dengan wawasan komunitas.
              </p>
              <p>
                Misi kami sederhana: Memberdayakan investor ritel dan institusi dengan informasi 
                yang dapat dipertanggungjawabkan (accountable) dan dapat ditindaklanjuti (actionable).
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex gap-4 items-start">
                 <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><ShieldCheck /></div>
                 <div>
                    <h4 className="font-bold text-gray-900">Independent</h4>
                    <p className="text-sm text-gray-500">Bebas dari intervensi proyek scam.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Zap /></div>
                 <div>
                    <h4 className="font-bold text-gray-900">Data-Driven</h4>
                    <p className="text-sm text-gray-500">Analisis berbasis on-chain data.</p>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Visual Collage */}
          <div className="relative h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Placeholder Image - Ganti dengan foto tim/kantor/event asli */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-500">
               <span className="text-sm uppercase font-bold">[Image: Team Working / Office Vibe]</span>
            </div>
            {/* Floating Card Accent */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs border-l-4 border-yellow-400">
               <p className="font-bold text-gray-900 italic">&quot;Crypto is not just about price, it&apos;s about the people building it.&quot;</p>
               <p className="text-xs text-gray-400 mt-2 font-bold uppercase">- Founder Message</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ WHAT WE DO (Bento Grid) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Our Ecosystem</h2>
            <p className="text-gray-500">Lebih dari sekadar portal berita, kami membangun infrastruktur informasi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Card 1: News (Large) */}
             <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Market Intelligence & News</h3>
                <p className="text-gray-500 leading-relaxed">
                  Menyajikan berita *breaking* 24/7, analisis teknikal mendalam, dan laporan investigasi mengenai pergerakan pasar crypto global dan lokal.
                </p>
             </div>

             {/* Card 2: Community */}
             <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-800 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20"></div>
                <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Community</h3>
                <p className="text-gray-400 text-sm">
                  Hub bagi ribuan trader dan builder untuk berdiskusi, berbagi sinyal, dan belajar bersama.
                </p>
             </div>

             {/* Card 3: Events */}
             <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Mic size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Events & Activation</h3>
                <p className="text-gray-500 text-sm">
                  Menyelenggarakan meetup, webinar, dan konferensi untuk edukasi massa.
                </p>
             </div>

             {/* Card 4: Consulting */}
             <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 group flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Handshake size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">B2B Partnership & Media Buying</h3>
                  <p className="text-gray-500 text-sm">
                    Membantu brand Web2 dan Web3 menjangkau audiens crypto yang tepat melalui strategi media terukur.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ PORTFOLIO / EVENTS (Bukti Nyata) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Track Record</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase mt-2">Recent Activities</h2>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 font-bold hover:text-blue-600 transition">
               See All Events <ArrowRight size={18}/>
            </Link>
         </div>

         {/* Event Cards Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
               {/* Placeholder Image */}
               <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700">
                  {/* Ganti dengan Image asli */}
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
               
               <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                     Conference
                  </span>
                  <h3 className="text-white text-xl font-bold leading-tight mb-2">Indonesia Web3 Summit 2024</h3>
                  <p className="text-gray-300 text-xs line-clamp-2 mb-4">
                     Menghadirkan 50+ pembicara internasional dan 2000+ peserta di Jakarta.
                  </p>
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border-t border-white/20 pt-4">
                     View Recap <ArrowRight size={14} />
                  </div>
               </div>
            </div>

            {/* Event 2 */}
            <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
               <div className="absolute inset-0 bg-gray-700 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
               <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="bg-purple-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                     Workshop
                  </span>
                  <h3 className="text-white text-xl font-bold leading-tight mb-2">Crypto Trading Masterclass</h3>
                  <p className="text-gray-300 text-xs line-clamp-2 mb-4">
                     Edukasi teknikal analisis untuk pemula bersama trader profesional.
                  </p>
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border-t border-white/20 pt-4">
                     View Recap <ArrowRight size={14} />
                  </div>
               </div>
            </div>

            {/* Event 3 */}
            <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
               <div className="absolute inset-0 bg-gray-600 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
               <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                     Meetup
                  </span>
                  <h3 className="text-white text-xl font-bold leading-tight mb-2">Bitcoin Pizza Day Jakarta</h3>
                  <p className="text-gray-300 text-xs line-clamp-2 mb-4">
                     Networking casual bersama komunitas holder BTC lokal.
                  </p>
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border-t border-white/20 pt-4">
                     View Recap <ArrowRight size={14} />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6️⃣ PARTNERSHIP (Grayscale to Color) */}
      <section className="py-24 bg-zinc-950 text-white border-y border-zinc-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-400 mb-12 uppercase tracking-widest">Trusted By Industry Leaders</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center opacity-80">
               {/* Logo Placeholders - Ganti dengan Logo SVG Asli */}
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <div key={item} className="h-12 bg-white/10 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer hover:bg-white/20">
                     <span className="text-xs font-bold text-white/50">PARTNER LOGO {item}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7️⃣ CTA SECTION (Final Push) */}
      <section className="py-32 bg-white relative overflow-hidden">
         {/* Decorative Blob */}
         <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

         <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900 leading-tight">
               Ready to Shape the <br/> Future of Web3?
            </h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
               Baik Anda pembaca yang mencari kebenaran atau brand yang mencari audiens, tempat Anda ada di sini.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/news" className="px-10 py-5 bg-black text-white font-black uppercase tracking-wider rounded-xl hover:bg-gray-800 transition shadow-xl hover:shadow-2xl">
                  Start Reading
               </Link>
               <Link href="/contact" className="px-10 py-5 bg-white text-black border-2 border-black font-black uppercase tracking-wider rounded-xl hover:bg-gray-50 transition shadow-sm hover:shadow-md">
                  Collaborate
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}