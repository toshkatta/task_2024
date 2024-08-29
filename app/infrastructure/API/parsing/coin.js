export const APICoinToCoin = (coin) => ({
  ...coin,
  rank: parseFloat(coin.rank),
  supply: parseFloat(coin.supply),
  maxSupply: parseFloat(coin.maxSupply),
  marketCapUsd: parseFloat(coin.marketCapUsd),
  volumeUsd24Hr: parseFloat(coin.volumeUsd24Hr),
  priceUsd: parseFloat(coin.priceUsd),
  changePercent24Hr: parseFloat(coin.changePercent24Hr),
  vwap24Hr: parseFloat(coin.vwap24Hr),
});
