import { createReducer } from '@reduxjs/toolkit';

import {
  defaultCurrency,
  defaultTimeInterval,
} from '@/domain/Rates';
import { arrayToById } from '@/domain/Parsing';

import {
  intervalSelected,
  rateSelected,
  ratesFailure,
  ratesLoaded,
} from './actions';

const initialState = {
  byID: {},
  allIDs: [],
  selectedID: defaultCurrency,
  selectedInterval: defaultTimeInterval,
  isLoading: true,
  hasError: false,
};

const ratesReducer = createReducer(initialState, (builder) => {
  builder.addCase(ratesLoaded, (state, action) => {
    state.allIDs = action.payload.map((rate) => rate.id);
    state.byID = arrayToById(action.payload);
    state.isLoading = false;
    state.hasError = false;
  });

  builder.addCase(ratesFailure, (state) => {
    state.allIDs = initialState.allIDs;
    state.byID = initialState.byID;
    state.isLoading = false;
    state.hasError = true;
  });

  builder.addCase(rateSelected, (state, action) => {
    state.selectedID = action.payload;
  });

  builder.addCase(intervalSelected, (state, action) => {
    state.selectedInterval = action.payload;
  });
});

export default ratesReducer;
