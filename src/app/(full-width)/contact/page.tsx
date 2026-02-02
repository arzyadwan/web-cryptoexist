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
          <h1 className="text-4xl font-bold mb-6">Hubungi Redaksi</h1>
          <p className="text-gray-600 mb-8">
            Kami terbuka untuk kolaborasi, press release, dan inquiry
            periklanan.
          </p>

          <div className="space-y-6">
            <div className="p-6 border rounded-xl hover:border-blue-500 transition cursor-pointer">
              <h3 className="font-bold text-lg mb-1">
                Advertise / Media Partner
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Jangkau ribuan pembaca crypto & web3.
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Download Media Kit →
              </span>
            </div>

            <div className="p-6 border rounded-xl hover:border-blue-500 transition cursor-pointer">
              <h3 className="font-bold text-lg mb-1">Kirim Press Release</h3>
              <p className="text-sm text-gray-500 mb-2">
                Punya berita peluncuran produk?
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                pr@cryptonews.com
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="font-bold text-xl mb-6">Kirim Pesan</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjek
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Tips Berita</option>
                <option>Kerjasama Iklan</option>
                <option>Koreksi Artikel</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Kebutuhan</label>
                <select className="w-full p-2 border rounded">
                    <option>Editorial Inquiry</option>
                    <option>Advertising / Sponsorship</option>
                    <option>Report Bug</option>
                </select>
             </div> 

            <button className="w-full bg-black text-white py-3 rounded-lg font-bold">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
