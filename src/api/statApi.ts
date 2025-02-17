import { axios } from '@/lib/Axios';
import { ImacUsage, ClusterUsageResponse, PopularSeat } from '@/types/Stat';

const statApi = {
  getImacUsage: async (): Promise<ImacUsage> => {
    const response = await axios.get(`/v3/location/cluster/imacUsage`);
    return response.data;
  },
  getClusterUsage: async (): Promise<ClusterUsageResponse> => {
    const response = await axios.get(`/v3/location/cluster/usage`);
    return response.data.clusters;
  },
  getMyFavoriteSeats: async ({ count = 1 }: { count?: number }): Promise<string[]> => {
    const response = await axios.get('/v3/analytics/seat-history', {
      params: { count },
    });
    return response.data.seats;
  },
  getPopularSeats: async ({ count = 5 }: { count?: number }): Promise<PopularSeat[]> => {
    const response = await axios.get('/v3/analytics/popular-imac', {
      params: { count },
    });
    return response.data.seats;
  },
};

export default statApi;
