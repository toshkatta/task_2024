import { createAction } from "@reduxjs/toolkit";

export const coinDetailsVisited = createAction('CoinDetails/VISITED');
export const coinDetailsLoaded  = createAction('CoinDetails/LOADED');
export const coinDetailsFailure = createAction('CoinDetails/FAILURE');
