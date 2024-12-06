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

axios.interceptors.response.use(
  async (response) =>
    // console.log(response.config.url, response.config.data, response.status);
    response,
  async (error) => {
    console.log(error.response);
    console.log(error.response.status);
    if (error.response && error.response.status === 401) {
      try {
        const res = await tokenAxios.post('/v3/jwt/reissue').then((r) => r.data);
        console.log('Refreshed token successfully!');
        const { accessToken } = res;
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axios(originalRequest);
      } catch (err) {
        console.error('Failed to refresh token:', err);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

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
