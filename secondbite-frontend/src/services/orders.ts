import type { AxiosResponse } from 'axios';
import type { Order, OrderListResponse, OrderStatus } from '../interfaces/orders';
import { axiosInstance } from '../libs/axios';
import axios from 'axios';
import { CustomError } from '../utils/CustomError';

export const checkout = async () => {
  try {
    const response: AxiosResponse<OrderListResponse> = await axiosInstance.post('orders');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const getOrders = async ({ status }: { status?: OrderStatus }) => {
  try {
    let url = 'orders';
    if (status) url += `?status=${status}`;

    const response: AxiosResponse<OrderListResponse> = await axiosInstance.get(url);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response: AxiosResponse<Order> = await axiosInstance.get(`orders/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const cancelOrder = async (id: string) => {
  try {
    const response: AxiosResponse<Order> = await axiosInstance.patch(`orders/${id}/cancel`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new CustomError(error.response?.data.message, error.response?.status);
    }
    throw error;
  }
};

export const acceptOrder = async (id: string) => {
  try {
    const response: AxiosResponse<Order> = await axiosInstance.patch(`orders/${id}/accept`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const markOrderReady = async (id: string) => {
  try {
    const response: AxiosResponse<Order> = await axiosInstance.patch(`orders/${id}/ready`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const completeOrder = async ({ id, deliveryCode }: { id: string; deliveryCode: string }) => {
  try {
    const response: AxiosResponse<Order> = await axiosInstance.patch(`orders/${id}/complete`, { deliveryCode });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};
