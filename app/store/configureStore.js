import { configureStore } from '@reduxjs/toolkit';

import {
  coinDetailsMiddleware,
  coinDetailsReducer,
} from './coinDetails';
import {
  ratesMiddleware,
  ratesReducer,
} from './rates';
import {
  candlesMiddleware,
  candlesReducer,
} from './candles';
import {
  coinsMiddleware,
  coinsReducer,
} from './coins';

const reducer = {
  candles: candlesReducer,
  coinDetails: coinDetailsReducer,
  coins: coinsReducer,
  rates: ratesReducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([
    coinDetailsMiddleware,
    ratesMiddleware,
    candlesMiddleware,
    coinsMiddleware,
  ]);

export const store = configureStore({
  reducer,
  middleware,
  devTools: import.meta.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
