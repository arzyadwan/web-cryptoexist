import { CoinGeckoResponse } from '@/types/market'

export const metadata = {
  title: 'Data Pasar Crypto (Live)',
  description: 'Harga cryptocurrency real-time, kapitalisasi pasar, dan volume transaksi.',
}

async function getFullMarketData() {
  const coins = ['bitcoin', 'ethereum', 'tether', 'solana', 'binancecoin', 'ripple', 'cardano', 'avalanche-2', 'dogecoin', 'polkadot', 'tron', 'chainlink', 'matic-network', 'shiba-inu', 'litecoin', 'bitcoin-cash', 'uniswap', 'stellar']
  
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=idr&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
  
  try {
    const res = await fetch(url, { next: { revalidate: 30 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function MarketPage() {
  const data = await getFullMarketData()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Market Data</h1>
        <p className="text-gray-500">Pantau harga aset crypto secara real-time (IDR).</p>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Asset Name</th>
                <th className="px-6 py-4 font-medium text-right">Price (IDR)</th>
                <th className="px-6 py-4 font-medium text-right">24h Change</th>
                <th className="px-6 py-4 font-medium text-right hidden md:table-cell">Market Cap</th>
                <th className="px-6 py-4 font-medium text-right hidden lg:table-cell">Volume (24h)</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data && Object.keys(data).length > 0 ? (
                Object.entries(data).map(([id, coin]: any) => {
                  // === SECURITY CHECK (PENGECEKAN KEAMANAN) ===
                  // Jika data koin rusak atau tidak ada harga IDR, jangan render baris ini (skip)
                  if (!coin || typeof coin.idr === 'undefined') {
                    return null 
                  }
                  
                  // Pastikan nilai numeric ada, jika tidak default ke 0
                  const price = coin.idr || 0
                  const change = coin.idr_24h_change || 0
                  const marketCap = coin.idr_market_cap || 0
                  const volume = coin.idr_24h_vol || 0

                  const isUp = change >= 0

                  return (
                    <tr key={id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 capitalize">
                        {id.replace(/-/g, ' ')}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-700">
                        {/* Gunakan Optional Chaining (?.) atau variabel yang sudah diamankan */}
                        Rp {price.toLocaleString('id-ID')}
                      </td>
                      <td className={`px-6 py-4 text-right font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                        {isUp ? '+' : ''}{change.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 hidden md:table-cell">
                        Rp {(marketCap / 1000000000000).toFixed(2)} T
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 hidden lg:table-cell">
                        Rp {(volume / 1000000000).toFixed(2)} M
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:underline font-medium text-xs">Trade</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-red-500 bg-red-50">
                      <p className="font-bold">Gagal Memuat Data</p>
                      <p className="text-xs mt-1 text-gray-500">API Limit tercapai atau koneksi terputus. Silakan refresh halaman dalam 1 menit.</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
       
      <div className="mt-4 text-xs text-gray-400 text-right">
         Data provided by CoinGecko API • Delayed 30s
      </div>
    </main>
  )
}