import { GetMyInfo, Logout } from '@/types/api/auth';
import { axios } from '@/lib/Axios';
import Cookies from 'js-cookie';

const getMyInfo: GetMyInfo = async () => {
  const response = await axios.get('/v3/member');
  return response.data;
};

const logout: Logout = async () => {
  const response = await axios.post('/v3/logout');
  console.log(response.data);
  Cookies.remove('accessToken', { domain: '.where42.kr' });
};

export const authApi = {
  getMyInfo,
  logout,
};
