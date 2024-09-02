import { createReducer } from '@reduxjs/toolkit';

import { defaultTimeInterval } from '@/domain/Rates';

import {
  coinHistoryLoaded,
  intervalSelected
} from './actions';

const initialState = {
  history: [],
  selectedInterval: defaultTimeInterval,
};

const coinHistoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(coinHistoryLoaded, (state, action) => {
    state.history = action.payload;
  });

  builder.addCase(intervalSelected, (state, action) => {
    state.selectedInterval = action.payload;
  });
});

export default coinHistoryReducer;
