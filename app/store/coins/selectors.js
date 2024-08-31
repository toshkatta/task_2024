const selectCoinsState = (state) => state.coins;

export const selectAreCoinsLoading     = (state) => selectCoinsState(state).isLoading;
export const selectCoinIDs             = (state) => selectCoinsState(state).allIDs;
export const selectWatchlistedCoinIDs  = (state) => selectCoinsState(state).watchlistedIDs;
export const selectCoinById            = (id) => (state) => selectCoinsState(state).byID[id];
export const selectCoinListType        = (state) => selectCoinsState(state).listType;
export const selectIsCoinWatchlisted   = (id) => (state) => selectWatchlistedCoinIDs(state).includes(id);
export const selectHasWatchlistedCoins = (state) => selectWatchlistedCoinIDs(state).length > 0;
