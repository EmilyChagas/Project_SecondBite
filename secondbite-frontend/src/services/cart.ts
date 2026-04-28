import axios from 'axios';
import { axiosInstance } from '../libs/axios';
import type { AxiosResponse } from 'axios';
import { CustomError } from '../utils/CustomError';
import type { Cart } from '../interfaces/cart';

export const getCart = async () => {
  try {
    const response: AxiosResponse<Cart> = await axiosInstance.get('cart');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const addToCart = async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
  try {
    const response: AxiosResponse<Cart> = await axiosInstance.post('cart/items', {
      productId,
      quantity,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const deleteCartItem = async ({ id }: { id: string }) => {
  try {
    const response: AxiosResponse<Cart> = await axiosInstance.delete(`cart/items/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

interface UpdateCartItemType {
  id: string;
  productId: string;
  quantity: number;
}

export const updateCartItem = async ({ id, productId, quantity }: UpdateCartItemType) => {
  try {
    const response: AxiosResponse<Cart> = await axiosInstance.put(`cart/items/${id}`, { productId, quantity });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const deleteCart = async () => {
  try {
    await axiosInstance.delete('cart');
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};
