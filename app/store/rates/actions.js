import { createAction } from '@reduxjs/toolkit';

export const ratesLoaded  = createAction('Rates/LOADED');
export const ratesFailure = createAction('Rates/FAILURE');
