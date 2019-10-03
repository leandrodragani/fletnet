const isCalculatingSummarySelector = state => state.addOrder.isCalculatingSummary;
const summarySuccessSelector = state => state.addOrder.isCalculatingSummarySuccess;
const orderValueSelector = state => state.addOrder.orderSummary.value;
const polylineSelector = state => state.addOrder.orderSummary.polyline;
const durationSelector = state => state.addOrder.orderSummary.duration;
const distanceSelector = state => state.addOrder.orderSummary.distance;
const typeSelector = state => state.addOrder.orderSummary.orderType;
const overviewPolylineSelector = state => state.addOrder.orderSummary.overview_polyline;

export const Selectors = {
  isCalculatingSummarySelector,
  summarySuccessSelector,
  orderValueSelector,
  polylineSelector,
  durationSelector,
  distanceSelector,
  typeSelector,
  overviewPolylineSelector
};
