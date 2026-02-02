export default function SidebarNewsletter() {
  return (
    <div className="bg-yellow-400 p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
      <h3 className="font-black text-black text-lg uppercase mb-2 leading-tight">Jangan Kudet!</h3>
      <p className="text-xs text-black/80 font-bold mb-4">
        Dapat sinyal trading & berita insider setiap pagi.
      </p>
      <div className="space-y-2">
        <input 
          type="email" 
          placeholder="Email kamu..." 
          className="w-full bg-white border border-black text-black px-3 py-2 rounded text-sm font-bold placeholder:text-gray-400 focus:outline-none" 
        />
        <button className="w-full bg-black hover:bg-gray-800 text-white font-black py-2 rounded uppercase text-xs tracking-widest transition transform hover:-translate-y-0.5">
            Join Free
        </button>
      </div>
    </div>
  )
}