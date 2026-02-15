import { Mail } from 'lucide-react'

export default function NewsletterBanner() {
  return (
    <section className="w-full bg-yellow-400 py-12 px-4 sm:px-6 lg:px-8 my-12 rounded-2xl relative overflow-hidden">
        {/* Background Pattern (Optional) */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100">
                <circle cx="100" cy="0" r="50" fill="black" />
            </svg>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-2">
                    Crypto Alpha, Delivered.
                </h2>
                <p className="text-gray-900 font-medium">
                    Dapatkan analisis pasar eksklusif dan berita terpanas langsung ke inbox Anda setiap pagi.
                </p>
            </div>

            {/* Input Form */}
            <div className="w-full md:w-auto flex-1 max-w-md">
                <form className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="email" 
                            placeholder="Email Anda" 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black/10 focus:border-black focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-500 bg-white"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-transform active:scale-95 uppercase tracking-wide whitespace-nowrap"
                    >
                        Join Free
                    </button>
                </form>
                <p className="text-xs text-black/60 mt-3 text-center md:text-left font-medium">
                    Join 15,000+ traders smart traders. No spam, unsubscribe anytime.
                </p>
            </div>

        </div>
    </section>
  )
}
