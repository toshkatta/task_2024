import HttpClient from './HttpClient';

import { APICoinToCoin } from '../parsing/coin';
import {
  APIRateToRate,
  currencyToRateID,
  intervalToAPIInterval,
  intervalToAPIStartTime,
} from '../parsing/rate';
import { callHistoryToCandles } from '../parsing/coinHistory';

class CoinCapAPIClient extends HttpClient {
  getCoins({ page, limit, search, ids }) {
    return this.get('/assets', {
      limit,
      offset: page,
      search,
      ids,
    });
  }

  async getCoinByID(id) {
    const response = await this.get(`/assets/${id}`);

    return APICoinToCoin(response);
  }

  async getCoinHistoryByID({ id, interval }) {
    const response = await this.get(`/assets/${id}/history`, {
      id,
      interval: intervalToAPIInterval(interval),
      start: intervalToAPIStartTime(interval),
      end: new Date().getTime(),
    });

    return callHistoryToCandles(response);
  }

  async getRateByCurrency(currency) {
    const id = currencyToRateID(currency);
    const response = await this.get(`/rates/${id}`);

    return APIRateToRate(response);
  }
}

const client = new CoinCapAPIClient({
  baseUrl: import.meta.env.VITE_API_URL,
  version: 'v2',
});

export default client;
