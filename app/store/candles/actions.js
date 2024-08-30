import { createAction } from '@reduxjs/toolkit';

export const candlesLoaded    = createAction('Candles/LOADED');
export const intervalSelected = createAction('Candles/INTERVAL_SELECTED');
