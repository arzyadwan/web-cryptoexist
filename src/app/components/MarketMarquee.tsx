import Image from 'next/image'

// Interface baru sesuai respon API coins/markets
interface MarketCoin {
  id: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

async function getMarketData() {
  // Gunakan endpoint 'markets' untuk dapat gambar logo
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano,avalanche-2,dogecoin,polkadot,tron&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } }) // Cache 1 menit
    if (!res.ok) return []
    return res.json() as Promise<MarketCoin[]>
  } catch (error) {
    return []
  }
}

export default async function MarketMarquee() {
  const data = await getMarketData()

  if (!data || data.length === 0) return null

  return (
    // Background Putih, Border Bawah Halus
    <div className="bg-white text-gray-900 text-xs overflow-hidden border-b border-gray-100 relative z-50 shadow-sm">
      <div className="flex w-full">
        {/* Container animasi */}
        <div className="animate-marquee flex gap-4 items-center pl-4">
          {data.map((coin) => (
             <CoinItem key={coin.id} coin={coin} />
          ))}
          {/* Duplikasi konten untuk looping mulus */}
          {data.map((coin) => (
             <CoinItem key={`dup-${coin.id}`} coin={coin} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Komponen Kecil untuk Item Koin (Supaya rapi)
function CoinItem({ coin }: { coin: MarketCoin }) {
  const isUp = coin.price_change_percentage_24h >= 0
  
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-gray-100 cursor-default group">
      {/* Ganti Nama dengan Logo */}
      <div className="relative w-5 h-5">
        <Image 
          src={coin.image} 
          alt={coin.symbol} 
          fill 
          className="object-contain"
        />
      </div>
      
      <span className="font-bold uppercase text-gray-700 group-hover:text-black">
        {coin.symbol}
      </span>
      
      <span className="font-medium text-gray-600">
        Rp {coin.current_price.toLocaleString('id-ID')}
      </span>
      
      <span className={`${isUp ? 'text-green-600' : 'text-red-600'} font-bold flex items-center`}>
        {isUp ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
      </span>
    </div>
  )
}