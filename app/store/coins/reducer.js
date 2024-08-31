import { createReducer, current } from '@reduxjs/toolkit';

import { coinListTypes } from '@/domain/Coins';
import { arrayToById } from '@/domain/Parsing';

import {
  coinToggled,
  coinsFailure,
  coinsLoaded,
  coinsListTypeChanged,
} from './actions';

const initialState = {
  byID: {},
  allIDs: [],
  watchlistedIDs: [],
  isLoading: true,
  hasError: false,
  listType: coinListTypes.WATCHLIST,
};

const coinsReducer = createReducer(initialState, (builder) => {
  builder.addCase(coinsLoaded, (state, action) => {
    state.allIDs = action.payload.map((coin) => coin.id);
    state.byID = arrayToById(action.payload);
    state.isLoading = false;
    state.hasError = false;
  });

  builder.addCase(coinsFailure, (state) => {
    state.allIDs = initialState.allIDs;
    state.byID = initialState.byID;
    state.isLoading = false;
    state.hasError = true;
  });

  builder.addCase(coinToggled, (state, action) => {
    const index = current(state.watchlistedIDs).indexOf(action.payload);

    if (index === -1) {
      state.watchlistedIDs.push(action.payload);
      return;
    }

    state.watchlistedIDs.splice(index, 1);
  });

  builder.addCase(coinsListTypeChanged, (state, action) => {
    state.listType = action.payload;
  });
});

export default coinsReducer;
