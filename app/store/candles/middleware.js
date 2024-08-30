import createMiddleware from '@/store/middlewareCreator';

import { selectCoinID } from '@/store/coinDetails/selectors';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  candlesLoaded,
  intervalSelected,
} from './actions';

const loadCandles = async (store, next, action) => {
  next(action);

  const { dispatch, getState } = store;

  try {
    const coinID = selectCoinID(getState());
    const response = await CoinCapAPIClient.getCoinHistoryByID({
      interval: action.payload,
      id: coinID,
    });

    dispatch(candlesLoaded(response));
  } catch (err) {
    console.error(err);
  }
};

const handlers = {
  [intervalSelected.type]: loadCandles,
};

const middleware = createMiddleware(handlers);

export default middleware;
