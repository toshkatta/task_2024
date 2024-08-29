import HttpClient from './HttpClient';
import { APICoinToCoin } from '../parsing/coin';

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
}

const client = new CoinCapAPIClient({
  baseUrl: import.meta.env.VITE_API_URL,
  version: 'v2',
});

export default client;
