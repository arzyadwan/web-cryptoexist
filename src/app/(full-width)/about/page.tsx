import Image from 'next/image'
import { Briefcase, Twitter, Linkedin, Facebook, Coffee, Smile, Star } from 'lucide-react'

export const metadata = {
  title: 'Tentang Kami | Redaksi & Visi',
  description: 'Mengenal standar jurnalisme dan tim editorial Crypto News Portal.',
}

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      
      {/* 1. HERO - Clean & Centered */}
      <section className="relative pt-24 pb-16 text-center">
        {/* Soft Background Decor */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-50 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
             <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-black">
                About Us
             </h1>
             <p className="text-gray-500 text-sm uppercase tracking-widest">
                Home / About Us
             </p>
        </div>
      </section>

      {/* 2. OUR STORY - Split Layout */}
      <section className="py-20 px-4 container mx-auto max-w-6xl">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
               <h2 className="text-3xl font-black text-black uppercase mb-6 tracking-tight">
                  Our Story
               </h2>
               <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
               </p>
               <p className="text-gray-600 leading-relaxed text-sm">
                  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.
               </p>
            </div>
            
            {/* Right: Abstract Composition (Placeholder) */}
            <div className="relative h-[400px] bg-gray-100 rounded-sm overflow-hidden hidden md:block">
               <div className="absolute top-10 right-10 w-40 h-40 bg-gray-200 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full"></div>
               <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-lg uppercase tracking-widest">
                  Clean Composition
               </div>
            </div>
         </div>
      </section>

      {/* 3. ALL MEMBER - Vertical Cards */}
      <section className="py-20 bg-gray-50/50">
         <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
               <h2 className="text-2xl font-black text-black uppercase tracking-widest">All Member</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
               {[
                  { name: "Jeremy Scott", role: "Founder" },
                  { name: "Sergey Brin", role: "Co-Founder" },
                  { name: "Huston Nash", role: "UI/UX Designer" },
                  { name: "Larry", role: "Web Designer" }
               ].map((member, i) => (
                  <div key={i} className="group text-center">
                     <div className="h-80 w-full bg-gray-200 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-4xl bg-gray-300">
                          IMG
                        </div>
                     </div>
                     <h3 className="text-sm font-black text-black uppercase tracking-wide mb-1">{member.name}</h3>
                     <p className="text-xs text-gray-500 italic mb-4">{member.role}</p>
                     <div className="flex justify-center gap-4 text-gray-400">
                        <Twitter size={14} className="hover:text-black cursor-pointer transition-colors"/>
                        <Facebook size={14} className="hover:text-black cursor-pointer transition-colors"/>
                        <Linkedin size={14} className="hover:text-black cursor-pointer transition-colors"/>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. CTA / JOIN TEAM - Split Layout */}
      <section className="py-24 bg-white">
         <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               
               {/* Content */}
               <div className="order-2 md:order-1">
                  <h2 className="text-3xl font-black text-black mb-6 leading-tight">
                     Do you want to be a part of team
                  </h2>
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-md">
                     There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                  </p>
                  <button className="bg-yellow-400 text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
                     Join Now
                  </button>
               </div>

               {/* Mockup Image */}
               <div className="order-1 md:order-2 bg-gray-50 p-8 rounded-xl border border-gray-100 flex items-center justify-center h-80">
                   <div className="w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-xs border border-gray-200">
                      Browser Mockup
                   </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. STATS - Icons + Yellow Numbers */}
      <section className="py-20 border-t border-gray-100 bg-white">
         <div className="container mx-auto max-w-4xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
               <div className="flex flex-col items-center">
                  <Briefcase className="text-gray-400 mb-4" strokeWidth={1.5} size={32} />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Project</span>
                  <span className="text-4xl font-black text-yellow-400">50</span>
               </div>
               <div className="flex flex-col items-center">
                  <Smile className="text-gray-400 mb-4" strokeWidth={1.5} size={32} />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Client Happy</span>
                  <span className="text-4xl font-black text-yellow-400">30</span>
               </div>
               <div className="flex flex-col items-center">
                  <Coffee className="text-gray-400 mb-4" strokeWidth={1.5} size={32} />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Cup of Coffee</span>
                  <span className="text-4xl font-black text-yellow-400">200</span>
               </div>
            </div>
         </div>
      </section>

      {/* 6. PARTNERS LOGO GRID */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto max-w-4xl px-4 text-center">
             <h2 className="text-sm font-black text-black uppercase tracking-widest mb-12">All Clients</h2>
             <div className="grid grid-cols-3 md:grid-cols-5 gap-12 opacity-50 grayscale">
                {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white font-bold">LOGO</div>
                   </div>
                ))}
            </div>
         </div>
      </section>

    </main>
  )
}