import HttpClient from './HttpClient';

import { APICoinToCoin } from '../parsing/coin';
import {
  APIRateToRate,
  currencyToRateID,
  intervalToAPIInterval,
  intervalToAPIStartTime,
} from '../parsing/rate';

const EXCHANGE_ID = 'alterdice'; // biggest exchange on coincap
const QUOTE_ID = 'tether';

const rates = [
  {id: 'british-pound-sterling', symbol: 'GBP', currencySymbol: '£', type: 'fiat', rateUsd: '1.3156492531717014'},
  {id: 'euro', symbol: 'EUR', currencySymbol: '€', type: 'fiat', rateUsd: '1.1075092449334220'},
  {id: 'united-states-dollar', symbol: 'USD', currencySymbol: '$', type: 'fiat', rateUsd: '1.0000000000000000'},
];
let count = 0;

class CoinCapAPIClient extends HttpClient {
  async getCoinByID(id) {
    // const response = await this.get(`/assets/${id}`);
    const response = {
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
    };
    return APICoinToCoin(response);
  }

  async getRateByCurrency(currency) {
    // const id = currencyToRateID(currency);
    // const response = await this.get(`/rates/${id}`);
    if (count === rates.length) count = 0;
    const response = rates[count];
    count++;
    return APIRateToRate(response);
  }

  getCandles({ interval, cryptocurrency }) {
    return this.get('/candles', {
      exchange: EXCHANGE_ID,
      interval: intervalToAPIInterval(interval),
      baseId: cryptocurrency,
      quoteId: QUOTE_ID,
      // start: intervalToAPIStartTime(interval),
      // end: new Date().getTime(),
    });
  }
}

const client = new CoinCapAPIClient({
  baseUrl: import.meta.env.VITE_API_URL,
  version: 'v2',
});

export default client;
