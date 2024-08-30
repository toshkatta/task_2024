import { supportedCurrencies, supportedTimeIntervals } from '@/domain/Rates';
import { reverseObject } from '@/domain/Parsing';

const currencyToRateIDMapping = {
  [supportedCurrencies.EUR]: 'euro',
  [supportedCurrencies.GBP]: 'british-pound-sterling',
  [supportedCurrencies.USD]: 'united-states-dollar',
};

const rateIDToCurrencyMapping = reverseObject(currencyToRateIDMapping);

export const currencyToRateID = (currency) => currencyToRateIDMapping[currency];

export const APIRateToRate = (rate) => ({
  ...rate,
  rateUsd: parseFloat(rate.rateUsd),
  rateID: rate.id,
  id: rateIDToCurrencyMapping[rate.id],
});

const intervalToAPIIntervalMapping = {
  [supportedTimeIntervals.DAY]: 'm5',
  [supportedTimeIntervals.FIVE_DAYS]: 'h1',
  [supportedTimeIntervals.MONTH]: 'h6',
  [supportedTimeIntervals.YEAR]: 'h60',
  [supportedTimeIntervals.FIVE_YEARS]: 'h300',
};

export const intervalToAPIInterval = (interval) => intervalToAPIIntervalMapping[interval];

const intervalToAPIStartTimeMapping = {
  [supportedTimeIntervals.DAY]: () => new Date().setDate(new Date().getDate() - 1),
  [supportedTimeIntervals.FIVE_DAYS]: () => new Date().setDate(new Date().getDate() - 5),
  [supportedTimeIntervals.MONTH]: () => new Date().setMonth(new Date().getMonth() - 1),
  [supportedTimeIntervals.YEAR]: () => new Date().setFullYear(new Date().getFullYear() - 1),
  [supportedTimeIntervals.FIVE_YEARS]: () => new Date().setFullYear(new Date().getFullYear() - 5),
};

export const intervalToAPIStartTime = (interval) => intervalToAPIStartTimeMapping[interval]();
