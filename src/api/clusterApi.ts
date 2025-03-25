import { axios } from '@/lib/Axios';
import { GetClusterUsers } from '@/types/api/cluster';

const getClusterUsers: GetClusterUsers = async ({ cluster }) => {
  const response = await axios.get(`/v3/location/active/${cluster}`);
  return response.data.members;
};

export const clusterApi = { getClusterUsers };
