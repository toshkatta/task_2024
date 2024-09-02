import { createReducer } from '@reduxjs/toolkit';

import { transactionTypes } from '@/domain/Transactions';

import {
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';
import { transactionSuccess } from '../wallet/actions';

const initialState = {
  id: "",
  rank: 0,
  symbol: "",
  name: "",
  supply: 0,
  maxSupply: 0,
  marketCapUsd: 0,
  volumeUsd24Hr: 0,
  priceUsd: 0,
  changePercent24Hr: 0,
  vwap24Hr: 0,
};

const coinDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(coinDetailsVisited, () => initialState);
  builder.addCase(coinDetailsLoaded, (state, action) => action.payload);
  builder.addCase(transactionSuccess, (state, action) => {
    if (action.payload.type === transactionTypes.BUYING) {
      state.volumeUsd24Hr += action.payload.usdAmount;
      return;
    }

    state.volumeUsd24Hr -= action.payload.usdAmount;
  });
});

export default coinDetailsReducer;
