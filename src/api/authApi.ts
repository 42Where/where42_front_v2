import { User } from '@/types/User';
import { axios, tokenAxios } from '@/lib/Axios';
import Cookies from 'js-cookie';

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get('/v3/member');
    return response.data;
  },
  reissueToken: async (): Promise<any> => {
    const response = await tokenAxios.post('/v3/jwt/reissue');
    return response.data;
  },
};

axios.interceptors.response.use(
  async (response) =>
    // console.log(response.config.url, response.config.data, response.status);
    response,
  async (error) => {
    console.log(error.response);
    console.log(error.response.status);
    if (error.response && error.response.status === 401) {
      try {
        const res = await authApi.reissueToken();
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

export default authApi;
