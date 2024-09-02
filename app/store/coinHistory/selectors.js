const selectCoinHistoryState = (state) => state.coinHistory;

export const selectCoinHistory      = (state) => selectCoinHistoryState(state).history;
export const selectSelectedInterval = (state) => selectCoinHistoryState(state).selectedInterval;
