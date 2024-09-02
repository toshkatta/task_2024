export const supportedRates = {
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp',
};

export const defaultRate = supportedRates.USD;

export const rateToLocaleMapping = {
  [supportedRates.USD]: 'en-US',
  [supportedRates.EUR]: 'en-EU',
  [supportedRates.GBP]: 'en-GB',
};

export const supportedTimeIntervals = {
  DAY: 'day',
  FIVE_DAYS: 'five_days',
  MONTH: 'month',
  YEAR: 'year',
  FIVE_YEARS: 'five_years',
};

export const defaultTimeInterval = supportedTimeIntervals.DAY;
