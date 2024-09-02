import HttpClient from './HttpClient';

import { APICoinToCoin } from '../parsing/coin';
import {
  APIRateToRate,
  currencyToRateID,
  intervalToAPIInterval,
  intervalToAPIStartTime,
} from '../parsing/rate';
import { APICallHistoryToCallHistory } from '../parsing/coinHistory';

class CoinCapAPIClient extends HttpClient {
  async getCoins({ offset, limit, search, ids }) {
    const response = await this.get('/assets', {
      limit,
      offset,
      search,
      ids,
    });

    return response.map(APICoinToCoin);
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

    return APICallHistoryToCallHistory(response);
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
