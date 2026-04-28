import axios from 'axios';
import type { CreateReviewDto, Review } from '../interfaces/reviews';
import { axiosInstance } from '../libs/axios';
import { CustomError } from '../utils/CustomError';
import type { PaginatedResponse } from '../interfaces/products';

export const getReviewsByMarketer = async (marketerId: string) => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Review>>(`/reviews/marketer/${marketerId}`);
    const { page: currentPage, isLast } = response.data;

    const nextCursor = isLast ? undefined : currentPage + 1;
    return { data: response.data, nextCursor };
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const createReview = async (payload: CreateReviewDto) => {
  try {
    const { data } = await axiosInstance.post<Review>('/reviews', payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const updateReview = async ({
  id,
  rating,
  comment,
}: {
  id: string;
  rating: number;
  comment: string;
}): Promise<Review> => {
  const { data } = await axiosInstance.put(`/reviews/${id}`, { rating, comment });
  return data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/reviews/${id}`);
};
