import axios from 'axios';

import assert from 'infrastructure/validation/assert';

import APIError from './APIError';

class HttpClient {
  constructor({
    baseUrl,
    version = '',
  }) {
    assert(baseUrl, 'API base url must be specified');

    this._baseUrl = version
      ? `${baseUrl}/${version}`
      : baseUrl;
  }

  get(endpoint, params = {}, opts = {}) {
    return this.request('GET', endpoint, { params }, opts);
  }

  post(endpoint, data = {}, opts = {}) {
    return this.request('POST', endpoint, { data }, opts);
  }

  async request(method, endpoint, { params, data }, opts = {}) {
    const requestOpts = {
      baseURL: this._baseUrl,
      url: endpoint,
      method,
      params,
      data,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      ...opts,
    };

    try {
      const { data: { data: result } } = await axios(requestOpts);
      return result;
    } catch (error) {
      console.log('Axios error: ', error);

      throw new APIError(error);
    }
  }

  getUrl(endpoint) {
    return this._baseUrl + endpoint;
  }
}

export default HttpClient;
