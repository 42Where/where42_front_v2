import { ClusterName } from './Cluster';

type ImacUsage = {
  usageRate: number;
  usingImacUserCount: number;
  totalUserCount: number;
};

type ClusterUsage = {
  name: ClusterName;
  usageRate: number;
  usingImacCount: number;
  totalImacCount: number;
};

type PopularSeat = {
  seat: string;
  usingTimeHour: number;
  usingTimeMinute: number;
  usingTimeSecond: number;
  usingUserCount: number;
};

type FavoriteSeat = {
  seat: string;
  usingTimeHour: number;
  usingTimeMinute: number;
  usingTimeSecond: number;
  usingCount: number;
};

export type { ImacUsage, ClusterUsage, PopularSeat, FavoriteSeat };
