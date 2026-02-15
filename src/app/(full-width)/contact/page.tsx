export const metadata = {
  title: "Hubungi Kami",
  description: "Kontak redaksi dan kerjasama iklan.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Kolom Kiri: Info & Partnership */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-yellow-400"></div>
            <h1 className="text-4xl font-black text-black">Hubungi Redaksi</h1>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed font-medium">
            Kami terbuka untuk kolaborasi, press release, dan inquiry
            periklanan. Mari berdiskusi untuk pertumbuhan bersama.
          </p>

          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition cursor-pointer group bg-white">
              <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-600 transition-colors">
                Advertise / Media Partner
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Jangkau ribuan pembaca crypto & web3 setiap harinya.
              </p>
              <span className="text-black text-sm font-bold border-b-2 border-yellow-400 pb-0.5 group-hover:bg-yellow-400 transition-all">
                Download Media Kit →
              </span>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition cursor-pointer group bg-white">
              <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-600 transition-colors">Kirim Press Release</h3>
              <p className="text-sm text-gray-500 mb-4">
                Punya berita peluncuran produk atau update proyek?
              </p>
              <span className="text-black text-sm font-bold border-b-2 border-yellow-400 pb-0.5 group-hover:bg-yellow-400 transition-all">
                pr@cryptonews.com
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-black text-xl mb-6 text-black uppercase tracking-tight">Kirim Pesan</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Keperluan
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all appearance-none bg-white font-medium">
                    <option>Editorial Inquiry</option>
                    <option>Advertising / Sponsorship</option>
                    <option>Report Bug</option>
                    <option>Lainnya</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Pesan
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors shadow-sm">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
