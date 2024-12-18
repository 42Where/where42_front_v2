import { Admin } from '@/types/Admin';
import { axios } from '@/lib/Axios';

const adminApi = {
  getMyStatus: async (): Promise<Admin> => {
    try {
      const response = await axios.get('/v3/admin/status');
      return response.data;
    } catch (error) {
      // NOTE: 현재는 status 가져올 때 일반 유저면 403인데 이제 곧 200으로 처리될 것임.
      return {
        intraName: '',
        role: 'USER',
      };
    }
  },
  getAllStatus: async (): Promise<Admin[]> => {
    const response = await axios.get('/v3/admin/status/all');
    return response.data;
  },
  changeStatus: async ({
    intraName,
    role,
  }: {
    intraName: string;
    role: string;
  }): Promise<Admin | String> => {
    const response = await axios.post('/v3/admin/status', {
      intraName,
      role,
    });
    return response.data;
  },
};

export default adminApi;
