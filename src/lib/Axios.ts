import Axios from 'axios';
import Cookies from 'js-cookie';

export const tokenAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    const newConfig = config;
    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      newConfig.headers.Authorization = 'Bearer NONE';
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);
