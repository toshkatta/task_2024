export const getRandomPercent = () => Math.ceil(Math.random() * 99);
export const getRandomPercentWithNegative = () => Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
export const getRandomInteger = (max) => Math.ceil(Math.random() * max);
export const getRandomNumberBetween = (min, max) => Math.random() * (max - min) + min;
