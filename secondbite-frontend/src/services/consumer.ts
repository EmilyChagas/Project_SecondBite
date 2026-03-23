import type { AxiosResponse } from 'axios';
import type { AuthResponse, UpdateConsumer } from '../interfaces/auth';
import { CustomError } from '../utils/CustomError';
import axios from 'axios';
import { axiosInstance } from '../libs/axios';

interface UpdateConsumerParams {
  id: string;
  consumerData: UpdateConsumer;
}

export const updateConsumer = async ({ id, consumerData }: UpdateConsumerParams) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.put(`consumers/${id}`, { ...consumerData });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const deleteConsumer = async ({ id }: { id: string }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.delete(`consumers/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};
