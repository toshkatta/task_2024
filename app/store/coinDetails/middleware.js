import { defaultTimeInterval } from '@/domain/Rates';

import createMiddleware from '@/store/middlewareCreator';

import { candlesLoaded } from '@/store/candles/actions';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  coinDetailsFailure,
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';

import { selectCoinID } from './selectors';

const loadCoinDetails = async (store, next, action) => {
  next(action);
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinByID(action.payload);

    dispatch(coinDetailsLoaded(response));
  } catch (err) {
    dispatch(coinDetailsFailure(err));
  }
};

const loadCandles = async (store, next, action) => {
  next(action);

  const { dispatch, getState } = store;

  try {
    const coinID = selectCoinID(getState());
    const response = await CoinCapAPIClient.getCoinHistoryByID({
      interval: defaultTimeInterval,
      id: coinID,
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
