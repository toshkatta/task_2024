const selectCoinDetailsState = (state) => state.coinDetails;

export const selectCoinID            = (state) => selectCoinDetailsState(state).id;
export const selectCoinName          = (state) => selectCoinDetailsState(state).name;
export const selectCoinSymbol        = (state) => selectCoinDetailsState(state).symbol;
export const selectCoinPrice         = (state) => selectCoinDetailsState(state).priceUsd;
export const selectCoinChangePercent = (state) => selectCoinDetailsState(state).changePercent24Hr;
export const selectCoinMarketCap     = (state) => selectCoinDetailsState(state).marketCapUsd;
export const selectCoinVolume        = (state) => selectCoinDetailsState(state).volumeUsd24Hr;
export const selectCoinSupply        = (state) => selectCoinDetailsState(state).supply;
export const selectCoinMaxSupply     = (state) => selectCoinDetailsState(state).maxSupply || 0;
export const selectCoinRank          = (state) => selectCoinDetailsState(state).rank;
