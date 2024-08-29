const selectRatesState = (state) => state.rates;

export const selectAreRateLoading = (state) => selectRatesState(state).isLoading;
export const selectRateIDs        = (state) => selectRatesState(state).allIDs;
export const selectRateById       = (id) => (state) => selectRatesState(state).byID[id];
export const selectRateSymbolById = (id) => (state) => selectRatesState(state).byID[id]?.currencySymbol;
