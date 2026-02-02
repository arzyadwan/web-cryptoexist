import { CoinGeckoResponse } from '@/types/market'

async function getMarketData() {
  // Ambil 5 koin utama untuk tabel home
  const coins = ['bitcoin', 'ethereum', 'cardano', 'solana', 'binancecoin']
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=idr&include_24hr_change=true&include_market_cap=true`
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) { return null }
}

export default async function HomeMarketTable() {
  const data = await getMarketData()
  if (!data) return null

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-black text-gray-900 uppercase tracking-tight">Market Data</h3>
        <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">LIVE</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-bold">Coin</th>
              <th className="px-6 py-3 text-right font-bold">Price</th>
              <th className="px-6 py-3 text-right font-bold">24h Change</th>
              <th className="px-6 py-3 text-right hidden md:table-cell font-bold">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.entries(data).map(([id, coin]: any) => {
               const isUp = coin.idr_24h_change >= 0
               return (
                 <tr key={id} className="hover:bg-yellow-50 transition">
                   <td className="px-6 py-4 font-bold text-gray-900 capitalize flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${id === 'bitcoin' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                     {id}
                   </td>
                   <td className="px-6 py-4 text-right font-mono font-medium text-black">
                     Rp {coin.idr.toLocaleString('id-ID')}
                   </td>
                   <td className={`px-6 py-4 text-right font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                     {isUp ? '▲' : '▼'}{Math.abs(coin.idr_24h_change).toFixed(2)}%
                   </td>
                   <td className="px-6 py-4 text-right text-gray-500 hidden md:table-cell">
                     Rp {(coin.idr_market_cap / 1000000000000).toFixed(2)} T
                   </td>
                 </tr>
               )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}