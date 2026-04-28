export interface DiscountSuggestion {
  productId: string;
  productName: string;
  suggestedDiscountPercentage: number;
  reason: string;
}

export interface MarketerDashboard {
  pendingOrdersCount: number;
  acceptedOrdersCount: number;
  revenueToday: number;
  activeProductsCount: number;
  expiringSoonCount: number;
  suggestedDiscounts: DiscountSuggestion[];
  savedMoneyToday: number;
  savedItemsToday: number;
}
