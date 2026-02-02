import Image from 'next/image'

export const metadata = {
  title: 'Tentang Kami | Redaksi & Visi',
  description: 'Mengenal standar jurnalisme dan tim editorial Crypto News Portal.',
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-blue-900">
          DATA-DRIVEN. <span className="text-gray-900">NO HYPE.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Crypto News Portal didirikan untuk melawan misinformasi di industri blockchain dengan jurnalisme berbasis data dan transparansi radikal.
        </p>
      </section>

      {/* Grid Values */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Verifikasi Fakta", desc: "Setiap artikel melewati 2 lapis pengecekan editor." },
          { title: "Independensi", desc: "Kami tidak menerima pembayaran untuk liputan berita organik." },
          { title: "Edukasi", desc: "Fokus pada pemahaman teknologi, bukan spekulasi harga semata." }
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Editorial Team (Placeholder) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4">Dewan Redaksi</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold">Nama Editor In Chief</p>
              <p className="text-sm text-gray-500">Ex-Bloomberg, 10 Tahun Pengalaman</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold">Nama Lead Analyst</p>
              <p className="text-sm text-gray-500">Certified Blockchain Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Keras */}
      <section className="bg-blue-50 p-8 rounded-xl text-sm text-blue-800">
        <h4 className="font-bold mb-2">Transparansi Kepemilikan</h4>
        <p>
          Penulis dan editor Crypto News Portal mungkin memiliki aset crypto yang diberitakan. 
          Sesuai kode etik, kepemilikan tersebut wajib diungkapkan (disclosure) di setiap artikel terkait. 
          Konten di situs ini bukan nasihat keuangan.
        </p>
      </section>
    </main>
  )
}