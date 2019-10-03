const isFetchingAverageSelector = state => state.reputation.isFetchingAverage;
const isFetchingUsersCalificationsSelector = state => state.reputation.isFetchingUsersCalifications;
const averageSelector = state => state.reputation.average;
const calificationsSelector = state => state.reputation.califications;

export const Selectors = {
  isFetchingAverageSelector,
  isFetchingUsersCalificationsSelector,
  averageSelector,
  calificationsSelector
};
