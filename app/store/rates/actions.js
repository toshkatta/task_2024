import { createAction } from '@reduxjs/toolkit';

export const ratesLoaded      = createAction('Rates/LOADED');
export const ratesFailure     = createAction('Rates/FAILURE');
export const rateSelected     = createAction('Rates/RATE_SELECTED');
export const intervalSelected = createAction('Rates/INTERVAL_SELECTED');
