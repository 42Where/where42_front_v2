import Axios from 'axios';
import Cookies from 'js-cookie';

// Axios without interceptors
export const tokenAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Axios with interceptors
export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

type ReissueTokenResponse = { accessToken: string };

const reissueToken = async (): Promise<ReissueTokenResponse> => {
  const intraId = Cookies.get('intraId');
  if (!intraId || intraId === '0') throw new Error('Intra ID not found');
  const response = await tokenAxios.post('/v3/jwt/reissue', {
    intraId,
  });
  return response.data;
};

// Reissuing logic
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
          const res = await reissueToken();
          console.log('Refreshed token successfully!');
          const newAccessToken = res.accessToken;
          isRefreshing = false;
          onTokenRefreshed(newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          // 새로운 액세스 토큰의 쿠키 세팅(Cookie.set)은 백엔드에서 해준다. 토큰 생성 및 세팅의 책임을 백엔드로 분리했다.
          return await axios(config); // 첫 번째 요청 재시도
        } catch (err) {
          console.error('Failed to refresh token:', err);
          isRefreshing = false;
          Cookies.remove('accessToken', { domain: '.where42.kr' });
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
    if (accessToken) newConfig.headers.Authorization = `Bearer ${accessToken}`;
    else newConfig.headers.Authorization = 'Bearer NONE';
    return newConfig;
  },
  (error) => Promise.reject(error),
);
