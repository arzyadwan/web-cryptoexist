import { CoinGeckoResponse } from '@/types/market'

async function getMarketData() {
  const coins = ['bitcoin', 'ethereum', 'solana', 'binancecoin', 'ripple']
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=idr&include_24hr_change=true`

  try {
    const res = await fetch(url, {
      next: { revalidate: 120 } // Cache 2 menit. Server tidak akan hit API tiap request user.
    })

    if (!res.ok) throw new Error('Failed to fetch market data')

    return res.json() as Promise<CoinGeckoResponse>
  } catch (error) {
    console.error('Market data error:', error)
    return null
  }
}

export default async function MarketWidget() {
  const data = await getMarketData()

  if (!data) return <div className="p-4 border rounded text-sm text-gray-500">Market data unavailable</div>

  // Urutkan manual agar konsisten
  const order = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple']
  
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h3 className="font-bold text-gray-800">Pasar Crypto (IDR)</h3>
      </div>
      <div className="divide-y">
        {order.map((coinId) => {
          const coin = data[coinId]
          if (!coin) return null
          
          const isUp = coin.idr_24h_change >= 0
          
          return (
            <div key={coinId} className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
              <span className="capitalize font-medium text-gray-700">{coinId}</span>
              <div className="text-right">
                <div className="font-bold text-sm">
                  Rp {coin.idr.toLocaleString('id-ID')}
                </div>
                <div className={`text-xs font-semibold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {isUp ? '▲' : '▼'} {coin.idr_24h_change.toFixed(2)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-2 bg-gray-50 text-[10px] text-gray-400 text-center">
        Powered by CoinGecko • Delay 2 min
      </div>
    </div>
  )
}