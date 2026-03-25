import type { AxiosResponse } from 'axios';
import type { Product, ProductCategory, ProductDetails, ProductPageResponse } from '../interfaces/products';
import { axiosInstance } from '../libs/axios';
import axios from 'axios';
import { CustomError } from '../utils/CustomError';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category: ProductCategory | null;
  search?: string;
}

interface GetProducts extends GetProductsParams {
  signal: AbortSignal;
}

export const getProducts = async ({ page = 0, limit = 8, category, search, signal }: GetProducts) => {
  let url = `products?page=${page}&limit=${limit}`;

  if (category) url += `&category=${category}`;
  if (search) url += `&name=${search}`;

  try {
    const response: AxiosResponse<ProductPageResponse> = await axiosInstance.get(url, { signal });

    const { page: currentPage, isLast } = response.data;

    const nextCursor = isLast ? undefined : currentPage + 1;
    return { data: response.data, nextCursor };
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

interface GetProductIdParams {
  id: string;
  signal: AbortSignal;
}

export const getProductId = async ({ id, signal }: GetProductIdParams) => {
  try {
    const response: AxiosResponse<ProductDetails> = await axiosInstance.get(`products/${id}`, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new CustomError(error.response?.data.message || error.response?.data.message, error.response?.status);
  }
};

export const getProductsByMarketer = async (marketerId: string) => {
  try {
    const response: AxiosResponse<Product[]> = await axiosInstance.get(`/products/marketer/${marketerId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new CustomError(error.response?.data.message || error.response?.data.message, error.response?.status);
  }
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const { data } = await axiosInstance.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateProduct = async ({ id, formData }: { id: string; formData: FormData }): Promise<Product> => {
  const { data } = await axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};

export const updateProductStock = async ({ id, quantityAdjustment }: { id: string; quantityAdjustment: number }) => {
  try {
    const response: AxiosResponse<Product> = await axiosInstance.patch(`/products/${id}/stock`, { quantityAdjustment });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new CustomError(error.response?.data.message || error.response?.data.message, error.response?.status);
  }
};
