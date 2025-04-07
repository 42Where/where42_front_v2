import { axios } from '@/lib/Axios';
import {
  GetImacUsage,
  GetClusterUsage,
  GetMyFavoriteSeats,
  GetPopularSeats,
} from '@/types/api/stat';

const getImacUsage: GetImacUsage = async () => {
  const response = await axios.get(`/v3/location/cluster/imacUsage`);
  return response.data;
};

const getClusterUsage: GetClusterUsage = async () => {
  const response = await axios.get(`/v3/location/cluster/usage`);
  return response.data.clusters;
};

const getMyFavoriteSeats: GetMyFavoriteSeats = async ({ count = 1 }) => {
  const response = await axios.get('/v3/analytics/seat-history', {
    params: { count },
  });
  return response.data.seats;
};

const getPopularSeats: GetPopularSeats = async ({ count = 5 }) => {
  const response = await axios.get('/v3/analytics/popular-imac', {
    params: { count },
  });
  return response.data.seats;
};

export const statApi = {
  getImacUsage,
  getClusterUsage,
  getMyFavoriteSeats,
  getPopularSeats,
};
