import createMiddleware from '@/store/middlewareCreator';

import { selectCoinID } from '@/store/coinDetails/selectors';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  coinHistoryLoaded,
  intervalSelected,
} from './actions';

const loadCoinHistory = async (store, next, action) => {
  next(action);

  const { dispatch, getState } = store;

  try {
    const coinID = selectCoinID(getState());
    const response = await CoinCapAPIClient.getCoinHistoryByID({
      interval: action.payload,
      id: coinID,
    });

    dispatch(coinHistoryLoaded(response));
  } catch (err) {
    console.error(err);
  }
};

const handlers = {
  [intervalSelected.type]: loadCoinHistory,
};

const middleware = createMiddleware(handlers);

export default middleware;
