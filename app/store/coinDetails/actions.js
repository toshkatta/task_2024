import { createAction } from "@reduxjs/toolkit";

export const coinDetailsVisited = createAction('CoinDetails/VISITED', (id) => ({
  payload: id
}));
export const coinDetailsLoaded  = createAction('CoinDetails/LOADED', (coinDetails) => ({
  payload: coinDetails
}));
export const coinDetailsFailure = createAction('CoinDetails/FAILURE', (error) => ({
  payload: error
}));
