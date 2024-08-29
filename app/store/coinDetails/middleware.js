import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import createMiddleware from '@/store/middlewareCreator';

import {
  coinDetailsFailure,
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';

const loadCoinDetails = async (store, next, action) => {
  next(action);
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinByID(action.payload);

    dispatch(coinDetailsLoaded(response));
  } catch (err) {
    dispatch(coinDetailsFailure(err));
    console.error(err);
  }
};

const handlers = {
  [coinDetailsVisited.type]: loadCoinDetails,
};

const middleware = createMiddleware(handlers);

export default middleware;
