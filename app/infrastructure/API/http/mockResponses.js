import { APIRateToRate } from '../parsing/rate';

const coinHistoryRecordToCandle = ({ price, prevClose, time, supply, }) => ({
  open: prevClose,
  close: price,
  date: time,
  supply,
});

const APICallHistoryToCallHistory = (c) => ({
  supply: parseFloat(c.circulatingSupply),
  price: parseFloat(c.priceUsd),
  time: c.time,
});

export const callHistoryToCandles = (callHisotry) => {
  const parsed = callHisotry.map(APICallHistoryToCallHistory);
  const first = parsed[0];

  const initial = coinHistoryRecordToCandle({
    price: first.price,
    prevClose: first.price * 0.995,
    time: first.time,
    supply: first.supply,
  });

  return parsed
    .reduce((arr, e, i) => {
      if (!i) return [initial];

      const prev = arr[i - 1];

      return [
        ...arr,
        coinHistoryRecordToCandle({
          price: e.price,
          prevClose: prev.close,
          time: e.time,
          supply: e.supply,
        })
      ];
    }, []);
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