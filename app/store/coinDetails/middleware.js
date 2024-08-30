import { defaultTimeInterval } from '@/domain/Rates';

import createMiddleware from '@/store/middlewareCreator';

import { candlesLoaded } from '@/store/candles/actions';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

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

const loadCandles = async (store, next, action) => {
  next(action);
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCandles({
      interval: defaultTimeInterval,
      price: action.payload.priceUsd,
    });

    dispatch(candlesLoaded(response));
  } catch (err) {
    console.error(err);
  }
};

const handlers = {
  [coinDetailsVisited.type]: loadCoinDetails,
  [coinDetailsLoaded.type]: loadCandles,
};

const middleware = createMiddleware(handlers);

export default middleware;
