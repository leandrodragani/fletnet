const isFetchingSelector = (state) => state.login.isFetching;
const isFetchingGoogleSelector = (state) => state.login.isFetchingGoogleSelector;

export const Selectors = {
  isFetchingSelector,
  isFetchingGoogleSelector
};
