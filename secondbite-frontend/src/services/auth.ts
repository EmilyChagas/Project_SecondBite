import axios, { type AxiosResponse } from 'axios';
import { CustomError } from '../utils/CustomError';
import type { AuthResponse, BodyLogin, Consumer, Marketer } from '../interfaces/auth';
import { axiosInstance } from '../libs/axios';
import type { ConsumerRegisterType, MarketerRegisterType } from '../schemas/register';

export const postLogin = async ({ email, password }: BodyLogin) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('auth/login', { email, password });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
    throw error;
  }
};

export const getCheckAuth = async (allowedRoles?: string[]) => {
  try {
    const res: AxiosResponse<Marketer | Consumer> = await axiosInstance.get('/auth/check');
    const user = res.data;
    let isAllowed = true;

    if (allowedRoles && !allowedRoles.includes(user.roles[0])) isAllowed = false;

    return { user, isAllowed };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('auth/logout');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
    throw error;
  }
};

export const registerConsumer = async (payload: Omit<ConsumerRegisterType, 'confirmPassword'>) => {
  try {
    const response = await axiosInstance.post('auth/register/consumer', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
    throw error;
  }
};

export const registerMarketer = async (payload: Omit<MarketerRegisterType, 'confirmPassword'>) => {
  try {
    const response = await axiosInstance.post('auth/register/marketer', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
    throw error;
  }
};
