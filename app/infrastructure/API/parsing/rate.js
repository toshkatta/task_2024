import { supportedCurrencies } from '@/domain/Rates';
import { reverseObject } from '@/domain/Parsing';

const supportedCurrencyToRateIDMapping = {
  [supportedCurrencies.EUR]: 'euro',
  [supportedCurrencies.GBP]: 'british-pound-sterling',
  [supportedCurrencies.USD]: 'united-states-dollar',
};

const rateIDToSupportedCurrencyMapping = reverseObject(supportedCurrencyToRateIDMapping);

export const currencyToRateID = (currency) => supportedCurrencyToRateIDMapping[currency];

export const APIRateToRate = (rate) => ({
  ...rate,
  rateUsd: parseFloat(rate.rateUsd),
  rateID: rate.id,
  id: rateIDToSupportedCurrencyMapping[rate.id],
});
