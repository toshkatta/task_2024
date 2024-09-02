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
  coinHistoryMiddleware,
  coinHistoryReducer,
} from './coinHistory';
import {
  coinsMiddleware,
  coinsReducer,
} from './coins';
import {
  walletMiddleware,
  walletReducer,
} from './wallet';

const reducer = {
  coinHistory: coinHistoryReducer,
  coinDetails: coinDetailsReducer,
  coins: coinsReducer,
  rates: ratesReducer,
  wallet: walletReducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([
    coinDetailsMiddleware,
    ratesMiddleware,
    coinHistoryMiddleware,
    coinsMiddleware,
    walletMiddleware,
  ]);

export const store = configureStore({
  reducer,
  middleware,
  devTools: import.meta.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
