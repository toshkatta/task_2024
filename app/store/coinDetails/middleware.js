import {
  defaultCurrency,
  defaultTimeInterval,
} from '@/domain/Rates';

import createMiddleware from '@/store/middlewareCreator';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  coinDetailsFailure,
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';

const loadCoinDetails = async (store, next, action) => {
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinByID(action.payload);

    dispatch(coinDetailsLoaded(response));
  } catch (err) {
    dispatch(coinDetailsFailure(err));
    console.error(err);
  }
};

const loadCandles = async (store, next, action) => {
  // const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCandles({
      cryptocurrency: action.payload,
      currency: defaultCurrency,
      interval: defaultTimeInterval,
    });

    // dispatch(coinDetailsLoaded(response));
    console.log('candle response:', response);
  } catch (err) {
    // dispatch(coinDetailsFailure(err));
    console.error(err);
  }
};

const onCoinDetailsVisit = async (store, next, action) => {
  next(action);

  await Promise.all([
    loadCoinDetails(store, next, action),
    loadCandles(store, next, action),
  ]);
};

const handlers = {
  [coinDetailsVisited.type]: onCoinDetailsVisit,
};

const middleware = createMiddleware(handlers);

export default middleware;
