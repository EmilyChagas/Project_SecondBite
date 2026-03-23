import type { AxiosResponse } from 'axios';
import type { Marketer } from '../interfaces/auth';
import { axiosInstance } from '../libs/axios';
import { CustomError } from '../utils/CustomError';
import axios from 'axios';
import type { UpdateMarketerType } from '../schemas/updateSchema';

export const getMarketerById = async (id: string) => {
  try {
    const response: AxiosResponse<Marketer> = await axiosInstance.get(`/marketers/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const getMarketersLocations = async () => {
  try {
    const response: AxiosResponse<Marketer[]> = await axiosInstance.get('marketers/map-locations');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

interface UpdateMarketerPayload {
  id: string;
  marketerData: UpdateMarketerType;
}

export const updateMarketer = async ({ id, marketerData }: UpdateMarketerPayload) => {
  try {
    const { data } = await axiosInstance.put<Marketer>(`/marketers/${id}`, marketerData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};

export const deleteMarketer = async (id: string) => {
  await axiosInstance.delete(`/marketers/${id}`);
};

export const applyFlashSale = async (data: { productIds: string[]; discountPercentage: number }) => {
  try {
    const response = await axiosInstance.post('/marketers/flash-sale', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};
