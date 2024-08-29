import { createReducer } from '@reduxjs/toolkit';

import { arrayToById } from '@/infrastructure/API/parsing/general';

import {
  ratesFailure,
  ratesLoaded,
} from './actions';

const initialState = {
  byID: {},
  allIDs: [],
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
});

export default ratesReducer;
