import { configureStore } from '@reduxjs/toolkit';

import {
  coinDetailsMiddleware,
  coinDetailsReducer,
} from './coinDetails';

const reducer = {
  coinDetails: coinDetailsReducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .concat([
    coinDetailsMiddleware,
  ]);

export const store = configureStore({
  reducer,
  middleware,
  devTools: import.meta.env.NODE_ENV !== 'production',
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
