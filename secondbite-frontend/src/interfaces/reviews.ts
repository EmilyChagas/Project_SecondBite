export interface Review {
  id: string;
  rating: number;
  comment: string;
  consumerName: string;
  consumerId: string;
  createdAt: string;
  modifiedAt?: string;
}

export interface CreateReviewDto {
  marketerId: string;
  rating: number;
  comment: string;
}
