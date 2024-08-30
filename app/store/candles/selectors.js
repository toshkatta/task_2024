const selectCandlesState = (state) => state.candles;

export const selectCandles          = (state) => selectCandlesState(state).candles;
export const selectSelectedInterval = (state) => selectCandlesState(state).selectedInterval;
