import Axios from 'axios';
import Cookies from 'js-cookie';
import authApi from '@/api/authApi';

const baseURL = process.env.NEXT_PUBLIC_DEV_API_URL;

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DEV_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      config.headers.Authorization = 'Bearer NONE';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  async (response) => {
    console.log(response.config.url, response.config.data, response.status);
    return response;
  },
  async (error) => {
    console.log(error.response);
    console.log(error.response.status);
    if (error.response && error.response.status == 401) {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const res = await authApi.reissueToken(refreshToken);
          Cookies.set('accessToken', res.accessToken);
          console.log('Refreshed token successfully!');
          const accessToken = res.accessToken;
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return await axios(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token:', err);
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
        }
      } else {
        console.log('No refresh token');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status == 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
