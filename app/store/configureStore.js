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

const reducer = {
  candles: candlesReducer,
  coinDetails: coinDetailsReducer,
  rates: ratesReducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([
    coinDetailsMiddleware,
    ratesMiddleware,
    candlesMiddleware,
  ]);

export const store = configureStore({
  reducer,
  middleware,
  devTools: import.meta.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
