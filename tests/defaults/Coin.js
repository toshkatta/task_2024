import {
  getRandomInteger,
  getRandomNumberBetween,
  getRandomPercentWithNegative,
} from '@/infrastructure/random';

export const getDefaultCoin = (props) => ({
  id: `id-${getRandomInteger(1000000)}`,
  rank: getRandomInteger(1000000),
  symbol: `symbol-${getRandomInteger(1000000)}`,
  name: `name-${getRandomInteger(1000000)}`,
  supply: getRandomNumberBetween(100000, 1000000000000),
  maxSupply: getRandomInteger(3000000) + 100000,
  marketCapUsd: getRandomNumberBetween(100000, 10000000000),
  volumeUsd24Hr: getRandomNumberBetween(100000, 30000000),
  priceUsd: getRandomNumberBetween(0, 60000),
  changePercent24Hr: getRandomPercentWithNegative(),
  vwap24Hr: getRandomNumberBetween(0, 60000),
  ...props,
});
