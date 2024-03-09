import User from '@/types/User';
import axios from '@/lib/Axios';

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get('/v3/member');
    return response.data;
  },
};

export default authApi;
