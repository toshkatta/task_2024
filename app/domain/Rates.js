export const defaultLocale = 'en-US';

export const supportedCurrencies = {
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp',
};

export const defaultCurrency = supportedCurrencies.USD;

export const currencyToLocaleMapping = {
  [supportedCurrencies.USD]: 'en-US',
  [supportedCurrencies.EUR]: 'en-DE',
  [supportedCurrencies.GBP]: 'en-GB',
};

export const supportedTimeIntervals = {
  DAY: 'day',
  FIVE_DAYS: 'five_days',
  MONTH: 'month',
  YEAR: 'year',
  FIVE_YEARS: 'five_years',
};

export const defaultTimeInterval = supportedTimeIntervals.DAY;
