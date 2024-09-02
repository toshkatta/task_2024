export const totalCryptoMarket = 700600000000 / 0.33;
export const getPercentOfTotalMarket = (marketCap) => Math.round(marketCap / totalCryptoMarket * 100);
