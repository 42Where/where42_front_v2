import { Admin } from '@/types/Admin';
import { axios } from '@/lib/Axios';

const adminApi = {
  getMyStatus: async (): Promise<Admin> => {
    try {
      const response = await axios.get('/v3/admin/status');
      return response.data;
    } catch (error) {
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
