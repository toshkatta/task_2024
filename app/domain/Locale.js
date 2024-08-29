export const defaultLocale = 'en-US';
export const defaultCurrency = 'usd';

export const supportedCurrencies = {
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp',
};

export const currencyToLocaleMapping = {
  [supportedCurrencies.USD]: 'en-US',
  [supportedCurrencies.EUR]: 'de-DE',
  [supportedCurrencies.GBP]: 'en-GB',
};
