export default function SidebarNewsletter() {
  return (
    <div className="bg-yellow-400 p-6 rounded-xl border border-yellow-500 text-center shadow-sm">
      <h3 className="font-black text-black text-lg uppercase mb-2 leading-tight">Daily Alpha</h3>
      <p className="text-xs text-black/80 font-medium mb-4 leading-relaxed">
        Dapat sinyal trading & berita insider setiap pagi.
      </p>
      <div className="space-y-2">
        <input 
          type="email" 
          placeholder="Email kamu..." 
          className="w-full bg-white/90 border-0 text-black px-4 py-3 rounded-lg text-sm font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black" 
        />
        <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-lg uppercase text-xs tracking-widest transition-transform active:scale-95">
            Subscribe
        </button>
      </div>
    </div>
  )
}