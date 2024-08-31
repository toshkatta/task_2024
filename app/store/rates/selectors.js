const selectRatesState = (state) => state.rates;

export const selectAreRatesLoading = (state) => selectRatesState(state).isLoading;
export const selectRateIDs         = (state) => selectRatesState(state).allIDs;
export const selectSelectedRateID  = (state) => selectRatesState(state).selectedID;
export const selectRateById        = (id) => (state) => selectRatesState(state).byID[id];
export const selectRateSymbolById  = (id) => (state) => selectRatesState(state).byID[id]?.currencySymbol;
export const selectSelectedRate    = (state) => selectRateById(selectSelectedRateID(state))(state);
