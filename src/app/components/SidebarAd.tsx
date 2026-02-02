export default function SidebarAd() {
  return (
    <div className="w-full h-[250px] bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer">
      
      {/* Label Wajib untuk Kepatuhan (AdSense Policy) */}
      <span className="absolute top-2 right-2 text-[10px] text-gray-400 uppercase tracking-widest font-medium border border-gray-200 px-1 rounded bg-white">
        Ad
      </span>
      
      {/* Visual Placeholder (Nanti diganti script Google Ads/Banner Sponsor) */}
      <div className="z-10 p-4 space-y-1">
        <p className="font-black text-gray-300 text-xl uppercase group-hover:text-gray-400 transition">
           Sponsor Space
        </p>
        <p className="text-[10px] text-gray-400 font-medium">
           300x250 Display Ad
        </p>
      </div>

      {/* Dekorasi Background Pattern agar tidak terlihat error */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:12px_12px]"></div>
      
      {/* Hover Effect: Border Kuning */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl transition-colors pointer-events-none"></div>
    </div>
  )
}