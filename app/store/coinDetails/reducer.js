import { createReducer } from '@reduxjs/toolkit';

import {
  coinDetailsLoaded,
  coinDetailsVisited,
} from './actions';

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
  builder.addCase(coinDetailsLoaded, (state, action) => {
    state.id                = action.payload.id;
    state.rank              = action.payload.rank;
    state.symbol            = action.payload.symbol;
    state.name              = action.payload.name;
    state.supply            = action.payload.supply;
    state.maxSupply         = action.payload.maxSupply;
    state.marketCapUsd      = action.payload.marketCapUsd;
    state.volumeUsd24Hr     = action.payload.volumeUsd24Hr;
    state.priceUsd          = action.payload.priceUsd;
    state.changePercent24Hr = action.payload.changePercent24Hr;
    state.vwap24Hr          = action.payload.vwap24Hr;
  });
});

export default coinDetailsReducer;
