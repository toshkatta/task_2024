import {
  getRandomInteger,
  getRandomNumberBetween,
} from '@/infrastructure/random';

export const getDefaultRate = (props) => ({
  id: `id-${getRandomInteger(1000000)}`,
  symbol: `symbol-${getRandomInteger(1000000)}`,
  currencySymbol: `currencySymbol-${getRandomInteger(1000000)}`,
  type: `type-${getRandomInteger(1000000)}`,
  rateUsd: getRandomNumberBetween(0, 2),
  rateID: `rateID-${getRandomInteger(1000000)}`
});
