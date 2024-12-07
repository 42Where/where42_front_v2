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

let isRefreshing = false; // 토큰 재발급 상태
let refreshSubscribers: Array<Function> = []; // 재발급 대기 중인 요청 리스트

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addSubscriber = (callback: Function) => {
  refreshSubscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    console.log(response, response.status);
    if (response && response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await tokenAxios.post('/v3/jwt/reissue').then((r) => r.data);
          console.log('Refreshed token successfully!');
          const newAccessToken = res;
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          onTokenRefreshed(newAccessToken);
        } catch (err) {
          console.error('Failed to refresh token:', err);
          isRefreshing = false;
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }
      return new Promise((resolve) => {
        addSubscriber((newToken: string) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(axios(config));
        });
      });
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
