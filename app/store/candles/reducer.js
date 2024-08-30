import { createReducer } from '@reduxjs/toolkit';

import { defaultTimeInterval } from '@/domain/Rates';

import {
  candlesLoaded,
  intervalSelected
} from './actions';

const initialState = {
  candles: [],
  selectedInterval: defaultTimeInterval,
};

const candlesReducer = createReducer(initialState, (builder) => {
  builder.addCase(candlesLoaded, (state, action) => {
    state.candles = action.payload;
  });

  builder.addCase(intervalSelected, (state, action) => {
    state.selectedInterval = action.payload;
  });
});

export default candlesReducer;
