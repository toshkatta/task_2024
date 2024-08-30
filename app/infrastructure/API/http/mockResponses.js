import { supportedTimeIntervals } from '@/domain/Rates';

import { APIRateToRate } from '../parsing/rate';

const rowCount = 12;
const colCount = 12;
const candleCount = rowCount * colCount;

const intervalMapping = {
  [supportedTimeIntervals.DAY]: 24 * 60 * 60 * 1000,
  [supportedTimeIntervals.FIVE_DAYS]: 5 * 24 * 60 * 60 * 1000,
  [supportedTimeIntervals.MONTH]: 30 * 24 * 60 * 60 * 1000,
  [supportedTimeIntervals.YEAR]: 365 * 24 * 60 * 60 * 1000,
  [supportedTimeIntervals.FIVE_YEARS]: 5 * 365 * 24 * 60 * 60 * 1000,
};

const createCandle = ({ prevClose, prevDateMs, interval }) => {
  const high = prevClose + (Math.random() * (prevClose / 10));
  const low = prevClose - (Math.random() * (prevClose / 10));
  const close = low + (Math.random() * (high - low));

  return {
    open: prevClose,
    high,
    low,
    close,
    date: prevDateMs - (intervalMapping[interval] / candleCount),
  };
};

export const mockCandles = ({ price, interval }) => {
  const initial = createCandle({
    prevClose: price,
    prevDateMs: new Date().getTime(),
    interval,
  });

  return Array.from(new Array(candleCount))
    .reduce((arr) => {
      if (!arr.length) return [initial];

      const prev = arr[arr.length - 1];

      return [
        ...arr,
        createCandle({
          prevClose: prev.close,
          prevDateMs: prev.date,
          interval,
        })
      ];
    }, [])
    .reverse();
};

export const mockCoinByID = (id) => ({
  "id": id,
  "rank": "1",
  "symbol": "BTC",
  "name": "Bitcoin",
  "supply": "19746634.0000000000000000",
  "maxSupply": "21000000.0000000000000000",
  "marketCapUsd": "1177131549030.8370836720257832",
  "volumeUsd24Hr": "27208828548.1272705109760072",
  "priceUsd": "59611.7570736783334148",
  "changePercent24Hr": "1.6189386924235160",
  "vwap24Hr": "59255.1231771968235907",
});

const rates = [
  { id: 'british-pound-sterling', symbol: 'GBP', currencySymbol: '£', type: 'fiat', rateUsd: '1.3156492531717014' },
  { id: 'euro', symbol: 'EUR', currencySymbol: '€', type: 'fiat', rateUsd: '1.1075092449334220' },
  { id: 'united-states-dollar', symbol: 'USD', currencySymbol: '$', type: 'fiat', rateUsd: '1.0000000000000000' },
];
let count = 0;

export const mockRateByCurrency = () => {
  if (count === rates.length) count = 0;
  const response = rates[count];
  count++;
  return APIRateToRate(response);
}