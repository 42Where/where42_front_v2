import User from '@/types/User';
import axios from '@/lib/Axios';
import Axios from 'axios';

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get('/v3/member/');
    return response.data;
  },
  reissueToken: async (refreshToken: string): Promise<any> => {
    console.log('reissueToken in authApi!');
    const tokenAxios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const response = await tokenAxios.post(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/v3/jwt/reissue`
    );
    return response.data;
  },
};

export default authApi;
