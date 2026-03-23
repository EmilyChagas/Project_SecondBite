import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const imgUrl = `${BASE_URL}/files/images/`;
