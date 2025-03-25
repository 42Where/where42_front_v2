import { axios } from '@/lib/Axios';
import { GetMyStatus, GetAllStatus, ChangeStatus } from '@/types/api/admin';

const getMyStatus: GetMyStatus = async () => {
  const response = await axios.get('/v3/admin/status');
  return response.data;
};

const getAllStatus: GetAllStatus = async () => {
  const response = await axios.get('/v3/admin/status/all');
  return response.data;
};

const changeStatus: ChangeStatus = async ({ intraName, role }) => {
  const response = await axios.post('/v3/admin/status', {
    intraName,
    role,
  });
  return response.data;
};

export const adminApi = {
  getMyStatus,
  getAllStatus,
  changeStatus,
};
