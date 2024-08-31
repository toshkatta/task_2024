import { createAction } from '@reduxjs/toolkit';

export const coinsLoaded          = createAction('Coins/LOADED');
export const coinsFailure         = createAction('Coins/FAILURE');
export const coinToggled          = createAction('Coins/TOGGLED');
export const coinsListTypeChanged = createAction('Coins/LIST_TYPE_CHANGED');
