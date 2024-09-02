import createMiddleware from '@/store/middlewareCreator';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  coinsFailure,
  coinsLoaded,
  coinsRequested,
} from './actions';

const DEFAULT_LIMIT = 15;

export const loadCoins = async ({ store, page, limit, search, ids }) => {
  const { dispatch } = store;

  const offset = page
    ? (page - 1) * limit
    : 0;

  try {
    const responses = await CoinCapAPIClient.getCoins({
      offset,
      limit: limit || DEFAULT_LIMIT,
      search,
      ids,
    });

    dispatch(coinsLoaded(responses));
  } catch (err) {
    dispatch(coinsFailure(err));
  }
};

const onCoinsRequest = async (store, next, action) => {
  next(action);

  const limit = action.payload?.limit || DEFAULT_LIMIT;
  const page = action.payload?.page || 1;
  const search = action.payload?.search;
  const ids = action.payload?.ids;

  await loadCoins({ store, page, limit, search, ids })
};

const handlers = {
  [coinsRequested.type]: onCoinsRequest,
};

const middleware = createMiddleware(handlers);

export default middleware;
