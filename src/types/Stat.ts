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

type ClusterUsageArr = ClusterUsage[];

export type { ImacUsage, ClusterUsage, ClusterUsageArr, PopularSeat };
