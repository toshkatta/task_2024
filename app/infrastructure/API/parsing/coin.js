export const APICoinToCoin = (coin) => ({
  id: coin.id,
  rank: parseFloat(coin.rank),
  symbol: coin.symbol,
  name: coin.name,
  supply: parseFloat(coin.supply),
  maxSupply: parseFloat(coin.maxSupply),
  marketCapUsd: parseFloat(coin.marketCapUsd),
  volumeUsd24Hr: parseFloat(coin.volumeUsd24Hr),
  priceUsd: parseFloat(coin.priceUsd),
  changePercent24Hr: parseFloat(coin.changePercent24Hr),
  vwap24Hr: parseFloat(coin.vwap24Hr),
});
