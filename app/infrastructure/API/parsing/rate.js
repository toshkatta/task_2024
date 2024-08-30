import {
  supportedRates,
  supportedTimeIntervals,
} from '@/domain/Rates';
import { reverseObject } from '@/domain/Parsing';

const currencyToRateIDMapping = {
  [supportedRates.EUR]: 'euro',
  [supportedRates.GBP]: 'british-pound-sterling',
  [supportedRates.USD]: 'united-states-dollar',
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
  [supportedTimeIntervals.DAY]: 'm15',
  [supportedTimeIntervals.FIVE_DAYS]: 'h1',
  [supportedTimeIntervals.MONTH]: 'h6',
  [supportedTimeIntervals.YEAR]: 'd1',
  [supportedTimeIntervals.FIVE_YEARS]: 'd1',
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
