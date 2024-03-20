import User from '@/types/User';
import axios from '@/lib/Axios';

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get('/v3/member');
    return response.data;
  },
  reissueToken: async (refreshToken: string): Promise<any> => {
    const response = await axios.post(
      '/v3/jwt/reissue',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  },
};

export default authApi;
