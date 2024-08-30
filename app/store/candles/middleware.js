import createMiddleware from '@/store/middlewareCreator';

import { selectCoinPrice } from '@/store/coinDetails/selectors';

import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import {
  candlesLoaded,
  intervalSelected,
} from './actions';

const loadCandles = async (store, next, action) => {
  next(action);

  const { dispatch, getState } = store;
  const price = selectCoinPrice(getState());

  try {
    const response = await CoinCapAPIClient.getCandles({
      interval: action.payload,
      price,
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
