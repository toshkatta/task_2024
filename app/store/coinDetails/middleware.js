import { defaultTimeInterval } from '@/domain/Rates';

import createMiddleware from '@/store/middlewareCreator';

import { candlesLoaded } from '@/store/candles/actions';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  coinsFailure,
  coinsLoaded,
} from '@/store/coins/actions';

import {
  coinDetailsFailure,
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';

const loadCoins = async ({ store, page, limit, search, ids }) => {
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoins({ page, limit, search, ids });

    dispatch(coinsLoaded(response));
  } catch (err) {
    dispatch(coinsFailure(err));
  }
};

const loadCoinDetails = async ({ store, id }) => {
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinByID(id);

    dispatch(coinDetailsLoaded(response));
  } catch (err) {
    dispatch(coinDetailsFailure(err));
  }
};

const loadCandles = async ({ store, id }) => {
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinHistoryByID({
      interval: defaultTimeInterval,
      id,
    });

    dispatch(candlesLoaded(response));
  } catch (err) {
    console.error(err);
  }
};

const onCoinDetailsVisit = async (store, next, action) => {
  next(action);

  await Promise.all([
    loadCoins({ store, limit: 3 }),
    loadCoinDetails({ store, id: action.payload }),
    loadCandles({ store, id: action.payload }),
  ]);
};

const handlers = {
  [coinDetailsVisited.type]: onCoinDetailsVisit,
};

const middleware = createMiddleware(handlers);

export default middleware;
