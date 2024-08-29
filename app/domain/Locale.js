export const defaultLocale = 'en-US';
export const defaultCurrency = 'usd';

export const currencyToLocaleMapping = {
  usd: 'en-US',
  eur: 'de-DE',
  gbp: 'en-GB',
};

export const supportedCurrencies = Object.keys(currencyToLocaleMapping);
