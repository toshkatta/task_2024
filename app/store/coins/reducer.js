import { createReducer, current } from '@reduxjs/toolkit';

import { coinListTypes } from '@/domain/Coins';

import { coinDetailsLoaded, coinDetailsVisited } from '../coinDetails/actions';

import {
  coinToggled,
  coinsFailure,
  coinsLoaded,
  coinsListTypeChanged,
  coinsRequested,
} from './actions';

const initialState = {
  byID: {},
  allIDs: [],
  watchlistedIDs: [],
  isLoading: true,
  hasError: false,
  listType: coinListTypes.ALL,
};

const coinsReducer = createReducer(initialState, (builder) => {
  builder.addCase(coinsRequested, (state) => {
    state.isLoading = true;
    state.hasError = false;
  });

  builder.addCase(coinsLoaded, (state, action) => {
    const currentByID = current(state.byID);
    const currentIDs = current(state.allIDs);
    const newIDs = action.payload.map((coin) => coin.id);
    const allIDs = currentIDs.concat(newIDs);
    const deduplicated = new Set(allIDs);

    state.allIDs = Array.from(deduplicated);

    state.byID = action.payload.reduce((byId, coin) => ({
      ...byId,
      [coin.id]: coin,
    }), currentByID);

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
    state.listType = coinListTypes.WATCHLIST;

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

  builder.addCase(coinDetailsVisited, (state) => {
    const currentWatchlist = current(state.watchlistedIDs);
    const currentByID = current(state.byID);

    state.byID = currentWatchlist.reduce((byID, id) => ({
      ...byID,
      [id]: currentByID[id],
    }), {});

    state.allIDs = initialState.allIDs;
  });

  builder.addCase(coinDetailsLoaded, (state, action) => {
    state.byID[action.payload.id] = action.payload;
  });
});

export default coinsReducer;