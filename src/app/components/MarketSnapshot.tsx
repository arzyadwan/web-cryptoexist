import MarketSnapshotClient from './MarketSnapshotClient'

// Interface disesuaikan dengan kebutuhan Client Component
interface MarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: {
    price: number[]
  }
}

async function getMarketSnapshot() {
  // Ambil BTC, ETH, BNB dengan data sparkline
  // Gunakan 'binancecoin' untuk BNB
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin&order=market_cap_desc&per_page=3&page=1&sparkline=true`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) return []
  return res.json() as Promise<MarketCoin[]>
}

export default async function MarketSnapshot() {
  const coins = await getMarketSnapshot()

  // Jika API gagal, jangan render apa-apa atau render fallback
  if (!coins || coins.length === 0) return null

  // Render Client Component dan oper data
  return <MarketSnapshotClient coins={coins} />
}