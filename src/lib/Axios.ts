import Axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const axios = Axios.create({
  baseURL: undefined,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    console.log('에러 났음');
    console.log(error.response);
    console.log(error.response.status);
    const router = useRouter();
    if (error.response && error.response.status === 401) {
      const prevAccessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const res = await axios.post('/v3/jwt/reissue', { refreshToken });
          console.log(res);
          console.log(res.data);
          Cookies.set('accessToken', res.data.accessToken);
          console.log('Refreshed token successfully!');
          // const accessToken = res.data.accessToken;
          // const originalRequest = error.config;
          // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          // return await axios(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token:', err);
        }
      } else {
        console.log('No refresh token');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
