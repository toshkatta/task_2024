import { supportedCurrencies } from '@/domain/Locale';
import createMiddleware from '@/store/middlewareCreator';
import CoinCapAPIClient from '@/infrastructure/API/http/CoinCapAPIClient';

import { applicationMounted } from '../app/actions';
import {
  ratesFailure,
  ratesLoaded,
} from './actions';

const loadRates = async (store, next, action) => {
  next(action);
  const { dispatch } = store;

  try {
    const responses = await Promise.all(
      Object.values(supportedCurrencies)
      .map((id) => CoinCapAPIClient.getRateByCurrency(id))
    );

    dispatch(ratesLoaded(responses));
  } catch (err) {
    console.log('rate error:', err);
    dispatch(ratesFailure(err));
  }
};

const handlers = {
  [applicationMounted.type]: loadRates,
};

const middleware = createMiddleware(handlers);

export default middleware;
