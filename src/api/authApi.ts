import { User } from '@/types/User';
import { axios } from '@/lib/Axios';
import Cookies from 'js-cookie';

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get('/v3/member');
    return response.data;
  },
  logout: async (): Promise<void> => {
    const response = await axios.post('/v3/logout');
    console.log(response.data);
    Cookies.remove('accessToken', { domain: '.where42.kr' });
  },
};

export default authApi;
