export interface CoinData {
  id: string
  current_price: number
  price_change_percentage_24h: number
}

// Mapping response CoinGecko yang kadang aneh
export interface CoinGeckoResponse {
  [key: string]: {
    idr: number
    idr_24h_change: number
  }
}