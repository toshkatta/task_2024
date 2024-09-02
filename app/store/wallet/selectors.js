const selectWalletState = (state) => state.wallet;

export const selectIsWalletLoading  = (state) => selectWalletState(state).isLoading;
export const selectWalletUSDAmount  = (state) => selectWalletState(state).usd;
export const selectWalletCoinAmount = (id) => (state) => selectWalletState(state).byID[id];
