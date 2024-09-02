import { createAction } from '@reduxjs/toolkit';

export const transactionRequested = createAction('Wallet/TRANSACTION_REQUESTED');
export const transactionSuccess   = createAction('Wallet/TRANSACTION_SUCCESS');
export const transactionFailure   = createAction('Wallet/TRANSACTION_FAILURE');
