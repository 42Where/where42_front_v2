import { ImacUsage, ClusterUsage, PopularSeat, FavoriteSeat } from '@/types/Stat';

export type GetImacUsage = () => Promise<ImacUsage>;
export type GetClusterUsage = () => Promise<ClusterUsage[]>;
export type GetMyFavoriteSeats = (params: { count?: number }) => Promise<FavoriteSeat[]>;
export type GetPopularSeats = (params: { count?: number }) => Promise<PopularSeat[]>;
