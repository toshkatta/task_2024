import createMiddleware from '@/store/middlewareCreator';

import { coinHistoryLoaded } from '@/store/coinHistory/actions';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import { selectSelectedInterval } from '../coinHistory/selectors';

import { loadCoins } from '../coins/middleware';

import {
  coinDetailsFailure,
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';


const loadCoinDetails = async ({ store, id }) => {
  const { dispatch } = store;

  try {
    const response = await CoinCapAPIClient.getCoinByID(id);

    dispatch(coinDetailsLoaded(response));
  } catch (err) {
    dispatch(coinDetailsFailure(err));
  }
};

const loadCoinHistory = async ({ store, id }) => {
  const { dispatch, getState } = store;

  const interval = selectSelectedInterval(getState());
  try {
    const response = await CoinCapAPIClient.getCoinHistoryByID({
      interval,
      id,
    });

    dispatch(coinHistoryLoaded(response));
  } catch (err) {
    console.error(err);
  }
};

const onCoinDetailsVisit = async (store, next, action) => {
  next(action);

  await Promise.all([
    loadCoins({ store, limit: 3 }),
    loadCoinDetails({ store, id: action.payload }),
    loadCoinHistory({ store, id: action.payload }),
  ]);
};

const handlers = {
  [coinDetailsVisited.type]: onCoinDetailsVisit,
};

const middleware = createMiddleware(handlers);

export default middleware;
