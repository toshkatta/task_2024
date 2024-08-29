const selectCoinDetailsState = (state) => state.coinDetails;

export const selectCoinName          = (state) => selectCoinDetailsState(state).name;
export const selectCoinSymbol        = (state) => selectCoinDetailsState(state).symbol;
export const selectCoinPrice         = (state) => selectCoinDetailsState(state).priceUsd;
export const selectCoinChangePercent = (state) => selectCoinDetailsState(state).changePercent24Hr;
