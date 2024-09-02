import { createReducer, current } from '@reduxjs/toolkit';

import {
  maximumFiatTransactionAmount,
  transactionTypes,
} from '@/domain/Transactions';

import {
  transactionFailure,
  transactionRequested,
  transactionSuccess,
} from './actions';

const initialState = {
  byID: {},
  usd: maximumFiatTransactionAmount,
  isLoading: false,
};

const walletReducer = createReducer(initialState, (builder) => {
  builder.addCase(transactionRequested, (state) => {
    state.isLoading = true;
    state.hasError = false;
  });

  builder.addCase(transactionSuccess, (state, action) => {
    const {
      coinID,
      type,
      coinAmount,
      usdAmount,
    } = action.payload;

    const currentUSDAmount = current(state).usd;
    const currentByID = current(state.byID);
    const currentCoinAmount = currentByID[coinID];

    state.isLoading = false;
    state.hasError = false;

    if (type === transactionTypes.BUYING) {
      state.usd = currentUSDAmount - usdAmount;

      state.byID[coinID] = currentCoinAmount
        ? currentCoinAmount + coinAmount
        : coinAmount;

      return;
    }

    state.usd = currentUSDAmount + usdAmount;
    state.byID[coinID] = currentCoinAmount - coinAmount;
  });

  builder.addCase(transactionFailure, (state) => {
    state.isLoading = false;
    state.hasError = true;
  });
});

export default walletReducer;
