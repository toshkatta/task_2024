import { createAction } from '@reduxjs/toolkit';

export const coinHistoryLoaded = createAction('CoinHistory/LOADED');
export const intervalSelected  = createAction('CoinHistory/INTERVAL_SELECTED');
