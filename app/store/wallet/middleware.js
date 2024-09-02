import { transactionTypes } from '@/domain/Transactions';

import createMiddleware from '@/store/middlewareCreator';

import {
  selectWalletCoinAmount,
  selectWalletUSDAmount,
} from './selectors';

import {
  transactionFailure,
  transactionRequested,
  transactionSuccess,
} from './actions';

const validateTransaction = async (store, next, action) => {
  next(action);

  const { dispatch, getState } = store;

  const {
    coinID,
    type,
    coinAmount,
    usdAmount,
  } = action.payload;

  const walletUSDAmount  = selectWalletUSDAmount(getState());
  const walletCoinAmount = selectWalletCoinAmount(coinID)(getState());

  if (
    type === transactionTypes.BUYING &&
    walletUSDAmount < usdAmount
  ) return dispatch(transactionFailure('Amount over balance'));

  if (type === transactionTypes.SELLING) {
    if (!walletCoinAmount) return dispatch(transactionFailure('No coin amount in wallet'));
    if (walletCoinAmount < coinAmount) return dispatch(transactionFailure('Coin amount in wallet insufficient'));
  }

  dispatch(transactionSuccess(action.payload));
};

const handlers = {
  [transactionRequested.type]: validateTransaction,
};

const middleware = createMiddleware(handlers);

export default middleware;
