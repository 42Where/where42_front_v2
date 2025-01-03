import { axios } from '@/lib/Axios';
import { ClusterName, ActiveClusterUser } from '@/types/Cluster';

const clusterApi = {
  getClusterUsers: async ({ cluster }: { cluster: ClusterName }): Promise<ActiveClusterUser[]> => {
    const response = await axios.get(`/v3/cluster/${cluster}`);
    return response.data.members;
  },
};

export default clusterApi;
