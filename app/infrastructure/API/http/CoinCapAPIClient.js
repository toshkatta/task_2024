import HttpClient from './HttpClient';

import { APICoinToCoin } from '../parsing/coin';
import {
  APIRateToRate,
  currencyToRateID,
  // intervalToAPIInterval,
  // intervalToAPIStartTime,
} from '../parsing/rate';

import { mockCandles } from './mockResponses';

// const EXCHANGE_ID = 'alterdice';
// const QUOTE_ID = 'tether';

class CoinCapAPIClient extends HttpClient {
  async getCoinByID(id) {
    const response = await this.get(`/assets/${id}`);

    return APICoinToCoin(response);
  }

  async getRateByCurrency(currency) {
    const id = currencyToRateID(currency);
    const response = await this.get(`/rates/${id}`);

    return APIRateToRate(response);
  }

  getCandles({ interval, price }) {
    // return this.get('/candles', {
    //   exchange: EXCHANGE_ID,
    //   interval: intervalToAPIInterval(interval),
    //   baseId: cryptocurrency,
    //   quoteId: QUOTE_ID,
    //   start: intervalToAPIStartTime(interval),
    //   end: new Date().getTime(),
    // });

    return mockCandles({ price, interval });
  }
}

const client = new CoinCapAPIClient({
  baseUrl: import.meta.env.VITE_API_URL,
  version: 'v2',
});

export default client;
